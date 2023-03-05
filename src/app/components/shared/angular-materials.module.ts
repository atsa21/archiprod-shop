import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    MatInputModule,
    MatIconModule
  ],
  exports: [
    MatInputModule,
    MatIconModule
  ]
})
export class AngularMaterialsModule { }
