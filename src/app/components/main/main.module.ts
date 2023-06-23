import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { HomePageComponent } from './home-page/home-page.component';
import { ShoppingPageComponent } from './shopping-page/shopping-page.component';
import { AdvantagesComponent } from './home-page/advantages/advantages.component';
import { SharedModule } from '../shared/shared.module';
import { AngularMaterialsModule } from '../shared/angular-materials.module';
import { AdvantagesCardComponent } from './home-page/advantages/advantages-card/advantages-card.component';
import { AboutComponent } from './home-page/about/about.component';
import { MainBannerComponent } from './home-page/main-banner/main-banner.component';
import { SeoTextComponent } from './home-page/seo-text/seo-text.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { ClientInfoComponent } from './cart-page/client-info/client-info.component';

@NgModule({
    declarations: [
        HomePageComponent,
        ShoppingPageComponent,
        AdvantagesComponent,
        AdvantagesCardComponent,
        AboutComponent,
        MainBannerComponent,
        SeoTextComponent,
        CartPageComponent,
        ClientInfoComponent
    ],
    imports: [
        CommonModule,
        MainRoutingModule,
        AngularMaterialsModule,
        SharedModule
    ]
})
export class MainModule { }