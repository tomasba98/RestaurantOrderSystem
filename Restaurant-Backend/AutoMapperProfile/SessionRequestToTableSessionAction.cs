using AutoMapper;
using Restaurant_Backend.Context;
using Restaurant_Backend.Entities;
using Restaurant_Backend.Models.TableSession;

namespace Restaurant_Backend.AutoMapperProfile;

public class SessionRequestToTableSessionAction : IMappingAction<SessionRequest, TableSession>
{
    private readonly AppDbContext _context;

    public SessionRequestToTableSessionAction(AppDbContext context)
    {
        _context = context;
    }

    public void Process(SessionRequest source, TableSession destination, ResolutionContext context)
    {
        var table = _context.Tables.Find(source.TableId)
            ?? throw new Exception("Table not found");

        destination.TableId = source.TableId;
        destination.Table = table;
        destination.IsActive = true;
    }
}
