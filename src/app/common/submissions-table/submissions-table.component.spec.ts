import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmissionsTableComponent } from './submissions-table.component';

describe('SubmissionsTableComponent', () => {
  let component: SubmissionsTableComponent;
  let fixture: ComponentFixture<SubmissionsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubmissionsTableComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmissionsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
