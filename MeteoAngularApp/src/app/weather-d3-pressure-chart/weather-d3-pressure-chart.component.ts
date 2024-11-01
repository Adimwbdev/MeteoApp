// src/app/weather-d3-pressure-chart/weather-d3-pressure-chart.component.ts
import { Component, Input, OnChanges, SimpleChanges, ElementRef } from '@angular/core';
import * as d3 from 'd3';
import { WeatherData } from '../models/weather-data.model';

@Component({
  selector: 'app-weather-d3-pressure-chart',
  template: '<svg width="800" height="400"></svg>',
  styleUrls: ['./weather-d3-pressure-chart.component.css'],
  standalone: true
})
export class WeatherD3PressureChartComponent implements OnChanges {
  @Input() weatherData: WeatherData[] = [];

  constructor(private el: ElementRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['weatherData'] && this.weatherData.length) {
      console.log('Pressure data changed, drawing chart:', this.weatherData);
      this.drawChart();
    }
  }

  private drawChart(): void {
    const data = this.weatherData
      .map(d => ({
        date: new Date(d.date).getTime(),
        pressure: d.pressure
      }))
      .filter(d => !isNaN(d.date) && d.pressure !== undefined);

    if (data.length === 0) {
      console.error('No valid data to display for Pressure');
      return;
    }

    const minDate = Math.min(...data.map(d => d.date));
    const maxDate = Math.max(...data.map(d => d.date));
    const maxPressure = Math.max(...data.map(d => d.pressure));

    const svg = d3.select(this.el.nativeElement).select('svg');
    svg.selectAll('*').remove();

    const margin = { top: 20, right: 30, bottom: 40, left: 40 };
    const width = +svg.attr('width') - margin.left - margin.right;
    const height = +svg.attr('height') - margin.top - margin.bottom;

    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleTime()
      .domain([new Date(minDate), new Date(maxDate)])
      .range([0, width]);

    const y = d3.scaleLinear()
      .domain([0, maxPressure]).nice()
      .range([height, 0]);

    g.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x));

    g.append('g')
      .call(d3.axisLeft(y));

    g.selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('cx', d => x(d.date))
      .attr('cy', d => y(d.pressure))
      .attr('r', 5) // Adjust size
      .attr('fill', 'orange'); // Color for pressure points
  }
}
