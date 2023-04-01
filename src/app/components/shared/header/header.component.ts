import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Navigation } from 'src/app/models/navigation';
import { LoginSignUpDialogComponent } from '../../main/login-sign-up-dialog/login-sign-up-dialog.component';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { Subject, Subscription, takeUntil } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isMenuOpened = false;
  isUserMenuOpened = false;
  isUserLogin = false;

  menuList: Navigation[] = [
    { name: 'Furniture', link: '/homepage/shop'},
    { name: 'Bathroom', link: '/homepage/shop'},
    { name: 'Kitchen', link: '/homepage/shop'},
    { name: 'Lighting', link: '/homepage/shop'},
    { name: 'Decor', link: '/homepage/shop'},
    { name: 'Admin', link: '/admin'}
  ];

  private authListenerSubs!: Subscription;
  private destroy: Subject<boolean> = new Subject<boolean>();

  constructor(
    private router: Router,
    private dialog : MatDialog,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.authListenerSubs = this.auth.getStatusListener().pipe(takeUntil(this.destroy)).subscribe( isAuthenticated => {
      this.isUserLogin = isAuthenticated;
    });
  }

  goToHomepage(): void {
    this.router.navigate(['/homepage']);
  }

  openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginSignUpDialogComponent, {
      width: '420px'
    });
    this.openCloseMenu('user-menu');
  }

  logOut(): void {

  }

  openCloseMenu(menuName: string): void {
    menuName === 'nav-menu' ? this.isMenuOpened = !this.isMenuOpened : this.isUserMenuOpened = !this.isUserMenuOpened;
  }

}
