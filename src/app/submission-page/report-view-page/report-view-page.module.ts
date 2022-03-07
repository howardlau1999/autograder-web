import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { ReportComponent } from './report/report.component';
import { ReportViewPageRoutingModule } from './report-view-page-routing.module';
import { LogViewerComponent } from './report/log-viewer/log-viewer.component';

@NgModule({
  declarations: [ReportComponent, LogViewerComponent],
  imports: [
    CommonModule,
    ReportViewPageRoutingModule,
    MatExpansionModule,
    MatButtonModule,
    MatTooltipModule,
    MatCardModule,
    MatListModule,
    MatProgressBarModule,
    MatIconModule,
  ],
})
export class ReportViewPageModule {}
