import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductCard } from 'src/app/models/products/product-card.interface';
import { AddEditProdDialogComponent } from '../../admin/admin-products/add-edit-prod-dialog/add-edit-prod-dialog.component';
import { ProductService } from 'src/app/services/product-service/product.service';
import { take } from 'rxjs';
import { SnackBarService } from 'src/app/services/snack-bar-service/snack-bar.service';
import { Brand } from 'src/app/models/products/brand.interface';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {

  @Input() product!: ProductCard;
  @Input() categories!: any;
  @Input() brands!: Brand;
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
        categories: this.categories,
        brands: this.brands,
        isEditing: true }
    });
  }

  deleteProduct(): void {
    if (this.product.id){
      this.productService.deleteProduct(this.product.id).pipe(take(1)).subscribe((res) => {
        this.snack.openSnackBar(res.message, 'success');
      })
    }
  }

}
