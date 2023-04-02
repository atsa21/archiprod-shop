import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snack-bar',
  template: '',
  styleUrls: ['./snack-bar.component.scss']
})
export class SnackBarComponent {
  message: string = '';
  snackBarClass: string = '';

  constructor(public snackBar: MatSnackBar) {}

  openSnackBar(messageType: string, styleType: string): void {
    this.message = this.getMessage(messageType);
    const style = this.getTypeClass(styleType);
    console.log(style);
    this.snackBar.open(this.message, 'x', {
      duration: 3000,
      verticalPosition: 'bottom',
      horizontalPosition: 'center',
      panelClass: [style]
    });
  }

  getMessage(messageType: string): string {
    switch (messageType) {
      case 'login':
        return 'You have been logged in!';
      case 'logout':
        return 'You have been logged out!';
      case 'sign up' :
        return 'User created!';
      case 'auth error' :
        return 'Auth failed';
      case 'delete prod':
        return 'You successfully deleted product';
      default :
      return messageType
    }
  }

  getTypeClass(type: string): string {
    switch (type) {
      case 'error' :
        return 'error-snackbar';
      case 'attention' :
        return 'attention-snackbar';
      default :
        return 'success-snackbar';
    }
  }
}
