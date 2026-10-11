import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { DashboardPageModule } from '../dashboard-page.module';
import { CourseJoinDialogComponent } from './course-join-dialog.component';

describe('JoinDialogComponent', () => {
  let component: CourseJoinDialogComponent;
  let fixture: ComponentFixture<CourseJoinDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardPageModule],
      providers: [
        provideRouter([]),
        { provide: MatDialogRef, useValue: { close: () => undefined } },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(CourseJoinDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
