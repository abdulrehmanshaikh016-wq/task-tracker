import { LocalStorageService } from '../local-storage/local-storage.service';
import { LocalStorageKeysEnum } from '../../keys/local-storage-keys.enum';
import { MockTasksList } from '../../../test/mocks/mock-tasks';
import { TasksApiRoutes } from '../../api/tasks-api-routes';
import { TasksModel } from '../../models/tasks-model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TasksService {

  constructor(
    private _localStorageService: LocalStorageService,
    private _http: HttpClient
  ) { }

  getTasksFromLocalStorageOrStaticMockTasks(authUserId: number): TasksModel[] {
    const storedTasks = this._localStorageService.getItem<TasksModel[]>(LocalStorageKeysEnum.TasksList);

    // Return mock tasks only if undefined or null
    if (storedTasks === null || storedTasks === undefined) {
      MockTasksList.forEach(element => {
        element.userId = authUserId;
      });
      return MockTasksList;
    }

    // If empty array (or any valid array), just return as is
    return storedTasks;
  }

  async deleteTask(taskId: number, currentTasksList: TasksModel[], authUserId: number): Promise<TasksModel[]> {
    try {
      const taskApiUrlWithTaskId = TasksApiRoutes.DeleteTask.replace('{{taskId}}', taskId.toString());
      const deleteTaskApiCall = this._http.delete(taskApiUrlWithTaskId);
      
      await firstValueFrom(deleteTaskApiCall);

      // If API succeeds, remove from local storage if it exists
      let localTasks = this._localStorageService.getItem<TasksModel[]>(LocalStorageKeysEnum.TasksList) ?? [];
      localTasks = localTasks.filter(task => task.id !== taskId && task.userId === authUserId);
      this.setNewTasksInLocalStorage(localTasks);

      return localTasks; // updated list
    } catch (error) {
      // Remove from local storage
      const newUpdatedList = currentTasksList.filter(task => task.id !== taskId && task.userId === authUserId);
      this._localStorageService.setItem(LocalStorageKeysEnum.TasksList, newUpdatedList);

      return newUpdatedList; // return updated list anyway
    }
  }

  setNewTasksInLocalStorage(localTasks: TasksModel[]) {
    this._localStorageService.setItem(LocalStorageKeysEnum.TasksList, localTasks);
  }

  async getAllTasksForUser(authUserId: number): Promise<TasksModel[]> {
    try {
      const getAllTasksApiCall = this._http.get<TasksModel[]>(environment.apiUrl + TasksApiRoutes.GetTasks);

      // Await the API response
      const tasks = await firstValueFrom(getAllTasksApiCall);

      // Filter out deleted tasks
      return tasks.filter(task => task.isDeleted === false && task.userId === authUserId);
    } catch (error) {
      // console.error('Could not get all tasks', error);

      // Fallback to localStorage or mock tasks
      const tasks = this.getTasksFromLocalStorageOrStaticMockTasks(authUserId);

      // Also filter out deleted tasks here
      return tasks.filter(task => task.isDeleted === false && task.userId === authUserId);
    }
  }

  /** Get a single task by ID for a given user */
  getTaskById(taskId: number, authUserId: number): TasksModel | null {
    // First, get tasks from local storage or mock
    const tasks = this.getTasksFromLocalStorageOrStaticMockTasks(authUserId);

    // Filter out deleted tasks
    const activeTasks = tasks.filter(task => task.isDeleted === false && task.userId === authUserId);

    // Find task by ID
    const task = activeTasks.find(t => t.id === taskId) ?? null;

    return task;
  }
}