import { Component, OnInit } from '@angular/core';
import { Subject, map, takeUntil } from 'rxjs';
import { CategoryRes } from 'src/app/models/products/category-res.interface';
import { Category } from 'src/app/models/products/category.interface';
import { ProductCard, ProductListRes } from 'src/app/models/products/product-card.interface';
import { CategoryService } from 'src/app/services/category-service/category.service';
import { ProductService } from 'src/app/services/product-service/product.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  categories: Category[] = [];
  products: ProductCard[] = [];
  prodOnSale: ProductCard[] = [];

  articles = [
    { id:'1', title: '8 Tips for choosing the Perfect Sofa', image:'/assets/img/homepage-what-is-arch.png' },
    { id:'2', title: '8 Tips for choosing the Perfect Sofa', image:'/assets/img/homepage-what-is-arch.png' },
    { id:'3', title: '8 Tips for choosing the Perfect Sofa', image:'/assets/img/homepage-what-is-arch.png' },
    { id:'4', title: '8 Tips for choosing the Perfect Sofa', image:'/assets/img/homepage-what-is-arch.png' }
  ];

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService
  ){}

  ngOnInit(): void {
    this.getProductsNotOnSale();
    this.getProductsOnSale();
    this.getCategories();
  }

  private getProductsNotOnSale(): void {
    this.productService.getProductsOnSale(1, 4, false)
    .pipe(takeUntil(this.destroy$))
    .subscribe((res: ProductListRes) => {
      const prodOnSaleList = res.data.map(el => ({ ...el, id: el._id })).map(({ _id, ...rest }) => rest);
      this.products = prodOnSaleList;
    })
  }

  private getProductsOnSale(): void {
    this.productService.getProductsOnSale(1, 4, true)
    .pipe(takeUntil(this.destroy$))
    .subscribe((res: ProductListRes) => {
      const prodOnSaleList = res.data.map(el => ({ ...el, id: el._id })).map(({ _id, ...rest }) => rest);
      this.prodOnSale = prodOnSaleList;
    })
  }

  private getCategories(): void {
    this.categoryService.getAllCategories()
      .pipe(map((data) => {
        return data.data.map( (res: CategoryRes) => {
          return {
            id: res._id,
            name: res.name,
            image: res.image,
            type: res.type
          }
        })
      }), takeUntil(this.destroy$))
      .subscribe(data => {
        data.forEach((el: any) => {
          const name = el.name.toLowerCase();
          el.link = '/shop/' + name;
        });
        this.categories = data;
    })
  }
}
