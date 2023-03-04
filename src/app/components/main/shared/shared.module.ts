import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SubscribeComponent } from './subscribe/subscribe.component';
import { RecommendationsComponent } from './recommendations/recommendations.component';
import { OnSaleComponent } from './on-sale/on-sale.component';
import { ArticlesCardsComponent } from './articles-cards/articles-cards.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SubscribeComponent,
    RecommendationsComponent,
    OnSaleComponent,
    ArticlesCardsComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    HeaderComponent,
    FooterComponent,
    SubscribeComponent,
    RecommendationsComponent,
    OnSaleComponent,
    ArticlesCardsComponent
  ]
})
export class SharedModule { }
