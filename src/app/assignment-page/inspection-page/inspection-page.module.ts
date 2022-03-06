import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
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
