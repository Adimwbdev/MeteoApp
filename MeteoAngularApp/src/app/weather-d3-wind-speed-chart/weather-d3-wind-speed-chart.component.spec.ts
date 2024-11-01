import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherD3WindSpeedChartComponent } from './weather-d3-wind-speed-chart.component';

describe('WeatherD3WindSpeedChartComponent', () => {
  let component: WeatherD3WindSpeedChartComponent;
  let fixture: ComponentFixture<WeatherD3WindSpeedChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeatherD3WindSpeedChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeatherD3WindSpeedChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
