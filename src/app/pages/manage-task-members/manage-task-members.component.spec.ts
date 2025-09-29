import { ManageTaskMembersComponent } from './manage-task-members.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('ManageTaskMembersComponent', () => {
  let manageTaskMembersComponent: ManageTaskMembersComponent;
  let manageTaskMembersFixture: ComponentFixture<ManageTaskMembersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageTaskMembersComponent]
    })
    .compileComponents();

    manageTaskMembersFixture = TestBed.createComponent(ManageTaskMembersComponent);
    manageTaskMembersComponent = manageTaskMembersFixture.componentInstance;
    manageTaskMembersFixture.detectChanges();
  });

  it('should create', () => {
    expect(manageTaskMembersComponent).toBeTruthy();
  });
});