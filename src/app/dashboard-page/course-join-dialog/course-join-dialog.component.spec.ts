import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseJoinDialogComponent } from './course-join-dialog.component';

describe('JoinDialogComponent', () => {
  let component: CourseJoinDialogComponent;
  let fixture: ComponentFixture<CourseJoinDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CourseJoinDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseJoinDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
