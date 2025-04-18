namespace Restaurant_Backend.Services.OrderDetail;

using Restaurant_Backend.Entities;
public interface IOrderDetailService
{
    OrderDetail CreateOrderDetail(OrderDetail orderDetail);

    Task<OrderDetail?> GetOrderDetailById(Guid orderDetailId);

    IEnumerable<OrderDetail> GetAllOrdersDetailsFromOrder(Guid orderId);

    IEnumerable<OrderDetail> GetAllOrdersDetailsFromProduct(Guid productId);

    Task UpdateOrderDetailAsync(OrderDetail updatedDetail);

    Task DeleteOrderDetailAsync(Guid orderDetailId);
}
