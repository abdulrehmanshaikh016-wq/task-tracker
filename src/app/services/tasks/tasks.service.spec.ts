import { TestBed } from '@angular/core/testing';
import { TasksService } from './tasks.service';

describe('TasksService', () => {
  let tasksService: TasksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    tasksService = TestBed.inject(TasksService);
  });

  it('should be created', () => {
    expect(tasksService).toBeTruthy();
  });
});