import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getAllCategories(): Observable<{ message: string, data: any }> {
    return this.http.get<{ message: string, data: any }>('http://localhost:3000/api/categories');
  }

  getCategoryById(id: string): Observable<{ message: string, data: any }> {
    return this.http.get<{ message: string, data: any }>(`http://localhost:3000/api/categories/${id}`);
  }

  addCategory(category: any): Observable<{ message: string, categoryId: string}> {
    const body = {
      name: category.name,
      type: {
        typeName: category.typeName,
        materials: category.materials,
        shapes: category.shapes,
        extras: category.extras
      },
    };
    return this.http.post<{ message: string, categoryId: string}>('http://localhost:3000/api/categories', body);
  }

  addCategoryType(category: any, id: string): Observable<{ message: string, res: any}> {
    const body = {
      typeName: category.typeName,
      materials: category.materials,
      shapes: category.shapes,
      extras: category.extras
    };
    console.log(body);
    return this.http.put<{ message: string, res: any}>(`http://localhost:3000/api/categories/${id}`, body);
  }

  deleteCategory(id: string): Observable<{message: string, data: any}> {
    return this.http.delete<{message: string, data: any}>(`http://localhost:3000/api/categories/${id}`);
  }
}
