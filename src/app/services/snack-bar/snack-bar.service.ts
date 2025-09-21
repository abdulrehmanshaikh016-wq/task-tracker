import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class SnackBarService {

  constructor(private _matSnackBar: MatSnackBar) { }

  showSnackBar(message: string, action: string = 'Close', matSnackBarConfig?: MatSnackBarConfig) {
    const config: MatSnackBarConfig = {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top', // <-- show at the top
      ...matSnackBarConfig
    };

    this._matSnackBar.open(message, action, config);
  }

  showInvalidCredentials() {
    this.showSnackBar('Your username or password is incorrect', 'Close');
  }

  showMessageForTaskNotFound() {
    this.showSnackBar('Could not find the task you want to edit', 'Close');
  }
}
