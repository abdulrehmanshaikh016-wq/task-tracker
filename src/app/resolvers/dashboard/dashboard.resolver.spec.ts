import { dashboardResolver } from './dashboard.resolver';
import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';
import { TasksModel } from '../../models/tasks-model';

describe('dashboardResolver', () => {
  const executeResolver: ResolveFn<TasksModel[]> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => dashboardResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
