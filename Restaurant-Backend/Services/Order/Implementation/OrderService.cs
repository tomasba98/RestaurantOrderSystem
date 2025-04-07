
namespace Restaurant_Backend.Services.Order.Implementation;

using Restaurant_Backend.Entities;
using Restaurant_Backend.Services.DataAccessLayer;

public class OrderService : IOrderService
{
    private readonly IGenericService<Order> _orderGenericService;
    public OrderService(IGenericService<Order> orederGenericService)
    {
        _orderGenericService = orederGenericService;
    }
    public Order CreateOrder(Order order)
    {
        _orderGenericService.InsertAsync(order);
        return order;  
    }

    public Order? GetOrderById(Guid orderId)
    {
        return _orderGenericService
            .FilterByExpressionLinq(order => order.Id == orderId)
            .FirstOrDefault();
    }

    public IEnumerable<Order> GetTableOrders(Guid tableId, Guid orderId)
    {
        return _orderGenericService
            .FilterByExpressionLinq(order => order.TableId == tableId && order.Id == orderId)
            .ToList();
    }

}
