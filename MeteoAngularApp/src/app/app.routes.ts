import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeatherComponent } from './weather/weather.component';
import { AddCityComponent } from './add-city/add-city.component';

export const routes: Routes = [
  { path: '', component: WeatherComponent }, // Default route for weather data
  { path: 'add-city', component: AddCityComponent } // Route for adding a new city
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
