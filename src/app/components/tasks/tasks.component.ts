import { RoutingService } from '../../services/routing/routing.service';
import { TasksService } from '../../services/tasks/tasks.service';
import { AuthService } from '../../services/auth/auth.service';
import { TasksModel } from '../../models/tasks-model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
  imports: [CommonModule]
})

export class TasksComponent implements OnInit {

  columns = [
    { field: 'id', header: 'ID' },
    { field: 'taskName', header: 'Task Name' },
    { field: 'taskDescription', header: 'Description' },
    { field: 'isActive', header: 'Active' },
    { field: 'isDeleted', header: 'Deleted' },
    { field: 'taskPriority', header: 'Priority' }
  ];

  tasks: TasksModel[] = [];

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _routingService: RoutingService,
    private _tasksService: TasksService,
    private _authService: AuthService
  ) {}

  ngOnInit(): void {
    this._setupTasksPage();
  }

  private _setupTasksPage() {
    this._subscribeToEvents();
  }

  private _subscribeToEvents() {
    this._subscribeToActivatedRouteTasksListEvent();
  }

  private _subscribeToActivatedRouteTasksListEvent() {
    this._activatedRoute.data.subscribe((data) => {
      this.tasks = data["tasks"] ?? [];
    });
  }

  logout() {
    this._authService.logout();
    this._routingService.goToLoginPage();
  }

  addTask() {
    this._routingService.goToCreateANewTaskPage();
  }

  async deleteTask(taskId: number) {
    const authUserId: number | null = this._authService.getLoggedInUserId();
    if (!authUserId) return;
    const response = await this._tasksService.deleteTask(taskId, this.tasks, authUserId);

    if (!response) {
      return;
    }

    this.tasks = response;
  }

  goToEditTaskPage(taskId: number) {
    this._routingService.goToEditTaskPage(taskId);
  }
}