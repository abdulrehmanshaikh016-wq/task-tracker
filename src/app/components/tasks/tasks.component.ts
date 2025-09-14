import { TasksService } from '../../services/tasks/tasks.service';
import { TasksModel } from '../../models/tasks-model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RoutingService } from '../../services/routing/routing.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
  imports: [CommonModule]
})

export class TasksComponent implements OnInit {

  tasks: TasksModel[] = [];

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _routingService: RoutingService,
    private _tasksService: TasksService
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

  addTask() {
    this._routingService.goToCreateANewTaskPage();
  }

  async deleteTask(taskIndex: number) {
    const response = await this._tasksService.deleteTask(taskIndex);;
  }
}