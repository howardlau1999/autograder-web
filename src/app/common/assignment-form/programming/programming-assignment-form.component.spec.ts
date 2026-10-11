import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideLuxonDateAdapter } from '@angular/material-luxon-adapter';

import { AssignmentFormModule } from '../assignment-form.module';
import { ProgrammingAssignmentFormComponent } from './programming-assignment-form.component';

describe('AssignmentFormComponent', () => {
  let component: ProgrammingAssignmentFormComponent;
  let fixture: ComponentFixture<ProgrammingAssignmentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignmentFormModule],
      providers: [provideRouter([]), provideLuxonDateAdapter()],
    }).compileComponents();
    fixture = TestBed.createComponent(ProgrammingAssignmentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
