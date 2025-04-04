namespace Restaurant_Backend.Entities;

public class Product : EntityBase
{
    public string Name { get; set; }
    public decimal Price { get; set; }
    public string? Description { get; set; }
    public bool IsAvailable { get; set; }
}
