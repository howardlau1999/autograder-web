import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VcdViewerPageComponent } from './vcd-viewer-page.component';
import { VcdViewerComponent } from '../common/vcd-viewer/vcd-viewer.component';
import { VcdViewerPageRoutingModule } from './vcd-viewer-page-routing.module';

@NgModule({
  declarations: [VcdViewerPageComponent, VcdViewerComponent],
  imports: [CommonModule, VcdViewerPageRoutingModule],
})
export class VcdViewerPageModule {}
