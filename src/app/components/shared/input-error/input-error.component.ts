import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { errorType } from 'src/app/models/typeError.model';

@Component({
  selector: 'app-input-error',
  templateUrl: './input-error.component.html',
  styleUrls: ['./input-error.component.scss']
})
export class InputErrorComponent implements OnInit {
  @Input() validator!: AbstractControl;

  errorMessage: string = '';

  private validatorErrors = {
    required: 'This field is required',
    minlength: 'The field must contain more characters',
    maxlength: 'The field must contain fewer characters',
    minlengthPassword: 'Password must contain at least 6 characters',
    maxlengthPassword: 'Password must contain fewer that 256 characters',
    pattern: 'Wrong pattern',
    email: 'Please enter a correct email format'
  };

  ngOnInit(): void {
    if(this.validator) {
      this.getType();
      this.validator.valueChanges.pipe().subscribe(() => {
        this.getType();
      });
    }
  }

  getType(): void {
    Object.values(errorType).forEach((err) => {
      if (this.validator?.errors?.[err]) {
        switch (err) {
          case errorType.minlength:
            this.errorMessage = this.getMinlength(this.validator.errors?.['minlength'].requiredLength);
            break;
          case errorType.maxlength:
            this.errorMessage = this.getMaxlength(this.validator.errors?.['maxlength'].requiredLength);
            break;
          default:
            this.errorMessage = this.validatorErrors[err];
        }
      }
    });
  }

  getMinlength(minlength: number): string {
    return minlength === 6 ? this.validatorErrors.minlengthPassword : this.validatorErrors.minlength;
  }

  getMaxlength(maxlength: number): string {
    return maxlength === 256 ? this.validatorErrors.maxlengthPassword : this.validatorErrors.maxlength;
  }

}
