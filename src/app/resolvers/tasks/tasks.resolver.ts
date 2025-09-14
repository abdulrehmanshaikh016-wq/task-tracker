import { TasksService } from '../../services/tasks/tasks.service';
import { TasksModel } from '../../models/tasks-model';
import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';

export const tasksResolver: ResolveFn<TasksModel[]> = async (route, state) => {

  const tasksService = inject(TasksService);

  return await tasksService.getAllTasks();
};