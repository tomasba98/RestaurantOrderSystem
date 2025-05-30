
namespace Restaurant_Backend.Services.Order.Implementation;

using Microsoft.EntityFrameworkCore;
using Restaurant_Backend.Entities;
using Restaurant_Backend.Services.DataAccessLayer;
using Restaurant_Backend.Utils;

public class OrderService : IOrderService
{
    private readonly IGenericService<Order> _orderGenericService;
    public OrderService(IGenericService<Order> orederGenericService)
    {
        _orderGenericService = orederGenericService;
    }
    public async Task<Order> CreateOrderAsync(Order order)
    {
        order.TotalAmountHistory = order.TotalAmount;
        await _orderGenericService.InsertAsync(order);
        return order;
    }

    public async Task<Order> UpdateOrderAsync(Order order)
    {
        var existingOrder = await _orderGenericService.GetByIdAsync(order.Id) ?? throw new OrderNotFoundException(order.Id);
        
        await _orderGenericService.UpdateAsync(order);
        return order;
    }

    public async Task<Order?> GetOrderByIdAsync(Guid orderId)
    {
        return await _orderGenericService
            .FilterByExpressionLinq(order => order.Id == orderId)
            .Include(order => order.ProductList)
            .ThenInclude(item => item.Product)
            .FirstOrDefaultAsync();
    }

    public async Task<IEnumerable<Order>> GetTableOrdersAsync(Guid tableId)
    {
        return await _orderGenericService
            .FilterByExpressionLinq(order => order.TableId == tableId )
            .Include(order => order.ProductList)
            .ThenInclude(item => item.Product)
            .ToListAsync();
    }

    public async Task<IEnumerable<Order>> GetSessionOrdersAsync(Guid tableSessionId)
    {
        return await _orderGenericService
            .FilterByExpressionLinq(order => order.TableSessionId == tableSessionId)
            .Include(order => order.ProductList)
            .ThenInclude(item => item.Product)
            .ToListAsync();
    }

    public async Task UpdateOrderStatusAsync(Guid orderId, OrderStatus newStatus)
    {
        Order? order = await _orderGenericService.GetByIdAsync(orderId) ?? throw new OrderNotFoundException(orderId);
        order.Status = newStatus;

        await _orderGenericService.UpdateAsync(order);
    }

    public async Task MarkOrderAsPaidAsync(Guid orderId)
    {
        Order? order = await _orderGenericService.GetByIdAsync(orderId) ?? throw new OrderNotFoundException(orderId);
        order.IsPaid = true;

        await _orderGenericService.UpdateAsync(order);
    }

    public async Task DeleteOrderAsync(Guid orderId)
    {
        Order? order = await _orderGenericService.GetByIdAsync(orderId) ?? throw new OrderNotFoundException(orderId);
        if (!order.IsPaid) throw new OrderNotPaidException(orderId);
       
        await _orderGenericService.DeleteAsync(order);           
    }

    public async Task<IEnumerable<Order>> GetOrdersByStatusAsync(OrderStatus status)
    {
        return await _orderGenericService
                        .FilterByExpressionLinq(order => order.Status == status)
                        .Include(order => order.ProductList)
                        .ThenInclude(item => item.Product)
                        .ToListAsync();
    }

}
