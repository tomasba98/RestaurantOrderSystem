using Restaurant_Backend.Entities;
using Restaurant_Backend.Models.Authentication;
using Restaurant_Backend.Services.Authentication;
using Restaurant_Backend.Services.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using Serilog;

namespace Restaurant_Backend.Controllers;


[Route("api/auth")]
[ApiController]
[AllowAnonymous]
[Authorize]
public class AuthenticationController : BaseController
{
    private readonly IAuthenticationService _authenticationService;
    private readonly IMapper _mapper;


    public AuthenticationController(IAuthenticationService authenticationService, IMapper mapper, IUserService userService, IHttpContextAccessor httpContextAccessor)
        : base(httpContextAccessor, userService)
    {
        _authenticationService = authenticationService;
        _mapper = mapper;
    }

    [AllowAnonymous]
    [HttpPost("login")]
    public async Task<IActionResult> Login(AccessRequest request)
    {
        User? user = await _userService.GetUserByNameAsync(request.UserName);

        if (user is null)
        {
            Log.Warning("Failed login attempt for username: {UserName}", request.UserName);
            return BadRequest("Invalid credentials.");
        }

        if (!_authenticationService.CheckHash(request.Password, user.Password))
        {
            Log.Warning("Failed login attempt (wrong password) for username: {UserName}", request.UserName);
            return BadRequest("Invalid credentials.");
        }

        Log.Information("User {UserName} logged in successfully", user.UserName);

        string response = _authenticationService.GenerateToken(user);
        return Ok(new AuthenticationResponse(user.UserName, response));
    }

    //[Authorize(Roles = "Admin,Manager")] PUBLICO POR AHORA
    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterUserRequest userRequest)
    {
        if (await _userService.CheckIfUsernameExistsAsync(userRequest.UserName))
        {
            return BadRequest("Username already in use.");
        }

        string hashPassword = _authenticationService.Hash(userRequest.Password);
        var newUser = _mapper.Map<User>(userRequest);
        newUser.Password = hashPassword;

        bool result = await _userService.CreateUserAsync(newUser);

        if (!result)
        {
            Log.Error("Failed to create user {UserName}", userRequest.UserName);
            return BadRequest("Something went wrong.");
        }

        Log.Information("User registered: {UserName} ({Role})", newUser.UserName, newUser.Role);
        return Ok();
    }

    [HttpPost("verify")]
    public async Task<IActionResult> Verify()
    {
        Guid? userId = GetUserIdFromToken();

        if (userId is null || !await ValidateUserId(userId))
        {
            return BadRequest("Invalid user ID.");
        }

        return Ok();
    }


    [HttpGet("profile")]
    public async Task<IActionResult> GetProfile()
    {
        Guid? userId = GetUserIdFromToken();

        if (!await ValidateUserId(userId))
        {
            return BadRequest("Invalid user ID.");
        }
        if (userId is null)
        {
            return BadRequest("User ID is null.");
        }

        User? user = await _userService.GetUserByIdAsync((Guid)userId);

        if (user is null)
        {
            Log.Warning("User not found in profile: {UserId}", userId);
            return NotFound();
        }

        return Ok(new
        {
            user.Id,
            userName = user.FirstName,
            user.Role,
            user.CreatedAt
        });
    }



    [Authorize(Roles = "Admin,Manager")]
    [HttpPatch("{id}")]
    public async Task<IActionResult> UpdateUser(Guid id, [FromBody] UpdateUserRequest request)
    {
        var user = await _userService.GetUserByIdAsync(id);
        if (user == null)
        {
            Log.Warning("User not found while updating: {UserId}", id);
            return NotFound();
        }


        user.FirstName = request.FirstName ?? user.FirstName;
        user.LastName = request.LastName ?? user.LastName;
        user.Email = request.Email ?? user.Email;
        user.Role = request.Role ?? user.Role;

        await _userService.UpdateUserAsync(user);

        return Ok();
    }

}

