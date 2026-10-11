import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { DashboardPageModule } from '../dashboard-page.module';
import { CourseCreateDialogComponent } from './course-create-dialog.component';

describe('CreateDialogComponent', () => {
  let component: CourseCreateDialogComponent;
  let fixture: ComponentFixture<CourseCreateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardPageModule],
      providers: [
        provideRouter([]),
        { provide: MatDialogRef, useValue: { close: () => undefined } },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(CourseCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
