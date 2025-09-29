import { manageTaskMembersResolver } from './manage-task-members.resolver';
import { ManageTaskMembersModel } from '../../models/manage-task-members-model';
import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

describe('manageTaskMembersResolver', () => {
  const executeResolver: ResolveFn<ManageTaskMembersModel | null> = (...resolverParameters) => 
    TestBed.runInInjectionContext(() => manageTaskMembersResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});