import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AccueilComponent } from './accueil/accueil.component';
import { ProblemeComponent } from './probleme/probleme.component';
import{RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProblemeData } from './probleme/typeprobleme-data';

@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    ProblemeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFontAwesomeModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
