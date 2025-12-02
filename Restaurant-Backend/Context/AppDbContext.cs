using Microsoft.EntityFrameworkCore;
using Restaurant_Backend.Entities;
using Restaurant_Backend.Utils.Context;

namespace Restaurant_Backend.Context;

public class AppDbContext : DbContext
{
    private readonly ICurrentUserService _currentUserService;
    public AppDbContext(DbContextOptions<AppDbContext> options, ICurrentUserService currentUserService) : base(options)
    {
        _currentUserService = currentUserService;
    }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Order>()
            .HasMany(o => o.ProductList)
            .WithOne(od => od.Order)
            .HasForeignKey(od => od.OrderId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Order>()
        .HasOne(o => o.TableSession)
        .WithMany(ts => ts.Orders)
        .HasForeignKey(o => o.TableSessionId)
        .OnDelete(DeleteBehavior.Restrict);
        
        modelBuilder.Entity<TableSession>()
            .HasOne(ts => ts.Table)
            .WithMany()
            .HasForeignKey(ts => ts.TableId)
            .OnDelete(DeleteBehavior.Restrict);
        
        modelBuilder.Entity<OrderDetail>()
            .HasOne(od => od.Product)
            .WithMany()
            .HasForeignKey(od => od.ProductId)
            .OnDelete(DeleteBehavior.Restrict);
    }

    public virtual DbSet<User> Users { get; set; }
    public virtual DbSet<Table> Tables { get; set; }
    public virtual DbSet<Order> Orders { get; set; }
    public virtual DbSet<OrderDetail> OrderDetails { get; set; }
    public virtual DbSet<Product> Products { get; set; }
    public virtual DbSet<TableSession> TableSessions { get; set; }
    public virtual DbSet<AuditLog> AuditLogs { get; set; }

    public override async Task<int> SaveChangesAsync(CancellationToken token)
    {
        var currentUser = _currentUserService?.UserName ?? "System";
        var auditEntries = new List<AuditLog>();
        
        foreach (var entry in ChangeTracker.Entries<EntityBase>())
        {
            if (entry.State == EntityState.Detached || entry.State == EntityState.Unchanged)
                continue;

            var auditLog = new AuditLog
            {
                Id = Guid.NewGuid(),
                UserName = currentUser,
                EntityName = entry.Entity.GetType().Name,
                EntityId = entry.Entity.Id,
                Timestamp = DateTime.UtcNow
            };

            if (entry.State == EntityState.Added)
            {
                entry.Entity.SetCreated(currentUser);
                auditLog.Action = "CREATE";
                auditLog.NewValues = SerializeEntity(entry);
                auditEntries.Add(auditLog);
            }
            else if (entry.State == EntityState.Modified)
            {
                entry.Entity.SetUpdated(currentUser);
                auditLog.Action = "UPDATE";

                var modifiedProperties = GetModifiedProperties(entry);
                if (modifiedProperties.Any())
                {
                    auditLog.OldValues = System.Text.Json.JsonSerializer.Serialize(
                        modifiedProperties.ToDictionary(x => x.Key, x => x.Value.OldValue)
                    );
                    auditLog.NewValues = System.Text.Json.JsonSerializer.Serialize(
                        modifiedProperties.ToDictionary(x => x.Key, x => x.Value.NewValue)
                    );
                    auditEntries.Add(auditLog);
                }
            }
            else if (entry.State == EntityState.Deleted)
            {
                auditLog.Action = "DELETE";
                auditLog.OldValues = SerializeEntity(entry);
                auditEntries.Add(auditLog);
            }
        }

        var result = await base.SaveChangesAsync(token);

        if (auditEntries.Any())
        {
            AuditLogs.AddRange(auditEntries);
            await base.SaveChangesAsync(token);
        }

        return result;
    }

    private string SerializeEntity(Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry entry)
    {
        var excludedProperties = new[] { "Password", "CreatedAt", "UpdatedAt", "CreatedBy", "UpdatedBy" };

        var properties = entry.CurrentValues.Properties
            .Where(p => !p.IsShadowProperty() && !excludedProperties.Contains(p.Name))
            .ToDictionary(
                p => p.Name,
                p => entry.CurrentValues[p]?.ToString() ?? "null"
            );

        return System.Text.Json.JsonSerializer.Serialize(properties);
    }

    private Dictionary<string, (string OldValue, string NewValue)> GetModifiedProperties(Microsoft.EntityFrameworkCore.ChangeTracking.EntityEntry entry)
    {
        var excludedProperties = new[] { "Password", "CreatedAt", "UpdatedAt", "CreatedBy", "UpdatedBy" };

        return entry.Properties
            .Where(p => p.IsModified && !p.Metadata.IsShadowProperty() && !excludedProperties.Contains(p.Metadata.Name))
            .ToDictionary(
                p => p.Metadata.Name,
                p => (
                    OldValue: p.OriginalValue?.ToString() ?? "null",
                    NewValue: p.CurrentValue?.ToString() ?? "null"
                )
            );
    }
}
