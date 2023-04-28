import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Brand } from 'src/app/models/products/brand.interface';
import { BrandService } from 'src/app/services/brands-service/brand.service';
import { SnackBarService } from 'src/app/services/snack-bar-service/snack-bar.service';
import { AddEditBrandDialogComponent } from '../../admin/brands/add-edit-brand-dialog/add-edit-brand-dialog.component';
import { take } from 'rxjs';

@Component({
  selector: 'app-brand-card',
  templateUrl: './brand-card.component.html',
  styleUrls: ['./brand-card.component.scss']
})
export class BrandCardComponent {

  @Input() brand!: Brand;
  @Input() canEdit = false;

  constructor(
    private dialog: MatDialog,
    private brandService: BrandService,
    private snack: SnackBarService
  ) {}

  openEditBrand(): void {
    this.dialog.open(AddEditBrandDialogComponent, {
      width: '480px',
      data: { 
        brand: this.brand, 
        isEditing: true }
    });
  }

  deleteBrand(): void {
    if (this.brand.id){
      this.brandService.deleteBrand(this.brand.id).pipe(take(1)).subscribe((res) => {
        this.snack.openSnackBar(res.message, 'success');
      })
    }
  }
}
