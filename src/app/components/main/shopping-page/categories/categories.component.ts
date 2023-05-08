import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, map, take, takeUntil } from 'rxjs';
import { CategoryRes } from 'src/app/models/products/category-res.interface';
import { Category, CategoryType } from 'src/app/models/products/category.interface';
import { CapitalizeFirstLetterPipe } from 'src/app/pipes/capitalizeFirstLetter/capitalize-first-letter.pipe';

import { CategoryService } from 'src/app/services/category-service/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  providers: [ CapitalizeFirstLetterPipe ]
})
export class CategoriesComponent {

  title: string = '';
  categoryName: string = '';

  categories: Category[] = [];
  types: CategoryType[] = [];

  loading = false;

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private route: ActivatedRoute, 
    private capitalizeFirstLetter: CapitalizeFirstLetterPipe,
    private categoryService: CategoryService
  ){}

  ngOnInit(): void {
    this.loading = true;
    this.route.params.subscribe(params => {
      this.categoryName = params['category'];
      this.title = this.categoryName ? this.capitalizeFirstLetter.transform(this.categoryName) : 'Categories';
    });
    if(this.categoryName) {
      this.categoryService.getCategoryByName(this.title)
      .pipe(take(1))
      .subscribe((res: any) => {
        this.types = res.data.type;
        this.loading = false;
      }
    )} else {
      this.getCategories();
    }
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
        data.forEach((el: any) => {
          const name = el.name.toLowerCase();
          el.link = '/shop/' + name;
        });
        this.categories = data;
        this.loading = false;
    })
  }
}
