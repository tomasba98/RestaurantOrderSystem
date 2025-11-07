namespace Restaurant_Backend.Entities;

/// <summary>
/// Represents a base entity.
/// </summary>
public abstract class EntityBase
{    
    public Guid Id { get; set; }

    public DateTime CreatedAt { get; private set; } = DateTime.UtcNow;

    public DateTime? UpdatedAt { get; private set; }    

    public string? CreatedBy { get; private set; }

    public string? UpdatedBy { get; private set; }

    public void SetCreated(string userName)

    {
        CreatedBy = userName;
        CreatedAt = DateTime.UtcNow;
    }

    public void SetUpdated(string userName)
    {
        UpdatedBy = userName;
        UpdatedAt = DateTime.UtcNow;
    }
}
