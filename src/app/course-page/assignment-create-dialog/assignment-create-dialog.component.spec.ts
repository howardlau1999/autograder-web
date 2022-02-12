import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentCreateDialogComponent } from './assignment-create-dialog.component';

describe('CreateDialogComponent', () => {
  let component: AssignmentCreateDialogComponent;
  let fixture: ComponentFixture<AssignmentCreateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssignmentCreateDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignmentCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
