import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { take } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';
import { SnackBarService } from 'src/app/services/snack-bar-service/snack-bar.service';

@Component({
  selector: 'app-login-sign-up-dialog',
  templateUrl: './login-sign-up-dialog.component.html',
  styleUrls: ['./login-sign-up-dialog.component.scss']
})
export class LoginSignUpDialogComponent {

  form!: FormGroup;
  isLogin = true;
  showPassword = true;

  constructor(
    private fb: FormBuilder,
    private auth : AuthService,
    private snack: SnackBarService,
    private dialogRef: MatDialogRef<LoginSignUpDialogComponent>
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.form = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password : new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(256)])
    })
  }

  getControl(control: string): AbstractControl {
    const formControl = this.form.get(control);
    return formControl!;
  }

  isEmailInvalid(): boolean {
    return (this.getControl('email').invalid && (this.getControl('email').touched || this.getControl('email').dirty));
  }

  isPasswordInvalid(): boolean {
    return (this.getControl('password').invalid && (this.getControl('password').touched || this.getControl('password').dirty))
  }

  login(){
    if(this.form.valid){
      this.auth.login(this.getControl('email').value, this.getControl('password').value).pipe(take(1)).subscribe((res: any) => {
        this.auth.setAuthRes(res.token, res.expiresIn, res.role, res.userId);
        this.snack.openSnackBar('auth', 'success');
        this.dialogRef.close();
      });
    }
  }

  signUp(){
    if(this.form.valid){
      this.auth.createUser(this.getControl('email').value, this.getControl('password').value).pipe(take(1)).subscribe(() => {
        this.login();
      });
    }
  }
}
