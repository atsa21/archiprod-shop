import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductCard } from 'src/app/models/products/product-card.interface';
import { AddEditProdDialogComponent } from '../../admin/admin-products/add-edit-prod-dialog/add-edit-prod-dialog.component';
import { ProductService } from 'src/app/services/product-service/product.service';
import { take } from 'rxjs';
import { SnackBarService } from 'src/app/services/snack-bar-service/snack-bar.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {

  @Input() product!: ProductCard;
  @Input() canEdit = false;

  constructor(
    private dialog : MatDialog,
    private productService: ProductService,
    private snack: SnackBarService
  ) {}

  openEditProducts(): void {
    this.dialog.open(AddEditProdDialogComponent, {
      width: '480px',
      data: { 
        product: this.product, 
        isEditing: true }
    });
  }

  deleteProduct(id: string | undefined): void {
    if (id){
      this.productService.deleteProduct(id).pipe(take(1)).subscribe(() => {
        this.snack.openSnackBar('delete prod', 'success');
      })
    }
  }

}
