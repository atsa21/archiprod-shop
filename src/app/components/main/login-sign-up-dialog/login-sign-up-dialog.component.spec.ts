import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginSignUpDialogComponent } from './login-sign-up-dialog.component';

describe('LoginSignUpDialogComponent', () => {
  let component: LoginSignUpDialogComponent;
  let fixture: ComponentFixture<LoginSignUpDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginSignUpDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginSignUpDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
