import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MarkdownModule } from 'ngx-markdown-latex';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SubmissionPageRoutingModule } from './submission-page-routing.module';
import { SubmissionPageComponent } from './submission-page.component';
import { ReportComponent } from './report/report.component';
import { FilesComponent } from './files/files.component';

@NgModule({
  declarations: [SubmissionPageComponent, ReportComponent, FilesComponent],
  imports: [
    CommonModule,
    SubmissionPageRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatTabsModule,
    MatTreeModule,
    MatIconModule,
    MatExpansionModule,
    MarkdownModule.forChild(),
    NgxExtendedPdfViewerModule,
    MatListModule,
    MatCardModule,
    MatProgressBarModule,
    MatTooltipModule,
  ],
})
export class SubmissionPageModule {}
