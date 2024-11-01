// src/app/weather/weather.component.ts

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { WeatherService, WeatherData } from '../services/weather.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule] 
})
export class WeatherComponent implements OnInit {
  @Input() cityId: number = 1;
  @Output() dataUpdated = new EventEmitter<WeatherData[]>();
  weatherData: WeatherData[] = [];
  errorMessage?: string;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.getWeatherData(this.cityId); 
  }

  getWeatherData(cityId: number): void {
    this.weatherService.getWeatherData(cityId).subscribe(
      data => {
        this.weatherData = data;
        this.dataUpdated.emit(this.weatherData);
        console.log("Weather data received:", data);
      },
      error => {
        this.errorMessage = "Error fetching weather data";
        console.error("Error fetching weather data:", error);
      }
    );
  }

  fetchAndStoreData(): void {
    this.weatherService.fetchAndStoreWeatherData(this.cityId).subscribe(
      response => {
        console.log("Response:", response.message);
        this.getWeatherData(this.cityId); // Reload data after storing new data
      },
      error => {
        this.errorMessage = "Error fetching and storing weather data";
        console.error("Error:", error);
      }
    );
  }
}
