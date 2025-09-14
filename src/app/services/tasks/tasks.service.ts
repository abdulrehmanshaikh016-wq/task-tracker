import { MockTasksList } from '../../../test/mocks/mock-tasks';
import { TasksApiRoutes } from '../../api/tasks-api-routes';
import { TasksModel } from '../../models/tasks-model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TasksService {

  constructor(
    private _http: HttpClient
  ) { }

  async getAllTasks(): Promise<TasksModel[]> {
    try {
      const getAllTasksApiCall = this._http.get<TasksModel[]>(TasksApiRoutes.GetAllTasks);

      return await firstValueFrom(getAllTasksApiCall);
    } catch (error) {
      console.error('Could not get all tasks', error);
      return MockTasksList;
      // return [];
    }
  }

  async deleteTask(taskIndex: number) {
    try {
      const taskApiUrlWithTaskIndex = TasksApiRoutes.DeleteTask.replace('{{taskIndex}}', taskIndex.toString());
      const deleteTaskApiCall = this._http.delete(taskApiUrlWithTaskIndex);
      
      return await firstValueFrom(deleteTaskApiCall);
    } catch (error) {
      console.error('Could not delete task', error);
      return;
    }
  }
}