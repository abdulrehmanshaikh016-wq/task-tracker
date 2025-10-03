import { TasksModel } from '../../models/tasks-model';
import { TasksService } from '../tasks/tasks.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class TaskTimerService {

  private tasks: TasksModel[] = [];
  private intervals: { [taskId: number]: any } = {};

  tasks$ = new BehaviorSubject<TasksModel[]>([]);

  constructor(private _tasksService: TasksService) {}

  setTasks(tasks: TasksModel[]) {
    this.tasks = tasks;
    this.tasks$.next(this.tasks);

    // Resume any timers that were running
    this.tasks.forEach(task => {
      if (task.timerStart) this.startInterval(task.id);
    });
  }

  startTimer(taskId: number) {
    const task = this.tasks.find(t => t.id === taskId);
    if (!task) return;

    // Prevent starting if task is completed
    const totalSeconds = (task.taskDuration || 0) * 3600;
    if (task.elapsedTime >= totalSeconds) return;

    // Stop all other timers
    this.tasks.forEach(t => {
      if (t.id !== taskId) this.pauseTimer(t.id);
    });

    if (!task.timerStart) {
      task.timerStart = Date.now(); // mark start time
    }

    this.startInterval(taskId);      // interval just emits updates
    this.saveTasks();                // save once
  }

  pauseTimer(taskId: number) {
    const task = this.tasks.find(t => t.id === taskId);
    if (!task || !task.timerStart) return;

    // Ensure last tick is counted
    const extraSeconds = Math.floor((Date.now() - task.timerStart) / 1000);
    task.elapsedTime += extraSeconds;

    task.timerStart = null;
    this.clearInterval(taskId);
    this._tasksService.setNewTasksInLocalStorage(this.tasks);
  }

  getElapsedTime(task: TasksModel) {
    return task.elapsedTime;
  }
  
  startInterval(taskId: number) {
    if (this.intervals[taskId]) return;

    this.intervals[taskId] = setInterval(() => {
      const task = this.tasks.find(t => t.id === taskId);
      if (!task || !task.timerStart) return;

      const totalSeconds = (task.taskDuration || 0) * 3600;

      // If task already completed, stop it
      if (task.elapsedTime >= totalSeconds) {
        this.pauseTimer(taskId);
        return;
      }

      // increment elapsedTime by 1 every second
      task.elapsedTime += 1;

      // Stop immediately once completed
      if (task.elapsedTime >= totalSeconds) {
        this.pauseTimer(taskId);
        return;
      }

      this.tasks$.next(this.tasks);
      this._tasksService.setNewTasksInLocalStorage(this.tasks);
    }, 1000);
  }
   
  private clearInterval(taskId: number) {
    if (this.intervals[taskId]) {
      clearInterval(this.intervals[taskId]);
      this.intervals[taskId] = null;
    }
  }

  private saveTasks() {
    this._tasksService.setNewTasksInLocalStorage(this.tasks);
  }

  stopAllTimers() {
    this.tasks.forEach(task => {
      if (task.timerStart) {
        this.pauseTimer(task.id);
      }
    });
    Object.keys(this.intervals).forEach(id => this.clearInterval(+id));
  }
}