import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryType } from 'src/app/models/products/category.interface';

@Component({
  selector: 'app-type-card',
  templateUrl: './type-card.component.html',
  styleUrls: ['./type-card.component.scss']
})
export class TypeCardComponent implements OnInit {
  @Input() type!: CategoryType;
  @Input() canEdit = false;

  constructor(
    private router: Router
  ){}

  ngOnInit(): void {
    console.log(this.type);
  }

  goToPage(link: string | undefined): void {
    this.router.navigate([link]);
  }
}
