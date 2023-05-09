import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Navigation } from 'src/app/models/navigation';
import { LoginSignUpDialogComponent } from '../../main/login-sign-up-dialog/login-sign-up-dialog.component';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { Subject, takeUntil } from 'rxjs';
import { SnackBarService } from 'src/app/services/snack-bar-service/snack-bar.service';
import { CategoryService } from 'src/app/services/category-service/category.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isMenuOpened = false;
  isUserMenuOpened = false;
  isUserLogin = false;
  isAdmin = false;

  menuList: Navigation[] = [];

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private router: Router,
    private categoryService: CategoryService,
    private dialog : MatDialog,
    private auth: AuthService,
    private snack: SnackBarService
  ) {}

  ngOnInit(): void {
    this.getMenuNav();
    const expireTokenTime = localStorage.getItem('expiration');
    const now = new Date().toISOString();

    if(expireTokenTime && now > expireTokenTime) {
      this.auth.logOut();
    } else {
      this.isUserLogin = true;
      this.isAdmin = this.auth.isAdmin();
      this.auth.getAuthStatusListener().pipe(takeUntil(this.destroy$)).subscribe((res: boolean) => {
        this.isUserLogin = res;
        this.isAdmin = this.auth.isAdmin();
      });
    }
  }

  getMenuNav(): void {
    this.categoryService.getCategoriesList().pipe(takeUntil(this.destroy$)).subscribe((res: { message: string, data: string[] }) => {
      this.menuList = res.data.map((category) => ({
        name: category, link: `/shop/${category.toLowerCase()}`
      }));
    })
  }

  goToPage(name: string): void {
    this.router.navigate([name]);
  }

  openLoginDialog(): void {
    this.dialog.open(LoginSignUpDialogComponent, {
      width: '380px'
    });
    this.openCloseMenu('user-menu');
  }

  logOut(): void {
    this.auth.logOut();
    this.isUserMenuOpened = false;
    this.snack.openSnackBar('logout', 'success');
  }

  openCloseMenu(menuName: string): void {
    menuName === 'nav-menu' ? this.isMenuOpened = !this.isMenuOpened : this.isUserMenuOpened = !this.isUserMenuOpened;
  }

}
