// src/app/weather/weather.component.ts
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input'; // Import for matInput
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { WeatherService } from '../services/weather.service';
import { WeatherData } from '../models/weather-data.model';
import { City } from '../models/city.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Import chart components
import { WeatherD3ChartComponent } from '../weather-d3-chart/weather-d3-chart.component';
import { WeatherD3PressureChartComponent } from '../weather-d3-pressure-chart/weather-d3-pressure-chart.component';
import { WeatherD3WindSpeedChartComponent } from '../weather-d3-wind-speed-chart/weather-d3-wind-speed-chart.component';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatCardModule,
    MatTableModule,
    WeatherD3ChartComponent,
    WeatherD3PressureChartComponent,
    WeatherD3WindSpeedChartComponent
  ]
})
export class WeatherComponent implements OnInit {
  @Output() dataUpdated = new EventEmitter<WeatherData[]>();

  weatherData: WeatherData[] = [];
  filteredWeatherData: WeatherData[] = [];
  cities: City[] = [];
  errorMessage?: string;
  cityId: number = 4;
  startDate: Date | null = null;
  endDate: Date | null = null;
  displayedColumns: string[] = ['date', 'temperature', 'pressure', 'windSpeed', 'weatherCondition'];

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.getWeatherData(this.cityId);
    this.loadCities();
  }

  getWeatherData(cityId: number): void {
    this.weatherService.getWeatherData(cityId).subscribe(
      data => {
        this.weatherData = data;
        this.filteredWeatherData = [...this.weatherData];
        this.dataUpdated.emit(this.filteredWeatherData);
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
        this.getWeatherData(this.cityId);
      },
      error => {
        this.errorMessage = "Error fetching and storing weather data";
        console.error("Error:", error);
      }
    );
  }

  filterWeatherData(): void {
    if (this.startDate && this.endDate) {
      const start = new Date(this.startDate);
      const end = new Date(this.endDate);

      // Filter weatherData based on date range
      this.filteredWeatherData = this.weatherData.filter(data => {
        const date = new Date(data.date);
        return date >= start && date <= end;
      });
    } else {
      this.filteredWeatherData = [...this.weatherData];
    }

    this.dataUpdated.emit(this.filteredWeatherData);
  }

  clearFilter(): void {
    this.startDate = null;
    this.endDate = null;
    this.filteredWeatherData = [...this.weatherData];
    this.dataUpdated.emit(this.filteredWeatherData);
  }

  loadCities(): void {
    this.weatherService.getAllCities().subscribe(
      cities => {
        this.cities = cities;
        console.log("Cities received:", cities);
      },
      error => {
        this.errorMessage = "Error fetching cities";
        console.error("Error fetching cities:", error);
      }
    );
  }

  onSubmit(): void {
    this.filterWeatherData();
  }
}
