namespace Restaurant_Backend.Services.Table;

using Restaurant_Backend.Entities;
public interface ITableService
{
    Table CreateTable(Table product);

    Table? GetTableById(Guid productId);

    Task<IEnumerable<Table>> GetAllTables();
}
