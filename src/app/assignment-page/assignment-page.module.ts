import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { MatIconModule } from '@angular/material/icon';
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
