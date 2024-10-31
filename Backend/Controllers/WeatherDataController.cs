using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using MeteoApp.Models;
using MeteoApp.Repositories;
using System;
using System.Collections.Generic;

namespace MeteoApp.Controllers
{
    [ApiController]
    [Route("api/weatherdata")]
    public class WeatherDataController : ControllerBase
    {
        private readonly WeatherDataRepository _weatherDataRepository;
        private readonly WeatherService _weatherService;

        public WeatherDataController(WeatherDataRepository weatherDataRepository, WeatherService weatherService)
        {
            _weatherDataRepository = weatherDataRepository;
            _weatherService = weatherService;
        }

        [HttpGet("{cityId:int}")]
        public async Task<ActionResult<List<WeatherDataRecord>>> GetWeatherData(int cityId)
        {
            var weatherData = await _weatherDataRepository.GetWeatherDataByCityAsync(cityId);
            if (weatherData == null || weatherData.Count == 0)
            {
                return NotFound(new { message = "No weather data found for this city." });
            }
            return Ok(weatherData);
        }

        [HttpPost("fetchAndStore/{cityId}")]
        public async Task<IActionResult> FetchAndStoreWeatherData(int cityId)
        {
            // Retrieve city details (latitude and longitude) based on cityId
            var city = await _weatherDataRepository.GetCityByIdAsync(cityId);
            if (city == null)
            {
                return NotFound(new { message = "City not found." });
            }

            // Use WeatherService to fetch live data for the city’s coordinates
            var weatherData = await _weatherService.FetchWeatherDataAsync(city.Lat, city.Lon, cityId);

            if (weatherData == null)
            {
                return StatusCode(500, new { message = "Error fetching weather data from external API." });
            }

            // Insert the fetched weather data into the database
            await _weatherDataRepository.InsertWeatherDataAsync(weatherData);

            // Return a JSON response
            return Ok(new { message = $"Weather data for city {cityId} inserted successfully." });
        }
        
        [HttpGet("cities")]
        public async Task<ActionResult<List<City>>> GetAllCities()
        {
            var cities = await _weatherDataRepository.GetAllCitiesAsync();
            if (cities == null || cities.Count == 0)
            {
                return NotFound(new { message = "No cities found." });
            }
            return Ok(cities);
        }

        [HttpPost("cities")]
        public async Task<IActionResult> AddCity([FromBody] City city)
        {
            if (city == null || string.IsNullOrWhiteSpace(city.CityName) || city.Lat == 0 || city.Lon == 0)
            {
                return BadRequest(new { message = "CityName, Lat, and Lon are required and cannot be zero." });
            }

            await _weatherDataRepository.InsertCityAsync(city);

            return Ok(new { message = $"City '{city.CityName}' added successfully." });
}


        
    }
}
