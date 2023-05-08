import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

import { CategoriesComponent } from './categories/categories.component';
import { ShopRouringModule } from './shop-routing.module';
import { AngularMaterialsModule } from '../../shared/angular-materials.module';

@NgModule({
  declarations: [
    CategoriesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ShopRouringModule,
    AngularMaterialsModule
  ]
})
export class ShopModule { }
