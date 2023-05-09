import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject, take, takeUntil } from 'rxjs';
import { Category, CategoryType } from 'src/app/models/products/category.interface';
import { CategoryService } from 'src/app/services/category-service/category.service';
import { AddEditCategoryComponent } from './add-edit-category/add-edit-category.component';
import { BrandService } from 'src/app/services/brands-service/brand.service';
import { BrandListRes } from 'src/app/models/products/brand.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { CapitalizeFirstLetterPipe } from 'src/app/pipes/capitalizeFirstLetter/capitalize-first-letter.pipe';

@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.scss'],
  providers: [ CapitalizeFirstLetterPipe ]
})
export class AdminCategoriesComponent implements OnInit {

  categories: Category[] = [];
  types: CategoryType[] = [];
  brands: string[] = [];

  categoryName: string = '';
  title: string = '';

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
    private brandService: BrandService,
    private capitalizeFirstLetter: CapitalizeFirstLetterPipe
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.categoryName = params['category'];
      this.title = this.categoryName ? this.capitalizeFirstLetter.transform(this.categoryName) : 'Categories';
    });
    if(this.categoryName) {
      this.categoryService.getCategoryByName(this.title)
      .pipe(take(1))
      .subscribe((res: any) => {
        this.types = res.data.type;
      }
    )} else {
      this.getCategories();
    }
    this.getBrands();
  }

  goToCategories(): void {
    this.router.navigate(['/admin/categories']);
  }

  getCategories(): void {
    this.categoryService.getAllCategories().pipe(takeUntil(this.destroy$)).subscribe((res: any) => {
      res.data.forEach((el: any) => {
        const name = el.name.toLowerCase();
        el.id = el._id;
        delete el._id;
        el.link = '/admin/categories/' + name;
      });
      this.categories = res.data;
    })
  }

  getBrands(): void {
    this.brandService.getBrandsList().pipe(takeUntil(this.destroy$)).subscribe((res: {message: string, data: string[]}) => {
      this.brands = res.data;
    })
  }

  openBrandDialog(isEditing: boolean ): void {
    const dialogRef = this.dialog.open(AddEditCategoryComponent, {
      width: '420px',
      data: { 
        isEditing: isEditing,
        brands: this.brands
      }
    });
    dialogRef.afterClosed().pipe(take(1)).subscribe(() => {
      this.getCategories();
    });
  }

  deleteCategory(id: string): void {
    this.categories = this.categories.filter(el => el.id !== id);
  }
}
