import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideActivatedRouteStub } from '../../../../../testing/activated-route-stub';
import { provideLuxonDateAdapter } from '@angular/material-luxon-adapter';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { CoursePageModule } from '../../../course-page.module';
import { AssignmentCreateDialogComponent } from './assignment-create-dialog.component';

describe('CreateDialogComponent', () => {
  let component: AssignmentCreateDialogComponent;
  let fixture: ComponentFixture<AssignmentCreateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoursePageModule],
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
    fixture = TestBed.createComponent(AssignmentCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
