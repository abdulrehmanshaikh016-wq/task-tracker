import { TasksService } from '../../services/tasks/tasks.service';
import { AuthService } from '../../services/auth/auth.service';
import { TasksModel } from '../../models/tasks-model';
import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';

export const editTaskResolver: ResolveFn<TasksModel | null> = async (route, state) => {

  const authService = inject(AuthService);
  const tasksService = inject(TasksService);

  const taskId = Number(route.paramMap.get('taskid'));
  const authUserId: number | null = authService.getLoggedInUserId();
  return await tasksService.getTaskById(taskId, authUserId!);
};