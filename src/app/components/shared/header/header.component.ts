import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Navigation } from 'src/app/models/navigation';
import { LoginSignUpDialogComponent } from '../../main/login-sign-up-dialog/login-sign-up-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isMenuOpened = false;
  isUserMenuOpened = false;
  menuList: Navigation[] = [
    { name: 'Furniture', link: '/homepage/shop'},
    { name: 'Bathroom', link: '/homepage/shop'},
    { name: 'Kitchen', link: '/homepage/shop'},
    { name: 'Lighting', link: '/homepage/shop'},
    { name: 'Decor', link: '/homepage/shop'},
    { name: 'Admin', link: '/admin'}
  ];

  constructor(
    private router: Router,
    private dialog : MatDialog
  ) {}

  ngOnInit(): void {}

  goToHomepage(): void {
    this.router.navigate(['/homepage']);
  }

  openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginSignUpDialogComponent, {
      width: '420px'
    });
    this.openCloseMenu('user-menu');
  }

  openCloseMenu(menuName: string): void {
    menuName === 'nav-menu' ? this.isMenuOpened = !this.isMenuOpened : this.isUserMenuOpened = !this.isUserMenuOpened;
  }

}
