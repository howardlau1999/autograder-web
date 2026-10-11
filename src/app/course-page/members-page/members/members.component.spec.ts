import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideActivatedRouteStub } from '../../../../testing/activated-route-stub';

import { CoursePageModule } from '../../course-page.module';
import { MembersComponent } from './members.component';

describe('MembersComponent', () => {
  let component: MembersComponent;
  let fixture: ComponentFixture<MembersComponent>;

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
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(MembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
