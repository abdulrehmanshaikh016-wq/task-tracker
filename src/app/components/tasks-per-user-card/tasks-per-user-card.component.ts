import { ChartOptions, ChartType, ChartData } from 'chart.js';
import { TasksModel } from '../../models/tasks-model';
import { UserModel } from '../../models/user-model';
import { Component, Input } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-tasks-per-user-card',
  imports: [BaseChartDirective],
  templateUrl: './tasks-per-user-card.component.html',
  styleUrl: './tasks-per-user-card.component.scss'
})

export class TasksPerUserCardComponent {

  @Input({ required: true }) users: UserModel[] = [];
  @Input({ required: true }) tasks: TasksModel[] = [];

  barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { display: false } },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1 // forces increments of 1
        }
      }
    }
  };
  barChartLabels: string[] = [];
  barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      { data: [], backgroundColor: '#06b6d4', borderRadius: 6 }
    ]
  };
  barChartType: 'bar' = 'bar'; // Type it as a string literal 'bar' instead of generic ChartType

  ngOnInit(): void {
    this.loadChartData();
  }

  private loadChartData() {
    this.barChartLabels = this.users.map(u => u.username);
    this.barChartData.labels = this.barChartLabels;

    // Count tasks per user
    const taskCounts = this.users.map(user =>
      this.tasks.filter(t => t.members.includes(user.id)).length
    );

    this.barChartData.datasets[0].data = taskCounts;

    // Find the max value
    const maxCount = Math.max(...taskCounts);

    // Set backgroundColor per bar: orange for max, gray for others
    this.barChartData.datasets[0].backgroundColor = taskCounts.map(count =>
      count === maxCount ? '#06b6d4' : '#d3d3d3'
    );

    // Optional: set border color per bar
    this.barChartData.datasets[0].borderColor = taskCounts.map(count =>
      count === maxCount ? '#06b6d4' : '#a9a9a9'
    );
    this.barChartData.datasets[0].borderWidth = 1;
    this.barChartData.datasets[0].borderRadius = 6;
    this.barChartData.datasets[0].barThickness = 20;
  }
}