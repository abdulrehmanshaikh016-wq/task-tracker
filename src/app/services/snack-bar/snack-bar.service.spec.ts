import { SnackBarService } from './snack-bar.service';
import { TestBed } from '@angular/core/testing';

describe('SnackBarService', () => {
  let snackBarService: SnackBarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    snackBarService = TestBed.inject(SnackBarService);
  });

  it('should be created', () => {
    expect(snackBarService).toBeTruthy();
  });
});