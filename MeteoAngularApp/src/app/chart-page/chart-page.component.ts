// src/app/chart-page/chart-page.component.ts

import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { WeatherData } from '../services/weather.service';
import * as d3 from 'd3';

@Component({
    selector: 'app-chart-page',
    templateUrl: './chart-page.component.html',
    styleUrls: ['./chart-page.component.css'],
    standalone: true
})
export class ChartPageComponent implements OnChanges {
    @Input() weatherData: WeatherData[] = [];

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['weatherData'] && this.weatherData.length) {
            this.drawChart();
        }
    }

    private drawChart(): void {
        // Your chart drawing logic using D3.js
        const svg = d3.select('svg');
        svg.selectAll('*').remove(); // Clear previous content

        // Continue with D3.js drawing logic...
    }
}
