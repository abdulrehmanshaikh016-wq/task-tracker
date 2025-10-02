import { RoutesEnum } from '../../routes/routes.enum';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class RoutingService {

  constructor(
    private _router: Router
  ) {}

  goToPage(route: string) {
    this._router.navigateByUrl(route);
  }

  goToScreenLoader() {
    this.goToPage(RoutesEnum.ScreenLoader);
  }

  goToLoginPage() {
    this.goToPage(RoutesEnum.Login);
  }

  goToSignupPage() {
    this.goToPage(RoutesEnum.Signup);
  }

  goToDashboard() {
    this.goToPage(RoutesEnum.Dashboard);
  }

  goToTasksPage() {
    this.goToPage(RoutesEnum.Tasks);
  }

  goToCreateANewTaskPage() {
    this.goToPage(RoutesEnum.CreateANewTask);
  }

  goToEditTaskPage(taskId: number) {
    const editTaskRouteWithTaskId = RoutesEnum.EditTask.replace(':taskid', taskId.toString());
    this.goToPage(editTaskRouteWithTaskId);
  }

  goToManageTaskMembers(taskId: number) {
    const manageTaskMembersRouteWithTaskId = RoutesEnum.ManageTaskMembers.replace(':taskid', taskId.toString());
    this._router.navigateByUrl(manageTaskMembersRouteWithTaskId);
  }
}