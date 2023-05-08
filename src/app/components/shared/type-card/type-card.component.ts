import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryType } from 'src/app/models/products/category.interface';

@Component({
  selector: 'app-type-card',
  templateUrl: './type-card.component.html',
  styleUrls: ['./type-card.component.scss']
})
export class TypeCardComponent {
  @Input() type!: CategoryType;

  constructor(
    private router: Router
  ){}

  goToPage(link: string | undefined): void {
    this.router.navigate([link]);
  }
}
