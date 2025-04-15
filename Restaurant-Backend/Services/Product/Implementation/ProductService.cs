
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
    public async Task<Product?> GetProductById(Guid productId)
    {
        return await _productGenericService.GetByIdAsync(productId);
    }    

    public Task<IEnumerable<Product>> GetAllProducts()
    {
        return _productGenericService.FindAllAsync();
    }

}
