import { TaskTimerService } from '../../services/task-timer/task-timer.service';
import { AuthService } from '../../services/auth/auth.service';
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
  showTimer: boolean = true; 
  userClosed: boolean = false; // track manual close

  constructor(
    private _timerService: TaskTimerService,
    private _authService: AuthService
  ) {}

  ngOnInit() {
    this._timerService.tasks$.subscribe(tasks => {
      this.activeTask = tasks.find(t => !!t.timerStart);

      // auto-hide only if no active task, unless user manually closed
      if (!this.activeTask) {
        this.showTimer = false;
        this.userClosed = false; // reset so it can show again later
      } else if (!this.userClosed) {
        this.showTimer = true;
      }
    });
  }

  getTimerDisplay(task: TasksModel) {
    let elapsed = this._timerService.getElapsedTime(task);
    const h = Math.floor(elapsed / 3600);
    const m = Math.floor((elapsed % 3600) / 60);
    const s = elapsed % 60;
    return `${h.toString().padStart(2,'0')}:${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
  }

  closeTimerToast() {
    this.showTimer = false;
    this.userClosed = true; // persist manual close
  }

  reopenTimerToast() {
    if (this.activeTask) {
      this.showTimer = true;
      this.userClosed = false;
    }
  }

  startTimer(task: TasksModel) {
    this._timerService.startTimer(task.id);
    this.showTimer = true;
    this.userClosed = false;
  }

  stopTimer(task: TasksModel) {
    this._timerService.stopAllTimers();
    this.showTimer = true;
    this.userClosed = false;
  }

  isTimerRunning(task: TasksModel): boolean {
    return !!task.timerStart;
  }
}