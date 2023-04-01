import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductCard } from 'src/app/models/product-card';
import { AddEditProdDialogComponent } from '../../admin/admin-products/add-edit-prod-dialog/add-edit-prod-dialog.component';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {

  @Input() product!: ProductCard;
  @Input() canEdit: boolean = false;

  constructor(
    private dialog : MatDialog,
  ) {}

  public openEditProducts(): void {
    this.dialog.open(AddEditProdDialogComponent, {
      width: '480px',
      data: { 
        product: this.product, 
        isEditing: true }
    });
  }

}
