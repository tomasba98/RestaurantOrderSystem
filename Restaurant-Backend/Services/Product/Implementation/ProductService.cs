
using Restaurant_Backend.Services.DataAccessLayer;

namespace Restaurant_Backend.Services.Product.Implementation;

using Restaurant_Backend.Entities;
public class ProductService : IProductService
{
    private readonly IGenericService<Product> _productGenericService;
    public ProductService(IGenericService<Product> productGenericService)
    {
        _productGenericService = productGenericService;
    }
    public Product CreateProduct(Product product)
    {
        _productGenericService.InsertAsync(product);
        return product;
    }
    public Product? GetProductById(Guid productId)
    {
        return _productGenericService
            .FilterByExpressionLinq(product => product.Id == productId)
            .FirstOrDefault();
    }

    public IEnumerable<Product> GetProductsWithId(Guid productId)
    {
        return _productGenericService
            .FilterByExpressionLinq(product => product.Id == productId)
            .ToList();
    }

    public Task<IEnumerable<Product>> GetAllProducts()
    {
        return _productGenericService.FindAllAsync();
    }

}
