import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { Brand, BrandListRes } from 'src/app/models/products/brand.interface';
import { BrandService } from 'src/app/services/brands-service/brand.service';
import { AddEditBrandDialogComponent } from './add-edit-brand-dialog/add-edit-brand-dialog.component';

@Component({
  selector: 'app-admin-brands',
  templateUrl: './admin-brands.component.html',
  styleUrls: ['./admin-brands.component.scss']
})
export class AdminBrandsComponent {
  brands: Brand[] = [];
  totalElements = 0;

  private page = 1;
  private pageSize = 6;

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private dialog: MatDialog,
    private brandService: BrandService
  ) {}

  ngOnInit(): void {
    this.getBrands();
  }

  getBrands(): void {
    this.brandService.getAllBrands(this.page, this.pageSize).pipe(takeUntil(this.destroy$)).subscribe((res: BrandListRes) => {
      const brandList = res.data.map(el => ({ ...el, id: el._id })).map(({ _id, ...rest }) => rest);
      this.brands = brandList;
      this.totalElements = res.totalElements;
    })
  }

  openBrandDialog(isEditing: boolean ): void {
    const dialogRef = this.dialog.open(AddEditBrandDialogComponent, {
      width: '420px',
      data: { isEditing: isEditing }
    });
  }
}
