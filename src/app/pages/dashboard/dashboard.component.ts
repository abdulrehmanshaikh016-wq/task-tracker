import { TaskProgressCardComponent } from "../../components/cards/task-progress-card/task-progress-card.component";
import { TasksPerUserCardComponent } from "../../components/tasks-per-user-card/tasks-per-user-card.component";
import { AllUsersCardComponent } from "../../components/cards/all-users-card/all-users-card.component";
import { RoutingService } from "../../services/routing/routing.service";
import { AuthService } from "../../services/auth/auth.service";
import { TasksModel } from "../../models/tasks-model";
import { UserModel } from "../../models/user-model";
import { ActivatedRoute } from "@angular/router";
import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  imports: [TaskProgressCardComponent, AllUsersCardComponent, TasksPerUserCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})

export class DashboardComponent {

  users: UserModel[] = [];
  tasks: TasksModel[] = [];
  profileImage: string | null = null;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _routingService: RoutingService,
    private _authService: AuthService
  ) { }

  ngOnInit(): void {
    this._setupTasksPage();
  }

  private _setupTasksPage() {
    this._subscribeToEvents();
    this._setProfileImageFromAuthService();
  }

  private _subscribeToEvents() {
    this._subscribeToActivatedRouteTasksListEvent();
  }

  private _subscribeToActivatedRouteTasksListEvent() {
    this._activatedRoute.data.subscribe((data) => {
      const dashboardResolverModel = data["dashboardResolverModel"];
      if (!dashboardResolverModel) return;

      this.tasks = (dashboardResolverModel?.tasks ?? []).map((t: any) => new TasksModel(t));
      this.users = dashboardResolverModel?.users ?? [];
    });
  }

  private _setProfileImageFromAuthService() {
    this.profileImage = this._authService.getAuthUser()?.profileImage ?? null;
  }

  logout() {
    this._authService.logout();
    this._routingService.goToLoginPage();
  }
}