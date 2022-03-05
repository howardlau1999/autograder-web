import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatOptionModule } from '@angular/material/core';
import { DatetimePickerComponent } from './datetime-picker.component';

@NgModule({
  declarations: [DatetimePickerComponent],
  imports: [CommonModule, MatSelectModule, MatInputModule, MatDatepickerModule, MatOptionModule],
  exports: [DatetimePickerComponent],
})
export class DatetimePickerModule {}
