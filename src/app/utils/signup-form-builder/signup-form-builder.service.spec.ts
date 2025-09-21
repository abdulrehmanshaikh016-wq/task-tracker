import { SignupFormBuilderService } from './signup-form-builder.service';
import { TestBed } from '@angular/core/testing';

describe('SignupFormBuilderService', () => {
  let signupFormBuilderService: SignupFormBuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    signupFormBuilderService = TestBed.inject(SignupFormBuilderService);
  });

  it('should be created', () => {
    expect(signupFormBuilderService).toBeTruthy();
  });
});