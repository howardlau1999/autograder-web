import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { ReportComponent } from './report/report.component';
import { ReportViewPageRoutingModule } from './report-view-page-routing.module';
import { LogViewerModule } from '../../common/log-viewer/log-viewer.module';

@NgModule({
  declarations: [ReportComponent],
  imports: [
    CommonModule,
    ReportViewPageRoutingModule,
    LogViewerModule,
    MatExpansionModule,
    MatButtonModule,
    MatTooltipModule,
    MatCardModule,
    MatListModule,
    MatProgressBarModule,
    MatIconModule,
    MatDialogModule,
  ],
})
export class ReportViewPageModule {}
