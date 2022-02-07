import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchAddMemberDialogComponent } from './batch-add-member-dialog.component';

describe('BatchAddMemberDialogComponent', () => {
  let component: BatchAddMemberDialogComponent;
  let fixture: ComponentFixture<BatchAddMemberDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BatchAddMemberDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchAddMemberDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
