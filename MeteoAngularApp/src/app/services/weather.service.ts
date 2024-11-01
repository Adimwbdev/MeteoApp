import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators'; 
import { WeatherData } from '../models/weather-data.model'; // Import WeatherData model
import { City } from '../models/city.model'; // Import City model

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiUrl = 'http://localhost:5000/api/weatherdata';
  private weatherDataSubject = new BehaviorSubject<WeatherData[]>([]);
  weatherData$ = this.weatherDataSubject.asObservable();

  constructor(private http: HttpClient) {}

  getWeatherData(cityId: number): Observable<WeatherData[]> {
    console.log(`Fetching weather data for city ID: ${cityId}`);
    return this.http.get<WeatherData[]>(`${this.apiUrl}/${cityId}`).pipe(
      tap(data => {
        console.log('Data returned from API:', data);
        this.weatherDataSubject.next(data);
      })
    );
  }

  fetchAndStoreWeatherData(cityId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/fetchAndStore/${cityId}`, {});
  }

  getAllCities(): Observable<City[]> {
    return this.http.get<City[]>(`${this.apiUrl}/cities`).pipe(
      tap(cities => console.log('Cities returned from API:', cities))
    );
  }

  addCity(city: City): Observable<any> {
    return this.http.post(`${this.apiUrl}/cities`, city);
  }
}
