import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject, map, take, takeUntil } from 'rxjs';
import { Category } from 'src/app/models/products/category.interface';
import { CategoryRes } from 'src/app/models/products/category-res.interface';
import { ProductCard, ProductRes } from 'src/app/models/products/product-card.interface';
import { CategoryService } from 'src/app/services/category-service/category.service';
import { ProductService } from 'src/app/services/product-service/product.service';
import { AddEditProdDialogComponent } from './add-edit-prod-dialog/add-edit-prod-dialog.component';
import { AddProdCategoryComponent } from './add-prod-category/add-prod-category.component';
import { AddEditBrandDialogComponent } from './add-edit-brand-dialog/add-edit-brand-dialog.component';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit {

  products: ProductCard[] = [];
  categories: Category[] = [];

  menuOpened = false;

  prodDescriptionData: any;
  totalElements = 0;
  pageSize = 8;

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private dialog : MatDialog,
    private categoryService: CategoryService,
    private productService: ProductService
  ){}

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
  }

  private getProducts(): void {
    this.productService.getProducts(1, this.pageSize)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: ProductRes) => {
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
        this.categories = data;
    })
  }

  public openDialog( title: string, name: string, isEditing: boolean ): void {
    const dialogRef = this.dialog.open(AddProdCategoryComponent, {
      width: '420px',
      data: { dialogTitle: title, dialogName: name, list: this.categories, isEditing: isEditing}
    });
    this.openCloseMenu();
    dialogRef.afterClosed().pipe(take(1)).subscribe(() => {
      this.getCategories();
    });
  }

  public openBrandDialog(isEditing: boolean ): void {
    const dialogRef = this.dialog.open(AddEditBrandDialogComponent, {
      width: '420px',
      data: { list: this.categories, isEditing: isEditing}
    });
    this.openCloseMenu();
  }

  public openAddProducts(): void {
    const dialogRef = this.dialog.open(AddEditProdDialogComponent, {
      width: '480px',
      data: {
        isEditing: false,
        categories: this.categories
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
