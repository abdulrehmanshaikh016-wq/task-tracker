import { RoutingService } from '../../../services/routing/routing.service';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TasksModel } from '../../../models/tasks-model';

@Component({
  selector: 'app-task-progress-card',
  imports: [CommonModule],
  templateUrl: './task-progress-card.component.html',
  styleUrl: './task-progress-card.component.scss'
})

export class TaskProgressCardComponent {

  @Input({ required: true }) tasks: TasksModel[] = [];

  constructor(
    private _routingService: RoutingService
  ) {}

  goToTasks() {
    this._routingService.goToTasksPage();
  }
}