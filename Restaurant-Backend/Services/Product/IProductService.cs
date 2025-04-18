namespace Restaurant_Backend.Services.Product;

using Restaurant_Backend.Entities;
public interface IProductService
{
    Product CreateProduct(Product product);

    Task<Product?> GetProductById(Guid productId);

    Task<IEnumerable<Product>> GetAllProducts();

    Task<Product> UpdateProductAsync(Product product);
    Task<bool> DeleteProductAsync(Guid productId);
    Task<bool> IsProductAvailableAsync(Guid productId);
    Task<IEnumerable<Product>> SearchProductsByWord(string keyword);
    Task SetProductAvailabilityAsync(Guid productId, bool isAvailable);
    Task<IEnumerable<Product>> GetProductsByPriceRangeAsync(decimal minPrice, decimal maxPrice);

}
