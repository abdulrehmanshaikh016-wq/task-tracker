import { TaskPrioritiesEnum } from '../../enums/task-priorities.enum';
import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-priority-dropdown',
  imports: [],
  templateUrl: './priority-dropdown.component.html',
  styleUrl: './priority-dropdown.component.scss'
})

export class PriorityDropdownComponent {

  @Input() control!: FormControl;

  priorities: string[] = [TaskPrioritiesEnum.Low, TaskPrioritiesEnum.Medium, TaskPrioritiesEnum.High];
}