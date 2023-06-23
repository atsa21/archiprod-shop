import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { CartPageComponent } from './cart-page/cart-page.component';

const routesMain: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'cart', component: CartPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routesMain)],
  exports: [RouterModule]
})
export class MainRoutingModule { }