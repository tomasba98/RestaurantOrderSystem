namespace Restaurant_Backend.Models.OrderDetail;

public class OrderDetailRequest
{
    public Guid ProductId { get; set; }
    public int Quantity { get; set; }
}
