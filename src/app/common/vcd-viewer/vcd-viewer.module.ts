import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatLegacyProgressBarModule as MatProgressBarModule } from '@angular/material/legacy-progress-bar';
import { VcdViewerComponent } from './vcd-viewer.component';
import { PipeModule } from '../../pipe/pipe.module';

@NgModule({
  declarations: [VcdViewerComponent],
  imports: [CommonModule, MatProgressBarModule, PipeModule],
  exports: [VcdViewerComponent],
})
export class VcdViewerModule {}
