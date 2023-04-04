import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BrandService } from 'src/app/services/brands-service/brand.service';
import { AddEditBrandDialogComponent } from './add-edit-brand-dialog/add-edit-brand-dialog.component';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private brandService: BrandService
  ) {}

  ngOnInit(): void {
    
  }

  public openBrandDialog(isEditing: boolean ): void {
    const dialogRef = this.dialog.open(AddEditBrandDialogComponent, {
      width: '420px',
      data: { list: [], isEditing: isEditing }
    });
  }

}
