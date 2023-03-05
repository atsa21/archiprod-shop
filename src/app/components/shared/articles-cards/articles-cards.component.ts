import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-articles-cards',
  templateUrl: './articles-cards.component.html',
  styleUrls: ['./articles-cards.component.scss']
})
export class ArticlesCardsComponent {

  @Input() article: any;
}
