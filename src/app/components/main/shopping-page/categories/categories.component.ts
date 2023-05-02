import { Component } from '@angular/core';
import { Subject, map, takeUntil } from 'rxjs';
import { CategoryRes } from 'src/app/models/products/category-res.interface';
import { Category } from 'src/app/models/products/category.interface';

import { CategoryService } from 'src/app/services/category-service/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {
  categories: Category[] = [];

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private categoryService: CategoryService
  ){}

  ngOnInit(): void {
    this.getCategories();
  }

  private getCategories(): void {
    this.categoryService.getAllCategories()
      .pipe(map((data) => {
        return data.data.map( (res: CategoryRes) => {
          return {
            id: res._id,
            name: res.name,
            type: res.type
          }
        })
      }), takeUntil(this.destroy$))
      .subscribe(data => {
        this.categories = data;
    })
  }
}
