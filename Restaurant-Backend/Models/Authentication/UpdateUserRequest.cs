using Restaurant_Backend.Entities;

namespace Restaurant_Backend.Models.Authentication;

public class UpdateUserRequest
{
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string? Email { get; set; }
    public Roles? Role { get; set; } 
    public bool IsActive { get; set; }
}
