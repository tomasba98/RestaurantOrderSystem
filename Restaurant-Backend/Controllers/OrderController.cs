using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Restaurant_Backend.Services.Order;
using Restaurant_Backend.Services.OrderDetail;
using Restaurant_Backend.Services.Product;
using Restaurant_Backend.Entities;
using Restaurant_Backend.Models.Order;
using Restaurant_Backend.Utils;
using Restaurant_Backend.Services.Table;
using Restaurant_Backend.Services.TableSession;

namespace Restaurant_Backend.Controllers;

[Route("api/[controller]")]
[ApiController]
public class OrderController : ControllerBase
{
    private readonly IOrderService _orderService;
    private readonly IOrderDetailService _orderDetailService;
    private readonly IProductService _productService;
    private readonly IMapper _mapper;
    private readonly ITableService _tableService;
    private readonly ITableSessionService _tableSessionService;

    public OrderController(IOrderService orderService, IProductService productService, IOrderDetailService orderDetailService, IMapper mapper, ITableService tableService, ITableSessionService tableSessionService)
    {
        _orderService = orderService;
        _productService = productService;
        _orderDetailService = orderDetailService;
        _mapper = mapper;
        _tableService = tableService;
        _tableSessionService = tableSessionService;
    }

    [HttpGet("/health")]
    public IActionResult Health()
    {
        return Ok(new { Status = "API is running!", Timestamp = DateTime.Now });
    }

    /// <summary>
    /// Retrieves an order by its unique identifier.
    /// </summary>
    /// <param name="orderId">The unique identifier of the order.</param>
    /// <returns>An ActionResult containing the order information.</returns>
    [HttpGet("{orderId}")]
    public async Task<ActionResult> GetOrderById(Guid orderId)
    {
        try
        {
            var order = await _orderService.GetOrderByIdAsync(orderId);
            var orderResponse = _mapper.Map<OrderResponse>(order);
            return Ok(orderResponse);
        }
        catch (OrderNotFoundException ex)
        {
            return NotFound(ex.Message);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    /// <summary>
    /// Retrieves all orders associated with a specific table.
    /// </summary>
    /// <param name="tableId">The unique identifier of the table.</param>
    /// <returns>A list of orders linked to the specified table.</returns>
    [HttpGet("table/{tableId}")]
    public async Task<ActionResult<IEnumerable<OrderRequest>>> GetOrdersByTable(Guid tableId)
    {
        try
        {
            var tableOrders = await _orderService.GetTableOrdersAsync(tableId);
            if (tableOrders is null || !tableOrders.Any())
                return NotFound("No orders were found for the specified table.");

            return Ok(tableOrders);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"An error occurred while retrieving the orders for the table: {ex.Message}");
        }
    }

    /// <summary>
    /// Retrieves all orders associated with a specific session.
    /// </summary>
    /// <param name="sessionId">The unique identifier of the table session.</param>
    /// <returns>A list of orders linked to the specified session.</returns>
    [HttpGet("session/{sessionId}")]
    public async Task<ActionResult<IEnumerable<OrderRequest>>> GetOrdersBySession(Guid sessionId)
    {
        try
        {
            var sessionOrders = await _orderService.GetSessionOrdersAsync(sessionId);
            if (sessionOrders is null || !sessionOrders.Any())
                return NotFound("No orders were found for the specified session.");

            return Ok(sessionOrders);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"An error occurred while retrieving the orders for the session: {ex.Message}");
        }
    }

    /// <summary>
    /// Retrieves all orders with a specific status.
    /// </summary>
    /// <param name="status">The status to filter orders by.</param>
    /// <returns>A list of orders matching the specified status.</returns>
    [HttpGet("by-status")]
    public async Task<ActionResult<IEnumerable<OrderResponse>>> GetOrdersByStatus([FromQuery] OrderStatus status)
    {
        try
        {
            var orders = await _orderService.GetOrdersByStatusAsync(status);
            if (orders is null || !orders.Any())
                return NotFound("No orders were found with the specified status.");

            var ordersResponse = _mapper.Map<IEnumerable<OrderResponse>>(orders);

            return Ok(ordersResponse);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"An error occurred while retrieving orders by status: {ex.Message}");
        }
    }

    /// <summary>
    /// Changes the status of a specific order.
    /// </summary>
    /// <param name="orderId">The unique identifier of the order.</param>
    /// <param name="status">The new status to assign to the order.</param>
    /// <returns>An IActionResult indicating the result of the operation.</returns>
    [HttpPatch("{orderId}/status")]
    public async Task<IActionResult> ChangeOrderStatus(Guid orderId, [FromBody] OrderStatus status)
    {
        try
        {
            var order = await _orderService.GetOrderByIdAsync(orderId);

            var validationResult = await ValidateActiveSessionAsync(order!.TableSessionId);
            if (validationResult != null)
                return validationResult;

            order.Status = status;

            await _orderService.UpdateOrderAsync(order);
            return NoContent();
        }
        catch (OrderNotFoundException ex)
        {
            return NotFound(ex.Message);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    /// <summary>
    /// Creates a new order based on the provided request data.
    /// </summary>
    /// <param name="orderRequest">The data required to create the order.</param>
    /// <returns>An ActionResult containing the created order or an error message.</returns>
    [HttpPost("")]
    public async Task<ActionResult<OrderRequest>> CreateOrder([FromBody] OrderRequest orderRequest)
    {
        try
        {
            var tableSession = await _tableSessionService.GetActiveSessionByTableIdAsync(orderRequest.TableId);

            if (tableSession is null)
                return NotFound("No active session for this table");

            var order = _mapper.Map<Order>(orderRequest);
            order.Table = tableSession.Table;
            order.TableSession = tableSession;
            order.TableId = tableSession.Table.Id;
            order.TableSessionId = tableSession.Id;
            order.Status = OrderStatus.Pending;

            var (failed, missingProductId) = await TryLoadProductsAsync(order, orderRequest);
            if (failed)
                return NotFound($"Product {missingProductId} not found.");

            var createdOrder = await _orderService.CreateOrderAsync(order);
            var createdOrderResponse = _mapper.Map<OrderResponse>(createdOrder);

            return CreatedAtAction(nameof(GetOrderById), new { orderId = createdOrder.Id }, createdOrderResponse);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"An error ocurred while creating the order: {ex.Message}");
        }
    }

    /// <summary>
    /// Updates an existing order with new information.
    /// </summary>
    /// <param name="orderId">The unique identifier of the order to update.</param>
    /// <param name="orderRequest">The updated order data.</param>
    /// <returns>An IActionResult indicating the result of the update operation.</returns>
    [HttpPut("{orderId}")]
    public async Task<IActionResult> UpdateOrder(Guid orderId, [FromBody] OrderRequest orderRequest)
    {      
        try
        {
            var order = await _orderService.GetOrderByIdAsync(orderId);

            var validationResult = await ValidateActiveSessionAsync(order!.TableSessionId);
            if (validationResult != null)
                return validationResult;

            order.ProductList.Clear();

            var (failed, missingProductId) = await TryLoadProductsAsync(order, orderRequest);
            if (failed)
                return NotFound($"Product {missingProductId} not found.");

            var updatedOrder = await _orderService.UpdateOrderAsync(order);
            var orderResponse = _mapper.Map<OrderRequest>(updatedOrder);

            return Ok(orderResponse);
        }
        catch (OrderNotFoundException ex)
        {
            return NotFound(ex.Message);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    /// <summary>
    /// Deletes an existing order.
    /// </summary>
    /// <param name="orderId">The unique identifier of the order to delete.</param>
    /// <returns>An IActionResult indicating the result of the deletion.</returns>
    [HttpDelete("{orderId}")]
    public async Task<IActionResult> DeleteOrder(Guid orderId)
    {      
        try
        {
            var order = await _orderService.GetOrderByIdAsync(orderId);

            var validationResult = await ValidateActiveSessionAsync(order!.TableSessionId);
            if (validationResult != null)
                return validationResult;

            await _orderService.DeleteOrderAsync(orderId);
            return NoContent(); 
        }
        catch (OrderNotFoundException ex)
        {
            return NotFound(ex.Message);
        }
        catch (OrderNotPaidException ex)
        {
            return BadRequest(ex.Message);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    /// <summary>
    /// Marks an order as paid and stores its total amount history.
    /// </summary>
    /// <param name="orderId">The unique identifier of the order to mark as paid.</param>
    /// <returns>An IActionResult indicating the result of the operation.</returns>
    [HttpPatch("{orderId}/pay")]
    public async Task<IActionResult> MarkOrderAsPaid(Guid orderId)
    {      
        try
        {
            var order = await _orderService.GetOrderByIdAsync(orderId);

            var validationResult = await ValidateActiveSessionAsync(order!.TableSessionId);
            if (validationResult != null)
                return validationResult;

            order.IsPaid = true;
            order.TotalAmountHistory = order.TotalAmount;

            await _orderService.UpdateOrderAsync(order);
            return NoContent();
        }
        catch (OrderNotFoundException ex)
        {
            return NotFound(ex.Message);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }    

    /// <summary>
    /// Validates whether the table session associated with an order is active.
    /// </summary>
    /// <param name="tableSessionId">The unique identifier of the table session.</param>
    /// <returns>An IActionResult if the session is invalid; otherwise, null.</returns>
    private async Task<IActionResult?> ValidateActiveSessionAsync(Guid tableSessionId)
    {
        var session = await _tableSessionService.GetSessionByIdAsync(tableSessionId);
        if (session is null)
            return NotFound("Table session not found.");

        if (!session.IsActive)
            return Conflict("The session of the order has already ended. Modifications are not allowed.");

        return null; 
    }

    /// <summary>
    /// Loads the product details into the order from the provided order request.
    /// </summary>
    /// <param name="order">The order object to populate with product details.</param>
    /// <param name="orderRequest">The request containing product IDs and quantities.</param>
    /// <returns>A tuple indicating whether the operation failed and the ID of a missing product if any.</returns>
    private async Task<(bool Failed, Guid? MissingProductId)> TryLoadProductsAsync(Order order, OrderRequest orderRequest)
    {
        var productIds = orderRequest.Items.Select(d => d.ProductId).Distinct();
        var products = await _productService.GetProductListByIdsAsync(productIds);
        var productDict = products.ToDictionary(p => p.Id);

        foreach (var item in orderRequest.Items)
        {
            if (!productDict.TryGetValue(item.ProductId, out var product))
            {
                return (true, item.ProductId);
            }

            var detail = _mapper.Map<OrderDetail>(item);
            detail.Product = product;
            detail.ProductId = product.Id;
            detail.Order = order;
            detail.OrderId = order.Id;

            order.ProductList.Add(detail);
        }

        return (false, null);
    }

}

/* NOT IN USE, USE UpdateOrder INSTEAD (FOR NOW).
     *
    [HttpPost("/{orderId}/AddDetails")]
    public async Task<IActionResult> AddOrderDetail(Guid orderId, OrderDetailRequest newDetailRequest)
    {

        if (newDetailRequest?.ProductItems == null || !newDetailRequest.ProductItems.Any())
            return BadRequest("No product items provided.");

        var order = await _orderService.GetOrderByIdAsync(orderId);

        var orderDetails = _mapper.Map<List<OrderDetail>>(newDetailRequest.ProductItems);

        var productIds = orderDetails.Select(d => d.ProductId).Distinct();
        var products = await _productService.GetProductListByIdsAsync(productIds);
        var productDict = products.ToDictionary(p => p.Id);

        foreach (var detail in orderDetails)
        {
            if (!productDict.TryGetValue(detail.ProductId, out var product))
                return NotFound($"Product {detail.ProductId} not found.");

            detail.Product = product;
            detail.Order = order;
            detail.OrderId = order.Id;

            order.ProductList.Add(detail);
        }

        try
        {
            await _orderService.UpdateOrderAsync(order);
            return NoContent();
        }
        catch (OrderNotFoundException ex)
        {
            return NotFound(ex.Message);
        }
        catch (OrderNotPaidException ex)
        {
            return BadRequest(ex.Message);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }
    */