import { TasksService } from '../../services/tasks/tasks.service';
import { AuthService } from '../../services/auth/auth.service';
import { TasksModel } from '../../models/tasks-model';
import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';

export const tasksResolver: ResolveFn<TasksModel[]> = async (route, state) => {

  const authService = inject(AuthService);
  const tasksService = inject(TasksService);

  const authUserId: number | null = authService.getLoggedInUserId();
  return await tasksService.getAllTasksForUser(authUserId!);
};