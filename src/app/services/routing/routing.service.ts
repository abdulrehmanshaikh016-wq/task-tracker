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

  goToScreenLoader() {
    this._router.navigateByUrl(RoutesEnum.ScreenLoader);
  }

  goToLoginPage() {
    this._router.navigateByUrl(RoutesEnum.Login);
  }

  goToSignupPage() {
    this._router.navigateByUrl(RoutesEnum.Signup);
  }

  goToTasksPage() {
    this._router.navigateByUrl(RoutesEnum.Tasks);
  }

  goToCreateANewTaskPage() {
    this._router.navigateByUrl(RoutesEnum.CreateANewTask);
  }

  goToEditTaskPage(taskId: number) {
    const editTaskRouteWithTaskId = RoutesEnum.EditTask.replace(':taskid', taskId.toString());
    this._router.navigateByUrl(editTaskRouteWithTaskId);
  }
}