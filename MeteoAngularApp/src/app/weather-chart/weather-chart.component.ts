

import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartOptions } from 'chart.js';
import { BaseChartDirective, NgChartsModule } from 'ng2-charts';
import 'chartjs-adapter-date-fns';

@Component({
    selector: 'app-weather-chart',
    templateUrl: './weather-chart.component.html',
    styleUrls: ['./weather-chart.component.css'],
    standalone: true,
    imports: [NgChartsModule] // Import chart module here for standalone use
})
export class WeatherChartComponent implements OnChanges {
    @Input() weatherData: any[] = [];  // Initialize weatherData

    @ViewChild(BaseChartDirective) chart!: BaseChartDirective;

    chartData: ChartData<'line'> = {
        datasets: [
            {
                data: [], // Initialize with empty data
                label: 'Temperature (°C)',
                borderColor: 'rgba(75, 192, 192, 1)',
                fill: false,
                tension: 0.1,
            }
        ]
    };

    chartOptions: ChartOptions<'line'> = {
        responsive: true,
        scales: {
            x: {
                type: 'time',
                title: {
                    display: true,
                    text: 'Date and Time'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Temperature (°C)'
                },
                min: 0, // Set a minimum value for y-axis
            }
        }
    };

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['weatherData'] && this.weatherData.length) {
            this.chartData.datasets[0].data = this.weatherData.map((data) => ({
                x: new Date(data.date).getTime(), // Ensure this is a Date object
                y: data.temperature
            }));
            this.chart?.update(); // Update chart with new data
        }
    }

    constructor() {
      // Use hardcoded data for testing
      this.chartData.datasets[0].data = [
          { x: new Date('2024-10-27T18:00:00').getTime(), y: 15 },
          { x: new Date('2024-10-27T19:00:00').getTime(), y: 16 },
          { x: new Date('2024-10-27T20:00:00').getTime(), y: 17 },
          { x: new Date('2024-10-27T21:00:00').getTime(), y: 18 },
          { x: new Date('2024-10-27T22:00:00').getTime(), y: 19 },
          { x: new Date('2024-10-27T23:00:00').getTime(), y: 20 },
      ];
      this.chart?.update();
  }
  
}
