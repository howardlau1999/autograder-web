import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentEditDialogComponent } from './assignment-edit-dialog.component';

describe('AssignmentEditDialogComponent', () => {
  let component: AssignmentEditDialogComponent;
  let fixture: ComponentFixture<AssignmentEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssignmentEditDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignmentEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
