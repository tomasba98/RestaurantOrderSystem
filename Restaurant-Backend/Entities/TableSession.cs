namespace Restaurant_Backend.Entities;

public class TableSession : EntityBase
{
    public Guid TableId { get; set; }
    public Table Table { get; set; }
    public DateTime StartTime { get; set; } = DateTime.UtcNow;
    public DateTime? EndTime { get; set; }
    public List<Order> Orders { get; set; } = new();
}
