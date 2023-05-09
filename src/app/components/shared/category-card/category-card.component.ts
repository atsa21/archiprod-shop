import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Category } from 'src/app/models/products/category.interface';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category-service/category.service';
import { SnackBarService } from 'src/app/services/snack-bar-service/snack-bar.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.scss']
})
export class CategoryCardComponent {
  @Input() category!: Category;
  @Input() canEdit = false;

  @Output() deletedCategoryId = new EventEmitter<string>();

  constructor(
    private router: Router,
    private categoryService: CategoryService,
    private snack: SnackBarService
  ){}

  goToPage(link: string | undefined): void {
    this.router.navigate([link]);
  }

  deleteCategory() {
      if(this.category.id) {
        this.categoryService.deleteCategory(this.category.id).pipe(take(1)).subscribe((res) => {
          this.snack.openSnackBar(res.message, 'success');
          this.deletedCategoryId.emit(this.category.id);
        })
      }
  }
}
