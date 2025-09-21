import { FormControl } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class LoginFormValidatorService {

  getUsernameError(loginUsernameControl: FormControl): string | null {
    if (loginUsernameControl?.touched || loginUsernameControl?.dirty) {
      if (loginUsernameControl.hasError('required')) {
        return 'Username is required.';
      }
    }

    return null;
  }

  getPasswordError(passwordFormControl: FormControl): string | null {
    if (passwordFormControl?.touched || passwordFormControl?.dirty) {
      if (passwordFormControl.hasError('required')) {
        return 'Password is required.';
      }
    }

    return null;
  }
}