import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { AuthData } from 'src/app/models/auth-data.interface';
import { userRole } from 'src/app/models/userRole.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private mainUrl = 'http://localhost:3000/api/user';

  private tokenTimer: any;
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) { }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  isAdmin(): boolean {
    return localStorage.getItem('role') === userRole.admin;
  }

  createUser(email: string, password: string) {
    const body: AuthData = { email: email, password: password };
    return this.http.post(this.mainUrl + '/signup', body);
  }

  login(email: string, password: string): Observable<{ token: string; expiresIn: number; role: string }> {
    const body: AuthData = { email: email, password: password };
    return this.http.post<{ token: string; expiresIn: number; role: string; userId: string }>(this.mainUrl + '/login', body);
  }

  setAuthRes(token: string, expiresIn: number, role: string, userId: string) {
    const expiresInDuration = expiresIn;
    this.setAuthTimer(expiresInDuration);
    const now = new Date();
    const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
    this.saveAuthData(token, expirationDate, role, userId);
    this.authStatusListener.next(true);
  }

  logOut(): void {
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.authStatusListener.next(false);
    this.router.navigate(['/homepage']);
  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logOut();
    }, duration * 1000);
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.setAuthTimer(expiresIn / 1000);
    }
  }

  private saveAuthData(token: string, expirationDate: Date, role: string, userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('role', role);
    localStorage.setItem('userId', userId);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate)
    }
  }
}
