import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { AngularMaterialsModule } from '../shared/angular-materials.module';

import { UsersComponent } from './users/users.component';
import { AdminProductsComponent } from './admin-products/admin-products.component';
import { AdminRoutingModule } from './admin-routing.module';
import { SideBarComponent } from './side-bar/side-bar.component';
import { AddEditProdDialogComponent } from './admin-products/add-edit-prod-dialog/add-edit-prod-dialog.component';
import { AddEditProdListsComponent } from './admin-products/add-edit-prod-lists/add-edit-prod-lists.component';
import { AddEditBrandDialogComponent } from './admin-products/add-edit-brand-dialog/add-edit-brand-dialog.component';

@NgModule({
  declarations: [
    UsersComponent,
    AdminProductsComponent,
    SideBarComponent,
    AddEditProdDialogComponent,
    AddEditProdListsComponent,
    AddEditBrandDialogComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    AngularMaterialsModule,
    SharedModule
  ]
})
export class AdminModule { }
