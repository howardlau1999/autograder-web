import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { AccountPageComponent } from './account-page.component';
import { AccountPageRoutingModule } from './account-page-routing.module';
import { ConfirmDialogModule } from '../common/confirm-dialog/confirm-dialog.module';

@NgModule({
  declarations: [AccountPageComponent],
  imports: [
    CommonModule,
    AccountPageRoutingModule,
    MatToolbarModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatTooltipModule,
    MatDialogModule,
    ConfirmDialogModule,
  ],
})
export class AccountPageModule {}
