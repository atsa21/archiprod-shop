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
    { name: 'Furniture', url: '/assets/img/furniture.png', link: '/shop/furniture' },
    { name: 'Bathroom', url: '/assets/img/bath.png', link: '/shop/bathroom' },
    { name: 'Kitchen', url: '/assets/img/kitchen.png', link: '/shop/furniture' },
    { name: 'Lighting', url: '/assets/img/light.png', link: '/shop/lighting' },
    { name: 'Decor', url: '/assets/img/decor.png', link: '/shop/decor' }
  ];

  image: string = '';
  defaultImage: string = '/assets/img/furniture.png';

  link: string = '';

  constructor(
    private router: Router
  ){}

  ngOnInit(): void {
    if(this.category) {
      let imageForCategory = '';
      let categoryLink = '';
      this.categoryImages.map((el) => {
        if(el.name == this.category.name) {
          imageForCategory = el.url;
          categoryLink = el.link;
        }
      });
      this.image = imageForCategory ? imageForCategory : this.defaultImage;
      this.link = categoryLink ? categoryLink : '/homepage/shop';
    }
  }

  goToPage(): void {
    this.router.navigate([this.link]);
  }
}
