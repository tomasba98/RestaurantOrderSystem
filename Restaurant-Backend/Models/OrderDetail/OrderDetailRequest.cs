namespace Restaurant_Backend.Models.OrderDetail;

public class OrderDetailRequest
{
    public List<OrderDetailItem> ProductItems { get; set; } = new();
}

public class OrderDetailItem
{
    public Guid ProductId { get; set; }
    public int Quantity { get; set; }
}
