namespace Restaurant_Backend.Services.OrderDetail;

using Restaurant_Backend.Entities;
public interface IOrderDetailService
{
    Task<OrderDetail> CreateOrderDetailAsync(OrderDetail orderDetail);

    Task<OrderDetail?> GetOrderDetailByIdAsync(Guid orderDetailId);

    Task<IEnumerable<OrderDetail>> GetAllOrdersDetailsFromOrderAsync(Guid orderId);

    Task<IEnumerable<OrderDetail>> GetAllOrdersDetailsFromProductAsync(Guid productId);

    Task UpdateOrderDetailAsync(OrderDetail updatedDetail);

    Task DeleteOrderDetailAsync(Guid orderDetailId);
}
