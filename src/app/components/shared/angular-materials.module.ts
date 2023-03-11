import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MatSliderModule } from '@angular/material/slider';

@NgModule({
  imports: [
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    MatRadioModule,
    MatSliderModule
  ],
  exports: [
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    MatRadioModule,
    MatSliderModule
  ]
})
export class AngularMaterialsModule { }
