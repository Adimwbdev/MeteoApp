// using System;
// using System.Data.SqlClient;
// using System.Collections.Generic;

// namespace MeteoApp.Repositories
// {
//     public class CityRepository
//     {
//         private string connectionString = "Server=localhost;Database=MeteoApp;User Id=sa;Password=Adimtheworst1986;";

//         public List<string> GetCities()
//         {
//             List<string> cities = new List<string>();

//             using (SqlConnection connection = new SqlConnection(connectionString))
//             {
//                 connection.Open();

//                 string query = "SELECT CityName FROM MeteoApp.Cities";

//                 using (SqlCommand command = new SqlCommand(query, connection))
//                 {
//                     using (SqlDataReader reader = command.ExecuteReader())
//                     {
//                         while (reader.Read())
//                         {
//                             cities.Add(reader["CityName"].ToString());
//                         }
//                     }
//                 }
//             }

//             return cities;
//         }
//     }
// }


using System;
using System.Data.SqlClient;
using System.Collections.Generic;
using MeteoApp.Models;

namespace MeteoApp.Repositories
{
    public class CityRepository
    {
        private string connectionString = "Server=localhost;Database=MeteoApp;User Id=sa;Password=Adimtheworst1986;";

        public List<City> GetCities() 
        {
            List<City> cities = new List<City>();

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();

                string query = "SELECT CityID, CityName, lon, lat FROM MeteoApp.Cities";

                using (SqlCommand command = new SqlCommand(query, connection))
                {
                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            var city = new City
                            {
                                CityID = reader.GetInt32(0),
                                CityName = reader.GetString(1),
                                Lon = reader.GetDecimal(2),
                                Lat = reader.GetDecimal(3)
                            };
                            cities.Add(city);
                        }
                    }
                }
            }

            return cities;
        }
    }
}

