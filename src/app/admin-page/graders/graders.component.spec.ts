import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradersComponent } from './graders.component';

describe('GradersComponent', () => {
  let component: GradersComponent;
  let fixture: ComponentFixture<GradersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GradersComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GradersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
