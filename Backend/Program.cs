using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using MeteoApp.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers();

// Enable CORS for requests from Angular (running on localhost:4200)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularApp",
        policy => policy.WithOrigins("http://localhost:4200")
                        .AllowAnyMethod()
                        .AllowAnyHeader());
});

// Register WeatherDataRepository as a service for dependency injection
builder.Services.AddScoped<WeatherDataRepository>(provider =>
    new WeatherDataRepository("Server=localhost;Database=MeteoApp;User Id=sa;Password=Adimtheworst1986;"));

// If you have WeatherService as a separate service, register it too
builder.Services.AddScoped<WeatherService>(provider =>
    new WeatherService("datamed_dimitrakopoulos_alex", "4hryHJh82T"));

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseCors("AllowAngularApp");
app.UseAuthorization();

app.MapControllers();

app.Run();
