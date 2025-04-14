using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Restaurant_Backend.Services.Order;
using Restaurant_Backend.Services.OrderDetail;
using Restaurant_Backend.Services.Product;

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




    //[HttpGet("users")]
    //public ActionResult

}
