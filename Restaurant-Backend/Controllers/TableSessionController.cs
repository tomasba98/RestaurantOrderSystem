using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Restaurant_Backend.Entities;
using Restaurant_Backend.Models.TableSession;
using Restaurant_Backend.Services.Table;
using Restaurant_Backend.Services.TableSession;
using Restaurant_Backend.Services.User;
using Serilog;

namespace Restaurant_Backend.Controllers;

[Route("api/[controller]")]
[ApiController]
public class TableSessionController : BaseController
{
    private ITableSessionService _tableSessionService;
    private readonly IMapper _mapper;
    private ITableService _tableService;

    public TableSessionController(ITableSessionService tableSessionService, IMapper mapper, ITableService tableService, IHttpContextAccessor httpContextAccessor, IUserService userService) : base(httpContextAccessor, userService)
    {
        _tableSessionService = tableSessionService;
        _mapper = mapper;
        _tableService = tableService;
    }

    /// <summary>
    /// Retrieves a session by its ID.
    /// </summary>
    /// <param name="sessionId">The ID of the session.</param>
    /// <returns>The session data if found; otherwise, a 404 or error response.</returns>
    [Authorize(Roles = "Admin,Manager,Waiter")]
    [HttpGet("{sessionId}")]
    public async Task<IActionResult> GetSessionById(Guid sessionId)
    {
        try
        {
            var session = await _tableSessionService.GetSessionByIdAsync(sessionId);
            if (session is null)
            {
                Log.Warning("Session not found: {SessionId}", sessionId);
                return NotFound("Session not found");
            }

            var sessionResponse = _mapper.Map<SessionResponse>(session);

            return Ok(sessionResponse);

        }
        catch (Exception ex)
        {
            Log.Error(ex, "Error retrieving session: {SessionId}", sessionId);
            return StatusCode(500, $"An error ocurred while closing the session: {ex.Message}");
        }
    }


    /// <summary>
    /// Retrieves all active table sessions.
    /// </summary>
    /// <returns>A list of active sessions.</returns>
    [Authorize(Roles = "Admin,Manager,Waiter")]
    [HttpGet()]
    public async Task<IActionResult> GetAllSessions()
    {
        try
        {
            var activeSessions = await _tableSessionService.GetAllActiveSessionsAsync();
            return Ok(activeSessions);
        }
        catch (Exception ex)
        {
            Log.Error(ex, "Error retrieving all active sessions");
            return StatusCode(500, $"An error occurred while retrieving the active sessions: {ex.Message}");
        }
    }

    /// <summary>
    /// Starts a new table session.
    /// </summary>
    /// <param name="sessionRequest">The session data to start.</param>
    /// <returns>The created session data.</returns>
    [Authorize(Roles = "Admin,Manager,Waiter")] 
    [HttpPost("start")]
    public async Task<IActionResult> StartSession([FromBody] SessionRequest sessionRequest)
    {
        var session = _mapper.Map<TableSession>(sessionRequest);

        try
        {
            var createdSession = await _tableSessionService.StartSessionAsync(session);
            var createdSessionResponse = _mapper.Map<SessionResponse>(createdSession);

            return CreatedAtAction(nameof(GetSessionById), new { sessionId = createdSession.Id }, createdSessionResponse);
        }
        catch (Exception ex)
        {
            Log.Error(ex, "Error starting session for table: {TableId}", sessionRequest.TableId);
            return StatusCode(500, "An error ocurred while creating the product.");
        }
    }

    /// <summary>
    /// Ends an active session by its ID.
    /// </summary>
    /// <param name="sessionId">The ID of the session to end.</param>
    /// <returns>A confirmation message if successful.</returns>
    [Authorize(Roles = "Admin,Manager,Waiter")]
    [HttpDelete("end/{sessionId}")]
    public async Task<IActionResult> EndSession(Guid sessionId)
    {     
        try
        {
            await _tableSessionService.CloseSessionAsync(sessionId);

            return Ok(new { message = "Session closed correctly" });

        }
        catch (Exception ex)
        {
            Log.Error(ex, "Error closing session: {SessionId}", sessionId);
            return StatusCode(500, $"Error closing the session: {ex.Message}");
        }
    }

    /// <summary>
    /// Retrieves the active session for a specific table.
    /// </summary>
    /// <param name="tableId">The ID of the table.</param>
    /// <returns>The active session data for the table.</returns>
    [Authorize(Roles = "Admin,Manager,Waiter")]
    [HttpGet("table/{tableId}")]
    public async Task<IActionResult> GetActiveSessionByTableId(Guid tableId)
    {
        try
        {
            var activeSessions = await _tableSessionService.GetActiveSessionByTableIdAsync(tableId);
            return Ok(activeSessions);
        }
        catch (Exception ex)
        {
            Log.Error(ex, "Error retrieving active session for table: {TableId}", tableId);
            return StatusCode(500, $"An error occurred while retrieving the active sessions of the table: {ex.Message}");
        }
    }    

}
