import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getAllProducts() {
    return this.http.get<{ message: string, data: any }>('http://localhost:3000/api/products');
  }

  postProduct(product: any, image: File) {
    const body = new FormData();
    body.append('category', product.category);
    body.append('type', product.type);
    body.append('material', product.material);
    body.append('brand', product.brand);
    body.append('image', image, product.name);
    body.append('collectionName', product.collectionName);
    body.append('amount', product.amount);
    body.append('price', product.price);
    body.append('currency', product.currency);
    body.append('isOnSale', product.isOnSale);
    return this.http.post<{message: string, products: any}>('http://localhost:3000/api/products', body);
  }
}
