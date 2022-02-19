import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VcdViewerPageComponent } from './vcd-viewer-page.component';

describe('VcdViewerPageComponent', () => {
  let component: VcdViewerPageComponent;
  let fixture: ComponentFixture<VcdViewerPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VcdViewerPageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VcdViewerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
