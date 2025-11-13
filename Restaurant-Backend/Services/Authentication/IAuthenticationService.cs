using Restaurant_Backend.Models.Authentication;

namespace Restaurant_Backend.Services.Authentication;

using Restaurant_Backend.Entities;

/// <summary>
/// Defines the contract for an authentication service that generates JWT tokens.
/// </summary>
public interface IAuthenticationService
{
    /// <summary>
    /// Generates a JWT token containing the user's claims and role information.
    /// </summary>
    /// <param name="user">The user entity for whom the token will be generated.</param>
    /// <returns>A signed JWT token as a string.</returns>
    string GenerateToken(User user);

    /// <summary>
    /// Generates a secure hash of the specified value using the BCrypt algorithm.
    /// </summary>
    /// <param name="value">The plain text value to hash.</param>
    /// <returns>The generated BCrypt hash string.</returns>
    string Hash(string value);

    /// <summary>
    /// Verifies whether a plain text value matches a given BCrypt hash.
    /// </summary>
    /// <param name="plain">The plain text value to verify.</param>
    /// <param name="hashed">The stored BCrypt hash to compare against.</param>
    /// <returns><c>true</c> if the plain text value matches the hash; otherwise, <c>false</c>.</returns>
    bool CheckHash(string plain, string hashed);
}