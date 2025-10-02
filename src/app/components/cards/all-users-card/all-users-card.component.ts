import { UserModel } from '../../../models/user-model';
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-all-users-card',
  templateUrl: './all-users-card.component.html',
  styleUrl: './all-users-card.component.scss',
  imports: [CommonModule],
})

export class AllUsersCardComponent {

  @Input({ required: true }) users: UserModel[] = [];

  isNewUser(createdDate: string | Date): boolean {
    const created = new Date(createdDate);
    const now = new Date();

    const diffInMs = now.getTime() - created.getTime();
    const diffInMinutes = diffInMs / (1000 * 60);
    const diffInHours = diffInMs / (1000 * 60 * 60);

    // Example rules:
    if (diffInMinutes <= 60) return true;    // "new" if within 1 hour
    return false;
  }
}