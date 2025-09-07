import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})

export class LoginFormBuilderService {

  constructor(
    private _formBuilder: FormBuilder
  ) { }

  buildLoginForm(): FormGroup {
    return this._formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
}
