import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  MatMenuExtensionsModule,
  MatTableExtensionsModule
} from 'extensions';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatTableModule,
    MatTableExtensionsModule,
    MatButtonModule,
    MatMenuModule,
    MatMenuExtensionsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
