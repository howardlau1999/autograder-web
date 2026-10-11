import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideActivatedRouteStub } from '../../../../testing/activated-route-stub';

import { InspectionPageModule } from '../inspection-page.module';
import { InspectionComponent } from './inspection.component';

describe('InspectionComponent', () => {
  let component: InspectionComponent;
  let fixture: ComponentFixture<InspectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InspectionPageModule],
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
    fixture = TestBed.createComponent(InspectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
