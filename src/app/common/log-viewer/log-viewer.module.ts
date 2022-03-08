import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogViewerComponent } from './log-viewer.component';

@NgModule({
  declarations: [LogViewerComponent],
  imports: [CommonModule],
  exports: [LogViewerComponent],
})
export class LogViewerModule {}
