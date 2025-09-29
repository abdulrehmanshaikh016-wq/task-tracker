import { ManageTaskMembersModel } from '../../models/manage-task-members-model';
import { TasksService } from '../../services/tasks/tasks.service';
import { UserService } from '../../services/user/user.service';
import { UserModel } from '../../models/user-model';
import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';

export const manageTaskMembersResolver: ResolveFn<ManageTaskMembersModel | null> = async (route, state) => {

  const userService = inject(UserService);
  const tasksService = inject(TasksService);

  const taskId = Number(route.paramMap.get('taskid'));
  const users: UserModel[] = userService.getAllUsersFromStorage();

  return await tasksService.getMembersByTaskId(taskId, users);
};