import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from 'src/app/models/products/brand.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  private mainUrl = environment.apiUrl + '/brands';

  constructor(private http: HttpClient) { }

  getAllBrands(): Observable<{ message: string, data: any }> {
    return this.http.get<{ message: string, data: any }>(this.mainUrl);
  }

  getBrandById(): Observable<{ message: string, data: any }> {
    return this.http.get<{ message: string, data: any }>(this.mainUrl);
  }

  postBrand(brand: Brand, image: File): Observable<any> {
    const body = new FormData();
    body.append('name', brand.name);
    body.append('country', brand.country);
    body.append('website', brand.website);
    body.append('image', image, brand.logo);
    return this.http.post<any>(this.mainUrl, body);
  }
}
