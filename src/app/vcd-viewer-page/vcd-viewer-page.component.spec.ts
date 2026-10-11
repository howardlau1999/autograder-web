import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { VcdViewerPageModule } from './vcd-viewer-page.module';
import { VcdViewerPageComponent } from './vcd-viewer-page.component';

describe('VcdViewerPageComponent', () => {
  let component: VcdViewerPageComponent;
  let fixture: ComponentFixture<VcdViewerPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VcdViewerPageModule],
      providers: [provideRouter([])],
    }).compileComponents();
    fixture = TestBed.createComponent(VcdViewerPageComponent);
    component = fixture.componentInstance;
    // No change detection: the view would boot the VCD wasm module over
    // fetch(), which jsdom cannot serve.
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
