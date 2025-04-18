using Restaurant_Backend.Services.DataAccessLayer;
using Microsoft.EntityFrameworkCore;

namespace Restaurant_Backend.Services.Table.Implementation;

using Restaurant_Backend.Entities;
public class TableService : ITableService
{
    private readonly IGenericService<Table> _tableGenericService;
    public TableService(IGenericService<Table> tableGenericService)
    {
        _tableGenericService = tableGenericService;
    }
    public Table CreateTable(Table table)
    {
        _tableGenericService.InsertAsync(table);
        return table;
    }
    public async Task<Table?> GetTableById(Guid tableId)
    {
        return await _tableGenericService.GetByIdAsync(tableId);
    }

    public Task<IEnumerable<Table>> GetAllTables()
    {
        return _tableGenericService.FindAllAsync();
    }

    public Task UpdateTable(Table table)
    {
        return _tableGenericService.UpdateAsync(table);
    }                 
    public Task DeleteTable(Table table)
    {
        return _tableGenericService.DeleteAsync(table);
    }                
    public async Task<bool> IsTableAvailable(Guid tableId)
    {
        return await _tableGenericService
            .FilterByExpressionLinq(table => table.IsOccupied == false)
            .AnyAsync();
    }

    public async Task<IEnumerable<Table>> GetAvailableTablesAsync()
    {
        return await _tableGenericService
            .FilterByExpressionLinq(table => table.IsOccupied == false)
            .ToListAsync();
    }

}
