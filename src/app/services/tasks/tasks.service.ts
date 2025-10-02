import { ManageTaskMembersModel } from '../../models/manage-task-members-model';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { LocalStorageKeysEnum } from '../../keys/local-storage-keys.enum';
import { TasksApiRoutes } from '../../api/tasks-api-routes';
import { TasksModel } from '../../models/tasks-model';
import { UserModel } from '../../models/user-model';
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
      return [];
    }

    // If empty array (or any valid array), just return as is
    return storedTasks.map((t) => new TasksModel(t));
  }

  async deleteTask(taskId: number, currentTasksList: TasksModel[], authUserId: number): Promise<TasksModel[]> {
    try {
      const taskApiUrlWithTaskId = TasksApiRoutes.DeleteTask.replace('{{taskId}}', taskId.toString());
      const deleteTaskApiCall = this._http.delete(taskApiUrlWithTaskId);
      
      await firstValueFrom(deleteTaskApiCall);

      // If API succeeds, remove from local storage if it exists
      let localTasks = this._localStorageService.getItem<TasksModel[]>(LocalStorageKeysEnum.TasksList) ?? [];
      localTasks = localTasks.filter(task => task.id !== taskId && task.members.includes(authUserId));
      this.setNewTasksInLocalStorage(localTasks);

      return localTasks; // updated list
    } catch (error) {
      // Remove from local storage
      const newUpdatedList = currentTasksList.filter(task => task.id !== taskId && task.members.includes(authUserId));
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
      return tasks.filter(task => task.isDeleted === false && task.members.includes(authUserId));
    } catch (error) {
      // console.error('Could not get all tasks', error);

      // Fallback to localStorage or mock tasks
      const tasks = this.getTasksFromLocalStorageOrStaticMockTasks(authUserId);

      // Also filter out deleted tasks here
      return tasks.filter(task => task.isDeleted === false && task.members.includes(authUserId));
    }
  }

  /** Get a single task by ID for a given user */
  getTaskById(taskId: number, authUserId: number): TasksModel | null {
    // First, get tasks from local storage or mock
    const tasks = this.getTasksFromLocalStorageOrStaticMockTasks(authUserId);

    // Filter out deleted tasks
    const activeTasks = tasks.filter(task => task.isDeleted === false && task.members.includes(authUserId));

    // Find task by ID
    const task = activeTasks.find(t => t.id === taskId) ?? null;

    return task;
  }

  private _getTasksFromLocalStorage(): TasksModel[] | null {
    return this._localStorageService.getItem<TasksModel[]>(LocalStorageKeysEnum.TasksList);
  }

  async getMembersByTaskId(taskId: number, users: UserModel[]): Promise<ManageTaskMembersModel | null> {
    try {
      const tasksFromStorage = this._getTasksFromLocalStorage();
      if (!tasksFromStorage) return null;

      const task = tasksFromStorage.find((t) => t.id === taskId);
      if (!task) return null;

      // Find user objects whose IDs are in the task.members array
      const members = users.filter(user => task.members.includes(user.id));

      return new ManageTaskMembersModel({ task, members, allUsersFromStorage: users });
    } catch (error) {
      return null;
    }
  }

  removeMemberFromTask(userId: number, taskId: number | undefined) {
    const tasksFromStorage = this._getTasksFromLocalStorage();
    if (!tasksFromStorage) return null;

    const task = tasksFromStorage.find((t) => t.id === taskId);
    if (!task) return null;

    // Remove the userId from the members array
    task.members = task.members.filter(id => id !== userId);

    // Save the updated tasks array back to local storage
    this.setNewTasksInLocalStorage(tasksFromStorage);

    return task;
  }

  addANewMemberInTaskLocalStorage(updatedTask: TasksModel) {
    const tasksFromStorage = this._getTasksFromLocalStorage() ?? [];
    const updatedTasks = tasksFromStorage.map(t => t.id === updatedTask.id ? updatedTask : t);
    this.setNewTasksInLocalStorage(updatedTasks);
  }
}