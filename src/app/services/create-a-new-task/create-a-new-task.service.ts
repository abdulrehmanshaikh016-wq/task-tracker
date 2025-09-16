import { Injectable } from '@angular/core';
import { CreateANewTaskPayload } from '../../models/create-a-new-task-payload';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { TasksApiRoutes } from '../../api/tasks-api-routes';
import { FormGroup } from '@angular/forms';
import { CreateANewTaskForm } from '../../forms/create-a-new-task-form';
import { TaskPrioritiesEnum } from '../../enums/task-priorities.enum';

@Injectable({
  providedIn: 'root'
})

export class CreateANewTaskService {

  constructor(
    private _http: HttpClient
  ) {}

  createPayloadForNewTask(createANewTaskForm: FormGroup<CreateANewTaskForm>) {
    return new CreateANewTaskPayload({
      taskName: createANewTaskForm?.controls?.taskName?.value as string,
      taskDescription: createANewTaskForm.controls.taskDescription.value as string,
      taskPriority: createANewTaskForm.controls.taskPriority.value as TaskPrioritiesEnum
    });
  }

  async createANewTask(createANewTaskPayload: CreateANewTaskPayload): Promise<any> {
    try {
      const createANewTaskApiCall = await firstValueFrom(this._http.post(TasksApiRoutes.CreateANewTask, createANewTaskPayload));
    } catch (error) {
      console.error(error);
      return;
    }
  }
}