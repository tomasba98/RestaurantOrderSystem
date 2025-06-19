
namespace Restaurant_Backend.Services.User.Implementation;

using Restaurant_Backend.Services.DataAccessLayer;
using Restaurant_Backend.Entities;
using Microsoft.EntityFrameworkCore;

public class UserService : IUserService
{
    private readonly IGenericService<User> _userGenericService;

    public UserService(IGenericService<User> userGenericService)
    {
        _userGenericService = userGenericService;
    }

    public async Task<bool> CreateUserAsync(User userEntity)
    {
        try
        {
            await _userGenericService.InsertAsync(userEntity);
            return true;
        }
        catch
        {
            return false;
        }
    }

    public async Task<User?> GetUserByNameAsync(string userName)
    {
        return await _userGenericService.FilterByExpressionLinq(user => user.UserName == userName).FirstOrDefaultAsync();
    }

    public async Task<bool> CheckIfUsernameExistsAsync(string userName)
    {
        return await _userGenericService.FilterByExpressionLinq(user => user.UserName == userName).AnyAsync();
    }

    public async Task<User?> GetUserByIdAsync(Guid userId) 
    { 
        return await _userGenericService.GetByIdAsync(userId);
    }

    public async Task<User> UpdateUserAsync(User user)
    {
        await _userGenericService.UpdateAsync(user);
        return user;
    }

}
