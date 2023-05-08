import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminProductsComponent } from './admin-products/admin-products.component';
import { UsersComponent } from './users/users.component';
import { BrandsComponent } from './brands/brands.component';
import { AdminCategoriesComponent } from './admin-categories/admin-categories.component';

const routesAdmin: Routes = [
    { path: '',  component: AdminProductsComponent },
    { path: 'categories', component: AdminCategoriesComponent },
    { path: 'brands', component: BrandsComponent },
    { path: 'users', component: UsersComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routesAdmin)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }