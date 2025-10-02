import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AllUsersCardComponent } from './all-users-card.component';

describe('AllUsersCardComponent', () => {
  let component: AllUsersCardComponent;
  let fixture: ComponentFixture<AllUsersCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllUsersCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllUsersCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});