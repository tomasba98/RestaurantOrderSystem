using Microsoft.AspNetCore.Mvc;
using Restaurant_Backend.Services.Order;
using Restaurant_Backend.Services.Product;

namespace Restaurant_Backend.Controllers;

[Route("api/[controller]")]
[ApiController]
public class OrderController : ControllerBase
{
    private readonly IOrderService _orderService;
    private readonly IProductService _productService;
    private readonly IOrderService orderService;


    //[HttpGet("users")]
    //public ActionResult

}
