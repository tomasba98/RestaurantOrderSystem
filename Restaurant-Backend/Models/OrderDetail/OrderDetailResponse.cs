namespace Restaurant_Backend.Models.OrderDetail;

public class OrderDetailResponse
{
    public Guid ProductId { get; set; }
    public string ProductName { get; set; } = string.Empty;
    public decimal UnitPrice { get; set; }
    public int Quantity { get; set; }
    public Guid TableSessionId { get; set; }
}
