import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TasksComponent } from './tasks.component';

describe('TasksComponent', () => {
  let tasksComponent: TasksComponent;
  let tasksFixture: ComponentFixture<TasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TasksComponent]
    })
    .compileComponents();

    tasksFixture = TestBed.createComponent(TasksComponent);
    tasksComponent = tasksFixture.componentInstance;
    tasksFixture.detectChanges();
  });

  it('should create', () => {
    expect(tasksComponent).toBeTruthy();
  });
});