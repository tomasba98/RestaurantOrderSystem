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

    [HttpGet("by-status")]
    public async Task<ActionResult<IEnumerable<OrderResponse>>> GetOrdersByStatus([FromQuery] OrderStatus status)
    {
        var orders = await _orderService.GetOrdersByStatusAsync(status);
        var ordersResponse = _mapper.Map<IEnumerable<OrderResponse>>(orders);
        return Ok(ordersResponse);
    }

    [HttpPatch("/{orderId}/status")]
    public async Task<IActionResult> ChangeOrderStatus(Guid orderId, [FromBody] OrderStatus status)
    {
        var order = await _orderService.GetOrderByIdAsync(orderId);
        if (order is null)
            return NotFound("Order not found.");

        order.Status = status;

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

    [HttpGet("{orderId}")]
    public async Task<ActionResult> GetOrderById(Guid orderId)
    {
        var order = await _orderService.GetOrderByIdAsync(orderId);
        var orderResponse = _mapper.Map<OrderResponse>(order);
        return Ok(orderResponse);
    }

    [HttpPost]
    public async Task<ActionResult<OrderRequest>> CreateOrder([FromBody] OrderRequest orderRequest)
    {
        var tableSession = await _tableSessionService.GetActiveSessionByTableIdAsync(orderRequest.TableId);

        if (tableSession is null)
            return BadRequest("Table or session not found.");

        var order = _mapper.Map<Order>(orderRequest);
        order.Table = tableSession.Table;
        order.TableSession = tableSession;
        order.TableId = tableSession.Table.Id;
        order.TableSessionId = tableSession.Id;
        order.Status = OrderStatus.Pending;

        // Load all required products in a single batch to optimize performance
        var productIds = orderRequest.Items.Select(d => d.ProductId).Distinct();
        var products = await _productService.GetProductListByIdsAsync(productIds);
        var productDict = products.ToDictionary(p => p.Id);

        foreach (var item in orderRequest.Items)
        {
            if (!productDict.TryGetValue(item.ProductId, out var product))
                return NotFound($"Product {item.ProductId} not found.");

            var detail = _mapper.Map<OrderDetail>(item);
            detail.Product = product;
            detail.ProductId = product.Id;
            detail.Order = order;
            detail.OrderId = order.Id;

            order.ProductList.Add(detail);
        }

        var createdOrder = await _orderService.CreateOrderAsync(order);
        var createdOrderRequest = _mapper.Map<OrderRequest>(createdOrder);

        return CreatedAtAction(nameof(GetOrderById), new { orderId = createdOrder.Id }, createdOrderRequest);
    }

    [HttpPut("{orderId}")]
    public async Task<IActionResult> UpdateOrder(Guid orderId, [FromBody] OrderRequest orderRequest)
    {
        try
        {
            var existingOrder = await _orderService.GetOrderByIdAsync(orderId);
            if (existingOrder is null)
                return NotFound("Order not found.");

            var tableSession = await _tableSessionService.GetActiveSessionByTableIdAsync(orderRequest.TableId);
            if (tableSession is null)
                return BadRequest("Table or session not found.");

            existingOrder.ProductList.Clear();

            existingOrder.Table = tableSession.Table;
            existingOrder.TableId = tableSession.Table.Id;
            existingOrder.TableSession = tableSession;
            existingOrder.TableSessionId = tableSession.Id;

            // Load all required products in a single batch to optimize performance
            var productIds = orderRequest.Items.Select(i => i.ProductId).Distinct();
            var products = await _productService.GetProductListByIdsAsync(productIds);
            var productDict = products.ToDictionary(p => p.Id);

            foreach (var item in orderRequest.Items)
            {
                if (!productDict.TryGetValue(item.ProductId, out var product))
                    return NotFound($"Product {item.ProductId} not found.");

                var detail = _mapper.Map<OrderDetail>(item);
                detail.Product = product;
                detail.ProductId = product.Id;
                detail.Order = existingOrder;
                detail.OrderId = existingOrder.Id;

                existingOrder.ProductList.Add(detail);
            }

            var updatedOrder = await _orderService.UpdateOrderAsync(existingOrder);
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


    [HttpDelete("{orderId}")]
    public async Task<IActionResult> DeleteOrder(Guid orderId)
    {
        try
        {
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

    [HttpPatch("/{orderId}/pay")]
    public async Task<IActionResult> MarkOrderAsPaid(Guid orderId)
    {
        var order = await _orderService.GetOrderByIdAsync(orderId);
        if (order is null)
            return NotFound("Order not found.");

        order.IsPaid = true;

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

    [HttpGet("/table/{tableId}")]
    public async Task<ActionResult<IEnumerable<OrderRequest>>> GetOrdersByTable(Guid tableId)
    {
        var tableOrders = await _orderService.GetTableOrdersAsync(tableId);

        return Ok(tableOrders);
    }

    [HttpGet("/session/{sessionId}")]
    public async Task<ActionResult<IEnumerable<OrderRequest>>> GetOrdersBySession(Guid sessionId)
    {
        var sessionOrders = await _orderService.GetSessionOrdersAsync(sessionId);

        return Ok(sessionOrders);
    }    

    [HttpPatch("/{orderId}/cancel")]
    public async Task<IActionResult> CancelOrder(Guid orderId)
    {
        var order = await _orderService.GetOrderByIdAsync(orderId);
        if (order is null)
            return NotFound("Order not found.");

        order.Status = OrderStatus.Canceled;

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
    
}

/* NOT IN USE ANYMORE, USE UpdateOrder INSTEAD (FOR NOW).
     *
    [HttpPost("/{orderId}/AddDetails")]
    public async Task<IActionResult> AddOrderDetail(Guid orderId, OrderDetailRequest newDetailRequest)
    {

        if (newDetailRequest?.ProductItems == null || !newDetailRequest.ProductItems.Any())
            return BadRequest("No product items provided.");

        var order = await _orderService.GetOrderByIdAsync(orderId);
        if (order is null)
            return NotFound("Order not found.");

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