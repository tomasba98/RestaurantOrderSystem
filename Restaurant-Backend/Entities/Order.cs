namespace Restaurant_Backend.Entities;

public class Order : EntityBase
{
    public Guid TableId { get; set; }
    public Table Table { get; set; }
    public DateTime CreatedAt { get; set; }
    public bool IsPaid { get; set; }
    public List<OrderDetail> Items { get; set; }
}
