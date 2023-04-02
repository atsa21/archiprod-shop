import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { SnackBarService } from 'src/app/services/snack-bar-service/snack-bar.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router,
    private snack: SnackBarService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.auth.isLoggedIn() && this.auth.isAdmin()) {
      return true;
    }
    this.router.navigate(['/homepage']);
    this.snack.openSnackBar('You need to login as Admin', 'error');
    return false;
  }
  
}
