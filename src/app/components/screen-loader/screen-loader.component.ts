import { RoutingService } from '../../services/routing/routing.service';
import { AuthService } from '../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-screen-loader',
  templateUrl: './screen-loader.component.html',
  styleUrls: ['./screen-loader.component.scss'],
  imports: [CommonModule],
})

export class ScreenLoaderComponent implements OnInit {

  progress: number = 0;
  statusMessage: string = 'Loading your tasks...';

  constructor(
    private _routingService: RoutingService,
    private _authService: AuthService
  ) { }

  ngOnInit(): void {
    this._setupScreenLoaderPage();
  }

  private async _setupScreenLoaderPage() {
    this.simulateProgressIndidicator();
    // 1st message already set (Loading your tasks...)

    // after some time, check login status
    setTimeout(async () => {
      this.statusMessage = 'Checking if you are logged in...'; // 2nd message
      setTimeout(async () => {
        const isUserLoggedIn = await this._checkIfUserIsLoggedIn();

        this.statusMessage = 'Preparing your experience...'; // 3rd message
        setTimeout(() => {
          this._goToEitherLoginOrHomePage(isUserLoggedIn);
        }, 2000);
      }, 1700);
    }, 1500);
  }

  private _checkIfUserIsLoggedIn(): boolean {
    return this._authService.isLoggedIn();
  }

  private _goToEitherLoginOrHomePage(isUserLoggedIn: boolean) {
    if (isUserLoggedIn) {
      this._routingService.goToTasksPage();
    } else {
      this._routingService.goToLoginPage();
    }
  }

  simulateProgressIndidicator() {
    // Simulate loading progress
    const interval = setInterval(() => {
      if (this.progress < 100) {
        this.progress += 2; // increment speed
      } else {
        clearInterval(interval);
      }
    }, 100);
  }
}