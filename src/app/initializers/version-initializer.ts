import { LocalStorageService } from '../services/local-storage/local-storage.service';
import { TaskTimerService } from '../services/task-timer/task-timer.service';
import { environment } from '../environment';
import { inject } from '@angular/core';

export function runVersionCheck(): () => void {
  return () => {
  
    const localStorageKey = 'app_version';
    const savedVersion = localStorage.getItem(localStorageKey);
    const currentMajor = parseInt(environment.appVersion.split('.')[0], 10);

    const localStorageService = inject(LocalStorageService);
    const taskTimerService = inject(TaskTimerService);

    if (savedVersion) {
      const savedMajor = parseInt(savedVersion.split('.')[0], 10);
      if (currentMajor > savedMajor) {

        // Stop all timers in memory
        taskTimerService.stopAllTimers();

        // Clear localStorage
        localStorageService.clear();
      }
    }

    localStorage.setItem(localStorageKey, environment.appVersion);
    console.log('Version saved in localStorage:', environment.appVersion);
  };
}