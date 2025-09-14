import { RoutingService } from '../../services/routing/routing.service';
import { AuthService } from '../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-screen-loader',
  templateUrl: './screen-loader.component.html',
  styleUrl: './screen-loader.component.scss',
  imports: [CommonModule],
})

export class ScreenLoaderComponent implements OnInit {

  constructor(
    private _routingService: RoutingService,
    private _authService: AuthService
  ) { }

  ngOnInit(): void {
    this._setupScreenLoaderPage();
  }

  private async _setupScreenLoaderPage() {
    setTimeout(() => {
      this._determineWhereToGoNext();
    }, 3000);
  }

  private async _determineWhereToGoNext() {
    const isUserLoggedIn = await this._checkIfUserIsLoggedIn();
    this._goToEitherLoginOrHomePage(isUserLoggedIn);
  }

  private async _checkIfUserIsLoggedIn(): Promise<boolean> {
    return await  firstValueFrom(this._authService.isLoggedIn());
  }

  private _goToEitherLoginOrHomePage(isUserLoggedIn: boolean) {
    if (isUserLoggedIn) {
      this._routingService.goToTasksPage();
    } else {
      this._routingService.goToLoginPage();
    }
  }
}