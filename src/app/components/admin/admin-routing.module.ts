import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminProductsComponent } from './admin-products/admin-products.component';
import { UsersComponent } from './users/users.component';

const routesAdmin: Routes = [
    { path: '',  component: AdminProductsComponent },
    { path: 'users', component: UsersComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routesAdmin)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }