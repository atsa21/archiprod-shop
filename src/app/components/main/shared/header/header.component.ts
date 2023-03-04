import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  public menuOpened = false;
  public menuList = ['Furniture', 'Bathroom', 'Kitchen', 'Lighting', 'Office', 'Decor'];

  openMenu(): void {
    this.menuOpened = !this.menuOpened;
  }

}
