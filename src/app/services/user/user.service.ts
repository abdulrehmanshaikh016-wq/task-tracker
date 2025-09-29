import { LocalStorageService } from '../local-storage/local-storage.service';
import { LocalStorageKeysEnum } from '../../keys/local-storage-keys.enum';
import { UserModel } from '../../models/user-model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(
    private _localStorageService: LocalStorageService
  ) { }

  getAllUsersFromStorage() {
    try {
      return this._localStorageService.getItem<UserModel[]>(LocalStorageKeysEnum.ExistingUsers) || [];
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}