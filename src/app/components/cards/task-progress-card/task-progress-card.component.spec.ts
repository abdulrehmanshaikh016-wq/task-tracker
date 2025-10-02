import { TaskProgressCardComponent } from './task-progress-card.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('TaskProgressCardComponent', () => {
  let component: TaskProgressCardComponent;
  let fixture: ComponentFixture<TaskProgressCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskProgressCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskProgressCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});