import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { map, take } from 'rxjs';
import { Category } from 'src/app/models/category';
import { CategoryRes } from 'src/app/models/category-res';
import { ProductCard } from 'src/app/models/product-card';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { AddEditProdDialogComponent } from './add-edit-prod-dialog/add-edit-prod-dialog.component';
import { AddEditProdListsComponent } from './add-edit-prod-lists/add-edit-prod-lists.component';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent {

  public menuOpened = false;

  prodDescriptionData: any;

  products: ProductCard[] = [];
  categories: Category[] = [];

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
    this.productService.getAllProducts()
      .pipe(map((data) => {
        return data.data.map( (res: any) => {
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
          }
        })
      }))
      .subscribe(data => {
        this.products = data;
    })
  }

  private getCategories(): void {
    this.categoryService.getAllCategories()
      .pipe(map((data) => {
        return data.data.map( (res: CategoryRes) => {
          return {
            id: res._id,
            name: res.name
          }
        })
      }))
      .subscribe(data => {
        this.categories = data;
    })
  }

  public openDialog( title: string, name: string ): void {
    const dialogRef = this.dialog.open(AddEditProdListsComponent, {
      width: '420px',
      data: { dialogTitle: title, dialogName: name }
    });
    this.openCloseMenu();
    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe(() => {
        
      });
  }

  public openAddProducts(): void {
    this.dialog.open(AddEditProdDialogComponent, {
      width: '480px',
      data: {
        isEditing: false }
    });
  }

  public openCloseMenu(): void {
    this.menuOpened = !this.menuOpened;
  }
  
}
