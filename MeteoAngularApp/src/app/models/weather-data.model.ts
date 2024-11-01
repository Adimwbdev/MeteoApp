// src/app/models/weather-data.model.ts
export interface WeatherData {
  cityId: number;
  date: string;
  temperature: number;
  pressure: number;
  windSpeed: number;
  weatherCondition: number;
}
