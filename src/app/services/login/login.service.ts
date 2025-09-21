import { Injectable } from '@angular/core';
import { LoginModel } from '../../models/login-model';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { UserModel } from '../../models/user-model';
import { LocalStorageKeysEnum } from '../../keys/local-storage-keys.enum';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private _localStorageService: LocalStorageService) { }

  /** Returns true if login succeeds, false otherwise */
  async login(loginModel: LoginModel): Promise<boolean> {
    const storedUsers = this._localStorageService.getItem<UserModel[]>(LocalStorageKeysEnum.ExistingUsers) || [];

    // Check if a user exists with matching username and password
    const matchedUser = storedUsers.find(user =>
      user.username === loginModel.username &&
      user.password === loginModel.password
    );

    if (matchedUser) {
      // Optionally, store logged-in user info in localStorage
      this._localStorageService.setItem(LocalStorageKeysEnum.LoggedInUser, matchedUser);
      return true;
    }

    return false;
  }
}