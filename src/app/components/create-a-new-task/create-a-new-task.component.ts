import { FormBuilderService } from '../../utils/form-builder/form-builder.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CreateANewTaskForm } from '../../forms/create-a-new-task-form';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-a-new-task',
  templateUrl: './create-a-new-task.component.html',
  styleUrl: './create-a-new-task.component.scss',
  imports: [CommonModule, ReactiveFormsModule]
})

export class CreateANewTaskComponent implements OnInit {

  createANewTaskForm: FormGroup<CreateANewTaskForm>;

  constructor(
    private _formBuilderService: FormBuilderService
  ) {
    this.createANewTaskForm = this._formBuilderService.createFormForNewTask();
  }

  ngOnInit(): void {
  }

  onCreateANewTaskSubmit() {
    if (!this.createANewTaskForm.valid) {
      this.createANewTaskForm.markAllAsTouched();
      this.createANewTaskForm.markAsDirty();
    }
  }

  get taskNameControl(): FormControl {
    return this.createANewTaskForm?.controls?.taskName;
  }

  get taskDescriptionControl(): FormControl {
    return this.createANewTaskForm?.controls?.taskDescription;
  }
}