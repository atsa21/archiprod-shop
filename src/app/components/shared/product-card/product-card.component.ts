import { Component, Input } from '@angular/core';
import { ProductCard } from 'src/app/models/product-card';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {

  @Input() product!: ProductCard;
}
