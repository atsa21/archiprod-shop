import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent {

  products = [
    { id:'1', brand: 'FLOS', description:'CHIARA T PINK GOLD - LED aluminium table lamp', image:'/assets/img/homepage-what-is-arch.png', onSale: false },
    { id:'2', brand: 'FLOS', description:'CHIARA T PINK GOLD - LED aluminium table lamp', image:'/assets/img/homepage-what-is-arch.png', onSale: false },
    { id:'3', brand: 'FLOS', description:'CHIARA T PINK GOLD - LED aluminium table lamp', image:'/assets/img/homepage-what-is-arch.png', onSale: false },
    { id:'4', brand: 'FLOS', description:'CHIARA T PINK GOLD - LED aluminium table lamp', image:'/assets/img/homepage-what-is-arch.png', onSale: false }
  ];
  
}
