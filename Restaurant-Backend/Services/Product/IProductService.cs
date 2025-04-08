namespace Restaurant_Backend.Services.Product;

using Restaurant_Backend.Entities;
public interface IProductService
{
    Product CreateProduct(Product product);

    Product? GetProductById(Guid productId);

    IEnumerable<Product> GetProductsWithId(Guid productId);

    Task<IEnumerable<Product>> GetAllProducts();
}
