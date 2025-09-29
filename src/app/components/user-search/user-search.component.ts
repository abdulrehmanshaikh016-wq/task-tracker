import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { UserModel } from '../../models/user-model';
import { Observable, startWith, map } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrl: './user-search.component.scss',
  imports: [CommonModule, ReactiveFormsModule, MatAutocompleteModule, MatInputModule, MatIconModule]
})

export class UserSearchComponent implements OnInit {

  @Input({ required: true }) users: UserModel[] = [];
  @Output() userSelected = new EventEmitter<UserModel>();

  userCtrl = new FormControl<string | UserModel>('');
  filteredUsers$: Observable<UserModel[]> = new Observable<UserModel[]>();

  ngOnInit(): void {
    this.filteredUsers$ = this.userCtrl.valueChanges.pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value?.username),
      map(name => name ? this._filter(name) : this.users.slice())
    );
  }

  displayFn(user: UserModel): string {
    return user && user.username ? user.username : '';
  }

  private _filter(name: string): UserModel[] {
    const filterValue = name.toLowerCase();
    return this.users.filter(user => user.username.toLowerCase().includes(filterValue));
  }

  onOptionSelected(event: any) {
    const user: UserModel = event.option.value;
    this.userSelected.emit(user);
    this.userCtrl.setValue(''); // Clear input after selection
  }
}