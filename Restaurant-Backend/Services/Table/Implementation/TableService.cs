using Restaurant_Backend.Services.DataAccessLayer;
using Microsoft.EntityFrameworkCore;

namespace Restaurant_Backend.Services.Table.Implementation;

using Microsoft.Extensions.Caching.Memory;
using Restaurant_Backend.Entities;
public class TableService : ITableService
{
    private readonly IGenericService<Table> _tableGenericService;
    private readonly IMemoryCache _cache;

    private const string CacheKey = "all_tables";
    public TableService(IGenericService<Table> tableGenericService, IMemoryCache cache)
    {
        _tableGenericService = tableGenericService;
        _cache = cache;
    }
    public async Task<IEnumerable<Table>> GetAllTablesAsync()
    {
        var tables = await _cache.GetOrCreateAsync("all_tables", async entry =>
        {
            entry.SlidingExpiration = TimeSpan.FromMinutes(10);
            return await _tableGenericService.FindAllAsyncReadOnly();
        });

        return tables ?? [];
    }
    public async Task<Table> CreateTableAsync(Table table)
    {
        await _tableGenericService.InsertAsync(table);
        _cache.Remove(CacheKey);
        return table;
    }
    public async Task<Table?> GetTableByIdAsync(Guid tableId)
    {
        return await _tableGenericService.GetByIdAsync(tableId);
    }


    public async Task<Table> UpdateTableAsync(Table table)
    {
        await _tableGenericService.UpdateAsync(table);
        _cache.Remove(CacheKey);
        return table;
    }                 
    public async Task DeleteTableAsync(Guid tableId)
    {
        Table table = await _tableGenericService.GetByIdAsync(tableId) ?? throw new InvalidOperationException("Product not found.");
        _cache.Remove(CacheKey);
        await _tableGenericService.DeleteAsync(table);
    }                
    public async Task<bool> IsTableAvailableAsync(Guid tableId)
    {
        return await _tableGenericService
            .FilterByExpressionLinq(table => table.IsOccupied == false)
            .AsNoTracking()
            .AnyAsync();
    }

    public async Task<IEnumerable<Table>> GetAvailableTablesAsync()
    {
        return await _tableGenericService
            .FilterByExpressionLinq(table => table.IsOccupied == false)
            .AsNoTracking()
            .ToListAsync();
    }

}
