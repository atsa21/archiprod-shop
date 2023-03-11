import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs';
import { Category } from 'src/app/models/category';
import { CategoryRes } from 'src/app/models/category-res';
import { CategoryService } from 'src/app/services/category.service';
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
  categories: Category[] = [];
  types: any;
  brands: any;

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
    };
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

  public openDialog( title: string, name: string, data: any ): void {
    this.dialog.open(AddEditProdListsComponent, {
      width: '420px',
      data: { dialogTitle: title,dialogName: name, list: data }
    });
    this.openCloseMenu();
  }

  public openAddProducts(): void {
    this.dialog.open(AddEditProdDialogComponent, {
      width: '420px',
      data: { descriptionList: this.prodDescriptionData , isEditing: false }
    });
  }

  public openCloseMenu(): void {
    this.menuOpened = !this.menuOpened;
  }
  
}
