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

  goToHomePage() {
    this._router.navigateByUrl(RoutesEnum.Home);
  }

  goToLoginPage() {
    this._router.navigateByUrl(RoutesEnum.Login);
  }
}