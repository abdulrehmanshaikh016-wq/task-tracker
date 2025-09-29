import { RoutingService } from '../../services/routing/routing.service';
import { TasksService } from '../../services/tasks/tasks.service';
import { AuthService } from '../../services/auth/auth.service';
import { HeaderComponent } from "../header/header.component";
import { TasksModel } from '../../models/tasks-model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
  imports: [CommonModule, HeaderComponent]
})

export class TasksComponent implements OnInit {

  tasks: TasksModel[] = [];
  timerIntervals: { [taskId: number]: any } = {};
  timerValues: { [taskId: number]: number } = {};

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

  editTaskMemebers(taskId: number) {
    this._routingService.goToManageTaskMembers(taskId);
  }

  isTimerRunning(taskId: number): boolean {
    return !!this.timerIntervals[taskId];
  }

  toggleTimer(taskId: number) {
    // Stop all other timers
    Object.keys(this.timerIntervals).forEach(id => {
      const numericId = Number(id);
      if (this.timerIntervals[numericId]) {
        clearInterval(this.timerIntervals[numericId]);
        this.timerIntervals[numericId] = null;
      }
    });
  
    // If the selected timer was already running, just stop it
    if (this.isTimerRunning(taskId)) {
      return;
    }
  
    // Start the selected timer
    this.timerIntervals[taskId] = setInterval(() => {
      const task = this.tasks.find(t => t.id === taskId);
      if (task) {
        task.elapsedTime = (task.elapsedTime || 0) + 1;
        this._saveElapsedTime(taskId);
      }
    }, 1000);
  }

  getTimerDisplay(taskId: number): string {
    const task = this.tasks.find(t => t.id === taskId);
    const seconds = task?.elapsedTime || 0;
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }
  
  getRemainingTimeDisplay(taskId: number): string {
    const task = this.tasks.find(t => t.id === taskId);
    if (!task) return '00:00:00';
    const remaining = Math.max((task.taskDuration || 0) * 3600 - (task.elapsedTime || 0), 0);
    const h = Math.floor(remaining / 3600);
    const m = Math.floor((remaining % 3600) / 60);
    const s = remaining % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }
  
  private _saveElapsedTime(taskId: number) {
    // Save the updated tasks array to local storage
    this._tasksService.setNewTasksInLocalStorage(this.tasks);
  }
}