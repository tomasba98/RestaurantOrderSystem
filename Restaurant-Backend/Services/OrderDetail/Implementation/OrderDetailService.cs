namespace Restaurant_Backend.Services.OrderDetail.Implementation;

using Restaurant_Backend.Entities;
using Restaurant_Backend.Services.DataAccessLayer;

public class OrderDetailService : IOrderDetailService
{
    private readonly IGenericService<OrderDetail> orderDetailGenericService;
    public OrderDetailService(IGenericService<OrderDetail> orederGenericService)
    {
        orderDetailGenericService = orederGenericService;
    }
    public OrderDetail CreateOrderDetail(OrderDetail orderDetail)
    {
        orderDetailGenericService.InsertAsync(orderDetail);
        return orderDetail;
    }

    public async Task<OrderDetail?> GetOrderDetailById(Guid orderDetailId)
    {
        return await orderDetailGenericService.GetByIdAsync(orderDetailId);
    }

    public IEnumerable<OrderDetail> GetAllOrdersDetailsFromOrder(Guid orderId)
    {
        return orderDetailGenericService
            .FilterByExpressionLinq(orderDetail => orderDetail.OrderId == orderId)
            .ToList();
    }

    public IEnumerable<OrderDetail> GetAllOrdersDetailsFromProduct(Guid productId)
    {
        return orderDetailGenericService
            .FilterByExpressionLinq(orderDetail => orderDetail.ProductId == productId)
            .ToList();
    }

    public async Task UpdateOrderDetailAsync(OrderDetail updatedDetail)
    {
        await orderDetailGenericService.UpdateAsync(updatedDetail);
    }

    public async Task DeleteOrderDetailAsync(Guid orderDetailId)
    {
        OrderDetail? orderDetail = await orderDetailGenericService.GetByIdAsync(orderDetailId);

        if (orderDetail is null) throw new InvalidOperationException("Order not found.");
        
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
