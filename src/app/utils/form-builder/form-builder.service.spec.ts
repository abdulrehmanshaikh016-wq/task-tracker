import { FormBuilderService } from './form-builder.service';
import { TestBed } from '@angular/core/testing';

describe('FormBuilderService', () => {
  let formBuilderService: FormBuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    formBuilderService = TestBed.inject(FormBuilderService);
  });

  it('should be created', () => {
    expect(formBuilderService).toBeTruthy();
  });
});