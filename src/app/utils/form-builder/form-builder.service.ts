import { CreateANewTaskForm } from '../../forms/create-a-new-task-form';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class FormBuilderService {

  constructor(
    private _formBuilder: FormBuilder
  ) { }

  createFormForNewTask(): FormGroup<CreateANewTaskForm> {
    return this._formBuilder.group({
      taskName: new FormControl<string | null>(null),
      taskDescription: new FormControl<string | null>(null)
    });
  }
}