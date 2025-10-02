import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TimerToastComponent } from './timer-toast.component';

describe('TimerToastComponent', () => {
  let component: TimerToastComponent;
  let fixture: ComponentFixture<TimerToastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimerToastComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimerToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});