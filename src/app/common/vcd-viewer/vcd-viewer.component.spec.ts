import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VcdViewerComponent } from './vcd-viewer.component';

describe('VcdViewerComponent', () => {
  let component: VcdViewerComponent;
  let fixture: ComponentFixture<VcdViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VcdViewerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VcdViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
