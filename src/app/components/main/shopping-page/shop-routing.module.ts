import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { FurnitureComponent } from './furniture/furniture.component';
import { ChairsComponent } from './furniture/chairs/chairs.component';

const shopRoutes: Routes = [
  { path: '',  component: CategoriesComponent },
  { path: 'furniture', component: FurnitureComponent },
  { path: 'furniture/chairs', component: ChairsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(shopRoutes)],
  exports: [RouterModule]
})
export class ShopRouringModule { }