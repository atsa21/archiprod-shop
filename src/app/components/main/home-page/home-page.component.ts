import { Component, OnInit } from '@angular/core';
import { Subject, map, takeUntil } from 'rxjs';
import { ProductCard, ProductListRes } from 'src/app/models/products/product-card.interface';
import { ProductService } from 'src/app/services/product-service/product.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  products: ProductCard[] = [];
  prodOnSale: ProductCard[] = [];

  articles = [
    { id:'1', title: '8 Tips for choosing the Perfect Sofa', image:'/assets/img/homepage-what-is-arch.png' },
    { id:'2', title: '8 Tips for choosing the Perfect Sofa', image:'/assets/img/homepage-what-is-arch.png' },
    { id:'3', title: '8 Tips for choosing the Perfect Sofa', image:'/assets/img/homepage-what-is-arch.png' },
    { id:'4', title: '8 Tips for choosing the Perfect Sofa', image:'/assets/img/homepage-what-is-arch.png' }
  ];

  private destroy: Subject<boolean> = new Subject<boolean>();

  constructor(
    private productService: ProductService
  ){}

  ngOnInit(): void {
    this.getProductsNotOnSale();
    this.getProductsOnSale();
  }

  private getProductsNotOnSale(): void {
    this.productService.getProductsOnSale(1, 4, false)
    .pipe(takeUntil(this.destroy))
    .subscribe((res: ProductListRes) => {
      const prodOnSaleList = res.data.map(el => ({ ...el, id: el._id })).map(({ _id, ...rest }) => rest);
      this.products = prodOnSaleList;
    })
  }

  private getProductsOnSale(): void {
    this.productService.getProductsOnSale(1, 4, true)
    .pipe(takeUntil(this.destroy))
    .subscribe((res: ProductListRes) => {
      const prodOnSaleList = res.data.map(el => ({ ...el, id: el._id })).map(({ _id, ...rest }) => rest);
      this.prodOnSale = prodOnSaleList;
    })
  }
}
