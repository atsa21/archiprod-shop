import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { Category } from 'src/app/models/products/category.interface';
import { CategoryService } from 'src/app/services/category-service/category.service';
import { AddEditCategoryComponent } from './add-edit-category/add-edit-category.component';

@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.scss']
})
export class AdminCategoriesComponent implements OnInit {

  categories: Category[] = [];
  totalElements = 0;

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private dialog: MatDialog,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.categoryService.getAllCategories().pipe(takeUntil(this.destroy$)).subscribe((res: any) => {
      res.data.forEach((el: any) => {
        el.id = el._id;
        delete el._id;
      });
      this.categories = res.data;
      this.totalElements = res.totalElements;
    })
  }

  public openBrandDialog(isEditing: boolean ): void {
    const dialogRef = this.dialog.open(AddEditCategoryComponent, {
      width: '420px',
      data: { isEditing: isEditing }
    });
  }
}
