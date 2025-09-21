import { PasswordInputComponent } from './password-input.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('PasswordInputComponent', () => {
  let passwordInputComponent: PasswordInputComponent;
  let passwordFixture: ComponentFixture<PasswordInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasswordInputComponent]
    })
    .compileComponents();

    passwordFixture = TestBed.createComponent(PasswordInputComponent);
    passwordInputComponent = passwordFixture.componentInstance;
    passwordFixture.detectChanges();
  });

  it('should create', () => {
    expect(passwordInputComponent).toBeTruthy();
  });
});