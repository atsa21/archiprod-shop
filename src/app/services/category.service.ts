import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getAllCategories() {
    return this.http.get('http://localhost:3000/api/category');
  }

  getTypeByCategoryName() {
    return this.http.get('http://localhost:3000/api/category');
  }

  postCategory(category: any) {
    return this.http.post<{message: string}>('http://localhost:3000/api/category', category);
  }
}
