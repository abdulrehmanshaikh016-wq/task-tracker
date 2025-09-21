import { editTaskResolver } from './edit-task.resolver';
import { TasksModel } from '../../models/tasks-model';
import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

describe('editTaskResolver', () => {
  const executeResolver: ResolveFn<TasksModel | null> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => editTaskResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});