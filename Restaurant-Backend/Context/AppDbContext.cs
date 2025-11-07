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

    public override async Task<int> SaveChangesAsync(CancellationToken token)
    {
        var currentUser = _currentUserService?.UserName ?? "System";

        foreach (var entry in ChangeTracker.Entries<EntityBase>())
        {
            if (entry.State == EntityState.Added)
                entry.Entity.SetCreated(currentUser);
            else if (entry.State == EntityState.Modified)
                entry.Entity.SetUpdated(currentUser);
        }

        return await base.SaveChangesAsync(token);
    }
}
