import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatExpansionModule } from '@angular/material/expansion';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { MatLegacyProgressBarModule as MatProgressBarModule } from '@angular/material/legacy-progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
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
