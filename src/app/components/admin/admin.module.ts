import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { AngularMaterialsModule } from '../shared/angular-materials.module';

import { UsersComponent } from './users/users.component';
import { AdminProductsComponent } from './admin-products/admin-products.component';
import { AdminRoutingModule } from './admin-routing.module';
import { SideBarComponent } from './side-bar/side-bar.component';
import { AddEditProdDialogComponent } from './admin-products/add-edit-prod-dialog/add-edit-prod-dialog.component';
import { AddProdCategoryComponent } from './admin-products/add-prod-category/add-prod-category.component';
import { AddEditBrandDialogComponent } from './brands/add-edit-brand-dialog/add-edit-brand-dialog.component';
import { BrandsComponent } from './brands/brands.component';

@NgModule({
  declarations: [
    UsersComponent,
    AdminProductsComponent,
    SideBarComponent,
    AddEditProdDialogComponent,
    AddProdCategoryComponent,
    AddEditBrandDialogComponent,
    BrandsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    AngularMaterialsModule,
    SharedModule
  ]
})
export class AdminModule { }
