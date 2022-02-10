import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseEditDialogComponent } from './course-edit-dialog.component';

describe('CourseEditDialogComponent', () => {
  let component: CourseEditDialogComponent;
  let fixture: ComponentFixture<CourseEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseEditDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
