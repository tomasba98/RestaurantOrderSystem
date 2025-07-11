﻿
namespace Restaurant_Backend.Services.User;
using Restaurant_Backend.Entities;

/// <summary>
/// Defines the contract for a service that manages user entities.
/// </summary>
public interface IUserService
{
    /// <summary>
    /// Creates a new user entity.
    /// </summary>
    /// <param name="userEntity">The user entity to be created.</param>
    /// <returns>True if the user was successfully created; otherwise, false.</returns>
    Task<bool> CreateUserAsync(User userEntity);

    /// <summary>
    /// Retrieves a user by their username.
    /// </summary>
    /// <param name="userName">The username of the user to retrieve.</param>
    /// <returns>The user entity if found; otherwise, null.</returns>
    Task<User?> GetUserByNameAsync(string userName);

    /// <summary>
    /// Retrieves a user by their unique identifier.
    /// </summary>
    /// <param name="userId">The identifier of the user to retrieve.</param>
    /// <returns>The user entity if found; otherwise, null.</returns>
    Task<User?> GetUserByIdAsync(Guid userId);

    /// <summary>
    /// Checks if a user with the specified username already exists in the system.
    /// </summary>
    /// <param name="userName">The username to check.</param>
    /// <returns>True if the username exists; otherwise, false.</returns>
    Task<bool> CheckIfUsernameExistsAsync(string userName);

    /// <summary>
    /// Updates an existing user's information.
    /// </summary>
    /// <param name="user">The user entity with updated data.</param>
    /// <returns>The updated user entity.</returns>
    Task<User> UpdateUserAsync(User user);

}

