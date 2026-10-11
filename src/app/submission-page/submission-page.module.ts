import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { SubmissionPageRoutingModule } from './submission-page-routing.module';
import { SubmissionPageComponent } from './submission-page.component';

@NgModule({
  declarations: [SubmissionPageComponent],
  imports: [
    CommonModule,
    SubmissionPageRoutingModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
  ],
})
export class SubmissionPageModule {}
