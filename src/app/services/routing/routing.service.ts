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

  goToTasksPage() {
    this._router.navigateByUrl(RoutesEnum.Tasks);
  }

  goToLoginPage() {
    this._router.navigateByUrl(RoutesEnum.Login);
  }

  goToCreateANewTaskPage() {
    this._router.navigateByUrl(RoutesEnum.CreateANewTask);
  }
}