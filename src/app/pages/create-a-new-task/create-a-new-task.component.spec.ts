import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateANewTaskComponent } from './create-a-new-task.component';

describe('CreateANewTaskComponent', () => {
  let component: CreateANewTaskComponent;
  let fixture: ComponentFixture<CreateANewTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateANewTaskComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateANewTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
