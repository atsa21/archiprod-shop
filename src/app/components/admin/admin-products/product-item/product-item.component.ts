import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Brand } from 'src/app/models/products/brand.interface';
import { ProductCard } from 'src/app/models/products/product-card.interface';
import { ProductService } from 'src/app/services/product-service/product.service';
import { SnackBarService } from 'src/app/services/snack-bar-service/snack-bar.service';
import { AddEditProdDialogComponent } from '../add-edit-prod-dialog/add-edit-prod-dialog.component';
import { take } from 'rxjs';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent {
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
