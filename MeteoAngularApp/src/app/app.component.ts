/// src/app/app.component.ts

import { Component, OnInit } from '@angular/core';
import { WeatherService } from './services/weather.service';
import { WeatherComponent } from './weather/weather.component';
import { WeatherD3ChartComponent } from './weather-d3-chart/weather-d3-chart.component';
import { WeatherD3PressureChartComponent } from './weather-d3-pressure-chart/weather-d3-pressure-chart.component';
import { WeatherD3WindSpeedChartComponent } from './weather-d3-wind-speed-chart/weather-d3-wind-speed-chart.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { WeatherData } from './models/weather-data.model';
import { AddCityComponent } from './add-city/add-city.component';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';

// Import Angular Material Modules
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: true,
    providers: [WeatherService],
    imports: [
        WeatherComponent,
        WeatherD3ChartComponent,
        WeatherD3PressureChartComponent,
        WeatherD3WindSpeedChartComponent,
        HttpClientModule,
        FormsModule,
        RouterModule,
        AddCityComponent,
        CommonModule,
        // Material imports for consistency in the application
        MatButtonModule,
        MatCardModule,
        MatIconModule
    ]
})
export class AppComponent implements OnInit {
  weatherData: WeatherData[] = [];
  cityId: number = 1; // Default city ID
  showCharts: boolean = true;

  constructor(private weatherService: WeatherService, private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      this.showCharts = this.router.url === '/';
    });
  }

  // This method will be called when `dataUpdated` is emitted from WeatherComponent
  updateWeatherData(data: WeatherData[]): void {
    console.log("Data received from WeatherComponent:", data);
    this.weatherData = data;
  }
}
