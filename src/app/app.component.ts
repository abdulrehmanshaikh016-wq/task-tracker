import { TimerToastComponent } from "./components/timer-toast/timer-toast.component";
import { RouterOutlet } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, TimerToastComponent],
})

export class AppComponent {
}