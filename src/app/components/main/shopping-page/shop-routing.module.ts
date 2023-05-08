import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';

const shopRoutes: Routes = [
  { path: '',  component: CategoriesComponent },
  { path: ':category', component: CategoriesComponent },
  { path: ':category/:type', component: CategoriesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(shopRoutes)],
  exports: [RouterModule]
})
export class ShopRouringModule { }