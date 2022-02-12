import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveMemberDialogComponent } from './remove-member-dialog.component';

describe('RemoveMemberDialogComponent', () => {
  let component: RemoveMemberDialogComponent;
  let fixture: ComponentFixture<RemoveMemberDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RemoveMemberDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveMemberDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
