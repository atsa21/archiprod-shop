import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthData } from 'src/app/models/auth-data.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token!: string;
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient) { }

  getToken(): string {
    return this.token;
  }

  getStatusListener() {
    return this.authStatusListener.asObservable();
  }

  createUser(email: string, password: string) {
    const body: AuthData = { email: email, password: password };
    return this.http.post("http://localhost:3000/api/user/signup", body);
  }

  login(email: string, password: string): any {
    const body: AuthData = { email: email, password: password };
    this.http.post<{ token: string }>("http://localhost:3000/api/user/login", body).subscribe(res => {
      this.token = res.token;
      this.authStatusListener.next(true);
    });
  }
}
