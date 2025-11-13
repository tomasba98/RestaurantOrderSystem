namespace Restaurant_Backend.Services.Authentication.Implementation;

using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Restaurant_Backend.Entities;
using Restaurant_Backend.Models.Authentication;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

public class AuthenticationService : IAuthenticationService
{
    private readonly JwtSettings _settings;
    public AuthenticationService(IOptions<JwtSettings> options)
    {
        _settings = options.Value;
    }

    public string GenerateToken(User user)
    {
        ArgumentNullException.ThrowIfNull(user);

        var keyBytes = Encoding.UTF8.GetBytes(_settings.Key);

        var signingCredentials = new SigningCredentials(
            new SymmetricSecurityKey(keyBytes),
            SecurityAlgorithms.HmacSha256
        );

        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Name, user.UserName),
            new Claim("UserId", user.Id.ToString()),
            new Claim(ClaimTypes.Role, user.Role.ToString())
        };

        var token = new JwtSecurityToken(
            issuer: _settings.Issuer,
            expires: DateTime.UtcNow.AddHours(_settings.ExpiryHours),
            claims: claims,
            signingCredentials: signingCredentials
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    public string Hash(string value) => BCrypt.Net.BCrypt.HashPassword(value);

    public bool CheckHash(string plain, string hashed) =>
        BCrypt.Net.BCrypt.Verify(plain, hashed);

}
