using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text.Json;
using System.Threading.Tasks;
using MeteoApp.Models;

namespace MeteoApp.Repositories
{
    public class WeatherService
    {
        private static readonly HttpClient client = new HttpClient();
        private readonly string username;
        private readonly string password;

        // Add constructor to initialize username and password
        public WeatherService(string username, string password)
        {
            this.username = username;
            this.password = password;
        }

        public async Task<WeatherDataRecord> FetchWeatherDataAsync(decimal latitude, decimal longitude, int cityId)
        {
            var currentDate = DateTime.UtcNow.ToString("yyyy-MM-ddTHH:mm:ssZ");
            var url = $"https://api.meteomatics.com/{currentDate}/t_2m:C,msl_pressure:hPa,wind_speed_10m:ms,weather_symbol_1h:idx/{latitude},{longitude}/json";

            var byteArray = System.Text.Encoding.ASCII.GetBytes($"{username}:{password}");
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", Convert.ToBase64String(byteArray));

            try
            {
                var response = await client.GetAsync(url);
                response.EnsureSuccessStatusCode();
                var responseBody = await response.Content.ReadAsStringAsync();

                var weatherResponse = JsonSerializer.Deserialize<WeatherResponse>(responseBody);

                // Map the deserialized response to WeatherDataRecord
                var weatherData = new WeatherDataRecord
                {
                    CityID = cityId,
                    Date = DateTime.UtcNow,
                    Temperature = weatherResponse?.Data?.FirstOrDefault(p => p.Parameter == "t_2m:C")?.Coordinates.FirstOrDefault()?.Dates.FirstOrDefault()?.Value ?? 0,
                    Pressure = weatherResponse?.Data?.FirstOrDefault(p => p.Parameter == "msl_pressure:hPa")?.Coordinates.FirstOrDefault()?.Dates.FirstOrDefault()?.Value ?? 0,
                    WindSpeed = weatherResponse?.Data?.FirstOrDefault(p => p.Parameter == "wind_speed_10m:ms")?.Coordinates.FirstOrDefault()?.Dates.FirstOrDefault()?.Value ?? 0,
                    WeatherCondition = (int?)weatherResponse?.Data?.FirstOrDefault(p => p.Parameter == "weather_symbol_1h:idx")?.Coordinates.FirstOrDefault()?.Dates.FirstOrDefault()?.Value
                };

                return weatherData;
            }
            catch (HttpRequestException e)
            {
                Console.WriteLine($"Request error: {e.Message}");
                return null;
            }
        }
    }
}
