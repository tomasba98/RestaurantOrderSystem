using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Restaurant_Backend.Entities; // Asumiendo que aquí está la entidad User
using Restaurant_Backend.Models.Authentication; // O donde tengas tus DTOs de usuario
using Restaurant_Backend.Services.User;
using Serilog;

namespace Restaurant_Backend.Controllers;

[Route("api/[controller]")]
[ApiController]
public class UserController : BaseController
{
    private readonly IMapper _mapper;

    public UserController(IUserService userService, IMapper mapper, IHttpContextAccessor httpContextAccessor) : base(httpContextAccessor, userService)
    {
        _mapper = mapper;
    }

    /// <summary>
    /// Retrieves a list of all registered users.
    /// </summary>
    /// <returns>An IActionResult containing the list of users.</returns>
    [Authorize(Roles = "Admin,Manager")]
    [HttpGet]
    [ProducesResponseType(200)]
    public async Task<IActionResult> GetAllUsers()
    {
        var users = await _userService.GetAllUserAsync();
        var usersResponse = _mapper.Map<IEnumerable<UserResponse>>(users);

        return Ok(usersResponse);
    }

    /// <summary>
    /// Retrieves a specific user by their unique identifier.
    /// </summary>
    /// <param name="userId">The user's unique identifier.</param>
    /// <returns>An IActionResult containing the user details.</returns>
    [Authorize(Roles = "Admin,Manager")]
    [HttpGet("{userId:guid}")]
    [ProducesResponseType(200)]
    [ProducesResponseType(404)]
    public async Task<IActionResult> GetUserById(Guid userId)
    {
        try
        {
            var user = await _userService.GetUserByIdAsync(userId);

            if (user is null)
            {
                Log.Warning("User not found: {UserId}", userId);
                return NotFound($"User with ID {userId} not found.");
            }

            var userResponse = _mapper.Map<UserResponse>(user);
            return Ok(userResponse);
        }
        catch (Exception ex)
        {
            Log.Error(ex, "Error retrieving user: {UserId}", userId);
            return StatusCode(500, "An error occurred while retrieving the user.");
        }
    }

    /// <summary>
    /// Updates an existing user's data.
    /// </summary>
    /// <param name="userId">The identifier of the user to update.</param>
    /// <param name="userRequest">The updated user data.</param>
    /// <returns>An IActionResult with the updated user or an error message.</returns>
    [Authorize(Roles = "Admin")]
    [HttpPut("{userId:guid}")]
    [ProducesResponseType(200)]
    [ProducesResponseType(400)]
    [ProducesResponseType(404)]
    public async Task<IActionResult> UpdateUser(Guid userId, [FromBody] UpdateUserRequest userRequest)
    {
        try
        {
            var user = await _userService.GetUserByIdAsync(userId);
            if (user is null)
            {
                Log.Warning("User not found while updating: {UserId}", userId);
                return NotFound($"User with ID {userId} not found.");
            }

            
            user = _mapper.Map(userRequest, user); 

            var updatedUser = await _userService.UpdateUserAsync(user);
            var userResponse = _mapper.Map<UserResponse>(updatedUser);

            return Ok(userResponse);
        }
        catch (Exception ex)
        {
            Log.Error(ex, "Error updating user: {UserId}", userId);
            return StatusCode(500, $"Error updating user: {ex.Message}");
        }
    }

    /// <summary>
    /// Permanently deletes a user from the system.
    /// </summary>
    /// <param name="userId">The identifier of the user to delete.</param>
    /// <returns>No content.</returns>
    [Authorize(Roles = "Admin")]
    [HttpDelete("{userId:guid}")]
    [ProducesResponseType(204)]
    [ProducesResponseType(404)]
    public async Task<IActionResult> DeleteUser(Guid userId)
    {
        try
        {
            var user = await _userService.GetUserByIdAsync(userId);
            if (user is null)
            {
                Log.Warning("User not found while deleting: {UserId}", userId);
                return NotFound("User not found");
            }

            await _userService.DeleteUserAsync(userId);
            return NoContent();
        }
        catch (Exception ex)
        {
            Log.Error(ex, "Error deleting user: {UserId}", userId);
            return StatusCode(500, $"Error deleting user: {ex.Message}");
        }
    }
}