import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  message: string = '';
  snackBarClass: string = '';

  constructor(public snackBar: MatSnackBar) {}

  openSnackBar(messageType: string, styleType: string): void {
    this.message = this.getMessage(messageType);
    this.getTypeClass(styleType);
    this.snackBar.open(this.message, 'close', {
      duration: 3000,
      verticalPosition: 'bottom',
      horizontalPosition: 'center',
      panelClass: [this.snackBarClass]
    });
  }

  getMessage(messageType: string): string {
    switch (messageType) {
      case 'delete prod':
        return 'You successfully deleted product'
      case 'sign up' :
        return 'User created!'
      case 'auth error' :
        return 'Auth failed';
      default :
      return messageType
    }
  }

  getTypeClass(type: string): void {
    switch (type) {
      case 'error' :
        this.snackBarClass = 'error-snackbar';
        break
      case 'attention' :
        this.snackBarClass = 'attention-snackbar';
        break;
      default :
        this.snackBarClass = 'success-snackbar';
    }
  }
}
