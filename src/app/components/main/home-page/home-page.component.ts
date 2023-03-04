import { Component } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {

  articles = [
    { id:'1', title: '8 Tips for choosing the Perfect Sofa', image:'/assets/img/homepage-what-is-arch.png' },
    { id:'2', title: '8 Tips for choosing the Perfect Sofa', image:'/assets/img/homepage-what-is-arch.png' },
    { id:'3', title: '8 Tips for choosing the Perfect Sofa', image:'/assets/img/homepage-what-is-arch.png' },
    { id:'4', title: '8 Tips for choosing the Perfect Sofa', image:'/assets/img/homepage-what-is-arch.png' }
  ]
}
