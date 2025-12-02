using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
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
using Serilog;
using Serilog.Events;
using System.Reflection;
using System.Security.Claims;
using System.Text;

//
// CONFIGURE SERILOG BEFORE CREATING THE HOST
// ------------------------------------------------------------
// This ensures logger is available during application startup,
// including boot errors, configuration failures, dependency injection, etc.
//
Log.Logger = new LoggerConfiguration()
    .MinimumLevel.Information()
    .MinimumLevel.Override("Microsoft", LogEventLevel.Warning)
    .MinimumLevel.Override("Microsoft.EntityFrameworkCore", LogEventLevel.Warning)
    .Enrich.FromLogContext()
    .WriteTo.Console(
        outputTemplate: "[{Timestamp:HH:mm:ss} {Level:u3}] {Message:lj}{NewLine}{Exception}"
    )
    .WriteTo.File(
        path: "logs/restaurant-.log",
        rollingInterval: RollingInterval.Day,
        retainedFileCountLimit: 30,
        outputTemplate: "{Timestamp:yyyy-MM-dd HH:mm:ss.fff zzz} [{Level:u3}] {Message:lj}{NewLine}{Exception}"
    )
    .CreateLogger();

try
{
    Log.Information("Starting Restaurant Backend API");

    //
    // CREATE HOST BUILDER
    // ------------------------------------------------------------
    // Serilog is injected into the hosting pipeline here.
    //
    var builder = WebApplication.CreateBuilder(args);

    builder.Host.UseSerilog();

    // Allow external connections (for Docker, reverse proxies, etc.)
    builder.WebHost.UseUrls("http://0.0.0.0:4332");

    // HTTP context accessor (required for getting user info)
    builder.Services.AddHttpContextAccessor();


    //
    // REGISTER APPLICATION SERVICES
    // ------------------------------------------------------------
    // Dependency Injection configuration
    //
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
    builder.Services.AddScoped<Restaurant_Backend.Services.Authentication.IAuthenticationService,Restaurant_Backend.Services.Authentication.Implementation.AuthenticationService>();
    builder.Services.AddScoped<IUserService, UserService>();
    builder.Services.AddScoped<ICurrentUserService, CurrentUserService>();

    builder.Services.AddMemoryCache();

    //
    // Database connection
    //
    builder.Services.AddDbContext<AppDbContext>(options =>
        options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

    //
    // AutoMapper configuration
    //
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

    //
    // Controllers and API setup
    //
    builder.Services.AddControllers();

    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddSwaggerGen(c =>
    {
        var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
        var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
        c.IncludeXmlComments(xmlPath);
    });

    //
    // CORS policy for frontend access
    //
    builder.Services.AddCors(options =>
    {
        options.AddPolicy("AllowFrontend", policy =>
        {
            policy.WithOrigins("http://localhost:5173", "http://localhost:5174")
                  .AllowAnyHeader()
                  .AllowAnyMethod()
                  .AllowCredentials();
        });
    });

    //
    // JWT Authentication configuration
    //
    var jwtSettingsSection = builder.Configuration.GetSection("Jwt");
    builder.Services.Configure<JwtSettings>(jwtSettingsSection);
    var jwtSettings = jwtSettingsSection.Get<JwtSettings>();

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
                IssuerSigningKey = new SymmetricSecurityKey(
                    Encoding.UTF8.GetBytes(jwtSettings.Key)
                ),
                RoleClaimType = ClaimTypes.Role
            };
        });

    builder.Services.AddAuthorization();


    //
    // BUILD APPLICATION
    // ------------------------------------------------------------
    //
    var app = builder.Build();


    //
    // APPLY DATABASE MIGRATIONS AUTOMATICALLY
    // ------------------------------------------------------------
    //
    using (var scope = app.Services.CreateScope())
    {
        var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        try
        {
            context.Database.Migrate();
            Log.Information("Database migrated successfully");
        }
        catch (Exception ex)
        {
            Log.Error(ex, "Error applying database migrations");
        }
    }


    //
    // MIDDLEWARE PIPELINE
    // ------------------------------------------------------------
    //
    if (app.Environment.IsDevelopment())
    {
        app.UseSwagger();
        app.UseSwaggerUI();
    }

    // Global error handler
    app.UseExceptionHandler("/error");

    // Logs every HTTP request with execution time
    app.UseSerilogRequestLogging(options =>
    {
        options.MessageTemplate =
            "HTTP {RequestMethod} {RequestPath} responded {StatusCode} in {Elapsed:0.0000} ms";
    });

    app.UseRouting();
    //app.UseHttpsRedirection(); // Disabled for Docker compatibility

    app.UseCors("AllowFrontend");

    app.UseAuthentication();
    app.UseAuthorization();

    app.MapControllers();


    //
    // START APPLICATION
    // ------------------------------------------------------------
    //
    app.Run();
}
catch (Exception ex)
{
    Log.Fatal(ex, "Application failed to start");
}
finally
{
    Log.CloseAndFlush();
}
