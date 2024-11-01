// src/app/app.module.ts

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgChartsModule } from 'ng2-charts';
import { AppComponent } from './app.component'; 
import { HttpClientModule } from '@angular/common/http';
import { AddCityComponent } from './add-city/add-city.component';



@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    NgChartsModule 
  ],
  bootstrap: []
})
export class AppModule { }
