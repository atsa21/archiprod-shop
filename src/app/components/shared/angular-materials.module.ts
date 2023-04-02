import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  imports: [
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    MatRadioModule,
    MatSliderModule,
    MatSnackBarModule
  ],
  exports: [
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    MatRadioModule,
    MatSliderModule,
    MatSnackBarModule
  ]
})
export class AngularMaterialsModule { }
