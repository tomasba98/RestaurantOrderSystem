using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Restaurant_Backend.Entities;
using Restaurant_Backend.Models.Table;
using Restaurant_Backend.Services.Table;

namespace Restaurant_Backend.Controllers;


[Route("api/[controller]")]
[ApiController]
public class TableController : ControllerBase
{
    private readonly ITableService _tableService;
    private readonly IMapper _mapper;

    public TableController(ITableService tableService, IMapper mapper)
    {
        _tableService = tableService;
        _mapper = mapper;
    }

    /// <summary>
    /// Retrieves all tables.
    /// </summary>
    /// <returns>List of all tables.</returns>
    [HttpGet]
    public async Task<IActionResult> GetAllTables()
    {
        try
        {
            var tables = await _tableService.GetAllTablesAsync();

            return Ok(tables);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"An error occurred while retrieving all the tables: {ex.Message}");
        }
    }

    /// <summary>
    /// Retrieves a specific table by its ID.
    /// </summary>
    /// <param name="tableId">The unique identifier of the table.</param>
    /// <returns>The table with the given ID.</returns>
    [HttpGet("{tableId}")]
    public async Task<IActionResult> GetTableById(Guid tableId)
    {
        try
        {
            var table = await _tableService.GetTableByIdAsync(tableId);
            return Ok(table);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"An error occurred while retrieving the table: {ex.Message}");
        }
    }


    /// <summary>
    /// Retrieves all available (unoccupied) tables.
    /// </summary>
    /// <returns>List of available tables.</returns>
    [HttpGet("availables")]
    public async Task<IActionResult> GetAvailableTables()
    {
        try
        {
            var tables = await _tableService.GetAvailableTablesAsync();
            return Ok(tables);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"An error occurred while retrieving available tables: {ex.Message}");
        }
    }

    /// <summary>
    /// Creates a new table.
    /// </summary>
    /// <param name="tableRequest">The table data to create.</param>
    /// <returns>The created table information.</returns>
    [HttpPost]
    public async Task<IActionResult> Createtable([FromBody] TableRequest tableRequest)
    {
        var table = _mapper.Map<Table>(tableRequest);

        try
        {
            var createdTable = await _tableService.CreateTableAsync(table);
            var createdTableResponse = _mapper.Map<TableResponse>(createdTable);

            return CreatedAtAction(nameof(GetTableById), new { tableId = createdTable.Id }, createdTableResponse);
        }
        catch (Exception ex)
        {
            return StatusCode(500, "An error ocurred while creating the table.");
        }
    }


    /// <summary>
    /// Updates an existing table.
    /// </summary>
    /// <param name="tableId">The ID of the table to update.</param>
    /// <param name="tableRequest">The updated table data.</param>
    /// <returns>The updated table information.</returns>
    [HttpPut("{tableId}")]
    public async Task<IActionResult> Updatetable(Guid tableId, [FromBody] TableRequest tableRequest)
    {
        try
        {
            var existingtable = await _tableService.GetTableByIdAsync(tableId);
            if (existingtable is null)
                return NotFound("table not found");

            existingtable.Number = tableRequest.Number;
            existingtable.IsOccupied = tableRequest.IsOccupied;

            var updatedtable = await _tableService.UpdateTableAsync(existingtable);
            var tableResponse = _mapper.Map<TableResponse>(updatedtable);

            return Ok(tableResponse);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error updating table: {ex.Message}");
        }
    }


    /// <summary>
    /// Deletes a table by ID.
    /// </summary>
    /// <param name="tableId">The ID of the table to delete.</param>
    /// <returns>No content if deletion is successful.</returns>
    [HttpDelete("{tableId}")]
    public async Task<IActionResult> Deletetable(Guid tableId)
    {
        try
        {
            await _tableService.DeleteTableAsync(tableId);
            return NoContent();
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error deleting table: {ex.Message}");
        }
    }

    /// <summary>
    /// Toggles the occupation status of a table.
    /// </summary>
    /// <param name="tableId">The ID of the table to update.</param>
    /// <param name="tableStatus">The new occupation status.</param>
    /// <returns>The updated table information.</returns>
    [HttpPatch("{tableId}/toggle-occupation")]
    public async Task<IActionResult> ToggleTableOccupation(Guid tableId, bool tableStatus)
    {        
        try
        {
            var existingtable = await _tableService.GetTableByIdAsync(tableId);
            if (existingtable is null)
                return NotFound("table not found");

            existingtable.IsOccupied = tableStatus;

            var updatedtable = await _tableService.UpdateTableAsync(existingtable);
            var tableResponse = _mapper.Map<TableResponse>(updatedtable);

            return Ok(tableResponse);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error toggling the occupation of the table: {ex.Message}");
        }
    }
}
