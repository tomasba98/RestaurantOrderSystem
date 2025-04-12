namespace Restaurant_Backend.Models.Table;

public class TableResponse
{
    public Guid Id { get; set; }
    public string Number { get; set; } = string.Empty;
    public bool IsOccupied { get; set; }
}
