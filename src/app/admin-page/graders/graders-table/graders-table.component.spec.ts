import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { AdminPageModule } from '../../admin-page.module';
import { GradersTableComponent } from './graders-table.component';

describe('GradersTableComponent', () => {
  let component: GradersTableComponent;
  let fixture: ComponentFixture<GradersTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminPageModule],
      providers: [provideRouter([])],
    }).compileComponents();
    fixture = TestBed.createComponent(GradersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
