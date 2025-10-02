import { TaskTimerService } from '../../services/task-timer/task-timer.service';
import { TasksModel } from '../../models/tasks-model';
import { Component } from '@angular/core';

@Component({
  selector: 'app-timer-toast',
  imports: [],
  templateUrl: './timer-toast.component.html',
  styleUrl: './timer-toast.component.scss'
})

export class TimerToastComponent {

  activeTask?: TasksModel;
  showTimer: boolean = true; // default: show

  constructor(private _timerService: TaskTimerService) {}

  ngOnInit() {
    this._timerService.tasks$.subscribe(tasks => {
      // show the first running task
      this.activeTask = tasks.find(t => !!t.timerStart);
    });
  }

  getTimerDisplay(task: TasksModel) {
    let elapsed = this._timerService.getElapsedTime(task);
    const h = Math.floor(elapsed / 3600);
    const m = Math.floor((elapsed % 3600) / 60);
    const s = elapsed % 60;
    return `${h.toString().padStart(2,'0')}:${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
  }

  toggleTimerVisibility() {
    this.showTimer = !this.showTimer;
  }
}