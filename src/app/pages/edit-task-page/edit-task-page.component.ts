import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilderService } from '../../utils/form-builder/form-builder.service';
import { CreateANewTaskService } from '../../services/create-a-new-task/create-a-new-task.service';
import { RoutingService } from '../../services/routing/routing.service';
import { TasksModel } from '../../models/tasks-model';
import { ActivatedRoute } from '@angular/router';
import { TaskFormComponent } from '../../components/task-form/task-form.component';
import { SnackBarService } from '../../services/snack-bar/snack-bar.service';

@Component({
  selector: 'app-edit-task-page',
  templateUrl: './edit-task-page.component.html',
  styleUrl: './edit-task-page.component.scss',
  imports: [TaskFormComponent]
})

export class EditTaskPageComponent implements OnInit {

  editTaskForm: FormGroup;
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
      taskPriority: task.taskPriority
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