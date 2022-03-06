import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MarkdownModule } from 'ngx-markdown-latex';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { AssignmentPageRoutingModule } from './assignment-page-routing.module';
import { AssignmentPageComponent } from './assignment-page.component';
import { AssignmentFormModule } from '../common/assignment-form/assignment-form.module';

@NgModule({
  declarations: [AssignmentPageComponent],
  imports: [
    CommonModule,
    AssignmentPageRoutingModule,
    AssignmentFormModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
  ],
})
export class AssignmentPageModule {}
