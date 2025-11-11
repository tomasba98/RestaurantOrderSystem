using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Restaurant_Backend.AutoMapperProfile;
using Restaurant_Backend.Context;
using Restaurant_Backend.Entities;
using Restaurant_Backend.Models.Authentication;
using Restaurant_Backend.Services.DataAccessLayer;
using Restaurant_Backend.Services.DataAccessLayer.Implementation;
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
using Restaurant_Backend.Services.User;
using Restaurant_Backend.Services.User.Implementation;
using Restaurant_Backend.Utils.Context;
using System.Reflection;
using System.Security.Claims;
using System.Text;


var builder = WebApplication.CreateBuilder(args);

// Configurar URLs ANTES de build
builder.WebHost.UseUrls("http://0.0.0.0:4332");

builder.Services.AddHttpContextAccessor();

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
builder.Services.AddScoped<IGenericService<User>, GenericService<User>>();
builder.Services.AddScoped<Restaurant_Backend.Services.Authentication.IAuthenticationService, Restaurant_Backend.Services.Authentication.Implementation.AuthenticationService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<ICurrentUserService, CurrentUserService>();

//Memory Cache
builder.Services.AddMemoryCache();



// Connection to the database 
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// Configura AutoMapper con inyección de dependencias
builder.Services.AddSingleton<AutoMapper.IConfigurationProvider>(sp =>
{
    var config = new MapperConfiguration(cfg =>
    {
        cfg.AddProfile(new AutoMapperProfile(sp));
    });
    return config;
});

builder.Services.AddScoped<IMapper>(sp =>
    new Mapper(sp.GetRequiredService<AutoMapper.IConfigurationProvider>(), sp.GetService));

// Add services to the container.
builder.Services.AddControllers();



// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
    c.IncludeXmlComments(xmlPath);
});

// Add CORS for cross-origin resource sharing.
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy
            .WithOrigins(
                "http://localhost:5173",
                "http://localhost:5174"
            )
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});

var jwtSettingsSection = builder.Configuration.GetSection("JwtSettings");
builder.Services.Configure<JwtSettings>(jwtSettingsSection);

var jwtSettings = jwtSettingsSection.Get<JwtSettings>();


// Configure JWT-based authentication.
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = jwtSettings!.Issuer,
        ValidateAudience = false,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings.SecretKey)),
        RoleClaimType = ClaimTypes.Role
    };
});

builder.Services.AddAuthorization();

// Configure Swagger documentation.
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = builder.Configuration["Swagger:Title"],
        Version = builder.Configuration["Swagger:Version"],
    });

    c.ResolveConflictingActions(apiDescriptions => apiDescriptions.First());

    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "JWT Authorization header using the Bearer scheme. Enter 'Bearer' [space] and then your token in the text input below.",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
            {
                {
                    new OpenApiSecurityScheme
                    {
                        Reference = new OpenApiReference
                        {
                            Type = ReferenceType.SecurityScheme,
                            Id = "Bearer"
                        },
                        Scheme = "oauth2",
                        Name = "Bearer",
                        In = ParameterLocation.Header
                    },
                    new List<string>()
                }
            });
});

var app = builder.Build();

//Active CORS
app.UseCors("AllowFrontend");

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
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// app.UseHttpsRedirection(); disable to avoid problems with docker

app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();