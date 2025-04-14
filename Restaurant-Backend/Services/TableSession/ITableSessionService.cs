
namespace Restaurant_Backend.Services.TableSession;
using Restaurant_Backend.Entities;

public interface ITableSessionService
{
    TableSession StartSession(TableSession tableSession);
    Task CloseSession(Guid tableSessionId);
    Task<bool> HasActiveSession(Guid tableId);
    Task<IEnumerable<TableSession>> GetSessionsByTableId(Guid tableId);
    Task<IEnumerable<TableSession>> GetAllActiveSessions();
}
