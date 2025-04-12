using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Restaurant_Backend.Entities;

/// <summary>
/// Represents a user entity.
/// </summary>
[Table("Users")]
public class User : EntityBase
{
    /// <summary>
    /// Gets or sets the username of the user.
    /// </summary>
    [Required]
    public string UserName { get; set; } = null!;

    /// <summary>
    /// Gets or sets the password of the user.
    /// </summary>
    [Required]
    public string Password { get; set; } = null!;

    /// <summary>
    /// Gets or sets the name of the user.
    /// </summary>
    [Required]
    public string Name { get; set; } = null!;
}
