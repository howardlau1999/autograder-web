import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { VcdViewerComponent } from './vcd-viewer.component';
import { SubmissionsTableModule } from '../submissions-table/submissions-table.module';
import { PipeModule } from '../../pipe/pipe.module';

@NgModule({
  declarations: [VcdViewerComponent],
  imports: [CommonModule, MatProgressBarModule, PipeModule],
  exports: [VcdViewerComponent],
})
export class VcdViewerModule {}
