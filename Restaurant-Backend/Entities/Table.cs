using System.ComponentModel.DataAnnotations.Schema;

namespace Restaurant_Backend.Entities;

/// <summary>
/// Represents a tables of the restaurant.
/// </summary>
[Table("Tables")]
public class Table : EntityBase
{
    public string Number { get; set; } = string.Empty;
    public bool IsOccupied { get; set; }
}
