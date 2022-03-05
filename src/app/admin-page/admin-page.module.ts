import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatChipsModule } from '@angular/material/chips';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTabsModule } from '@angular/material/tabs';
import { AdminPageRoutingModule } from './admin-page-routing.module';
import { GradersComponent } from './graders/graders.component';
import { GradersTableComponent } from './graders/graders-table/graders-table.component';
import { AdminPageComponent } from './admin-page.component';

@NgModule({
  declarations: [AdminPageComponent, GradersComponent, GradersTableComponent],
  imports: [
    CommonModule,
    AdminPageRoutingModule,
    MatTooltipModule,
    MatChipsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTabsModule,
  ],
})
export class AdminPageModule {}
