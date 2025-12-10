
namespace Restaurant_Backend.Services.User.Implementation;

using Restaurant_Backend.Services.DataAccessLayer;
using Restaurant_Backend.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using Serilog;

public class UserService : IUserService
{
    private readonly IGenericService<User> _userGenericService;
    private readonly IMemoryCache _cache;
    private const string CacheKey = "all_users";

    public UserService(IGenericService<User> userGenericService, IMemoryCache cache)
    {
        _userGenericService = userGenericService;
        _cache = cache;
    }

    public async Task<IEnumerable<User>> GetAllUserAsync()
    {
        try
        {
            var users = await _cache.GetOrCreateAsync(CacheKey, async entry =>
            {
                entry.SlidingExpiration = TimeSpan.FromMinutes(10);
                return await _userGenericService.FindAllAsyncReadOnly();
            });

            if (users == null)
            {
                Log.Warning("User list retrieval returned null for key '{CacheKey}'.", CacheKey);
                return [];
            }

            return users;
        }
        catch (Exception ex)
        {
            Log.Error(ex, "An error occurred while retrieving all users (Key: {CacheKey}).", CacheKey);
            throw; 
        }
    }
    public async Task DeleteUserAsync(Guid userId)
    {
        User? user = await _userGenericService.GetByIdAsync(userId) ?? throw new InvalidOperationException("User not found.");
        _cache.Remove(CacheKey);
        await _userGenericService.DeleteAsync(user);
    }
    public async Task<bool> CreateUserAsync(User userEntity)
    {
        try
        {
            await _userGenericService.InsertAsync(userEntity);
            _cache.Remove(CacheKey);
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
        _cache.Remove(CacheKey);
        return user;
    }

}
