
using Restaurant_Backend.Services.DataAccessLayer;

namespace Restaurant_Backend.Services.Product.Implementation;

using Microsoft.EntityFrameworkCore;
using Restaurant_Backend.Entities;
public class ProductService : IProductService
{
    private readonly IGenericService<Product> _productGenericService;
    public ProductService(IGenericService<Product> productGenericService)
    {
        _productGenericService = productGenericService;
    }
    public async Task<Product> CreateProductAsync(Product product)
    {
        await _productGenericService.InsertAsync(product);
        return product;
    }
    public async Task<Product?> GetProductByIdAsync(Guid productId)
    {
        return await _productGenericService.GetByIdAsync(productId);
    }    

    public async Task<IEnumerable<Product>> GetAllProductsAsync()
    {
        return await _productGenericService.FindAllAsync();
    }

    public async Task<Product> UpdateProductAsync(Product product)
    {
        await _productGenericService.UpdateAsync(product);
        return product;
    }

    public async Task DeleteProductAsync(Guid productId)
    {
        Product? product = await _productGenericService.GetByIdAsync(productId) ?? throw new InvalidOperationException("Product not found.");
        try
        {
            await _productGenericService.DeleteAsync(product);
        }
        catch (Exception ex) 
        {
            throw new InvalidOperationException($"Error deleting product {productId}: {ex.Message}");
        }
    }

    public async Task<bool> IsProductAvailableAsync(Guid productId)
    {
        return await _productGenericService
            .FilterByExpressionLinq(product => product.Id == productId && product.IsAvailable)
            .AnyAsync();
    }

    public async Task<IEnumerable<Product>> SearchProductsByWordAsync(string keyword)
    {
        if (string.IsNullOrWhiteSpace(keyword))
            return [];

        return await _productGenericService
            .FilterByExpressionLinq(product => product.Name.ToLower().Contains(keyword.ToLower()))
            .ToListAsync();
    }

    public async Task SetProductAvailabilityAsync(Guid productId, bool isAvailable)
    {
        Product? product = await _productGenericService.GetByIdAsync(productId) ?? throw new InvalidOperationException("Product not found.");
        product.IsAvailable = isAvailable;

        await _productGenericService.UpdateAsync(product);
    }

}
