import { TaskPrioritiesEnum } from '../../enums/task-priorities.enum';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-priority-dropdown',
  templateUrl: './priority-dropdown.component.html',
  styleUrl: './priority-dropdown.component.scss',
  imports: [ReactiveFormsModule]
})

export class PriorityDropdownComponent {

  @Input() control!: FormControl;

  priorities: string[] = [TaskPrioritiesEnum.Low, TaskPrioritiesEnum.Medium, TaskPrioritiesEnum.High];
}