using Restaurant_Backend.Entities;

namespace Restaurant_Backend.Models.Authentication;

public class UserResponse
{    public string UserName { get; set; } = null!;
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public bool IsActive { get; set; }
    public DateTime? LastLogin { get; set; }
    public Roles Role { get; set; }
}
