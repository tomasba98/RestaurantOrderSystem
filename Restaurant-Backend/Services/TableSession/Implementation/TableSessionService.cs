using Restaurant_Backend.Services.DataAccessLayer;

namespace Restaurant_Backend.Services.TableSession.Implementation;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Restaurant_Backend.Entities;

public class TableSessionService : ITableSessionService
{
    private readonly IGenericService<TableSession> _sessionGenericService;

    public TableSessionService (IGenericService<TableSession> tableGenericService)
    {
        _sessionGenericService = tableGenericService;
    }

    public async Task<TableSession?> GetSessionByIdAsync(Guid sessionId)
    {
        return await _sessionGenericService.GetByIdAsync(sessionId);
    }

    public async Task<TableSession?> GetActiveSessionByTableIdAsync(Guid tableId)
    {
        return await _sessionGenericService
                .FilterByExpressionLinq(session => session.TableId == tableId && session.IsActive == true)
                .Include(tableSession => tableSession.Table)
                .FirstOrDefaultAsync();
    }
    public async Task<TableSession> StartSessionAsync(TableSession tableSession)
    {
        await _sessionGenericService.InsertAsync(tableSession);
        return tableSession;
    }
    public async Task CloseSessionAsync(Guid tableSessionId)
    {
        TableSession session = await _sessionGenericService.GetByIdAsync(tableSessionId) ?? throw new InvalidOperationException("TableSession not found.");
        session.IsActive = false;
        session.EndTime = DateTime.UtcNow;
        await _sessionGenericService.UpdateAsync(session);
    }
    public async Task<bool> HasActiveSessionAsync(Guid tableId)
    {
        return await _sessionGenericService
            .FilterByExpressionLinq(session => session.TableId == tableId && session.EndTime == null)
            .AnyAsync();
    }

    public async Task<IEnumerable<TableSession>> GetSessionsByTableIdAsync(Guid tableId)
    {
        return await _sessionGenericService
                .FilterByExpressionLinq(session => session.TableId == tableId)
                .OrderByDescending(session => session.CreatedAt)
                .ToListAsync();
    }

    public async Task<IEnumerable<TableSession>> GetAllActiveSessionsAsync()
    {
        return await _sessionGenericService
            .FilterByExpressionLinq(session => session.EndTime == null)
            .ToListAsync();
    }
}
