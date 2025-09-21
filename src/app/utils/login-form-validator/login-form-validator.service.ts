import { FormControl } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class LoginFormValidatorService {
  
  getPasswordError(passwordFormControl: FormControl): string | null {
    if (passwordFormControl?.touched || passwordFormControl?.dirty) {
      if (passwordFormControl.hasError('required')) {
        return 'Password is required.';
      }
      const hasLowerCase = (/[a-z]/).test(passwordFormControl.value);
      if (!hasLowerCase) {
        return 'Password must have atleast one lowercase characters';
      }
      const hasUpperCase = /[A-Z]/.test(passwordFormControl.value);
      if (!hasUpperCase) {
        return 'Password must have atleast one uppercase characters';
      }
      const hasNumber = /\d/.test(passwordFormControl.value);
      if (!hasNumber) {
        return 'Password must have atleast one number';
      }
      const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(passwordFormControl.value);
      if (!hasSpecialCharacter) {
        return 'Password must have atleast one special character';
      }
      if (passwordFormControl.hasError('minlength')) {
        return `Password must be at least 4 characters long.`;
      }
      if (passwordFormControl.hasError('maxlength')) {
        return `Password must be less than 20 characters.`;
      }
      if (passwordFormControl?.hasError('passwordApiError')) {
        return passwordFormControl.getError('passwordApiError');
      }
    }

    return null;
  }
}