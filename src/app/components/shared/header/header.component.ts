import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Navigation } from 'src/app/models/navigation';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public menuOpened = false;
  public menuList: Navigation[] = [
    { name: 'Furniture', link: '/homepage/shop'},
    { name: 'Bathroom', link: '/homepage/shop'},
    { name: 'Kitchen', link: '/homepage/shop'},
    { name: 'Lighting', link: '/homepage/shop'},
    { name: 'Decor', link: '/homepage/shop'},
    { name: 'Admin', link: '/admin'}
  ];

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {}

  public toHomepage(): void {
    this.router.navigate(['/homepage']);
  }

  public openMenu(): void {
    this.menuOpened = !this.menuOpened;
  }

}
