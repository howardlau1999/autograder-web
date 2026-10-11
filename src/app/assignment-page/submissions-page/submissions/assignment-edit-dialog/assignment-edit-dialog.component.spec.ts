import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Assignment } from '../../../../api/proto/model_pb';
import { provideActivatedRouteStub } from '../../../../../testing/activated-route-stub';
import { provideLuxonDateAdapter } from '@angular/material-luxon-adapter';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { SubmissionsPageModule } from '../../submissions-page.module';
import { AssignmentEditDialogComponent } from './assignment-edit-dialog.component';

describe('AssignmentEditDialogComponent', () => {
  let component: AssignmentEditDialogComponent;
  let fixture: ComponentFixture<AssignmentEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubmissionsPageModule],
      providers: [
        provideRouter([]),
        provideActivatedRouteStub({
          courseId: '1',
          assignmentId: '1',
          submissionId: '1',
          userId: '1',
        }),
        provideLuxonDateAdapter(),
        { provide: MatDialogRef, useValue: { close: () => undefined } },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(AssignmentEditDialogComponent);
    component = fixture.componentInstance;
    component.assignment = new Assignment();
    component.assignmentId = 1;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
