import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { MatCardModule } from '@angular/material/card';
import { MarkdownModule } from 'ngx-markdown-latex';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { MatIconModule } from '@angular/material/icon';
import { FilesComponent } from './files/files.component';
import { FilesPreviewPageRoutingModule } from './files-preview-page-routing.module';

@NgModule({
  declarations: [FilesComponent],
  imports: [
    CommonModule,
    FilesPreviewPageRoutingModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatTooltipModule,
    MatTreeModule,
    MatCardModule,
    MarkdownModule.forChild(),
    NgxExtendedPdfViewerModule,
    MatIconModule,
  ],
})
export class FilesPreviewPageModule {}
