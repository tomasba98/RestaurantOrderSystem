using System.ComponentModel.DataAnnotations.Schema;

namespace Restaurant_Backend.Entities;

/// <summary>
/// Represents a sessions/customers of each table from the restaurant.
/// </summary>
[Table("TableSessions")]
public class TableSession : EntityBase
{
    public Guid TableId { get; set; }
    public required Table Table { get; set; }
    public bool IsActive { get; set; }
    public DateTime? EndTime { get; set; }
    public List<Order> Orders { get; set; } = [];
}
