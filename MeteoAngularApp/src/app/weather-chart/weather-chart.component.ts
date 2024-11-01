import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartOptions } from 'chart.js';
import { BaseChartDirective, NgChartsModule } from 'ng2-charts';
import 'chartjs-adapter-date-fns';

@Component({
    selector: 'app-weather-chart',
    templateUrl: './weather-chart.component.html',
    styleUrls: ['./weather-chart.component.css'],
    standalone: true,
    imports: [NgChartsModule] 
})
export class WeatherChartComponent implements OnChanges {
    @Input() weatherData: any[] = []; 

    @ViewChild(BaseChartDirective) chart!: BaseChartDirective;

    chartData: ChartData<'line'> = {
        datasets: [
            {
                data: [], 
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
                min: undefined, 
            }
        }
    };

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['weatherData'] && this.weatherData.length) {
            const temperatures = this.weatherData.map(data => data.temperature);
            const minTemperature = Math.min(...temperatures);
            const maxTemperature = Math.max(...temperatures);

            this.chartData.datasets[0].data = this.weatherData.map((data) => ({
                x: new Date(data.date).getTime(),
                y: data.temperature
            }));

            this.chartOptions.scales.y.min = minTemperature;
            this.chartOptions.scales.y.max = maxTemperature;

            this.chart?.update();
        }
    }

    constructor() {
        this.chart?.update();
    }
}
