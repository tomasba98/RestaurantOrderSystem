using Restaurant_Backend.Services.User;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Restaurant_Backend.Controllers;

public abstract class BaseController : ControllerBase
{
    protected readonly IHttpContextAccessor _httpContextAccessor;
    protected readonly IUserService _userService;

    protected BaseController(IHttpContextAccessor httpContextAccessor, IUserService userService)
    {
        _httpContextAccessor = httpContextAccessor;
        _userService = userService;
    }

    protected Guid? GetUserIdFromToken()
    {
        Claim? userIdClaim = _httpContextAccessor.HttpContext?.User.FindFirst("UserId");
        if (userIdClaim is null || !Guid.TryParse(userIdClaim.Value, out Guid userId))
        {
            return null;
        }
        return userId;
    }

    protected async Task<bool> ValidateUserId(Guid? userId)
    {
        if (userId is null || await  _userService.GetUserByIdAsync(userId.Value) is null)
        {
            return false;
        }
        return true;
    }
}