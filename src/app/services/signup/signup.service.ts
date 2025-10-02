import { LocalStorageService } from '../local-storage/local-storage.service';
import { LocalStorageKeysEnum } from '../../keys/local-storage-keys.enum';
import { SignupModel } from '../../models/signup-model';
import { UserModel } from '../../models/user-model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SignupService {

  constructor(
    private _http: HttpClient,
    private _localStorageService: LocalStorageService
  ) { }

  getListOfExistingUsers(): UserModel[] {
    // Reading the array
    const storedUsers = this._localStorageService.getItem<UserModel[]>(LocalStorageKeysEnum.ExistingUsers) || [];

    if (!storedUsers) return [];

    return storedUsers;
  }

  async createNewUser(userSignupPayload: SignupModel): Promise<boolean> {
    try {
      await firstValueFrom(this._http.post('someurl', userSignupPayload));
      return true;
    } catch (error) {
      const storedUsers = this.getListOfExistingUsers();
      const newUser = this._createNewUserModelFromSignupPayload(userSignupPayload, storedUsers);
      const newUserList = this._pushNewUserToExistingList(storedUsers, newUser);
      this._localStorageService.setItem(LocalStorageKeysEnum.ExistingUsers, newUserList);

      return true;
    }
  }

  private _createNewUserModelFromSignupPayload(userSignupPayload: SignupModel, storedUsers: UserModel[]): UserModel {
    const newUser = new UserModel({
      id: storedUsers?.length ? storedUsers.length + 1 : 1,
      username: userSignupPayload.username,
      password: userSignupPayload.password,
      profileImage: userSignupPayload.profileImage,
      createdDate: new Date()
    });

    return newUser;
  }

  private _pushNewUserToExistingList(storedUsers: UserModel[], newUser: UserModel): UserModel[] {
    const users: UserModel[] = [
      ...storedUsers, // existing users
      newUser // the new user you want to add
    ];
    
    return users;
  }
}