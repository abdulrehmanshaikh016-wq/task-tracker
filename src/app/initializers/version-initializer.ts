import { LocalStorageService } from '../services/local-storage/local-storage.service';
import { environment } from '../environment';
import { inject } from '@angular/core';

export function runVersionCheck(): () => void {
  return () => {
    console.log('Version check initializer running...');
    const localStorageKey = 'app_version';
    const savedVersion = localStorage.getItem(localStorageKey);
    const currentMajor = parseInt(environment.appVersion.split('.')[0], 10);

    const localStorageService = inject(LocalStorageService);

    if (savedVersion) {
      const savedMajor = parseInt(savedVersion.split('.')[0], 10);
      if (currentMajor > savedMajor) {
        console.log(`Major version bumped: ${savedMajor} → ${currentMajor}. Clearing localStorage.`);
        localStorageService.clear();
      }
    }

    localStorage.setItem(localStorageKey, environment.appVersion);
    console.log('Version saved in localStorage:', environment.appVersion);
  };
}