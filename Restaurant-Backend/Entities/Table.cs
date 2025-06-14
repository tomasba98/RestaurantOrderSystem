using System.ComponentModel.DataAnnotations.Schema;

namespace Restaurant_Backend.Entities;

/// <summary>
/// Represents a tables of the restaurant.
/// </summary>
[Table("Tables")]
public class Table : EntityBase
{
    public int Number { get; set; } 
    public bool IsOccupied { get; set; }
}
