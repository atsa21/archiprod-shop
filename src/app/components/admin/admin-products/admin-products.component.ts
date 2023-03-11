import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs';
import { Category } from 'src/app/models/category';
import { CategoryRes } from 'src/app/models/category-res';
import { CategoryService } from 'src/app/services/category.service';
import { AddEditCategoryComponent } from './add-edit-category/add-edit-category.component';
import { AddEditProdDialogComponent } from './add-edit-prod-dialog/add-edit-prod-dialog.component';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent {

  public menuOpened = false;

  categories: Category[] = [];
  types: any;
  brands: any;

  prodDescriptionData: any;

  products = [
    { id:'1', brand: 'FLOS', description:'CHIARA T PINK GOLD - LED aluminium table lamp', image:'/assets/img/homepage-what-is-arch.png', onSale: false },
    { id:'2', brand: 'FLOS', description:'CHIARA T PINK GOLD - LED aluminium table lamp', image:'/assets/img/homepage-what-is-arch.png', onSale: false },
    { id:'3', brand: 'FLOS', description:'CHIARA T PINK GOLD - LED aluminium table lamp', image:'/assets/img/homepage-what-is-arch.png', onSale: false },
    { id:'4', brand: 'FLOS', description:'CHIARA T PINK GOLD - LED aluminium table lamp', image:'/assets/img/homepage-what-is-arch.png', onSale: false }
  ];

  constructor(
    private dialog : MatDialog,
    private categoryService: CategoryService
  ){}

  ngOnInit(): void {
    this.getCategories();
    this.prodDescriptionData = {
      categories: this.categories,
      types: this.types,
      brands: this.brands
    }
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

  public openDialog(data: any): void {
    this.dialog.open(AddEditCategoryComponent, {
      width: '420px',
      data: data
    });
  }

  public openAddProducts(): void {
    this.dialog.open(AddEditProdDialogComponent, {
      width: '420px',
      data: this.prodDescriptionData
    });
  }
  
}
