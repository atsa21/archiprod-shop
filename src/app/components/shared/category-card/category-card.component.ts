import { OnInit, Component, Input } from '@angular/core';
import { Category } from 'src/app/models/products/category.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.scss']
})
export class CategoryCardComponent implements OnInit {
  @Input() category!: Category;

  private categoryImages: any[] = [
    { name: 'Furniture', url: '/assets/img/categories/furniture.png'},
    { name: 'Bathroom', url: '/assets/img/categories/bath.png'},
    { name: 'Kitchen', url: '/assets/img/categories/kitchen.png',},
    { name: 'Lighting', url: '/assets/img/categories/light.png'},
    { name: 'Decor', url: '/assets/img/categories/decor.png'}
  ];

  image: string = '';
  defaultImage: string = '/assets/img/furniture.png';

  constructor(
    private router: Router
  ){}

  ngOnInit(): void {
    if(this.category) {
      let imageForCategory = '';
      
      this.categoryImages.map((el) => {
        if(el.name == this.category.name) {
          imageForCategory = el.url;
        }
      });
      this.image = imageForCategory ? imageForCategory : this.defaultImage;
    }
  }

  goToPage(link: string | undefined): void {
    this.router.navigate([link]);
  }
}
