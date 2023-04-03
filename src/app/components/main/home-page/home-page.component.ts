import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { ProductCard } from 'src/app/models/products/product-card.interface';
import { ProductService } from 'src/app/services/product-service/product.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  products: ProductCard[] = [];

  articles = [
    { id:'1', title: '8 Tips for choosing the Perfect Sofa', image:'/assets/img/homepage-what-is-arch.png' },
    { id:'2', title: '8 Tips for choosing the Perfect Sofa', image:'/assets/img/homepage-what-is-arch.png' },
    { id:'3', title: '8 Tips for choosing the Perfect Sofa', image:'/assets/img/homepage-what-is-arch.png' },
    { id:'4', title: '8 Tips for choosing the Perfect Sofa', image:'/assets/img/homepage-what-is-arch.png' }
  ];

  constructor(
    private productService: ProductService
  ){}

  ngOnInit(): void {
    this.getProducts();
  }

  private getProducts(): void {
    this.productService.getProducts(1, 4)
      .pipe(map((res) => {
        return {
          prod: res.data.map((res: any) => {
            return {
              id: res._id,
              category: res.category,
              type: res.type,
              brand: res.brand,
              collectionName: res.collectionName,
              material: res.material,
              imagePath: res.imagePath,
              amount: res.amount,
              price: res.price,
              currency: res.currency,
              isOnSale: res.isOnSale
            };
          }),
          totalElements: res.totalElements
        }
      }))
      .subscribe( data => {
        // this.products = data.data;
      })
  }
}
