import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor() { }

  isLoggedIn(): Observable<boolean> {
    // TODO: Replace with real API call to backend
    return of(false);
  }
}