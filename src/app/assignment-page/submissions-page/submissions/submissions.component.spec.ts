import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideActivatedRouteStub } from '../../../../testing/activated-route-stub';
import { provideLuxonDateAdapter } from '@angular/material-luxon-adapter';

import { SubmissionsPageModule } from '../submissions-page.module';
import { SubmissionsComponent } from './submissions.component';

describe('SubmissionsComponent', () => {
  let component: SubmissionsComponent;
  let fixture: ComponentFixture<SubmissionsComponent>;

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
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(SubmissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
