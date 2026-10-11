import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';

import { InspectionPageModule } from '../../inspection-page.module';
import { InspectionTableComponent } from './inspection-table.component';

describe('InspectionTableComponent', () => {
  let component: InspectionTableComponent;
  let fixture: ComponentFixture<InspectionTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InspectionPageModule],
      providers: [provideRouter([])],
    }).compileComponents();
    fixture = TestBed.createComponent(InspectionTableComponent);
    component = fixture.componentInstance;
    component.search$ = of('');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
