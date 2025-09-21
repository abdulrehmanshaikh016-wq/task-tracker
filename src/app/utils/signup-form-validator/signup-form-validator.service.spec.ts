import { SignupFormValidatorService } from './signup-form-validator.service';
import { TestBed } from '@angular/core/testing';

describe('SignupFormValidatorService', () => {
  let signupFormValidatorService: SignupFormValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    signupFormValidatorService = TestBed.inject(SignupFormValidatorService);
  });

  it('should be created', () => {
    expect(signupFormValidatorService).toBeTruthy();
  });
});