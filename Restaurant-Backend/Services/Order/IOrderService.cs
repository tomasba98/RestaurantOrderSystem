
namespace Restaurant_Backend.Services.Order;

using Restaurant_Backend.Entities;

public interface IOrderService
{
    Order CreateOrder(Order order);

    Order? GetOrderById(Guid orderId);

    IEnumerable<Order> GetTableOrders(Guid tableId, Guid orderId);

}
