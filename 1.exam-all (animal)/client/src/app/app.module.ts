import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutesModule } from './routes.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule }from '@angular/http';

import  Data  from './data/data.service'; 
import { UserService }  from './data/user.service'; 

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent   
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutesModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [Data, UserService,],
  bootstrap: [AppComponent]
})
export class AppModule { }
