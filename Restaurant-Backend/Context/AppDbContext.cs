using Microsoft.EntityFrameworkCore;
using Restaurant_Backend.Entities;

namespace Restaurant_Backend.Context;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {

    }

    public virtual DbSet<User> Users { get; set; }
    public virtual DbSet<Table> Tables { get; set; }
    public virtual DbSet<Order> Orders { get; set; }
    public virtual DbSet<OrderDetail> OrderDetails { get; set; }
    public virtual DbSet<Product> Products { get; set; }
    public virtual DbSet<TableSession> TableSessions { get; set; }
}
