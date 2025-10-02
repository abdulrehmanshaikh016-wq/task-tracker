import { DashboardResolverModel } from '../../models/dashboard-resolver-model';
import { dashboardResolver } from './dashboard.resolver';
import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

describe('dashboardResolver', () => {
  const executeResolver: ResolveFn<DashboardResolverModel> = (...resolverParameters) => 
    TestBed.runInInjectionContext(() => dashboardResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});