import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgrammingAssignmentFormComponent } from './programming-assignment-form.component';

describe('AssignmentFormComponent', () => {
  let component: ProgrammingAssignmentFormComponent;
  let fixture: ComponentFixture<ProgrammingAssignmentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProgrammingAssignmentFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgrammingAssignmentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
