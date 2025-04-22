namespace Restaurant_Backend.Entities;

/// <summary>
/// Represents a base entity.
/// </summary>
public abstract class EntityBase
{    
    public Guid Id { get; set; }

    public DateTime CreatedAt { get; private set; } = DateTime.UtcNow;
}
