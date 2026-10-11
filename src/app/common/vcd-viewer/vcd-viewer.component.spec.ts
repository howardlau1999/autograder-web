import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { VcdViewerModule } from './vcd-viewer.module';
import { VcdViewerComponent } from './vcd-viewer.component';

describe('VcdViewerComponent', () => {
  let component: VcdViewerComponent;
  let fixture: ComponentFixture<VcdViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VcdViewerModule],
      providers: [provideRouter([])],
    }).compileComponents();
    fixture = TestBed.createComponent(VcdViewerComponent);
    component = fixture.componentInstance;
    // No change detection: the view would boot the VCD wasm module over
    // fetch(), which jsdom cannot serve.
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
