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
        var tables = await _tableService.GetAllTablesAsync();

        return Ok(tables);
    }

    /// <summary>
    /// Retrieves a specific table by its ID.
    /// </summary>
    /// <param name="tableId">The unique identifier of the table.</param>
    /// <returns>The table with the given ID.</returns>
    [HttpGet("{tableId}")]
    public async Task<IActionResult> GetTableById(Guid tableId)
    {
        var table = await _tableService.GetTableByIdAsync(tableId);

        return Ok(table);
    }


    /// <summary>
    /// Retrieves all available (unoccupied) tables.
    /// </summary>
    /// <returns>List of available tables.</returns>
    [HttpGet("availables")]
    public async Task<IActionResult> GetAvailableTables()
    {
        var tables = await _tableService.GetAvailableTablesAsync();

        return Ok(tables);
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
            var createdtable = await _tableService.CreateTableAsync(table);
            var createdtableResponse = _mapper.Map<TableResponse>(createdtable);

            return CreatedAtAction(nameof(GetTableById), new { orderId = createdtable.Id }, createdtableResponse);
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
        var existingtable = await _tableService.GetTableByIdAsync(tableId);
        if (existingtable is null)
            return NotFound("table not found");

        existingtable.Number = tableRequest.Number;
        existingtable.IsOccupied = tableRequest.IsOccupied;

        try
        {
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
        var existingtable = await _tableService.GetTableByIdAsync(tableId);
        if (existingtable is null)
            return NotFound("table not found");

        existingtable.IsOccupied = tableStatus;

        try
        {
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
