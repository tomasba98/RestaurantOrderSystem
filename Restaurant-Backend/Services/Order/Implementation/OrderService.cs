
namespace Restaurant_Backend.Services.Order.Implementation;

using Microsoft.EntityFrameworkCore;
using Restaurant_Backend.Entities;
using Restaurant_Backend.Services.DataAccessLayer;

public class OrderService : IOrderService
{
    private readonly IGenericService<Order> _orderGenericService;
    public OrderService(IGenericService<Order> orederGenericService)
    {
        _orderGenericService = orederGenericService;
    }
    public async Task<Order> CreateOrder(Order order)
    {
        order.TotalAmountHistory = order.TotalAmount;
        await _orderGenericService.InsertAsync(order);
        return order;
    }

    public async Task<Order?> GetOrderById(Guid orderId)
    {
        return await _orderGenericService
            .FilterByExpressionLinq(order => order.Id == orderId)
            .Include(order => order.ProductList)
            .ThenInclude(item => item.Product)
            .FirstOrDefaultAsync();
    }

    public IEnumerable<Order> GetTableOrders(Guid tableId)
    {
        return _orderGenericService
            .FilterByExpressionLinq(order => order.TableId == tableId )
            .Include(order => order.ProductList)
            .ThenInclude(item => item.Product)
            .ToList();
    }

    public async Task<IEnumerable<Order>> GetSessionOrders(Guid tableId, Guid tableSessionId)
    {
        return await _orderGenericService
            .FilterByExpressionLinq(order => order.TableId == tableId && order.TableSessionId == tableSessionId)
            .Include(order => order.ProductList)
            .ThenInclude(item => item.Product)
            .ToListAsync();
    }

    public async Task UpdateOrderStatus(Guid orderId, OrderStatus newStatus)
    {
        Order? order = await _orderGenericService.GetByIdAsync(orderId);

        if (order is null) throw new InvalidOperationException("Order not found.");

        order.Status = newStatus;

        await _orderGenericService.UpdateAsync(order);
    }

    public async Task MarkOrderAsPaid(Guid orderId)
    {
        Order? order = await _orderGenericService.GetByIdAsync(orderId);

        if (order is null) throw new InvalidOperationException("Order not found.");

        order.IsPaid = true;

        await _orderGenericService.UpdateAsync(order);
    }

    public async Task DeleteOrder(Guid orderId)
    {
        Order? order = await _orderGenericService.GetByIdAsync(orderId);

        if (order is null) throw new InvalidOperationException("Order not found.");
                
        if (!order.IsPaid)
            throw new InvalidOperationException("Cannot delete a not paid order.");

        try
        {
            await _orderGenericService.DeleteAsync(order);
        }
        catch (Exception ex)
        {
            throw new InvalidOperationException($"Error deleting order {orderId}: {ex.Message}");
        }
    }

    public async Task<IEnumerable<Order>> GetOrdersByStatus(OrderStatus status)
    {
        return await _orderGenericService
                        .FilterByExpressionLinq(order => order.Status == status)
                        .Include(order => order.ProductList)
                        .ThenInclude(item => item.Product)
                        .ToListAsync();
    }

}
