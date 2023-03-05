import { Component, Input } from '@angular/core';
import { Advantage } from 'src/app/models/advantage';

@Component({
  selector: 'app-advantages-card',
  templateUrl: './advantages-card.component.html',
  styleUrls: ['./advantages-card.component.scss']
})
export class AdvantagesCardComponent {

  @Input() card: any;

}
