import { CreateANewTaskService } from '../../services/create-a-new-task/create-a-new-task.service';
import { PriorityDropdownComponent } from "../priority-dropdown/priority-dropdown.component";
import { FormBuilderService } from '../../utils/form-builder/form-builder.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CreateANewTaskForm } from '../../forms/create-a-new-task-form';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-a-new-task',
  templateUrl: './create-a-new-task.component.html',
  styleUrl: './create-a-new-task.component.scss',
  imports: [CommonModule, ReactiveFormsModule, PriorityDropdownComponent]
})

export class CreateANewTaskComponent implements OnInit {

  isCreatingANewTask: boolean = false;
  createANewTaskForm: FormGroup<CreateANewTaskForm>;

  constructor(
    private _formBuilderService: FormBuilderService,
    private _createANewTaskService: CreateANewTaskService
  ) {
    this.createANewTaskForm = this._formBuilderService.createFormForNewTask();
  }

  ngOnInit(): void {
  }

  get taskNameControl(): FormControl {
    return this.createANewTaskForm?.controls?.taskName;
  }

  get taskDescriptionControl(): FormControl {
    return this.createANewTaskForm?.controls?.taskDescription;
  }

  get taskPriorityControl(): FormControl {
    return this.createANewTaskForm?.controls?.taskPriority;
  }

  onCreateANewTaskSubmit() {
    if (!this.createANewTaskForm.valid) {
      this.createANewTaskForm.markAllAsTouched();
      this.createANewTaskForm.markAsDirty();
    }

    this._handleCreatingANewTask();
  }

  private _handleCreatingANewTask() {
    this._showLoaderForCreatingANewTask();
    const createANewTaskResponse = this._createANewTaskService.createPayloadForNewTask(this.createANewTaskForm);
    if (createANewTaskResponse) {
      this._showNotificationForCreatingANewTask();
    }
    this._hideLoaderForCreatingANewTask();
  }

  private _showLoaderForCreatingANewTask() {
    this.isCreatingANewTask = true;
  }

  private _hideLoaderForCreatingANewTask() {
    this.isCreatingANewTask = false;
  }

  private _showNotificationForCreatingANewTask() {

  }
}