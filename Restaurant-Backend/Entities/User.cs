using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Restaurant_Backend.Entities;

/// <summary>
/// Represents a user entity.
/// </summary>
[Table("Users")]
public class User : EntityBase
{    
    [Required]
    public string UserName { get; set; } = null!;
    
    [Required]
    public string Password { get; set; } = null!;
    
    [Required]
    public string Name { get; set; } = null!;
}
