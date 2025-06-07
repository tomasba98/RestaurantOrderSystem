using Microsoft.EntityFrameworkCore;
using Restaurant_Backend.Context;
using Restaurant_Backend.AutoMapperProfile;
using Restaurant_Backend.Services.DataAccessLayer.Implementation;
using Restaurant_Backend.Services.DataAccessLayer;
using Restaurant_Backend.Entities;
using Restaurant_Backend.Services.Order;
using Restaurant_Backend.Services.Order.Implementation;
using Restaurant_Backend.Services.OrderDetail;
using Restaurant_Backend.Services.OrderDetail.Implementation;
using Restaurant_Backend.Services.Product;
using Restaurant_Backend.Services.Product.Implementation;
using Restaurant_Backend.Services.Table;
using Restaurant_Backend.Services.Table.Implementation;
using Restaurant_Backend.Services.TableSession;
using Restaurant_Backend.Services.TableSession.Implementation;
using System.Reflection;

var builder = WebApplication.CreateBuilder(args);

// Configurar URLs ANTES de build
builder.WebHost.UseUrls("http://0.0.0.0:4332");

// Register of interfaces services
builder.Services.AddScoped<IGenericService<Order>, GenericService<Order>>();
builder.Services.AddScoped<IOrderService, OrderService>();
builder.Services.AddScoped<IGenericService<OrderDetail>, GenericService<OrderDetail>>();
builder.Services.AddScoped<IOrderDetailService, OrderDetailService>();
builder.Services.AddScoped<IGenericService<Product>, GenericService<Product>>();
builder.Services.AddScoped<IProductService, ProductService>();
builder.Services.AddScoped<IGenericService<Table>, GenericService<Table>>();
builder.Services.AddScoped<ITableService, TableService>();
builder.Services.AddScoped<IGenericService<TableSession>, GenericService<TableSession>>();
builder.Services.AddScoped<ITableSessionService, TableSessionService>();

// Connection to the database - CORREGIDO: usar DefaultConnection
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// Add services to the container.
builder.Services.AddControllers();

// Automapper
builder.Services.AddAutoMapper(typeof(AutoMapperProfile));

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
    c.IncludeXmlComments(xmlPath);
});

var app = builder.Build();

//Execute migrations automatically
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    try
    {
        context.Database.Migrate();
        Console.WriteLine("Database migrated successfully");
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Error migrating database: {ex.Message}");
    }
}

// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
    app.UseSwagger();
    app.UseSwaggerUI();
//}


// app.UseHttpsRedirection(); disable to avoid problems with docker

app.UseAuthorization();
app.MapControllers();

app.Run();