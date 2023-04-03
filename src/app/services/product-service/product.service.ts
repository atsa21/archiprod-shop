import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductCard, ProductRes } from 'src/app/models/products/product-card.interface';
import { ProductForm } from 'src/app/models/products/product-form.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private mainUrl = 'http://localhost:3000/api/products';

  constructor(private http: HttpClient) { }

  getAllProducts() {
    return this.http.get<{ message: string, data: any }>(this.mainUrl);
  }

  getProducts(page: number, pageSize: number): Observable<ProductRes> {
    return this.http.get<ProductRes>(`${this.mainUrl}?size=${pageSize}&page=${page}`);
  }

  postProduct(product: ProductForm, image: File): Observable<{message: string, products: ProductCard}> {
    const body = new FormData();
    body.append('category', product.category);
    body.append('type', product.type);
    product.materials.forEach(val => {
      body.append('materials', val);
    });
    body.append('shape', product.shape);
    product.extras.forEach(val => {
      body.append('extras', val);
    });
    body.append('brand', product.brand);
    body.append('image', image, product.category);
    body.append('collectionName', product.collectionName);
    body.append('productCode', product.productCode ? product.productCode : '');
    body.append('year', product.year ? product.year.toString() : '');
    body.append('amount', product.amount.toString());
    body.append('price', product.price.toString());
    body.append('currency', product.currency);
    body.append('isOnSale', product.isOnSale.toString());
    body.append('sale', (product.sale ? product.sale.toString() : ''));
    return this.http.post<{message: string, products: ProductCard}>(this.mainUrl, body);
  }

  updateProduct(id: string, product: ProductForm): Observable<{message: string, products: ProductCard}> {
    let body: any;
    if(typeof(product.image) === 'object') {
      body = new FormData();
      body.append('id', id);
      body.append('category', product.category);
      body.append('type', product.type);
      product.materials.forEach(val => {
        body.append('materials', val);
      });
      body.append('shape', product.shape);
      product.extras.forEach(val => {
        body.append('extras', val);
      });
      body.append('brand', product.brand);
      body.append('image', product.image, product.category);
      body.append('collectionName', product.collectionName);
      body.append('productCode', product.productCode ? product.productCode : '');
      body.append('year', product.year ? product.year.toString() : '');
      body.append('amount', product.amount.toString());
      body.append('price', product.price.toString());
      body.append('currency', product.currency);
      body.append('isOnSale', product.isOnSale.toString());
      body.append('sale', (product.sale ? product.sale.toString() : ''));
    } else {
      body = {
        id: id,
        category: product.category,
        type: product.type,
        materials: product.materials,
        shape: product.shape,
        extras: product.extras,
        brand: product.brand,
        imagePath: product.image,
        collectionName: product.collectionName,
        productCode: product.productCode,
        year: product.year,
        amount: product.amount,
        price: product.price,
        currency: product.currency,
        isOnSale: product.isOnSale,
        sale: product.sale
      };
    }
    return this.http.put<{message: string, products: ProductCard}>(`${this.mainUrl}/${id}`, body);
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.delete<any>(`${this.mainUrl}/${id}`);
  }
}
