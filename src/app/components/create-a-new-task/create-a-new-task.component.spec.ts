import { CreateANewTaskComponent } from './create-a-new-task.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('CreateANewTaskComponent', () => {
  let createANewTaskComponent: CreateANewTaskComponent;
  let createANewTaskFixture: ComponentFixture<CreateANewTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateANewTaskComponent]
    })
    .compileComponents();

    createANewTaskFixture = TestBed.createComponent(CreateANewTaskComponent);
    createANewTaskComponent = createANewTaskFixture.componentInstance;
    createANewTaskFixture.detectChanges();
  });

  it('should create', () => {
    expect(createANewTaskComponent).toBeTruthy();
  });
});