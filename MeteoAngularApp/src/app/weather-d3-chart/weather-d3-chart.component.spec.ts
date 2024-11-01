import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherD3ChartComponent } from './weather-d3-chart.component';

describe('WeatherD3ChartComponent', () => {
  let component: WeatherD3ChartComponent;
  let fixture: ComponentFixture<WeatherD3ChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeatherD3ChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeatherD3ChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
