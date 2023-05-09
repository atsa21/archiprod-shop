import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Navigation } from 'src/app/models/navigation';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  public sideBarOpened = true;
  public arrowClass: string = 'fa-solid fa-chevron-right';

  public navList: Navigation[] = [
    { name: 'Products', link: '/admin', icon: 'fa-solid fa-chair', selected: false },
    { name: 'Categories', link: '/admin/categories', icon: 'fa-solid fa-folder-open', selected: false },
    { name: 'Brands', link: '/admin/brands', icon: 'fa-solid fa-tags', selected: false },
    { name: 'Users', link: '/admin/users', icon: 'fa-solid fa-user-pen', selected: false }
  ];

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {
    this.navList.forEach(el => el.selected = this.router.url === el.link);
  }

  public openSideBar(): void {
    this.sideBarOpened = !this.sideBarOpened;
    this.arrowClass = this.sideBarOpened ? 'fa-solid fa-chevron-left' : 'fa-solid fa-chevron-right';
  }

  public navigate(link: string): void {
    this.router.navigate([link]);
  }

}
