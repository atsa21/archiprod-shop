import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { OrderItem } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order-service/order.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent {

  order: OrderItem[] = [];
  shop!: string;
  totalPrice = 0;
  personalInfo: any;

  isFormValid = false;

  constructor( 
    private router: Router, 
    private orderService: OrderService
    ) {}

  ngOnInit(): void {
    this.getOrder();
  }

  getControlValue(controlName: string) {
    return this.personalInfo.get(controlName).value;
  }

  getOrder(): void {
    this.order = JSON.parse(localStorage.getItem('order') || '[]');
    this.shop = localStorage.getItem('shop') as string;
    if(this.order && this.order.length) {
      this.totalPrice = this.getTotalPrice();
    }
  }

  setChangedOrder(): void {
    this.getOrder();
  }

  getTotalPrice(): number {
    let totalPrice = 0;
    for (const item of this.order) {
      totalPrice += item.price.finalPrice * Number(item.amount);
    }
    return totalPrice;
  }

  goToShop(): void {
    this.router.navigate(['/shop']);
  }

  setOrderValue(info: any): void {
    this.personalInfo = info;
    this.isFormValid = this.personalInfo.valid;
  }

  addOrder(): void {
    if(this.isFormValid) {
      const orderDate = String(new Date());
      const user = {
        name: this.getControlValue('name'),
        email: this.getControlValue('email'),
        address: this.getControlValue('address') 
      };
      const orderData = {
        client: user,
        shop: this.shop,
        order: this.order,
        comment: this.getControlValue('comment'),
        date: orderDate,
        totalPrice: this.totalPrice
      };
      this.orderService.addOrder(orderData).pipe(take(1)).subscribe((res) => {
        console.log(res);
        localStorage.clear();
      });
    }
  }

}
