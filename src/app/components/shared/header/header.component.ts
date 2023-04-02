import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Navigation } from 'src/app/models/navigation';
import { LoginSignUpDialogComponent } from '../../main/login-sign-up-dialog/login-sign-up-dialog.component';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { Subject, takeUntil } from 'rxjs';
import { SnackBarComponent } from '../snack-bar/snack-bar.component';

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

  menuList: Navigation[] = [
    { name: 'Furniture', link: '/homepage/shop'},
    { name: 'Bathroom', link: '/homepage/shop'},
    { name: 'Kitchen', link: '/homepage/shop'},
    { name: 'Lighting', link: '/homepage/shop'},
    { name: 'Decor', link: '/homepage/shop'}
  ];

  private destroy: Subject<boolean> = new Subject<boolean>();

  constructor(
    private router: Router,
    private dialog : MatDialog,
    private auth: AuthService,
    private snack: SnackBarComponent
  ) {}

  ngOnInit(): void {
    this.isUserLogin = this.auth.isLoggedIn();
    if(this.isUserLogin) {
      this.isAdmin = this.auth.isAdmin();
    }
    this.auth.getAuthStatusListener().pipe(takeUntil(this.destroy)).subscribe((res) => {
      this.isUserLogin = res;
      this.isAdmin = this.auth.isAdmin();
    });
  }

  goToPage(name: string): void {
    this.router.navigate([name]);
  }

  openLoginDialog(): void {
    this.dialog.open(LoginSignUpDialogComponent, {
      width: '420px'
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
