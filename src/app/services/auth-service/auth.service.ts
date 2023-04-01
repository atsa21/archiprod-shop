import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthData } from 'src/app/models/auth-data.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  createUser(email: string, password: string) {
    const body: AuthData = { email: email, password: password };
    return this.http.post("http://localhost:3000/api/user/signup", body);
  }

  login(email: string, password: string) {
    const body: AuthData = { email: email, password: password };
    this.http.post("http://localhost:3000/api/user/login", body);
  }
}
