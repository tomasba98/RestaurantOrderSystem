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
    public async Task<Table> CreateTableAsync(Table table)
    {
        await _tableGenericService.InsertAsync(table);
        return table;
    }
    public async Task<Table?> GetTableByIdAsync(Guid tableId)
    {
        return await _tableGenericService.GetByIdAsync(tableId);
    }

    public async Task<IEnumerable<Table>> GetAllTablesAsync()
    {
        return await _tableGenericService.FindAllAsync();
    }

    public async Task UpdateTableAsync(Table table)
    {
        await _tableGenericService.UpdateAsync(table);
    }                 
    public async Task DeleteTableAsync(Table table)
    {
        await _tableGenericService.DeleteAsync(table);
    }                
    public async Task<bool> IsTableAvailableAsync(Guid tableId)
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
