import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Navigation } from 'src/app/models/navigation';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent {

  public sideBarOpened = false;
  public arrowClass: string = 'fa-solid fa-chevron-right';

  public navList: Navigation[] = [
    { name: 'Products', link: '/admin', icon: 'fa-regular fa-pen-to-square' },
    { name: 'Brands', link: '/admin/brands', icon: 'fa-regular fa-pen-to-square' },
    { name: 'Users', link: '/admin/users', icon: 'fa-regular fa-user' }
  ];

  constructor(
    private router: Router
  ) {}

  public openSideBar(): void {
    this.sideBarOpened = !this.sideBarOpened;
    this.arrowClass = this.sideBarOpened ? 'fa-solid fa-chevron-left' : 'fa-solid fa-chevron-right';
  }

  public navigate(link: string): void {
    this.router.navigate([link]);
  }

}
