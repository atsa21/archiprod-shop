import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductPost } from '../models/product-post';

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
    return this.http.post<{message: string, products: ProductPost}>('http://localhost:3000/api/products', body);
  }

  updateProduct(id: string, product: any) {
    let body: ProductPost | FormData;
    if( typeof(product.image) === 'object') {
      body = new FormData();
      body.append('id', id);
      body.append('category', product.category);
      body.append('type', product.type);
      body.append('material', product.material);
      body.append('brand', product.brand);
      body.append('image', product.image, product.name);
      body.append('collectionName', product.collectionName);
      body.append('amount', product.amount);
      body.append('price', product.price);
      body.append('currency', product.currency);
      body.append('isOnSale', product.isOnSale);
    } else {
      body = {
        id: id,
        category: product.category,
        type: product.type,
        material: product.material,
        brand: product.brand,
        imagePath: product.image,
        collectionName: product.collectionName,
        amount: product.amount,
        price: product.price,
        currency: product.currency,
        isOnSale: product.isOnSale
      };
    }
    return this.http.put<{message: string, products: ProductPost}>('http://localhost:3000/api/products/' + id, body);
  }
}
