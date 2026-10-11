import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { SubmissionsTableModule } from './submissions-table.module';
import { SubmissionsTableComponent } from './submissions-table.component';

describe('SubmissionsTableComponent', () => {
  let component: SubmissionsTableComponent;
  let fixture: ComponentFixture<SubmissionsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubmissionsTableModule],
      providers: [provideRouter([])],
    }).compileComponents();
    fixture = TestBed.createComponent(SubmissionsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
