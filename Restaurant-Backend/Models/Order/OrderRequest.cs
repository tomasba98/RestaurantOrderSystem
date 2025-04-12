namespace Restaurant_Backend.Models.Order;

using Restaurant_Backend.Models.OrderDetail;
public class OrderRequest
{
    public Guid TableId { get; set; } 

    public List<OrderDetailRequest> Items { get; set; } 
}
