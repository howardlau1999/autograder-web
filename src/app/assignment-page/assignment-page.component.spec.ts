import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { AssignmentPageModule } from './assignment-page.module';
import { AssignmentPageComponent } from './assignment-page.component';

describe('AssignmentPageComponent', () => {
  let component: AssignmentPageComponent;
  let fixture: ComponentFixture<AssignmentPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignmentPageModule],
      providers: [provideRouter([])],
    }).compileComponents();
    fixture = TestBed.createComponent(AssignmentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
