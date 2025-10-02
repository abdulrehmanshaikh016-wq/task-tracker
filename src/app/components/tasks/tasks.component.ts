import { SecondsToHhmmssPipe } from '../../pipes/seconds-to-hhmmss/seconds-to-hhmmss.pipe';
import { TaskTimerService } from '../../services/task-timer/task-timer.service';
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
  imports: [CommonModule, HeaderComponent, SecondsToHhmmssPipe]
})

export class TasksComponent implements OnInit {

  tasks: TasksModel[] = [];
  timerIntervals: { [taskId: number]: any } = {};
  timerValues: { [taskId: number]: number } = {};

  constructor(
    private _taskTimerService: TaskTimerService,
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
    this._activatedRoute.data.subscribe(data => {
      this.tasks = (data['tasks'] ?? []).map((t: any) => new TasksModel(t));
      this._taskTimerService.setTasks(this.tasks);
    });

    this._taskTimerService.tasks$.subscribe(tasks => {
      this.tasks = tasks;
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

    if (!response) return;

    this.tasks = response;
  }

  goToEditTaskPage(taskId: number) {
    this._routingService.goToEditTaskPage(taskId);
  }

  editTaskMemebers(taskId: number) {
    this._routingService.goToManageTaskMembers(taskId);
  }

  isTimerRunning(taskId: number): boolean {
    const task = this.tasks.find(t => t.id === taskId);
    return !!task?.timerStart;
  }

  toggleTimer(taskId: number) {
    const task = this.tasks.find(t => t.id === taskId);
    if (!task) return;

    if (task.timerStart) {
      this._taskTimerService.pauseTimer(taskId);
      // tasks$ subscription will automatically update the table after pause
    } else {
      this._taskTimerService.startTimer(taskId);
    }
  }

  getTimerDisplay(task: TasksModel) {
    const elapsed = this._taskTimerService.getElapsedTime(task);
    const h = Math.floor(elapsed / 3600);
    const m = Math.floor((elapsed % 3600) / 60);
    const s = elapsed % 60;
    return `${h.toString().padStart(2,'0')}:${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
  }

  getRemainingTimeDisplay(taskId: number): string {
    const task = this.tasks.find(t => t.id === taskId);
    if (!task) return '00:00:00';
    
    const totalElapsed = this._taskTimerService.getElapsedTime(task);
    const remaining = Math.max((task.taskDuration || 0) * 3600 - totalElapsed, 0);

    const h = Math.floor(remaining / 3600);
    const m = Math.floor((remaining % 3600) / 60);
    const s = remaining % 60;
    return `${h.toString().padStart(2,'0')}:${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
  }
}