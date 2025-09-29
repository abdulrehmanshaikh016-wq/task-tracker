import { CreateANewTaskService } from '../../services/create-a-new-task/create-a-new-task.service';
import { TaskFormComponent } from '../../components/task-form/task-form.component';
import { FormBuilderService } from '../../utils/form-builder/form-builder.service';
import { SnackBarService } from '../../services/snack-bar/snack-bar.service';
import { RoutingService } from '../../services/routing/routing.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth/auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-a-new-task',
  templateUrl: './create-a-new-task.component.html',
  styleUrl: './create-a-new-task.component.scss',
  imports: [TaskFormComponent, MatSnackBarModule],
})

export class CreateANewTaskComponent implements OnInit, OnDestroy {

  createTaskForm: FormGroup;
  isCreating: boolean = false;

  constructor(
    private _createTaskService: CreateANewTaskService,
    private _formBuilderService: FormBuilderService,
    private _snackBarService: SnackBarService,
    private _routingService: RoutingService,
    private _authService: AuthService
  ) {
    this.createTaskForm = this._formBuilderService.createFormForNewTask();
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.isCreating = false;
  }

  async handleCreateTask(form: FormGroup) {
    const authUserId = this._authService.getLoggedInUserId();

    if (!authUserId) {
      this._snackBarService.showSnackBar('User ID not found');
      return;
    }

    this.isCreating = true;
    const payload = this._createTaskService.createPayloadForNewTask(form, authUserId);
    const success = await this._createTaskService.createANewTask(payload);

    if (success) {
      this._routingService.goToTasksPage();
    } else {
      this.isCreating = false;
    }
  }
}