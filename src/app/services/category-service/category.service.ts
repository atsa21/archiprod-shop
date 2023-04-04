import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  getCategoryById(id: string): Observable<{ message: string, data: any }> {
    return this.http.get<{ message: string, data: any }>(`${this.mainUrl}/${id}`);
  }

  addCategory(category: any): Observable<{ message: string, categoryId: string}> {
    const body = {
      name: category.name,
      typeName: category.typeName,
      materials: category.materials,
      shapes: category.shapes,
      extras: category.extras,
    };
    return this.http.post<{ message: string, categoryId: string}>(this.mainUrl, body);
  }

  addCategoryType(category: any, id: string): Observable<{ message: string, res: any}> {
    const body = {
      typeName: category.typeName,
      materials: category.materials,
      shapes: category.shapes,
      extras: category.extras
    };
    return this.http.put<{ message: string, res: any}>(`${this.mainUrl}/${id}`, body);
  }

  deleteCategory(id: string): Observable<{message: string, data: any}> {
    return this.http.delete<{message: string, data: any}>(`${this.mainUrl}/${id}`);
  }
}
