import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';

import { CoursePageModule } from '../../../course-page.module';
import { AssignmentsTableComponent } from './assignments-table.component';

describe('AssignmentsTableComponent', () => {
  let component: AssignmentsTableComponent;
  let fixture: ComponentFixture<AssignmentsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoursePageModule],
      providers: [provideRouter([])],
    }).compileComponents();
    fixture = TestBed.createComponent(AssignmentsTableComponent);
    component = fixture.componentInstance;
    component.courseId = of(1);
    component.refresher$ = of(null);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
