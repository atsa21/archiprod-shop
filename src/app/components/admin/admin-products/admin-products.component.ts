import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEditCategoryComponent } from './add-edit-category/add-edit-category.component';
// import { AddEditProdDialogComponent } from './add-edit-prod-dialog/add-edit-prod-dialog.component';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent {

  public menuOpened = false;

  products = [
    { id:'1', brand: 'FLOS', description:'CHIARA T PINK GOLD - LED aluminium table lamp', image:'/assets/img/homepage-what-is-arch.png', onSale: false },
    { id:'2', brand: 'FLOS', description:'CHIARA T PINK GOLD - LED aluminium table lamp', image:'/assets/img/homepage-what-is-arch.png', onSale: false },
    { id:'3', brand: 'FLOS', description:'CHIARA T PINK GOLD - LED aluminium table lamp', image:'/assets/img/homepage-what-is-arch.png', onSale: false },
    { id:'4', brand: 'FLOS', description:'CHIARA T PINK GOLD - LED aluminium table lamp', image:'/assets/img/homepage-what-is-arch.png', onSale: false }
  ];

  constructor(
    private dialog : MatDialog
  ){}

  public openCategory(): void {
    this.dialog.open(AddEditCategoryComponent, {
      width: '420px'
    });
  }

  // public openProducts(): void {
  //   this.dialog.open(AddEditProdDialogComponent, {
  //     width: '420px'
  //   });
  // }
  
}
