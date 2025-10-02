import { TaskProgressCardComponent } from "../../components/cards/task-progress-card/task-progress-card.component";
import { AllUsersCardComponent } from "../../components/cards/all-users-card/all-users-card.component";
import { TasksModel } from "../../models/tasks-model";
import { ActivatedRoute } from "@angular/router";
import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  imports: [TaskProgressCardComponent, AllUsersCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})

export class DashboardComponent {

  tasks: TasksModel[] = [];

  constructor(
    private _activatedRoute: ActivatedRoute
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
      this.tasks = (data["tasks"] ?? []).map((t: any) => new TasksModel(t));
      console.log(this.tasks);
    });
  }
}