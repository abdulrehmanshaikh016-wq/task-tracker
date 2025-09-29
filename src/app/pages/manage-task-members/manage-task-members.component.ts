import { UserSearchComponent } from "../../components/user-search/user-search.component";
import { SnackBarService } from '../../services/snack-bar/snack-bar.service';
import { HeaderComponent } from "../../components/header/header.component";
import { TasksService } from "../../services/tasks/tasks.service";
import { TaskMemberModel } from "../../models/task-member-model";
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { TasksModel } from '../../models/tasks-model';
import { UserModel } from '../../models/user-model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manage-task-members',
  templateUrl: './manage-task-members.component.html',
  styleUrl: './manage-task-members.component.scss',
  imports: [CommonModule, MatSnackBarModule, MatTableModule, MatButtonModule, UserSearchComponent, HeaderComponent]
})

export class ManageTaskMembersComponent implements OnInit {

  task: TasksModel | null = null;
  members: TaskMemberModel[] = [];
  allUsersFromStorage: UserModel[] = [];
  displayedColumns: string[] = [
    'username',
    'delete'
  ];

  constructor(
    private _snackBarService: SnackBarService,
    private _activatedRoute: ActivatedRoute,
    private _tasksService: TasksService
  ) { }

  ngOnInit(): void {
    this._setupManageTaskMembersPage();
  }

  private _setupManageTaskMembersPage() {
    this._fetchDataFromActivatedRoute();
  }

  private _fetchDataFromActivatedRoute() {
    const resolvedManageTaskMembersData = this._activatedRoute.snapshot.data['manageTaskMembers'];
    if (!resolvedManageTaskMembersData) {
      this._showNotificationForNoResolvedData();
    }

    if (!resolvedManageTaskMembersData?.task) {
      this._showNotificationForNoTaskFound();
      return;
    }

    if (!resolvedManageTaskMembersData?.members) {
      this._showNotificationForNoMembersFound();
      return;
    }

    if (!resolvedManageTaskMembersData?.members) {
      this._showNotificationForNoUsersFoundForSearch();
    }

    this._setResolvedData(resolvedManageTaskMembersData.task, resolvedManageTaskMembersData.members, resolvedManageTaskMembersData.allUsersFromStorage);
  }

  private _setResolvedData(task: TasksModel, members: TaskMemberModel[], allUsersFromStorage: UserModel[]) {
    this.task = task ?? null;
    this.members = members ?? [];
    this.allUsersFromStorage = allUsersFromStorage ?? [];
  }

  private _showNotificationForNoResolvedData() {
    this._snackBarService.showMessageForNoResolvedDataFound();
  }

  private _showNotificationForNoTaskFound() {
    this._snackBarService.showMessageForTaskNotFound();
  }

  private _showNotificationForNoMembersFound() {
    this._snackBarService.showMessageForMembersNotFound();
  }

  private _showNotificationForNoUsersFoundForSearch() {
    this._snackBarService.showSnackBar('Could not find users for search');
  }

  removeMember(user: TaskMemberModel) {
    if (this.members?.length === 1) {
      this._snackBarService.showSnackBar('A task must contain at least 1 member');
      return;
    }

    if (!this.task) return;

    try {
      user.showDeleteLoader = true;
      const updatedTask = this._tasksService.removeMemberFromTask(user.id, this.task.id);
      if (updatedTask) {
        // Remove the member from the local members array
        this.members = this.members?.filter(member => member.id !== user.id) ?? [];
        this._snackBarService.showSnackBar('Member removed successfully');
        user.showDeleteLoader = false;
      } else {
        this._snackBarService.showSnackBar('Failed to remove member');
        user.showDeleteLoader = false;
      }
    } catch (error) {
      this._snackBarService.showSnackBar('Failed to remove member');
      user.showDeleteLoader = false;
    }
  }

  addMemberInTask(user: UserModel) {
    if (!this.task) return;
  
    // Check if the user is already a member
    const alreadyMember = this.members.some(member => member.id === user.id);
    if (alreadyMember) {
      this._snackBarService.showSnackBar('User is already a member of this task');
      return;
    }
  
    try {
      // Add the user ID to the task's members array
      this.task.members.push(user.id);
  
      // Update the tasks in local storage
      this._tasksService.addANewMemberInTaskLocalStorage(this.task);
  
      const newUserToPushInMembers = new TaskMemberModel({
        ...user,
        showDeleteLoader: false
      });
      debugger;
      // Update the local members array for UI
      this.members = [...this.members, newUserToPushInMembers];
  
      this._snackBarService.showSnackBar('Member added successfully');
    } catch (error) {
      this._snackBarService.showSnackBar('Failed to add member');
    }
  }
}