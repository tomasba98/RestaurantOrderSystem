using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Restaurant_Backend.Entities;
using Restaurant_Backend.Models.Order;
using Restaurant_Backend.Models.Product;
using Restaurant_Backend.Services.Order;
using Restaurant_Backend.Services.OrderDetail;
using Restaurant_Backend.Services.Product;
using Restaurant_Backend.Services.Table;
using Restaurant_Backend.Services.TableSession;
using Restaurant_Backend.Utils;

namespace Restaurant_Backend.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ProductController : ControllerBase
{
    private readonly IOrderService _orderService;
    private readonly IOrderDetailService _orderDetailService;
    private readonly IProductService _productService;
    private readonly IMapper _mapper;
    private readonly ITableService _tableService;
    private readonly ITableSessionService _tableSessionService;


    public ProductController(IOrderService orderService, IProductService productService, IOrderDetailService orderDetailService, IMapper mapper, ITableService tableService, ITableSessionService tableSessionService)
    {
        _orderService = orderService;
        _productService = productService;
        _orderDetailService = orderDetailService;
        _mapper = mapper;
        _tableService = tableService;
        _tableSessionService = tableSessionService;
    }

    // GET: api/product
    [HttpGet]
    public async Task<IActionResult> GetAllProducts()
    {
        var products = await _productService.GetAllProductsAsync();

        return Ok(products);
    }


    [HttpGet("{productId}")]
    public async Task<IActionResult> GetProductById(Guid productId)
    {
        var product = await _productService.GetProductByIdAsync(productId);

        return Ok(product);
    }
    

    [HttpPost]
    public async Task<IActionResult> CreateProduct([FromBody] ProductRequest productRequest)
    {
        var product = _mapper.Map<Product>(productRequest);

        try
        {
            var createdProduct = await _productService.CreateProductAsync(product);
            var createdProductResponse = _mapper.Map<ProductResponse>(createdProduct);

            return CreatedAtAction(nameof(GetProductById), new { orderId = createdProduct.Id }, createdProductResponse);
        }
        catch (Exception ex)
        {
            return StatusCode(500, "An error ocurred while creating the product.");
        }
    }

    
    [HttpPut("{productId}")]
    public async Task<IActionResult> UpdateProduct(Guid productId, [FromBody] ProductRequest productRequest)
    {
        var existingProduct = await _productService.GetProductByIdAsync(productId);
        if (existingProduct is null)
            return NotFound("Product not found");
        
        existingProduct.Price = productRequest.Price;
        existingProduct.Name = productRequest.Name;
        existingProduct.Description = productRequest.Description;
        existingProduct.IsAvailable = productRequest.IsAvailable;

        try
        {
            var updatedProduct = await _productService.UpdateProductAsync(existingProduct);
            var productResponse = _mapper.Map<ProductResponse>(updatedProduct);

            return Ok(productResponse);
        }
        catch (Exception ex) 
        {
            return StatusCode(500, $"Error updating product: {ex.Message}");
        }
    }

    [HttpDelete("{productId}")]
    public async Task<IActionResult> DeleteProduct(Guid productId)
    {
        try
        {
            await _productService.DeleteProductAsync(productId);
            return NoContent();
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error deleting product: {ex.Message}");
        }
    }

    /*
    // PATCH: api/product/{id}/toggle-availability
    [HttpPatch("{id}/toggle-availability")]
    public async Task<IActionResult> ToggleProductAvailability(int id)

    // GET: api/product/featured
    [HttpGet("featured")]
    public async Task<IActionResult> GetFeaturedProducts()

    // GET: api/product/best-sellers
    [HttpGet("best-sellers")]
    public async Task<IActionResult> GetBestSellingProducts()

    // GET: api/product/session/{tableSessionId}
    [HttpGet("session/{tableSessionId}")]
    public async Task<IActionResult> GetProductsByTableSession(int tableSessionId)
    */

}
