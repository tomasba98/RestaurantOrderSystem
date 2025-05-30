namespace Restaurant_Backend.Services.Table;

using Restaurant_Backend.Entities;
public interface ITableService
{
    Task<Table> CreateTableAsync(Table table);

    Task<Table?> GetTableByIdAsync(Guid tableId);

    Task<IEnumerable<Table>> GetAllTablesAsync();

    Task<Table> UpdateTableAsync(Table table);       
    
    Task DeleteTableAsync(Guid tableId);         
    
    Task<bool> IsTableAvailableAsync(Guid tableId);

    Task<IEnumerable<Table>> GetAvailableTablesAsync();
}