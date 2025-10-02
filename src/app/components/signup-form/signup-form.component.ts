import { SignupFormValidatorService } from '../../utils/signup-form-validator/signup-form-validator.service';
import { SignupFormBuilderService } from '../../utils/signup-form-builder/signup-form-builder.service';
import { PasswordInputComponent } from "../inputs/password-input/password-input.component";
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RoutingService } from '../../services/routing/routing.service';
import { SignupService } from '../../services/signup/signup.service';
import { SignupModel } from '../../models/signup-model';
import { SignupForm } from '../../forms/signup-form';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrl: './signup-form.component.scss',
  imports: [ReactiveFormsModule, PasswordInputComponent]
})

export class SignupFormComponent implements OnInit {

  isSigningUpUser: boolean = false;
  signupForm: FormGroup<SignupForm>;
  previewUrl: string | ArrayBuffer | null = null;

  constructor(
    private _signupFormValidator: SignupFormValidatorService,
    private _signupFormBuilder: SignupFormBuilderService,
    private _routingService: RoutingService,
    private _signupService: SignupService
  ) {
    this.signupForm = this._signupFormBuilder.createSignupForm();
  }

  ngOnInit(): void {
    this._setupSignupPage();
  }

  get signupUsernameControl(): FormControl {
    return this.signupForm.controls.username;
  }

  get signupPasswordControl(): FormControl {
    return this.signupForm.controls.password;
  }

  get signupConfirmPasswordControl(): FormControl {
    return this.signupForm.controls.confirmPassword;
  }

  get signupProfileImageControl(): FormControl {
    return this.signupForm.controls.profileImage;
  }

  getPasswordError(passwordFormControl: FormControl): string | null {
    return this._signupFormValidator.getPasswordError(passwordFormControl);
  }

  getConfirmPasswordError(control: FormControl): string | null {
    // Check individual password field errors
    const passwordError = this._signupFormValidator.getPasswordError(control);
    if (passwordError) return passwordError;

    // Only show mismatch if user has interacted with confirm password
    const confirmPasswordControl = this.signupConfirmPasswordControl;
    if ((confirmPasswordControl.touched || confirmPasswordControl.dirty) && this.signupForm.errors?.['passwordMismatch']) {
      return 'Passwords do not match';
    }

    return null;
  }

  private _setupSignupPage(): void {
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result;  // for preview
        this.signupProfileImageControl.setValue(reader.result as string);
        this.signupProfileImageControl.updateValueAndValidity();
      };
      reader.readAsDataURL(file);
    }
  }

  async onSignupSubmit() {
    if (!this.signupForm.valid) {
      this.signupForm.markAllAsTouched();
      this.signupForm.markAllAsDirty();
      return;
    }

    // User details are valid. Proceed to login.
    this._handleUserSignup();
  }

  private async _handleUserSignup() {
    const userSignupPayload = this._createPayloadForUserSignup();

    if (!userSignupPayload) return;

    const userSignupResponse = await this._signupService.createNewUser(userSignupPayload);

    if (!userSignupResponse) return;

    this._routingService.goToLoginPage();
  }

  private _createPayloadForUserSignup() {
    return new SignupModel({
      username: this.signupUsernameControl.value,
      password: this.signupPasswordControl.value,
      confirmPassword: this.signupConfirmPasswordControl.value,
      profileImage: this.signupProfileImageControl.value
    });
  }
}