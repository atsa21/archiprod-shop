import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-login-sign-up-dialog',
  templateUrl: './login-sign-up-dialog.component.html',
  styleUrls: ['./login-sign-up-dialog.component.scss']
})
export class LoginSignUpDialogComponent {

  loginForm!: FormGroup;
  signUpForm!: FormGroup;
  isLogin = false;
  showPassword = true;

  constructor(
    private fb: FormBuilder,
    private auth : AuthService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password : new FormControl('', [Validators.required, Validators.minLength(6)])
    })
    this.signUpForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password : new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }

  get email(){
    return this.loginForm.get('email');
  }

  get password(){
    return this.loginForm.get('password');
  }

  login(){
    if(this.loginForm.valid){
      
    }
  }

  signUp(){
    if(this.signUpForm.valid){
      this.auth.createUser(this.signUpForm.get('email')?.value, this.signUpForm.get('password')?.value).pipe(take(1)).subscribe(() => {
        console.log("User created :)");
      })
    }
  }
}
