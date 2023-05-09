import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject, map, take, takeUntil } from 'rxjs';
import { Category } from 'src/app/models/products/category.interface';
import { CategoryRes } from 'src/app/models/products/category-res.interface';
import { ProductCard, ProductListRes } from 'src/app/models/products/product-card.interface';
import { CategoryService } from 'src/app/services/category-service/category.service';
import { ProductService } from 'src/app/services/product-service/product.service';
import { AddEditProdDialogComponent } from './add-edit-prod-dialog/add-edit-prod-dialog.component';
import { BrandService } from 'src/app/services/brands-service/brand.service';
import { BrandListRes } from 'src/app/models/products/brand.interface';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit {

  products: ProductCard[] = [];
  categories: Category[] = [];
  brands: any;

  menuOpened = false;

  prodDescriptionData: any;
  totalElements = 0;
  pageSize = 8;

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private dialog : MatDialog,
    private categoryService: CategoryService,
    private productService: ProductService,
    private brandService: BrandService
  ){}

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
    this.getBrands();
  }

  private getProducts(): void {
    this.productService.getProducts(1, this.pageSize)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: ProductListRes) => {
        const prodList = res.data.map(el => ({ ...el, id: el._id })).map(({ _id, ...rest }) => rest);
        this.products = prodList;
        this.totalElements = res.totalElements;
      })
  }

  private getCategories(): void {
    this.categoryService.getAllCategories()
      .pipe(map((data) => {
        return data.data.map( (res: CategoryRes) => {
          return {
            id: res._id,
            name: res.name,
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

  private getBrands(): void {
    this.brandService.getAllBrands(1, this.pageSize).pipe(takeUntil(this.destroy$)).subscribe((res: BrandListRes) => {
      const brandList = res.data.map(el => ({ ...el, id: el._id })).map(({ _id, ...rest }) => rest);
      this.brands = brandList;
    })
  }

  public openAddProducts(): void {
    const dialogRef = this.dialog.open(AddEditProdDialogComponent, {
      width: '480px',
      data: {
        categories: this.categories,
        brands: this.brands
      }
    });
    dialogRef.afterClosed().pipe(take(1)).subscribe(() => {
      this.productService.getProducts(1, this.pageSize);
    });
  }

  public openCloseMenu(): void {
    this.menuOpened = !this.menuOpened;
  }
  
}
