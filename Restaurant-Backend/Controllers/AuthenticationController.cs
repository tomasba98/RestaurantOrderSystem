using Restaurant_Backend.Entities;
using Restaurant_Backend.Models.Authentication;
using Restaurant_Backend.Services.Authentication;
using Restaurant_Backend.Services.User;
using Restaurant_Backend.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;

namespace Restaurant_Backend.Controllers;


[Route("api/auth")]
[ApiController]
[AllowAnonymous]
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

    [Authorize(Roles = "Admin,Manager")]
    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterUserRequest userRequest)
    {
        if (await _userService.CheckIfUsernameExistsAsync(userRequest.UserName))
        {
            return BadRequest("Username already in use.");
        }

        string hashPassword = Encrypt.Hash(userRequest.Password);

        var newUser = _mapper.Map<User>(userRequest);
        newUser.Password = hashPassword;

        bool result = await _userService.CreateUserAsync(newUser);

        return result ? Ok() : BadRequest("Something went wrong.");
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

        if (user is null) return NotFound();

        return Ok(new
        {
            user.FirstName,
            user.Role
        });
    }


    [AllowAnonymous]
    [HttpPost("login")]
    public async Task<IActionResult> Login(AccessRequest request)
    {
        User? user = await _userService.GetUserByNameAsync(request.UserName);

        if (user is null) return BadRequest("Invalid credentials.");        

        if (!Encrypt.CheckHash(request.Password, user.Password)) return BadRequest("Invalid credentials.");        

        AuthenticationResponse response = _authenticationService.GenerateJwt(user);

        return Ok(response);
    }

    [Authorize(Roles = "Admin,Manager")]
    [HttpPatch("{id}")]
    public async Task<IActionResult> UpdateUser(Guid id, [FromBody] UpdateUserRequest request)
    {
        var user = await _userService.GetUserByIdAsync(id);
        if (user == null) return NotFound();


        user.FirstName = request.FirstName ?? user.FirstName;
        user.LastName = request.LastName ?? user.LastName;
        user.Email = request.Email ?? user.Email;
        user.Role = request.Role ?? user.Role;

        await _userService.UpdateUserAsync(user);

        return Ok();
    }

}

