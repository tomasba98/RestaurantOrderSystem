using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Restaurant_Backend.Entities;
using Restaurant_Backend.Models.Product;
using Restaurant_Backend.Services.Product;
namespace Restaurant_Backend.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ProductController : ControllerBase
{
    private readonly IProductService _productService;
    private readonly IMapper _mapper;


    public ProductController(IProductService productService, IMapper mapper)
    {
        _productService = productService;
        _mapper = mapper;
    }

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

    [HttpPatch("{productId}/toggle-availability")]
    public async Task<IActionResult> ToggleProductAvailability(Guid productId, bool productStatus)
    {
        var existingProduct = await _productService.GetProductByIdAsync(productId);
        if (existingProduct is null)
            return NotFound("Product not found");

        existingProduct.IsAvailable = productStatus;

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
}
