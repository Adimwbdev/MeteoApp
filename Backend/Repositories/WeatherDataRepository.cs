using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Threading.Tasks;
using MeteoApp.Models;
using Dapper;

namespace MeteoApp.Repositories
{
    public class WeatherDataRepository
    {
        private readonly string connectionString;

        public WeatherDataRepository(string connectionString)
        {
            this.connectionString = connectionString;
        }

        public async Task InsertWeatherDataAsync(WeatherDataRecord weatherData)
        {
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                await connection.OpenAsync();

                string query = "INSERT INTO MeteoApp.WeatherData (CityID, Date, Temperature, Pressure, WindSpeed, WeatherCondition) " +
                               "VALUES (@CityID, @Date, @Temperature, @Pressure, @WindSpeed, @WeatherCondition)";

                using (SqlCommand command = new SqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@CityID", weatherData.CityID);
                    command.Parameters.AddWithValue("@Date", weatherData.Date);
                    command.Parameters.AddWithValue("@Temperature", (object)weatherData.Temperature ?? DBNull.Value);
                    command.Parameters.AddWithValue("@Pressure", (object)weatherData.Pressure ?? DBNull.Value);
                    command.Parameters.AddWithValue("@WindSpeed", (object)weatherData.WindSpeed ?? DBNull.Value);
                    command.Parameters.AddWithValue("@WeatherCondition", (object)weatherData.WeatherCondition ?? DBNull.Value);

                    await command.ExecuteNonQueryAsync();
                }
            }
        }

        public async Task<List<WeatherDataRecord>> GetWeatherDataByCityAsync(int cityId)
        {
            var weatherDataList = new List<WeatherDataRecord>();

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                await connection.OpenAsync();

                string query = "SELECT * FROM MeteoApp.WeatherData WHERE CityID = @CityID";

                using (SqlCommand command = new SqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@CityID", cityId);

                    using (SqlDataReader reader = await command.ExecuteReaderAsync())
                    {
                        while (reader.Read())
                        {
                            var weatherData = new WeatherDataRecord
                            {
                                WeatherDataID = reader.GetInt32(0),
                                CityID = reader.GetInt32(1),
                                Date = reader.GetDateTime(2),
                                Temperature = reader.IsDBNull(3) ? null : reader.GetDecimal(3),
                                Pressure = reader.IsDBNull(4) ? null : reader.GetDecimal(4),
                                WindSpeed = reader.IsDBNull(5) ? null : reader.GetDecimal(5),
                                WeatherCondition = reader.IsDBNull(6) ? null : reader.GetInt32(6)
                            };
                            weatherDataList.Add(weatherData);
                        }
                    }
                }
            }

            return weatherDataList;
        }

        // New method to get city details by ID
        public async Task<City> GetCityByIdAsync(int cityId)
        {
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                await connection.OpenAsync();

                string query = "SELECT CityID, CityName, Lat, Lon FROM MeteoApp.Cities WHERE CityID = @CityID";

                return await connection.QuerySingleOrDefaultAsync<City>(query, new { CityID = cityId });
            }
        }

        public async Task<List<City>> GetAllCitiesAsync()
        {
            Console.WriteLine("GetAllCitiesAsync method called.");
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                await connection.OpenAsync();

                string query = "SELECT CityID, CityName, Lat, Lon FROM MeteoApp.Cities";

                var cities = await connection.QueryAsync<City>(query);
                return cities.AsList();
            }
        }

                public async Task InsertCityAsync(City city)
        {
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                await connection.OpenAsync();

                string query = "INSERT INTO MeteoApp.Cities (CityName, Lat, Lon) " +
                              "VALUES (@CityName, @Lat, @Lon)";

                using (SqlCommand command = new SqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@CityName", city.CityName);
                    command.Parameters.AddWithValue("@Lat", city.Lat);
                    command.Parameters.AddWithValue("@Lon", city.Lon);

                    await command.ExecuteNonQueryAsync();
                }
            }
        }


    }
}
