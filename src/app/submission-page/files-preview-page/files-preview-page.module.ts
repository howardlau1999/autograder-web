import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';
import { SafeMarkdownModule } from '../../common/safe-markdown/safe-markdown.module';
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
    SafeMarkdownModule,
    NgxExtendedPdfViewerModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
})
export class FilesPreviewPageModule {}
