import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth-service/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  public signUpForm: any;
  public hide = true;

  constructor(
    private fb: FormBuilder,
    private auth : AuthService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.signUpForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password : new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }

  get email(){
    return this.signUpForm.get('email');
  }

  get password(){
    return this.signUpForm.get('password');
  }


  signUp(): void {
    if(typeof this.signUpForm.valid){
      
    }
  }
}
