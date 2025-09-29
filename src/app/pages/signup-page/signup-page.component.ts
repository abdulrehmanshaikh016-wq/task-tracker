import { SignupFormComponent } from "../../components/signup-form/signup-form.component";
import { HeaderComponent } from "../../components/header/header.component";
import { RoutingService } from "../../services/routing/routing.service";
import { Component } from '@angular/core';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.scss',
  imports: [SignupFormComponent, HeaderComponent]
})

export class SignupPageComponent {

  constructor(
    private _routingService: RoutingService
  ) {}

  onSignupSuccess() {
    this._routingService.goToLoginPage();
  }
}