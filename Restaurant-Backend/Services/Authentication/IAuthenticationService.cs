using Restaurant_Backend.Models.Authentication;

namespace Restaurant_Backend.Services.Authentication;

using Restaurant_Backend.Entities;

/// <summary>
/// Defines the contract for an authentication service that generates JWT tokens.
/// </summary>
public interface IAuthenticationService
{
    /// <summary>
    /// Generates a JWT token for the specified user.
    /// </summary>
    /// <param name="user">The user for whom the JWT token will be generated.</param>
    /// <returns>An AuthenticationResponse containing the generated JWT token.</returns>
    AuthenticationResponse GenerateJwt(User user);
}