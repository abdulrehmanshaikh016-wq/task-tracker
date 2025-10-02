import { environment } from '../../environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class VersionService {

  private readonly localStorageKey = 'app_version';

  checkAndClearStorage(): void {
    const savedVersion = localStorage.getItem(this.localStorageKey);
    const currentMajorVersion = this.getMajorVersion(environment.appVersion);

    if (savedVersion) {
      const savedMajorVersion = this.getMajorVersion(savedVersion);
      if (currentMajorVersion > savedMajorVersion) {
        console.log(`Major version bumped from ${savedMajorVersion} → ${currentMajorVersion}. Clearing local storage.`);
        localStorage.clear();
      }
    }

    // Save the current version
    localStorage.setItem(this.localStorageKey, environment.appVersion);
  }

  private getMajorVersion(version: string): number {
    return parseInt(version.split('.')[0], 10);
  }
}