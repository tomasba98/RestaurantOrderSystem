using System.ComponentModel.DataAnnotations.Schema;

namespace Restaurant_Backend.Entities;

[Table("AuditLogs")]
public class AuditLog
{
    public Guid Id { get; set; }
    public string UserName { get; set; } = "System";
    public string Action { get; set; } = string.Empty; 
    public string EntityName { get; set; } = string.Empty;
    public Guid? EntityId { get; set; }
    public string? OldValues { get; set; }
    public string? NewValues { get; set; }
    public DateTime Timestamp { get; set; } = DateTime.UtcNow;
}
