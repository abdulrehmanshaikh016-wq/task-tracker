import { CreateANewTaskPayload } from '../../models/create-a-new-task-payload';
import { TaskPrioritiesEnum } from '../../enums/task-priorities.enum';
import { TaskFormGroup } from '../../forms/create-a-new-task-form';
import { TasksApiRoutes } from '../../api/tasks-api-routes';
import { TasksModel } from '../../models/tasks-model';
import { TasksService } from '../tasks/tasks.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CreateANewTaskService {

  constructor(
    private _tasksService: TasksService,
    private _http: HttpClient
  ) {}

  createPayloadForNewTask(createANewTaskForm: FormGroup<TaskFormGroup>, authUserId: number) {
    return new CreateANewTaskPayload({
      userId: authUserId,
      taskName: createANewTaskForm?.controls?.taskName?.value as string,
      taskDescription: createANewTaskForm.controls.taskDescription.value as string,
      taskPriority: createANewTaskForm.controls.taskPriority.value as TaskPrioritiesEnum,
      taskDuration: createANewTaskForm.controls.taskDuration.value as number
    });
  }

  async createANewTask(createANewTaskPayload: CreateANewTaskPayload): Promise<any> {
    try {
      await firstValueFrom(this._http.post(TasksApiRoutes.CreateANewTask, createANewTaskPayload));
      return true;
    } catch (error) {
      const currentTasksInTheSystem = this._tasksService.getTasksFromLocalStorageOrStaticMockTasks(createANewTaskPayload.userId);
      const newIndexForNewTask = (await currentTasksInTheSystem).length + 1;
      
      const newTask = new TasksModel({
        id: newIndexForNewTask,
        members: [createANewTaskPayload.userId],
        taskName: createANewTaskPayload.taskName,
        taskDescription: createANewTaskPayload.taskDescription,
        taskPriority: createANewTaskPayload.taskPriority,
        isActive: true,
        isDeleted: false,
        taskDuration: createANewTaskPayload.taskDuration,
        elapsedTime: 0
      });

      currentTasksInTheSystem.push(newTask);

      this._tasksService.setNewTasksInLocalStorage(currentTasksInTheSystem);

      return true;
    }
  }

  /** Update an existing task */
  async updateTask(taskId: number, createANewTaskPayload: CreateANewTaskPayload): Promise<boolean> {
    try {
      const updateUrl = TasksApiRoutes.UpdateTask.replace('{{taskId}}', taskId.toString());
      await firstValueFrom(this._http.put(updateUrl, createANewTaskPayload));
      return true;
    } catch (error) {
      // Fallback to local storage
      const currentTasksInTheSystem = await this._tasksService.getTasksFromLocalStorageOrStaticMockTasks(createANewTaskPayload.userId);
      const taskIndex = currentTasksInTheSystem.findIndex(t => t.id === taskId);
      if (taskIndex !== -1) {
        currentTasksInTheSystem[taskIndex] = {
          ...currentTasksInTheSystem[taskIndex],
          taskName: createANewTaskPayload.taskName,
          taskDescription: createANewTaskPayload.taskDescription,
          taskPriority: createANewTaskPayload.taskPriority
        };
        this._tasksService.setNewTasksInLocalStorage(currentTasksInTheSystem);
      }
      return true;
    }
  }
}