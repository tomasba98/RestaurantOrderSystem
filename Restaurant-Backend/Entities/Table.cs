namespace Restaurant_Backend.Entities;

public class Table : EntityBase
{
    public string Number { get; set; } = string.Empty;
    public bool IsOccupied { get; set; }
}
