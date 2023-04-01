import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { errorType } from 'src/app/models/typeError.model';

@Component({
  selector: 'app-input-error',
  templateUrl: './input-error.component.html',
  styleUrls: ['./input-error.component.scss']
})
export class InputErrorComponent implements OnInit {
  @Input() validator!: AbstractControl | null;

  errorMessage: string = '';

  private validatorErrors = {
    required: 'This field is required',
    minlength: 'The field contains insufficient characters',
    maxlength: 'input-error.max-length',
    minlengthPassword: 'Password ',
    maxlengthPassword: 'Password is too long',
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
    switch (maxlength) {
      case 70:
        return this.validatorErrors.maxlengthPassword;
      case 63206:
        return this.validatorErrors.maxlengthPassword;
      default:
        return this.validatorErrors.maxlength;
    }
  }

}
