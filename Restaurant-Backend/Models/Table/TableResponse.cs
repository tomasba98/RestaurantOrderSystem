namespace Restaurant_Backend.Models.Table;

public class TableResponse
{
    public Guid Id { get; set; }
    public int Number { get; set; } 
    public bool IsOccupied { get; set; }
}
