public class WeatherDataRecord
{
    public int WeatherDataID { get; set; }
    public int CityID { get; set; }
    public DateTime Date { get; set; }
    public decimal? Temperature { get; set; }
    public decimal? Pressure { get; set; }
    public decimal? WindSpeed { get; set; }
    public int? WeatherCondition { get; set; }

    public override string ToString()
    {
        return $"CityID: {CityID}, Date: {Date}, Temperature: {Temperature}, Pressure: {Pressure}, WindSpeed: {WindSpeed}, WeatherCondition: {WeatherCondition}";
    }
}
