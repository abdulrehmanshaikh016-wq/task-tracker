import { confirmPasswordValidator } from '../../validators/confirm-password-validator';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { passwordValidator } from '../../validators/password-validator';
import { SignupForm } from '../../forms/signup-form';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class SignupFormBuilderService {

  constructor(
    private _formBuilder: FormBuilder
  ) { }

  createSignupForm(): FormGroup<SignupForm> {
    return this._formBuilder.group({
      username: new FormControl<string | null>('', Validators.required),
      password: new FormControl<string | null>('', passwordValidator),
      confirmPassword: new FormControl<string | null>('', passwordValidator),
      profileImage: new FormControl<string | null>(null, Validators.required)
    }, { validators: confirmPasswordValidator });
  }
}