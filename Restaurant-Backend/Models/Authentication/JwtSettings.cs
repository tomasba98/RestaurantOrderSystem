namespace Restaurant_Backend.Models.Authentication;

public class JwtSettings
{
    public string Issuer { get; set; } = string.Empty;
    public string SecretKey { get; set; } = string.Empty;
}
