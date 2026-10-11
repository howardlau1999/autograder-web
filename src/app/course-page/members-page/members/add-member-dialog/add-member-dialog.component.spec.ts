import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { CoursePageModule } from '../../../course-page.module';
import { AddMemberDialogComponent } from './add-member-dialog.component';

describe('AddMemberDialogComponent', () => {
  let component: AddMemberDialogComponent;
  let fixture: ComponentFixture<AddMemberDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoursePageModule],
      providers: [
        provideRouter([]),
        { provide: MatDialogRef, useValue: { close: () => undefined } },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(AddMemberDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
