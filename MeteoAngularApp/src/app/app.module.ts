// src/app/app.module.ts

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgChartsModule } from 'ng2-charts';
import { AppComponent } from './app.component'; // Adjust the path if needed
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { AddCityComponent } from './add-city/add-city.component';



@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    NgChartsModule // Import NgChartsModule here
  ],
  bootstrap: [] // Keep this to bootstrap AppComponent
})
export class AppModule { }
