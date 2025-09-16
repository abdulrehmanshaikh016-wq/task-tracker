import { PriorityDropdownComponent } from './priority-dropdown.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('PriorityDropdownComponent', () => {
  let component: PriorityDropdownComponent;
  let fixture: ComponentFixture<PriorityDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PriorityDropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PriorityDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});