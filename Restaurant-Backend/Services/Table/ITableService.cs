namespace Restaurant_Backend.Services.Table;

using Restaurant_Backend.Entities;
public interface ITableService
{
    Table CreateTable(Table product);

    Task<Table?> GetTableById(Guid productId);

    Task<IEnumerable<Table>> GetAllTables();

    Task UpdateTable(Table table);       
    
    Task DeleteTable(Table table);         
    
    Task<bool> IsTableAvailable(Guid tableId);    

}
