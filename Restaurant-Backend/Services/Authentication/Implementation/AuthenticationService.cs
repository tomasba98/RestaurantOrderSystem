namespace Restaurant_Backend.Services.Authentication.Implementation;

using Restaurant_Backend.Entities;
using Restaurant_Backend.Models.Authentication;
using Restaurant_Backend.Utils.Encrypt;

public class AuthenticationService : IAuthenticationService
{
    public AuthenticationService()
    {

    }

    public AuthenticationResponse GenerateJwt(User user)
    {
        string token = Encrypt.GenerateToken(user);

        return new AuthenticationResponse(user.UserName, token);
    }

}
