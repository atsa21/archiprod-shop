import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  imports: [
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    MatRadioModule,
    MatSliderModule,
    MatSnackBarModule,
    MatSelectModule,
    MatProgressSpinnerModule
  ],
  exports: [
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    MatRadioModule,
    MatSliderModule,
    MatSnackBarModule,
    MatSelectModule,
    MatProgressSpinnerModule
  ]
})
export class AngularMaterialsModule { }
