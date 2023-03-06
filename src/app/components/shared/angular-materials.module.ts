import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  imports: [
    MatInputModule,
    MatIconModule,
    MatDialogModule
  ],
  exports: [
    MatInputModule,
    MatIconModule,
    MatDialogModule
  ]
})
export class AngularMaterialsModule { }
