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

  descriptionList: any;
  products: ProductCard[] = [];
  categories: Category[] = [];
  types: any = [
    {id: '111', name: 'Chair'}
  ];
  brands: any = [
    {id: '111', name: 'Flexform'}
  ];
  materials: any = [
    {id: '111', name: 'Wood'}
  ];

  constructor(
    private dialog : MatDialog,
    private categoryService: CategoryService,
    private productService: ProductService
  ){}

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
    this.prodDescriptionData = {
      categories: [],
      types: this.types,
      brands: this.brands,
      materials: this.materials
    };
  }

  private getProducts(): void {
    this.productService.getAllProducts()
      .pipe(map((data) => {
        return data.data.map( (res: any) => {
          return {
            id: res._id,
            brand: res.brand,
            collectionName: res.collectionName,
            category: res.category,
            type: res.type,
            imagePath: res.imagePath,
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
        this.prodDescriptionData.categories = this.categories;
    })
  }

  public openDialog( title: string, name: string, data: any ): void {
    const dialogRef = this.dialog.open(AddEditProdListsComponent, {
      width: '420px',
      data: { dialogTitle: title, dialogName: name, list: data }
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
        descriptionList: this.prodDescriptionData , 
        isEditing: false }
    });
  }

  public openCloseMenu(): void {
    this.menuOpened = !this.menuOpened;
  }
  
}
