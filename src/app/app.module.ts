import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { HomePageComponent } from './components/main/home-page/home-page.component';
import { ShoppingPageComponent } from './components/main/shopping-page/shopping-page.component';
import { LoginComponent } from './components/main/login/login.component';
import { SignUpComponent } from './components/main/sign-up/sign-up.component';
import { SharedComponent } from './components/main/shared/shared.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HomePageComponent,
    ShoppingPageComponent,
    LoginComponent,
    SignUpComponent,
    SharedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
