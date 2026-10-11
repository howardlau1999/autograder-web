import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatLegacyChipsModule as MatChipsModule } from '@angular/material/legacy-chips';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';
import { MatLegacyPaginatorModule as MatPaginatorModule } from '@angular/material/legacy-paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatLegacyTabsModule as MatTabsModule } from '@angular/material/legacy-tabs';
import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { AdminPageRoutingModule } from './admin-page-routing.module';
import { GradersComponent } from './graders/graders.component';
import { GradersTableComponent } from './graders/graders-table/graders-table.component';
import { AdminPageComponent } from './admin-page.component';
import { UsersComponent } from './users/users.component';
import { UsersTableComponent } from './users/users-table/users-table.component';
import { CoursesComponent } from './courses/courses.component';
import { CoursesTableComponent } from './courses/courses-table/courses-table.component';

@NgModule({
  declarations: [
    AdminPageComponent,
    GradersComponent,
    GradersTableComponent,
    UsersComponent,
    UsersTableComponent,
    CoursesComponent,
    CoursesTableComponent,
  ],
  imports: [
    CommonModule,
    AdminPageRoutingModule,
    MatTooltipModule,
    MatChipsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTabsModule,
    MatCheckboxModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
  ],
})
export class AdminPageModule {}
