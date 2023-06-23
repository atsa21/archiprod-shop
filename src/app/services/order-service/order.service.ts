import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private mainUrl = environment.apiUrl + '/orders';

  constructor(private http: HttpClient) { }

  addOrder(order: any): Observable<any> {
    return this.http.post<any>(this.mainUrl, order);
  }

}
