import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksPerUserCardComponent } from './tasks-per-user-card.component';

describe('TasksPerUserCardComponent', () => {
  let component: TasksPerUserCardComponent;
  let fixture: ComponentFixture<TasksPerUserCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TasksPerUserCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TasksPerUserCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
