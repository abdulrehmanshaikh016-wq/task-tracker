import { TasksModel } from '../../models/tasks-model';
import { tasksResolver } from './tasks.resolver';
import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

describe('tasksResolver', () => {
  const executeResolver: ResolveFn<TasksModel[]> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => tasksResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});