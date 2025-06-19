using Restaurant_Backend.Entities;

namespace Restaurant_Backend.Models.Authentication;

public class RegisterUserRequest
{
    public required string UserName { get; set; }

    public required string Password { get; set; }

    public required string FirstName { get; set; } 

    public required string LastName { get; set; }

    public string Email { get; set; } = string.Empty;

    public Roles Role { get; set; }
}
