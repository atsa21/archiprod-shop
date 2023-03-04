import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { HomePageComponent } from './home-page/home-page.component';
import { ShoppingPageComponent } from './shopping-page/shopping-page.component';
import { SharedModule } from './shared/shared.module';
import { AdvantagesComponent } from './home-page/advantages/advantages.component';
import { AngularMaterialsModule } from './shared/angular-materials.module';
import { AdvantagesCardComponent } from './home-page/advantages/advantages-card/advantages-card.component';
import { AboutComponent } from './home-page/about/about.component';
import { MainBannerComponent } from './home-page/main-banner/main-banner.component';

@NgModule({
    declarations: [
        HomePageComponent,
        ShoppingPageComponent,
        AdvantagesComponent,
        AdvantagesCardComponent,
        AboutComponent,
        MainBannerComponent
    ],
    imports: [
        CommonModule,
        MainRoutingModule,
        SharedModule,
        AngularMaterialsModule
    ]
})
export class MainModule { }