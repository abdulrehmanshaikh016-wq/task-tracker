import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-all-users-card',
  imports: [CommonModule],
  templateUrl: './all-users-card.component.html',
  styleUrl: './all-users-card.component.scss'
})

export class AllUsersCardComponent {

  users = [
    {
      name: 'Timothy Williams',
      date: 'Today',
      status: 'New',
      amount: 324.99,
      avatar: 'https://i.pravatar.cc/100?img=1'
    },
    {
      name: 'Glen Wood',
      date: '2 Days Ago',
      status: 'New',
      amount: 200.0,
      avatar: 'https://i.pravatar.cc/100?img=2'
    },
    {
      name: 'Raymond Johnson',
      date: '1 Day Ago',
      status: 'Cancelled',
      amount: 0.0,
      avatar: 'https://i.pravatar.cc/100?img=3'
    },
    {
      name: 'Kenneth Henderson',
      date: '2 Days Ago',
      status: 'Completed',
      amount: 840.99,
      avatar: 'https://i.pravatar.cc/100?img=4'
    }
  ];
}
