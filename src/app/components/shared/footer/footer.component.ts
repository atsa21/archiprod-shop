import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  footerList = [
    { name: 'Main menu', items: ['Furniture', 'Bathroom', 'Kitchen', 'Lighting', 'Office', 'Decor', 'Brands']},
    { name: 'Archiprod', items: ['About', 'FAQ', 'Contact us']},
    { name: 'Social media', items: ['Facebook', 'Instagram', 'Pinterest', 'Youtube']},
    { name: 'Shop', items: ['Design Center', 'Shopping', 'Terms and Conditions', 'FAQ Shop']},
  ]
}
