import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getAllProducts() {
    return this.http.get('http://localhost:3000/api/product');
  }

  postProduct(product: any) {
    return this.http.post<{message: string}>('http://localhost:3000/api/product', product);
  }
}
