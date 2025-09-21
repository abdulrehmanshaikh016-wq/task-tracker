import { LoginFormValidatorService } from './login-form-validator.service';
import { TestBed } from '@angular/core/testing';

describe('LoginFormValidatorService', () => {
  let loginFormValidatorService: LoginFormValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    loginFormValidatorService = TestBed.inject(LoginFormValidatorService);
  });

  it('should be created', () => {
    expect(loginFormValidatorService).toBeTruthy();
  });
});