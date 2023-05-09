import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { AngularMaterialsModule } from '../shared/angular-materials.module';

import { UsersComponent } from './users/users.component';
import { AdminProductsComponent } from './admin-products/admin-products.component';
import { AdminRoutingModule } from './admin-routing.module';
import { SideBarComponent } from './side-bar/side-bar.component';
import { AddEditProdDialogComponent } from './admin-products/add-edit-prod-dialog/add-edit-prod-dialog.component';
import { AddEditBrandDialogComponent } from './admin-brands/add-edit-brand-dialog/add-edit-brand-dialog.component';
import { ProductItemComponent } from './admin-products/product-item/product-item.component';
import { UserCardComponent } from './users/user-card/user-card.component';
import { AdminCategoriesComponent } from './admin-categories/admin-categories.component';
import { AdminBrandsComponent } from './admin-brands/admin-brands.component';
import { AddEditCategoryComponent } from './admin-categories/add-edit-category/add-edit-category.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [
    UsersComponent,
    AdminProductsComponent,
    SideBarComponent,
    AddEditProdDialogComponent,
    AddEditBrandDialogComponent,
    ProductItemComponent,
    UserCardComponent,
    AdminCategoriesComponent,
    AdminBrandsComponent,
    AddEditCategoryComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    AngularMaterialsModule,
    SharedModule,
    InfiniteScrollModule
  ]
})
export class AdminModule { }
