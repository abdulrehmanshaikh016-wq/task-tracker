import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { PriorityDropdownComponent } from '../priority-dropdown/priority-dropdown.component';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { TaskFormGroup } from '../../forms/create-a-new-task-form';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PriorityDropdownComponent]
})

export class TaskFormComponent implements OnChanges {

  @Input() taskForm!: FormGroup<TaskFormGroup>;
  @Input() isSubmitting: boolean = false;
  @Input() submitButtonText: string = 'Submit';
  @Input({ required: true }) isEditMode: boolean = false;

  @Output() formSubmit = new EventEmitter<FormGroup<TaskFormGroup>>();

  get taskNameControl(): FormControl { return this.taskForm.controls.taskName as FormControl; }
  get taskDescriptionControl(): FormControl { return this.taskForm.controls.taskDescription as FormControl; }
  get taskPriorityControl(): FormControl { return this.taskForm.controls.taskPriority as FormControl; }
  get taskDurationControl(): FormControl { return this.taskForm.controls.taskDuration as FormControl; }

  ngOnChanges(changes: SimpleChanges): void {
    // whenever isEditMode changes, disable/enable control properly
    if (changes['isEditMode'] && this.taskForm) {
      if (this.isEditMode) {
        this.taskDurationControl.disable();
      } else {
        this.taskDurationControl.enable();
      }
    }
  }

  onSubmit() {
    if (!this.taskForm.valid) {
      this.taskForm.markAllAsTouched();
      this.taskForm.markAsDirty();
      return;
    }
    this.formSubmit.emit(this.taskForm);
  }
}