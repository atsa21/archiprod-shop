import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BrandService } from 'src/app/services/brands-service/brand.service';
import { AddEditBrandDialogComponent } from './add-edit-brand-dialog/add-edit-brand-dialog.component';
import { Subject, takeUntil } from 'rxjs';
import { Brand, BrandListRes } from 'src/app/models/products/brand.interface';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit {

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
    this.brandService.getAllBrands(this.page, this.pageSize).pipe(takeUntil(this.destroy$)).subscribe((res: BrandListRes) => {
      const brandList = res.data.map(el => ({ ...el, id: el._id })).map(({ _id, ...rest }) => rest);
      this.brands = brandList;
      this.totalElements = res.totalElements;
    })
  }

  public openBrandDialog(isEditing: boolean ): void {
    const dialogRef = this.dialog.open(AddEditBrandDialogComponent, {
      width: '420px',
      data: { isEditing: isEditing }
    });
  }

}
