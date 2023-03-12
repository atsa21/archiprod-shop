import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currency'
})
export class CurrencyPipe implements PipeTransform {

  transform(value: string): string {
    switch (value) {
      case 'Euro':
        return '€';
      case 'Dollar':
        return '$';
      case "Pound":
        return '£'
      default:
        return '$';
    }
  }

}
