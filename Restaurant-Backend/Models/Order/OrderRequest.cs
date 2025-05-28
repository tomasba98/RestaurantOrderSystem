namespace Restaurant_Backend.Models.Order;

using Restaurant_Backend.Models.OrderDetail;
public class OrderRequest
{
    public Guid TableId { get; set; }
    public List<OrderDetailItem> Items { get; set; } = new();
}
