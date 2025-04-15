namespace Restaurant_Backend.Services.Product;

using Restaurant_Backend.Entities;
public interface IProductService
{
    Product CreateProduct(Product product);

    Task<Product?> GetProductById(Guid productId);

    Task<IEnumerable<Product>> GetAllProducts();
}
