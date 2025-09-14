import { LoginFormBuilderService } from '../../utils/login-form-builder/login-form-builder.service';
import { AbstractControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RoutingService } from '../../services/routing/routing.service';
import { LoginService } from '../../services/login/login.service';
import { LoginModel } from '../../models/login-model';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  imports: [CommonModule, ReactiveFormsModule]
})

export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  isLoggingInUser: boolean = false;

  constructor(
    private _loginFormBuilderService: LoginFormBuilderService,
    private _routingService: RoutingService,
    private _loginService: LoginService
  ) {}

  ngOnInit(): void {
    this._setupLoginPage();
  }

  get loginUsernameControl(): AbstractControl {
    return this.loginForm.get('username') as AbstractControl;
  }

  get loginPasswordControl(): AbstractControl {
    return this.loginForm.get('password') as AbstractControl;
  }

  private _setupLoginPage(): void {
    this.loginForm = this._loginFormBuilderService.buildLoginForm();
  }

  async onLoginSubmit() {
    if (!this.loginForm.valid) {
      // Mark all controls as touched so errors show
      Object.values(this.loginForm.controls).forEach(control => {
        control.markAsTouched();
        control.markAsDirty();
      });
      return;
    }

    // User details are valid. Proceed to login.
    this._handleUserLogin();
  }

  private async _handleUserLogin() {
    this._showIsLoggingInUserError(true);
    const loginRequestPayload = this._createLoginRequestPayload();
    const isAuthenticated = await this._loginService.login(loginRequestPayload);
    if (isAuthenticated) {
      // Redirect to dashboard or home page
      this._routingService.goToTasksPage();  
    }
    this._showIsLoggingInUserError(false);
  }

  private _showIsLoggingInUserError(show: boolean): void {
    this.isLoggingInUser = show;
  }

  private _createLoginRequestPayload(): LoginModel {
    return new LoginModel({
      username: this.loginUsernameControl?.value,
      password: this.loginPasswordControl?.value
    });
  }
}