using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace MeteoApp.Models
{
    public class WeatherResponse
    {
        [JsonPropertyName("version")]
        public string Version { get; set; }

        [JsonPropertyName("user")]
        public string User { get; set; }

        [JsonPropertyName("dateGenerated")]
        public DateTime DateGenerated { get; set; }

        [JsonPropertyName("status")]
        public string Status { get; set; }

        [JsonPropertyName("data")]
        public List<WeatherParameter> Data { get; set; }
    }

    public class WeatherParameter
    {
        [JsonPropertyName("parameter")]
        public string Parameter { get; set; }

        [JsonPropertyName("coordinates")]
        public List<Coordinate> Coordinates { get; set; } = new List<Coordinate>();
    }

    public class Coordinate
    {
        [JsonPropertyName("lat")]
        public decimal Lat { get; set; }

        [JsonPropertyName("lon")]
        public decimal Lon { get; set; }

        [JsonPropertyName("dates")]
        public List<WeatherDataPoint> Dates { get; set; } = new List<WeatherDataPoint>();
    }

    public class WeatherDataPoint
    {
        [JsonPropertyName("date")]
        public DateTime Date { get; set; }

        [JsonPropertyName("value")]
        public decimal Value { get; set; }
    }
}
