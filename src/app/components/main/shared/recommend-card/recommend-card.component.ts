import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-recommend-card',
  templateUrl: './recommend-card.component.html',
  styleUrls: ['./recommend-card.component.scss']
})
export class RecommendCardComponent {

  @Input() product: any;
}
