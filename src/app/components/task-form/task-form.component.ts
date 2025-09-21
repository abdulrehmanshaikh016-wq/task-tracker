import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PriorityDropdownComponent } from '../priority-dropdown/priority-dropdown.component';
import { TaskFormGroup } from '../../forms/create-a-new-task-form';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PriorityDropdownComponent]
})
export class TaskFormComponent {

  @Input() taskForm!: FormGroup<TaskFormGroup>;
  @Input() isSubmitting: boolean = false;
  @Input() submitButtonText: string = 'Submit';

  @Output() formSubmit = new EventEmitter<FormGroup<TaskFormGroup>>();

  get taskNameControl(): FormControl { return this.taskForm.controls.taskName as FormControl; }
  get taskDescriptionControl(): FormControl { return this.taskForm.controls.taskDescription as FormControl; }
  get taskPriorityControl(): FormControl { return this.taskForm.controls.taskPriority as FormControl; }

  onSubmit() {
    if (!this.taskForm.valid) {
      this.taskForm.markAllAsTouched();
      this.taskForm.markAsDirty();
      return;
    }
    this.formSubmit.emit(this.taskForm);
  }
}