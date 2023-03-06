import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getAllCategories() {
    return this.http.get<{ message: string, data: any }>('http://localhost:3000/api/categories');
  }

  addCategory(category: Category) {
    const body = { name: category.name }
    console.log(this.http.post('http://localhost:3000/api/categories', body));
    return this.http.post<{ message: string, categoryId: string}>('http://localhost:3000/api/categories', body);
  }

  deleteCategory(id: string): any {
    return this.http.delete(`http://localhost:3000/api/categories/${id}`);
  }
}
