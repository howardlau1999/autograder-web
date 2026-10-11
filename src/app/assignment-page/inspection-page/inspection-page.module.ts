import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { MatSortModule } from '@angular/material/sort';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyPaginatorModule as MatPaginatorModule } from '@angular/material/legacy-paginator';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { SubmissionsTableModule } from '../../common/submissions-table/submissions-table.module';
import { InspectionComponent } from './inspection/inspection.component';
import { InspectionTableComponent } from './inspection/inspection-table/inspection-table.component';
import { InspectionPageRoutingModule } from './inspection-page-routing.module';

@NgModule({
  declarations: [InspectionTableComponent, InspectionComponent],
  imports: [
    CommonModule,
    InspectionPageRoutingModule,
    MatTableModule,
    SubmissionsTableModule,
    MatSortModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatSortModule,
    MatPaginatorModule,
    MatCardModule,
    MatInputModule,
  ],
})
export class InspectionPageModule {}
