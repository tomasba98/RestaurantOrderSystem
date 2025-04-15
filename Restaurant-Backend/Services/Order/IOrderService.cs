
namespace Restaurant_Backend.Services.Order;

using Restaurant_Backend.Entities;

public interface IOrderService
{
    Order CreateOrder(Order order);

    Task<Order?> GetOrderById(Guid orderId);

    IEnumerable<Order> GetTableOrders(Guid tableId, Guid orderId);

    Task<IEnumerable<Order>> GetTableOrdersBySession(Guid tableId, Guid tableSessionId);
    
    Task UpdateOrderStatus(Guid orderId, OrderStatus newStatus);
    
    Task MarkOrderAsPaid(Guid orderId);
    
    Task DeleteOrder(Guid orderId);
    
    Task<IEnumerable<Order>> GetOrdersByStatus(OrderStatus status);

}
