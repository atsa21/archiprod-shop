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

  getProductsOnSale(page: number, pageSize: number, isOnSale: boolean): Observable<ProductListRes> {
    return this.http.get<ProductListRes>(`${this.mainUrl}/isOnSale?size=${pageSize}&page=${page}&isOnSale=${isOnSale}`);
  }

  postProduct(product: ProductForm, image: File): Observable<ProductRes> {
    const body = new FormData();
    body.append('category', product.category);
    body.append('type', product.type);
    body.append('image', image, product.type);
    body.append('brand', product.brand);

    // Dimentions
    body.append('height', product.dimensions.height.toString());
    if(product.dimensions.width) {
      body.append('width', product.dimensions.width.toString());
    }
    if(product.dimensions.depth) {
      body.append('depth', product.dimensions.depth.toString());
    }
    if(product.dimensions.diameter) {
      body.append('diameter', product.dimensions.diameter.toString());
    }
    body.append('measurementUnits', product.dimensions.measurementUnits);

    // Price
    body.append('fullPrice', product.price.fullPrice.toString());
    body.append('currency', product.price.currency);
    body.append('isOnSale', product.price.isOnSale.toString());
    if(product.price.discount) {
      body.append('discount', product.price.discount.toString())
    }
    if(product.price.discountedPrice) {
      body.append('discountedPrice', product.price.discountedPrice.toString());
    }

    // Details
    body.append('collectionName', product.details.collectionName);
    body.append('shape', product.details.shape);
    product.details.materials.forEach(val => {
      body.append('materials', val);
    });
    product.details.extras.forEach(val => {
      body.append('extras', val);
    });
    if(product.details.productCode) {
      body.append('productCode', product.details.productCode)
    }
    if(product.details.year) {
      body.append('year', product.details.year.toString())
    }

    body.append('total', product.total.toString());
    return this.http.post<ProductRes>(this.mainUrl, body);
  }

  updateProduct(id: string, product: ProductForm): Observable<{message: string, products: ProductCard}> {
    let body: any;
    if(typeof(product.image) === 'object') {
      body = new FormData();
      body.append('id', id);
      body.append('category', product.category);
      body.append('type', product.type);
      body.append('image', product.image, product.type);
      body.append('brand', product.brand);
  
      // Dimentions
      body.append('height', product.dimensions.height.toString());
      if(product.dimensions.width) {
        body.append('width', product.dimensions.width.toString());
      }
      if(product.dimensions.depth) {
        body.append('depth', product.dimensions.depth.toString());
      }
      if(product.dimensions.diameter) {
        body.append('diameter', product.dimensions.diameter.toString());
      }
      body.append('measurementUnits', product.dimensions.measurementUnits);
  
      // Price
      body.append('fullPrice', product.price.fullPrice.toString());
      body.append('currency', product.price.currency);
      body.append('isOnSale', product.price.isOnSale.toString());
      if(product.price.discount) {
        body.append('discount', product.price.discount.toString())
      }
      if(product.price.discountedPrice) {
        body.append('discountedPrice', product.price.discountedPrice.toString());
      }
  
      // Details
      body.append('collectionName', product.details.collectionName);
      body.append('shape', product.details.shape);
      product.details.materials.forEach(val => {
        body.append('materials', val);
      });
      product.details.extras.forEach(val => {
        body.append('extras', val);
      });
      if(product.details.productCode) {
        body.append('productCode', product.details.productCode)
      }
      if(product.details.year) {
        body.append('year', product.details.year.toString())
      }

      body.append('total', product.total.toString());
    } else {
      body = {
        id: id,
        category: product.category,
        type: product.type,
        imagePath: product.image,
        brand: product.brand,

        height: product.dimensions.height,
        width: product.dimensions.width,
        depth: product.dimensions.depth,
        diameter: product.dimensions.diameter,
        measurementUnits: product.dimensions.measurementUnits,

        fullPrice: product.price.fullPrice,
        currency: product.price.currency,
        isOnSale: product.price.isOnSale,
        discount: product.price.discount,
        discountedPrice: product.price.discountedPrice,

        collectionName: product.details.collectionName,
        shape: product.details.shape,
        materials: product.details.materials,
        extras: product.details.extras,
        productCode: product.details.productCode,
        year: product.details.year,

        total: product.total
      };
    }
    return this.http.put<{message: string, products: ProductCard}>(`${this.mainUrl}/${id}`, body);
  }

  deleteProduct(id: string): Observable<{message: string}> {
    return this.http.delete<{message: string}>(`${this.mainUrl}/${id}`);
  }
}
