import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ImageCropperModule } from 'ngx-image-cropper';

import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SubscribeComponent } from './subscribe/subscribe.component';
import { OnSaleComponent } from './on-sale/on-sale.component';
import { ArticlesCardsComponent } from './articles-cards/articles-cards.component';
import { RecommendCardComponent } from './recommend-card/recommend-card.component';
import { BannerComponent } from './banner/banner.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { CurrencyPipe } from 'src/app/pipe/currency.pipe';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SubscribeComponent,
    RecommendCardComponent,
    OnSaleComponent,
    ArticlesCardsComponent,
    BannerComponent,
    ProductCardComponent,
    CurrencyPipe
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    ImageCropperModule
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    HeaderComponent,
    FooterComponent,
    SubscribeComponent,
    RecommendCardComponent,
    OnSaleComponent,
    ArticlesCardsComponent,
    BannerComponent,
    ImageCropperModule,
    ProductCardComponent,
    CurrencyPipe
  ]
})
export class SharedModule { }
