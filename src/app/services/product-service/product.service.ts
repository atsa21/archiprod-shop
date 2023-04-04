import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductCard, ProductListRes, ProductRes } from 'src/app/models/products/product-card.interface';
import { ProductForm } from 'src/app/models/products/product-form.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private mainUrl = environment.apiUrl + '/products';

  constructor(private http: HttpClient) { }

  getProducts(page: number, pageSize: number): Observable<ProductListRes> {
    return this.http.get<ProductListRes>(`${this.mainUrl}?size=${pageSize}&page=${page}`);
  }

  postProduct(product: ProductForm, image: File): Observable<ProductRes> {
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
    if(product.designer) {
      body.append('designer', product.designer)
    }
    if(product.productCode) {
      body.append('productCode', product.productCode)
    }
    if(product.year) {
      body.append('year', product.year.toString())
    }
    body.append('amount', product.amount.toString());
    body.append('price', product.price.toString());
    body.append('currency', product.currency);
    body.append('isOnSale', product.isOnSale.toString());
    if(product.sale) {
      body.append('sale', product.sale.toString())
    }
    return this.http.post<ProductRes>(this.mainUrl, body);
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
      if(product.designer) {
        body.append('designer', product.designer)
      }
      if(product.productCode) {
        body.append('productCode', product.productCode)
      }
      if(product.year) {
        body.append('year', product.year.toString())
      }
      body.append('amount', product.amount.toString());
      body.append('price', product.price.toString());
      body.append('currency', product.currency);
      body.append('isOnSale', product.isOnSale.toString());
      if(product.sale) {
        body.append('sale', product.sale.toString())
      }
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
        designer: product.designer,
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

  deleteProduct(id: string): Observable<{message: string}> {
    return this.http.delete<{message: string}>(`${this.mainUrl}/${id}`);
  }
}
