import { Component } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { City } from '../models/city.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-add-city',
  templateUrl: './add-city.component.html',
  styleUrls: ['./add-city.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, MatButtonModule, MatInputModule, MatCardModule]
})
export class AddCityComponent {
  city: City = { cityID: 0, cityName: '', lat: 0, lon: 0 };
  message?: string;

  constructor(private weatherService: WeatherService, private router: Router) {}

  // Method called when the Add City form is submitted
  onSubmit(): void {
    this.weatherService.addCity(this.city).subscribe(
      response => {
        this.message = response.message;
        this.city = { cityID: 0, cityName: '', lat: 0, lon: 0 }; // Reset form fields after successful submission
      },
      error => {
        this.message = "Error adding city";
        console.error("Error:", error);
      }
    );
  }

  // Method to clear all the input fields
  clearFields(): void {
    this.city = { cityID: 0, cityName: '', lat: 0, lon: 0 }; // Reset the city model values
    this.message = ''; // Clear any existing message
  }

  // Method to navigate back to the homepage
  goToHomePage(): void {
    this.router.navigate(['/']);
  }
}
