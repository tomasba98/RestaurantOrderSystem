
using Restaurant_Backend.Services.DataAccessLayer;

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
    public Table? GetTableById(Guid tableId)
    {
        return _tableGenericService
            .FilterByExpressionLinq(table => table.Id == tableId)
            .FirstOrDefault();
    }

    public Task<IEnumerable<Table>> GetAllTables()
    {
        return _tableGenericService.FindAllAsync();
    }

}
