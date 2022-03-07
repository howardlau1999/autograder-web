import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VcdViewerPageComponent } from './vcd-viewer-page.component';
import { VcdViewerPageRoutingModule } from './vcd-viewer-page-routing.module';
import { VcdViewerModule } from '../common/vcd-viewer/vcd-viewer.module';

@NgModule({
  declarations: [VcdViewerPageComponent],
  imports: [CommonModule, VcdViewerPageRoutingModule, VcdViewerModule],
})
export class VcdViewerPageModule {}
