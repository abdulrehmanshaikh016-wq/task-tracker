import { CreateANewTaskService } from '../../services/create-a-new-task/create-a-new-task.service';
import { FormBuilderService } from '../../utils/form-builder/form-builder.service';
import { TaskFormComponent } from '../../components/task-form/task-form.component';
import { SnackBarService } from '../../services/snack-bar/snack-bar.service';
import { HeaderComponent } from "../../components/header/header.component";
import { RoutingService } from '../../services/routing/routing.service';
import { TaskFormGroup } from '../../forms/create-a-new-task-form';
import { TasksModel } from '../../models/tasks-model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-task-page',
  templateUrl: './edit-task-page.component.html',
  styleUrl: './edit-task-page.component.scss',
  imports: [TaskFormComponent, HeaderComponent]
})

export class EditTaskPageComponent implements OnInit {

  editTaskForm: FormGroup<TaskFormGroup>;
  isUpdating: boolean = false;
  taskId!: number;

  constructor(
    private _createTaskService: CreateANewTaskService,
    private _formBuilderService: FormBuilderService,
    private _snackBarService: SnackBarService,
    private _routingService: RoutingService,
    private _route: ActivatedRoute
  ) {
    this.editTaskForm = this._formBuilderService.createFormForNewTask();
  }

  ngOnInit(): void {
    const task: TasksModel = this._route.snapshot.data['task']; // assume resolved
    if (!task) {
      this._snackBarService.showMessageForTaskNotFound();
    }
    this.taskId = task.id;

    // populate form
    this.editTaskForm.patchValue({
      taskName: task.taskName,
      taskDescription: task.taskDescription,
      taskPriority: task.taskPriority,
      taskDuration: task.taskDuration,
    });
  }

  async handleUpdateTask(form: FormGroup) {
    this.isUpdating = true;
    const payload = this._createTaskService.createPayloadForNewTask(form, this.taskId); // reuse payload logic
    const success = await this._createTaskService.updateTask(this.taskId, payload);
    this.isUpdating = false;

    if (success) this._routingService.goToTasksPage();
  }
}