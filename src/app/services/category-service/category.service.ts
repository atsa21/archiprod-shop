import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getAllCategories() {
    return this.http.get<{ message: string, data: any }>('http://localhost:3000/api/categories');
  }

  getCategoryById(id: string) {
    return this.http.get<{ message: string, data: any }>(`http://localhost:3000/api/categories/${id}`);
  }

  addCategory(category: string) {
    const body = { name: category }
    return this.http.post<{ message: string, categoryId: string}>('http://localhost:3000/api/categories', body);
  }

  addCategoryType(category: any, id: string) {
    const body = {
      id: id,
      name: category.name,
      type: [{
        typeName: category.typeName,
        materials: category.materials,
        shapes: category.shapes,
        extras: category.extras
      }],
    };
    return this.http.put<{ message: string, categoryId: string}>('http://localhost:3000/api/categories' + id, body);
  }

  deleteCategory(id: string): any {
    return this.http.delete(`http://localhost:3000/api/categories/${id}`);
  }
}
