import { LoginFormValidatorService } from '../../utils/login-form-validator/login-form-validator.service';
import { LoginFormBuilderService } from '../../utils/login-form-builder/login-form-builder.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RoutingService } from '../../services/routing/routing.service';
import { LoginService } from '../../services/login/login.service';
import { LoginModel } from '../../models/login-model';
import { LoginForm } from '../../forms/login-form';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  imports: [CommonModule, ReactiveFormsModule]
})

export class LoginComponent implements OnInit {

  loginForm!: FormGroup<LoginForm>;
  isLoggingInUser: boolean = false;

  constructor(
    private _loginFormBuilderService: LoginFormBuilderService,
    private _loginFormValidator: LoginFormValidatorService,
    private _routingService: RoutingService,
    private _loginService: LoginService
  ) {
    this.loginForm = this._loginFormBuilderService.buildLoginForm();
  }

  ngOnInit(): void {
    this._setupLoginPage();
  }

  get loginUsernameControl(): FormControl {
    return this.loginForm.controls.username;
  }

  get loginPasswordControl(): FormControl {
    return this.loginForm.controls.password;
  }

  getUsernameError(): string | null {
    return this._loginFormValidator.getUsernameError(this.loginUsernameControl);
  }

  getPasswordError(): string | null {
    return this._loginFormValidator.getPasswordError(this.loginPasswordControl);
  }

  private _setupLoginPage(): void {
  }

  async onLoginSubmit() {
    if (!this.loginForm.valid) {
      this.loginForm.markAllAsTouched();
      this.loginForm.markAllAsDirty();
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

  goToSignupPage() {
    this._routingService.goToSignupPage();
  }
}