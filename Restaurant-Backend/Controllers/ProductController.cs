using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Restaurant_Backend.Entities;
using Restaurant_Backend.Models.Product;
using Restaurant_Backend.Services.Product;
using Restaurant_Backend.Services.User;

namespace Restaurant_Backend.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ProductController : BaseController
{
    private readonly IProductService _productService;
    private readonly IMapper _mapper;

    public ProductController(IProductService productService, IMapper mapper, IHttpContextAccessor httpContextAccessor, IUserService userService) : base(httpContextAccessor, userService)
    {
        _productService = productService;
        _mapper = mapper;
    }

    /// <summary>
    /// Retrieves a list of all products.
    /// </summary>
    /// <returns>An IActionResult containing the list of products.</returns>
    
    [HttpGet]
    public async Task<IActionResult> GetAllProducts()
    {
            var products = await _productService.GetAllProductsAsync();

        return Ok(products);
    }

    /// <summary>
    /// Retrieves a list of available products.
    /// </summary>
    /// <returns>An IActionResult containing the list of products.</returns>
    [HttpGet("available")]
    public async Task<IActionResult> GetProductsAvailable()
    {
        var products = await _productService.GetProductsAvailableAsync();

        return Ok(products);
    }

    /// <summary>
    /// Retrieves the details of a product by its unique identifier.
    /// </summary>
    /// <param name="productId">The unique identifier of the product.</param>
    /// <returns>An IActionResult containing the product details.</returns>
    [AllowAnonymous]
    [HttpGet("{productId:guid}")]
    public async Task<IActionResult> GetProductById(Guid productId)
    {
        try
        {
            var product = await _productService.GetProductByIdAsync(productId);
            if (product is null)
                return NotFound("Product not found");

            return Ok(product);

        }
        catch (Exception)
        {
            return StatusCode(500, "An error ocurred while retrieving the product.");
        }
        
    }

    /// <summary>
    /// Creates a new product.
    /// </summary>
    /// <param name="productRequest">The product information to create.</param>
    /// <returns>An IActionResult with the created product or an error message.</returns>
    [Authorize(Roles = "Admin,Manager")]
    [HttpPost]
    public async Task<IActionResult> CreateProduct([FromBody] ProductRequest productRequest)
    {
        var product = _mapper.Map<Product>(productRequest);

        try
        {
            var createdProduct = await _productService.CreateProductAsync(product);
            var createdProductResponse = _mapper.Map<ProductResponse>(createdProduct);

            return CreatedAtAction(nameof(GetProductById), new { productId = createdProduct.Id }, createdProductResponse);
        }
        catch (Exception)
        {
            return StatusCode(500, "An error ocurred while creating the product.");
        }
    }

    /// <summary>
    /// Updates the information of an existing product.
    /// </summary>
    /// <param name="productId">The unique identifier of the product to update.</param>
    /// <param name="productRequest">The updated product data.</param>
    /// <returns>An IActionResult with the updated product or an error message.</returns>
    [Authorize(Roles = "Admin,Manager")]
    [HttpPut("{productId}")]
    public async Task<IActionResult> UpdateProduct(Guid productId, [FromBody] ProductRequest productRequest)
    {    
        try
        {
            var product = await _productService.GetProductByIdAsync(productId);
            if (product is null)
                return NotFound("Product not found");

            product.Price = productRequest.Price;
            product.Name = productRequest.Name;
            product.Description = productRequest.Description;
            product.IsAvailable = productRequest.IsAvailable;

            var updatedProduct = await _productService.UpdateProductAsync(product);
            var productResponse = _mapper.Map<ProductResponse>(updatedProduct);

            return Ok(productResponse);
        }
        catch (Exception ex) 
        {
            return StatusCode(500, $"Error updating product: {ex.Message}");
        }
    }

    /// <summary>
    /// Toggles the availability status of a product.
    /// </summary>
    /// <param name="productId">The unique identifier of the product.</param>
    /// <returns>An IActionResult with the updated product or an error message.</returns>
    [Authorize(Roles = "Admin,Manager")]
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

    /// <summary>
    /// Toggles the availability status of a product.
    /// </summary>
    /// <param name="productId">The unique identifier of the product.</param>
    /// <param name="productStatus">The new availability status to apply.</param>
    /// <returns>An IActionResult with the updated product or an error message.</returns>
    [Authorize(Roles = "Admin,Manager,Kitchen")]
    [HttpPatch("{productId}/toggle-availability")]
    public async Task<IActionResult> ToggleProductAvailability(Guid productId)
    {       
        try
        {
            var product = await _productService.GetProductByIdAsync(productId);
            if (product is null)
                return NotFound("Product not found");

            product.IsAvailable = !product.IsAvailable;

            var updatedProduct = await _productService.UpdateProductAsync(product);
            var productResponse = _mapper.Map<ProductResponse>(updatedProduct);

            return Ok(productResponse);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error toogling the product availability: {ex.Message}");
        }
    }
}
