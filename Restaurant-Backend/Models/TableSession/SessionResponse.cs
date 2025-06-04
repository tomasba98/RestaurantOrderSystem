using Restaurant_Backend.Models.Order;

namespace Restaurant_Backend.Models.TableSession;

public class SessionResponse
{
    public Guid TableId { get; set; }
    public bool IsActive { get; set; }
    public DateTime? EndTime { get; set; }
    public List<OrderResponse> Orders { get; set; } = [];
}
