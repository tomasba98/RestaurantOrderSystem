
using Restaurant_Backend.Services.DataAccessLayer;

namespace Restaurant_Backend.Services.Product.Implementation;

using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using Restaurant_Backend.Entities;
public class ProductService : IProductService
{
    private readonly IGenericService<Product> _productGenericService;
    private readonly IMemoryCache _cache;
    public ProductService(IGenericService<Product> productGenericService, IMemoryCache cache)
    {
        _productGenericService = productGenericService;
        _cache = cache;
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

    public async Task<List<Product>> GetProductListByIdsAsync(IEnumerable<Guid> productIds)
    {
        return await _productGenericService
            .FilterByExpressionLinq(p => productIds.Contains(p.Id))
            .ToListAsync();
    }

    public async Task<IEnumerable<Product>> GetAllProductsAsync()
    {
        var products = await _cache.GetOrCreateAsync("all_products", async entry =>
        {
            entry.SlidingExpiration = TimeSpan.FromMinutes(10);
            return await _productGenericService.FindAllAsyncReadOnly();
        });

        return products ?? [];
    }

    public async Task<IEnumerable<Product>> GetProductsAvailableAsync()
    {
        return await _productGenericService
            .FilterByExpressionLinq(product => product.IsAvailable == true)
            .ToListAsync();
    }

    public async Task<Product> UpdateProductAsync(Product product)
    {
        await _productGenericService.UpdateAsync(product);
        return product;
    }

    public async Task DeleteProductAsync(Guid productId)
    {
        Product? product = await _productGenericService.GetByIdAsync(productId) ?? throw new InvalidOperationException("Product not found.");
        
        await _productGenericService.DeleteAsync(product);        
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
