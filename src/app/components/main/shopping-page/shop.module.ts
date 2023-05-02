import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

import { FurnitureComponent } from './furniture/furniture.component';
import { ChairsComponent } from './furniture/chairs/chairs.component';
import { CategoriesComponent } from './categories/categories.component';
import { ShopRouringModule } from './shop-routing.module';
import { BathroomComponent } from './bathroom/bathroom.component';
import { LightingComponent } from './lighting/lighting.component';
import { DecorComponent } from './decor/decor.component';
import { KitchenComponent } from './kitchen/kitchen.component';

@NgModule({
  declarations: [
    CategoriesComponent,
    FurnitureComponent,
    ChairsComponent,
    BathroomComponent,
    LightingComponent,
    DecorComponent,
    KitchenComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ShopRouringModule
  ]
})
export class ShopModule { }
