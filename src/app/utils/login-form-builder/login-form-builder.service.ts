import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginForm } from '../../forms/login-form';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class LoginFormBuilderService {

  constructor(
    private _formBuilder: FormBuilder
  ) { }

  buildLoginForm(): FormGroup<LoginForm> {
    return this._formBuilder.group({
      username: new FormControl<string | null>('', Validators.required),
      password: new FormControl<string | null>('', Validators.required)
    });
  }
}