import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentsManagementComponent } from './assignments-management.component';

describe('AssignmentsManagementComponent', () => {
  let component: AssignmentsManagementComponent;
  let fixture: ComponentFixture<AssignmentsManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignmentsManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignmentsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
