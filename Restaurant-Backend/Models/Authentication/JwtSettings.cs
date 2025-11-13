namespace Restaurant_Backend.Models.Authentication;

public class JwtSettings
{
    public string Issuer { get; set; } = "RestaurantSystem";
    public string Key { get; set; } = string.Empty;
    public int ExpiryHours { get; set; } = 3;
}
