import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatLegacyOptionModule as MatOptionModule } from '@angular/material/legacy-core';
import { DatetimePickerComponent } from './datetime-picker.component';

@NgModule({
  declarations: [DatetimePickerComponent],
  imports: [CommonModule, MatSelectModule, MatInputModule, MatDatepickerModule, MatOptionModule],
  exports: [DatetimePickerComponent],
})
export class DatetimePickerModule {}
