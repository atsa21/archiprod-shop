import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';

const routesMain: Routes = [
  { path: '',  component: HomePageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routesMain)],
  exports: [RouterModule]
})
export class MainRoutingModule { }