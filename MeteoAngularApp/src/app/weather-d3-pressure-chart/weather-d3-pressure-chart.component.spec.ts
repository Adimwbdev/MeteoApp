import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherD3PressureChartComponent } from './weather-d3-pressure-chart.component';

describe('WeatherD3PressureChartComponent', () => {
  let component: WeatherD3PressureChartComponent;
  let fixture: ComponentFixture<WeatherD3PressureChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeatherD3PressureChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeatherD3PressureChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
