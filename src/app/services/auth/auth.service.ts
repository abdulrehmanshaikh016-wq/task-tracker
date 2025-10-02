import { LocalStorageService } from '../local-storage/local-storage.service';
import { LocalStorageKeysEnum } from '../../keys/local-storage-keys.enum';
import { UserModel } from '../../models/user-model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private _localStorageService: LocalStorageService) { }

  /** Check if a user is already logged in */
  isLoggedIn(): boolean {
    return !!this._localStorageService.getItem<UserModel>(LocalStorageKeysEnum.LoggedInUser);
  }

  /** Logout the current user */
  logout(): void {
    this._localStorageService.removeItem(LocalStorageKeysEnum.LoggedInUser);
  }

  getLoggedInUserId(): number | null {
    const loggedInUser = this.getAuthUser();
    return loggedInUser ? loggedInUser.id : null;
  }

  getAuthUser(): UserModel | null {
    return this._localStorageService.getItem<UserModel>(LocalStorageKeysEnum.LoggedInUser);
  }
}