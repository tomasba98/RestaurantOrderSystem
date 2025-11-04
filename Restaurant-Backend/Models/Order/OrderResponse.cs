using Restaurant_Backend.Entities;
using Restaurant_Backend.Models.OrderDetail;

namespace Restaurant_Backend.Models.Order;

public class OrderResponse
{
    public Guid Id { get; set; }                 
    public Guid TableId { get; set; }            
    public DateTime CreatedAt { get; set; }             
    public OrderStatus Status { get; set; }      
    public List<OrderDetailResponse> ProductList { get; set; } = [];

    public decimal TotalAmount { get; set; }
}
