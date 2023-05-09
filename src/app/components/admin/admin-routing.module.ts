import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminProductsComponent } from './admin-products/admin-products.component';
import { UsersComponent } from './users/users.component';
import { AdminCategoriesComponent } from './admin-categories/admin-categories.component';
import { AdminBrandsComponent } from './admin-brands/admin-brands.component';

const routesAdmin: Routes = [
  { path: '',  component: AdminProductsComponent },
  { path: 'categories', component: AdminCategoriesComponent },
  { path: 'categories/:category', component: AdminCategoriesComponent },
  { path: 'brands', component: AdminBrandsComponent },
  { path: 'users', component: UsersComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routesAdmin)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }