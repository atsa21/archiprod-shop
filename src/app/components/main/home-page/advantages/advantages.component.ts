import { Component } from '@angular/core';
import { Advantage } from 'src/app/models/advantage';

@Component({
  selector: 'app-advantages',
  templateUrl: './advantages.component.html',
  styleUrls: ['./advantages.component.scss']
})
export class AdvantagesComponent {

  cardList: Advantage[] = [
    { title: 'The Best Brands selected for you',
      description: 'We search the world to discover and acquire historical, new, and innovative brands, selecting them to give you the best of design.', 
      image: '/assets/img/homepage/adv-1.png'
    },
    { title: 'There are only 100% original design',
      description: 'Archiproducts is an online reference for those who want to be inspired, plan and purchase only 100% original design.', 
      image: '/assets/img/homepage/adv-2.png'
    },
    { title: 'Community all around the world',
      description: '1,000 Architects, decorators, designers, resellers, manufacturers, buyers and design lovers, join archiproducts every day to find products and get inspired.', 
      image: '/assets/img/homepage/adv-3.png'
    },
    { title: 'Product stories as told by designers',
      description: 'Find out avout the creative process from prorotype to final products, wich you can buy on archiproducts.', 
      image: '/assets/img/homepage/adv-4.png'
    }
  ]
}
