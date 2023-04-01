import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { ShoppingPageComponent } from './shopping-page/shopping-page.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';


const routesMain: Routes = [
  { path: '',  component: HomePageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'shop', component: ShoppingPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routesMain)],
  exports: [RouterModule]
})
export class MainRoutingModule { }