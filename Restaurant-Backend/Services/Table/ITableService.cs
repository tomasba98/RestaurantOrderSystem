namespace Restaurant_Backend.Services.Table;

using Restaurant_Backend.Entities;
public interface ITableService
{
    Task<Table> CreateTableAsync(Table product);

    Task<Table?> GetTableByIdAsync(Guid productId);

    Task<IEnumerable<Table>> GetAllTablesAsync();

    Task UpdateTableAsync(Table table);       
    
    Task DeleteTableAsync(Table table);         
    
    Task<bool> IsTableAvailableAsync(Guid tableId);

    Task<IEnumerable<Table>> GetAvailableTablesAsync();
}