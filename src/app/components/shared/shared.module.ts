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
import { CurrencyPipe } from 'src/app/pipes/currency/currency.pipe';
import { InputErrorComponent } from './input-error/input-error.component';
import { BrandCardComponent } from './brand-card/brand-card.component';
import { CategoryCardComponent } from './category-card/category-card.component';
import { CapitalizeFirstLetterPipe } from 'src/app/pipes/capitalizeFirstLetter/capitalize-first-letter.pipe';
import { TypeCardComponent } from './type-card/type-card.component';
import { AngularMaterialsModule } from './angular-materials.module';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { GoogleMapsModule } from '@angular/google-maps';

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
    CapitalizeFirstLetterPipe,
    InputErrorComponent,
    BrandCardComponent,
    CategoryCardComponent,
    TypeCardComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    ImageCropperModule,
    AngularMaterialsModule,
    GooglePlaceModule,
    GoogleMapsModule
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
    CapitalizeFirstLetterPipe,
    InputErrorComponent,
    BrandCardComponent,
    CategoryCardComponent,
    TypeCardComponent,
    GooglePlaceModule,
    GoogleMapsModule
  ]
})
export class SharedModule { }
