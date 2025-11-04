
namespace Restaurant_Backend.Services.Order;

using Restaurant_Backend.Entities;

public interface IOrderService
{
    Task<IEnumerable<Order>> GetAllOrdersAsync();
    Task<Order> CreateOrderAsync(Order order);

    Task<Order> UpdateOrderAsync(Order order);

    Task<Order?> GetOrderByIdAsync(Guid orderId);

    Task<IEnumerable<Order>> GetTableOrdersAsync(Guid tableId);

    Task<IEnumerable<Order>> GetSessionOrdersAsync(Guid tableSessionId);
    
    Task UpdateOrderStatusAsync(Guid orderId, OrderStatus newStatus);    
    
    Task DeleteOrderAsync(Guid orderId);
    
    Task<IEnumerable<Order>> GetOrdersByStatusAsync(OrderStatus status);

}
