import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';

// Component
import { AppComponent } from './app.component';
import { CalcComponent } from './calc/calc.component';
import { HistoryComponent } from './history/history.component';
import { LandComponent } from './land/land.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// UI (angular material)




@NgModule({
  declarations: [
    AppComponent,
    CalcComponent,
    HistoryComponent,
    LandComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
