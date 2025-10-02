import { DashboardResolverModel } from '../../models/dashboard-resolver-model';
import { TasksService } from '../../services/tasks/tasks.service';
import { UserService } from '../../services/user/user.service';
import { AuthService } from '../../services/auth/auth.service';
import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';

export const dashboardResolver: ResolveFn<DashboardResolverModel> = async (route, state) => {

  const userService = inject(UserService);
  const authService = inject(AuthService);
  const tasksService = inject(TasksService);

  const users = userService.getAllUsersFromStorage();
  const authUserId: number | null = authService.getLoggedInUserId();
  const tasks = await tasksService.getAllTasksForUser(authUserId!);

  return new DashboardResolverModel({ tasks, users });
};