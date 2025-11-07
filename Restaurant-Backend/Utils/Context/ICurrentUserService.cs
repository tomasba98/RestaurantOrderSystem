namespace Restaurant_Backend.Utils.Context;

public interface ICurrentUserService
{
    string? UserName { get; }
    Guid? UserId { get; }
}

