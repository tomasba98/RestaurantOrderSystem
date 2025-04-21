using Restaurant_Backend.Services.DataAccessLayer;

namespace Restaurant_Backend.Services.TableSession.Implementation;

using Microsoft.EntityFrameworkCore;
using Restaurant_Backend.Entities;

public class TableSessionService : ITableSessionService
{
    private readonly IGenericService<TableSession> _tableGenericService;

    public TableSessionService (IGenericService<TableSession> tableGenericService)
    {
        _tableGenericService = tableGenericService;
    }
    public TableSession StartSession(TableSession tableSession)
    {
        tableSession.StartTime = DateTime.UtcNow;
        _tableGenericService.InsertAsync(tableSession);
        return tableSession;
    }
    public async Task CloseSession(Guid tableSessionId)
    {
        TableSession session = await _tableGenericService.GetByIdAsync(tableSessionId) ?? throw new InvalidOperationException("TableSession not found.");
        session.EndTime = DateTime.UtcNow;
        await _tableGenericService.UpdateAsync(session);
    }
    public async Task<bool> HasActiveSession(Guid tableId)
    {
        return await _tableGenericService
            .FilterByExpressionLinq(s => s.TableId == tableId && s.EndTime == null)
            .AnyAsync();
    }

    public async Task<IEnumerable<TableSession>> GetSessionsByTableId(Guid tableId)
    {
        return await _tableGenericService
                .FilterByExpressionLinq(session => session.TableId == tableId)
                .OrderByDescending(session => session.StartTime)
                .ToListAsync();
    }

    public async Task<IEnumerable<TableSession>> GetAllActiveSessions()
    {
        return await _tableGenericService
            .FilterByExpressionLinq(session => session.EndTime == null)
            .ToListAsync();
    }
}
