import { SignupService } from './signup.service';
import { TestBed } from '@angular/core/testing';

describe('SignupService', () => {
  let signupService: SignupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    signupService = TestBed.inject(SignupService);
  });

  it('should be created', () => {
    expect(signupService).toBeTruthy();
  });
});