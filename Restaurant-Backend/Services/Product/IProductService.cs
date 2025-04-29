namespace Restaurant_Backend.Services.Product;

using Restaurant_Backend.Entities;
public interface IProductService
{
    Task<Product> CreateProductAsync(Product product);

    Task<Product?> GetProductByIdAsync(Guid productId);

    Task<IEnumerable<Product>> GetAllProductsAsync();

    Task<Product> UpdateProductAsync(Product product);

    Task DeleteProductAsync(Guid productId);

    Task<bool> IsProductAvailableAsync(Guid productId);

    Task<IEnumerable<Product>> SearchProductsByWordAsync(string keyword);

    Task SetProductAvailabilityAsync(Guid productId, bool isAvailable);
}
