namespace Restaurant_Backend.Services.OrderDetail.Implementation;

using Microsoft.EntityFrameworkCore;
using Restaurant_Backend.Entities;
using Restaurant_Backend.Services.DataAccessLayer;

public class OrderDetailService : IOrderDetailService
{
    private readonly IGenericService<OrderDetail> orderDetailGenericService;
    public OrderDetailService(IGenericService<OrderDetail> orederGenericService)
    {
        orderDetailGenericService = orederGenericService;
    }
    public async Task<OrderDetail> CreateOrderDetailAsync(OrderDetail orderDetail)
    {
        await orderDetailGenericService.InsertAsync(orderDetail);
        return orderDetail;
    }

    public async Task<OrderDetail?> GetOrderDetailByIdAsync(Guid orderDetailId)
    {
        return await orderDetailGenericService.GetByIdAsync(orderDetailId);
    }

    public async Task<IEnumerable<OrderDetail>> GetAllOrdersDetailsFromOrderAsync(Guid orderId)
    {
        return await orderDetailGenericService
                    .FilterByExpressionLinq(orderDetail => orderDetail.OrderId == orderId)
                    .ToListAsync();
    }

    public async Task<IEnumerable<OrderDetail>> GetAllOrdersDetailsFromProductAsync(Guid productId)
    {
        return await orderDetailGenericService
                    .FilterByExpressionLinq(orderDetail => orderDetail.ProductId == productId)
                    .ToListAsync();
    }

    public async Task UpdateOrderDetailAsync(OrderDetail updatedDetail)
    {
        await orderDetailGenericService.UpdateAsync(updatedDetail);
    }

    public async Task DeleteOrderDetailAsync(Guid orderDetailId)
    {
        OrderDetail? orderDetail = await orderDetailGenericService.GetByIdAsync(orderDetailId) ?? throw new InvalidOperationException("Order not found.");

        try
        {
            await orderDetailGenericService.DeleteAsync(orderDetail);
        }
        catch (Exception ex)
        {
            throw new InvalidOperationException($"Error deleting order {orderDetailId}: {ex.Message}");
        }
    }
}
