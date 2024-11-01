// src/app/weather-d3-chart/weather-d3-chart.component.ts
import { Component, Input, OnChanges, SimpleChanges, ElementRef } from '@angular/core';
import * as d3 from 'd3';
import { WeatherData } from '../models/weather-data.model';

@Component({
    selector: 'app-weather-d3-chart',
    template: '<svg width="800" height="400"></svg>',
    styleUrls: ['./weather-d3-chart.component.css'],
    standalone: true
})
export class WeatherD3ChartComponent implements OnChanges {
    @Input() weatherData: WeatherData[] = []; // Expecting weatherData to be an array of WeatherData

    constructor(private el: ElementRef) {}

    ngOnChanges(changes: SimpleChanges): void {
        // Check if the weatherData input has changed and has data
        if (changes['weatherData'] && this.weatherData.length) {
            console.log('Weather data changed, drawing chart:', this.weatherData);
            this.drawChart();
        }
    }

    private drawChart(): void {
        // Map the weather data to the format we need for D3
        const data = this.weatherData
            .map(d => ({
                date: new Date(d.date).getTime(), // Convert date to milliseconds
                temperature: d.temperature
            }))
            .filter(d => !isNaN(d.date) && d.temperature !== undefined); // Only keep valid entries

        // Check if data is empty after filtering
        if (data.length === 0) {
            console.error('No valid data to display');
            return; // Exit if there's no valid data
        }

        // Find the min and max date values manually
        const minDate = Math.min(...data.map(d => d.date));
        const maxDate = Math.max(...data.map(d => d.date));
        const maxTemperature = Math.max(...data.map(d => d.temperature));

        const svg = d3.select(this.el.nativeElement).select('svg');
        svg.selectAll('*').remove(); // Clear previous content

        const margin = { top: 20, right: 30, bottom: 40, left: 40 };
        const width = +svg.attr('width') - margin.left - margin.right;
        const height = +svg.attr('height') - margin.top - margin.bottom;

        const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

        // Set up the scales using min and max values directly
        const x = d3.scaleTime()
            .domain([new Date(minDate), new Date(maxDate)]) // Set the domain using min and max
            .range([0, width]);

        const y = d3.scaleLinear()
            .domain([0, maxTemperature]).nice() // Use maxTemperature
            .range([height, 0]);

        // Axes
        g.append('g')
            .attr('transform', `translate(0,${height})`)
            .call(d3.axisBottom(x));

        g.append('g')
            .call(d3.axisLeft(y));

        // Add points instead of a line
        g.selectAll('circle')
            .data(data)
            .enter()
            .append('circle')
            .attr('cx', d => x(d.date)) // Set the x position based on date
            .attr('cy', d => y(d.temperature)) // Set the y position based on temperature
            .attr('r', 5) // Set the radius of the points (adjust size here)
            .attr('fill', 'steelblue'); // Set the color of the points
    }
}
