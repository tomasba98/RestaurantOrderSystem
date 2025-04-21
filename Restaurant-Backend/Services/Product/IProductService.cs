namespace Restaurant_Backend.Services.Product;

using Restaurant_Backend.Entities;
public interface IProductService
{
    Product CreateProduct(Product product);

    Task<Product?> GetProductById(Guid productId);

    Task<IEnumerable<Product>> GetAllProducts();

    Task<Product> UpdateProduct(Product product);

    Task DeleteProduct(Guid productId);

    Task<bool> IsProductAvailable(Guid productId);

    Task<IEnumerable<Product>> SearchProductsByWord(string keyword);

    Task SetProductAvailability(Guid productId, bool isAvailable);
}
