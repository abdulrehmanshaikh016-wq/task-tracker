import { FormValidatorService } from './form-validator.service';
import { TestBed } from '@angular/core/testing';

describe('FormValidatorService', () => {
  let formValidatorService: FormValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    formValidatorService = TestBed.inject(FormValidatorService);
  });

  it('should be created', () => {
    expect(formValidatorService).toBeTruthy();
  });
});