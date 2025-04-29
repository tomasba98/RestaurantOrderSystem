using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Restaurant_Backend.Services.Order;
using Restaurant_Backend.Services.OrderDetail;
using Restaurant_Backend.Services.Product;
using Restaurant_Backend.Entities;
using Restaurant_Backend.Models.Order;

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


    [HttpGet("orders")]
    public async Task<ActionResult<IEnumerable<OrderResponse>>> GetOrdersByStatus([FromQuery] OrderStatus status)
    {
        var orders = await _orderService.GetOrdersByStatusAsync(status);
        var ordersResponse = _mapper.Map<IEnumerable<OrderResponse>>(orders);
        return Ok(ordersResponse);
    }


    [HttpGet("orders/{orderId}")]
    public async Task<ActionResult> GetOrderById(Guid orderId)
    {
        var order = await _orderService.GetOrderByIdAsync(orderId);
        var orderResponse = _mapper.Map<IEnumerable<OrderResponse>>(order);
        return Ok(orderResponse);
    }

    [HttpPost("orders")]
    public async Task<ActionResult<OrderRequest>> CreateOrder(OrderRequest orderRequest)
    {
        var order = _mapper.Map<Order>(orderRequest);

        order.Status = OrderStatus.Pending;

        var createdOrder = await _orderService.CreateOrderAsync(order);

        var createdOrderRequest = _mapper.Map<OrderRequest>(createdOrder);

        return CreatedAtAction(nameof(GetOrderById), new { orderId = createdOrder.Id }, createdOrderRequest);
    }
}

