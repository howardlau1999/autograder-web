import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { AdminPageModule } from '../admin-page.module';
import { GradersComponent } from './graders.component';

describe('GradersComponent', () => {
  let component: GradersComponent;
  let fixture: ComponentFixture<GradersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminPageModule],
      providers: [provideRouter([])],
    }).compileComponents();
    fixture = TestBed.createComponent(GradersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
