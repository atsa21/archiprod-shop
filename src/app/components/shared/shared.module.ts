import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ImageCropperModule } from 'ngx-image-cropper';

import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SubscribeComponent } from './subscribe/subscribe.component';
import { OnSaleComponent } from './on-sale/on-sale.component';
import { ArticlesCardsComponent } from './articles-cards/articles-cards.component';
import { BannerComponent } from './banner/banner.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { CurrencyPipe } from 'src/app/pipe/currency.pipe';
import { InputErrorComponent } from './input-error/input-error.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SubscribeComponent,
    OnSaleComponent,
    ArticlesCardsComponent,
    BannerComponent,
    ProductCardComponent,
    CurrencyPipe,
    InputErrorComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    ImageCropperModule,
    MatSnackBarModule
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    HeaderComponent,
    FooterComponent,
    SubscribeComponent,
    OnSaleComponent,
    ArticlesCardsComponent,
    BannerComponent,
    ImageCropperModule,
    ProductCardComponent,
    CurrencyPipe,
    InputErrorComponent
  ]
})
export class SharedModule { }
