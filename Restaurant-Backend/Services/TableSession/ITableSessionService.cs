namespace Restaurant_Backend.Services.TableSession;
using Restaurant_Backend.Entities;

public interface ITableSessionService
{
    Task<TableSession?> GetActiveSessionByTableIdAsync(Guid tableId);
    Task<TableSession> StartSessionAsync(TableSession tableSession);
    Task CloseSessionAsync(Guid tableSessionId);
    Task<bool> HasActiveSessionAsync(Guid tableId);
    Task<IEnumerable<TableSession>> GetSessionsByTableIdAsync(Guid tableId);
    Task<IEnumerable<TableSession>> GetAllActiveSessionsAsync();
}
