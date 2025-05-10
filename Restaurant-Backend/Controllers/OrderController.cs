using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Restaurant_Backend.Services.Order;
using Restaurant_Backend.Services.OrderDetail;
using Restaurant_Backend.Services.Product;
using Restaurant_Backend.Entities;
using Restaurant_Backend.Models.Order;
using Restaurant_Backend.Utils;

namespace Restaurant_Backend.Controllers;

[Route("api/[controller]")]
[ApiController]
public class OrderController : ControllerBase
{
    private readonly IOrderService _orderService;
    private readonly IOrderDetailService _orderDetailService;
    private readonly IProductService _productService;
    private readonly IMapper _mapper;

    public OrderController(IOrderService orderService, IProductService productService, IOrderDetailService orderDetailService, IMapper mapper)
    {
        _orderService = orderService;
        _productService = productService;
        _orderDetailService = orderDetailService;
        _mapper = mapper;
    }

    [HttpGet("by-status")]
    public async Task<ActionResult<IEnumerable<OrderResponse>>> GetOrdersByStatus([FromQuery] OrderStatus status)
    {
        var orders = await _orderService.GetOrdersByStatusAsync(status);
        var ordersResponse = _mapper.Map<IEnumerable<OrderResponse>>(orders);
        return Ok(ordersResponse);
    }

    [HttpGet("{orderId}")]
    public async Task<ActionResult> GetOrderById(Guid orderId)
    {
        var order = await _orderService.GetOrderByIdAsync(orderId);
        var orderResponse = _mapper.Map<OrderResponse>(order);
        return Ok(orderResponse);
    }

    [HttpPost]
    public async Task<ActionResult<OrderRequest>> CreateOrder(OrderRequest orderRequest)
    {
        var order = _mapper.Map<Order>(orderRequest);
        order.Status = OrderStatus.Pending;
        var createdOrder = await _orderService.CreateOrderAsync(order);
        var createdOrderRequest = _mapper.Map<OrderRequest>(createdOrder);

        return CreatedAtAction(nameof(GetOrderById), new { orderId = createdOrder.Id }, createdOrderRequest);
    }

    [HttpPut("{orderId}")]
    public async Task<IActionResult> UpdateOrder(OrderRequest orderRequest)
    {
        try
        {
            var order = _mapper.Map<Order>(orderRequest);
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



    /*
    [HttpPost("/{orderId}/details")]
        public async Task<ActionResult<OrderDetailDto>> AddOrderDetail(Guid orderId, OrderDetailCreateDto dto)

    [HttpDelete("/details/{orderDetailId}")]
        public async Task<IActionResult> RemoveOrderDetail(Guid orderDetailId)

    [HttpGet("/{orderId}/details")]
        public async Task<ActionResult<IEnumerable<OrderDetailDto>>> GetOrderDetails(Guid orderId)

    [HttpPatch("/{orderId}/pay")]
        public async Task<IActionResult> MarkOrderAsPaid(Guid orderId)

    [HttpPatch("/{orderId}/status")]
        public async Task<IActionResult> ChangeOrderStatus(Guid orderId, [FromBody] OrderStatus status)

    [HttpGet("/tables/{tableId}")]
        public async Task<ActionResult<IEnumerable<OrderDto>>> GetOrdersByTable(Guid tableId)

    [HttpGet("/sessions/{sessionId}/active")]
        public async Task<ActionResult<IEnumerable<OrderDto>>> GetActiveOrdersBySession(Guid sessionId)

    [HttpGet("/{orderId}/total")]
        public async Task<ActionResult<decimal>> GetTotalAmount(Guid orderId)

    [HttpGet("/search")]
        public async Task<ActionResult<IEnumerable<OrderDto>>> SearchOrders(string keyword)

    [HttpPatch("/{orderId}/cancel")]
        public async Task<IActionResult> CancelOrder(Guid orderId)
    */
}

