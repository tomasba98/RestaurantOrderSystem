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

var builder = WebApplication.CreateBuilder(args);

// Register of interfaces services
builder.Services.AddScoped<IGenericService<Order>, GenericService<Order>>();
builder.Services.AddScoped<IOrderService, OrderService>();

builder.Services.AddScoped<IGenericService<OrderDetail>, GenericService<OrderDetail>>();
builder.Services.AddScoped<IOrderDetailService, OrderDetailService>();

builder.Services.AddScoped<IGenericService<Product>, GenericService<Product>>();
builder.Services.AddScoped<IProductService, ProductService>();

builder.Services.AddScoped<IGenericService<Table>, GenericService<Table>>();
builder.Services.AddScoped<ITableService, TableService>();


//Connection to the data base
builder.Services.AddDbContext<AppDbContext>(options => options.UseNpgsql(builder.Configuration.GetConnectionString("DbConnection")));


// Add services to the container.
builder.Services.AddControllers();

//Automapper
builder.Services.AddAutoMapper(typeof(AutoMapperProfile));

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
