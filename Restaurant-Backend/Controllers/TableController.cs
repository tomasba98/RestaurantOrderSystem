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

    [HttpGet]
    public async Task<IActionResult> GetAllTables()
    {
        var tables = await _tableService.GetAllTablesAsync();

        return Ok(tables);
    }


    [HttpGet("{tableId}")]
    public async Task<IActionResult> GetTableById(Guid tableId)
    {
        var table = await _tableService.GetTableByIdAsync(tableId);

        return Ok(table);
    }

    [HttpGet("/avaibles")]
    public async Task<IActionResult> GetAvailableTables()
    {
        var tables = await _tableService.GetAvailableTablesAsync();

        return Ok(tables);
    }


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
