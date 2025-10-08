namespace Restaurant_Backend.Models.Table;

public class TableResponse
{
    public Guid Id { get; set; }
    public int Number { get; set; } 
    public int x { get; set; }
    public int y { get; set; }
    public bool IsOccupied { get; set; }
}
