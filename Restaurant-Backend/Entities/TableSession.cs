namespace Restaurant_Backend.Entities;

public class TableSession : EntityBase
{
    public Guid TableId { get; set; }
    public Table Table { get; set; }
    public DateTime StartedAt { get; set; }
    public DateTime? EndedAt { get; set; }
    public List<Order> Orders { get; set; } = new();
}
