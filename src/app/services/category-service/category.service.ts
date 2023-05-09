import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryType } from 'src/app/models/products/category.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private mainUrl = environment.apiUrl + '/categories';

  constructor(private http: HttpClient) { }

  getAllCategories(): Observable<{ message: string, data: any }> {
    return this.http.get<{ message: string, data: any }>(this.mainUrl);
  }

  getCategoriesList(): Observable<{ message: string, data: any }> {
    return this.http.get<{ message: string, data: any }>(`${this.mainUrl}/list`);
  }

  getCategoryById(id: string): Observable<{ message: string, data: any }> {
    return this.http.get<{ message: string, data: any }>(`${this.mainUrl}/${id}`);
  }

  getCategoryByName(category: string): Observable<{ message: string, data: any }> {
    return this.http.get<{ message: string, data: any }>(`${this.mainUrl}?category=${category}`);
  }

  addCategory(category: CategoryType, image: File): Observable<{ message: string, category: any}> {
    const body = new FormData();
    if(category.name) {
      body.append('name', category.name);
    }
    body.append('typeName', category.typeName);
    body.append('image', image, category.typeName);
    category.brands.forEach(val => {
      body.append('brands', val);
    });
    category.materials.forEach(val => {
      body.append('materials', val);
    });
    category.shapes.forEach(val => {
      body.append('shapes', val);
    });
    category.extras.forEach(val => {
      body.append('extras', val);
    });
    return this.http.post<{ message: string, category: any}>(this.mainUrl, body);
  }

  addType(category: CategoryType, id: string): Observable<{ message: string, res: any}> {
    const body = this.getTypeBody(category);
    return this.http.put<{ message: string, res: any}>(`${this.mainUrl}/${id}`, body);
  }

  editType(category: CategoryType, id: string): Observable<{ message: string, res: any}> {
    const body = this.getTypeBody(category);
    return this.http.put<{ message: string, res: any}>(`${this.mainUrl}/${id}/update-type`, body);
  }

  getTypeBody(category: CategoryType): CategoryType {
    const body = {
      typeName: category.typeName,
      brands: category.brands,
      materials: category.materials,
      shapes: category.shapes,
      extras: category.extras
    };
    return body;
  }

  deleteCategory(id: string): Observable<{message: string, data: any}> {
    return this.http.delete<{message: string, data: any}>(`${this.mainUrl}/${id}`);
  }
}
