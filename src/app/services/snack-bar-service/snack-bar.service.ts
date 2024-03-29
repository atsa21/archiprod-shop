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
    const style = this.getTypeClass(styleType);
    this.snackBar.open(this.message, 'x', {
      duration: 3000,
      verticalPosition: 'bottom',
      horizontalPosition: 'center',
      panelClass: [style]
    });
  }

  getMessage(messageType: string): string {
    switch (messageType) {
      case 'auth':
        return 'You have been logged in!';
      case 'logout':
        return 'You have been logged out!';
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
