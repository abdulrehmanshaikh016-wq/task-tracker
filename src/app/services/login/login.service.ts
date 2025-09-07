import { LoginModel } from '../../models/login-model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  constructor() { }

  async login(loginModel: LoginModel): Promise<boolean> {
    // Simulate an API call with a delay
    return new Promise((resolve) => {
      setTimeout(() => {
        // For demonstration, assume any username/password combination is valid
        const isAuthenticated: boolean = !!loginModel?.username && !!loginModel?.password;
        resolve(isAuthenticated);
      }, 1000); // Simulate a 1 second delay
    });
  }
}