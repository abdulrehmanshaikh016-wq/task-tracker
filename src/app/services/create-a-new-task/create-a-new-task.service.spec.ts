import { CreateANewTaskService } from './create-a-new-task.service';
import { TestBed } from '@angular/core/testing';

describe('CreateANewTaskService', () => {
  let createANewTaskService: CreateANewTaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    createANewTaskService = TestBed.inject(CreateANewTaskService);
  });

  it('should be created', () => {
    expect(createANewTaskService).toBeTruthy();
  });
});