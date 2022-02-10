import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DateTime} from 'luxon';
import {MatDatepickerInputEvent} from "@angular/material/datepicker";
import {MatSelectChange} from "@angular/material/select";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'app-datetime-picker',
  templateUrl: './datetime-picker.component.html',
  styleUrls: ['./datetime-picker.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: DatetimePickerComponent,
  }]
})
export class DatetimePickerComponent implements OnInit, ControlValueAccessor {
  @Input() label: string = '';
  @Input() timestamp: DateTime = DateTime.now();
  @Output() timestampChange: EventEmitter<DateTime> = new EventEmitter<DateTime>();
  onChange = (_: DateTime) => {
  };
  onTouched = () => {
  };
  disabled = false;
  touched = false;
  hours = Array(24).fill(0).map((_, i) => i);
  minutes = Array(60).fill(0).map((_, i) => i);

  constructor() {
  }

  ngOnInit(): void {
  }

  onDateChange(event: MatDatepickerInputEvent<DateTime>) {
    this.markAsTouched();
    const newDate = event.value;
    if (newDate === null) return;
    this.timestamp = this.timestamp.set({
      year: newDate.year,
      month: newDate.month,
      day: newDate.day,
    });
    this.timestampChange.emit(this.timestamp);
    this.onChange(this.timestamp);
  }

  onHourChange(event: MatSelectChange) {
    this.markAsTouched();
    const newHour = Number.parseInt(event.value || "0");
    this.timestamp = this.timestamp.set({
      hour: newHour,
    });
    this.timestampChange.emit(this.timestamp);
    this.onChange(this.timestamp);
  }

  onMinuteChange(event: MatSelectChange) {
    this.markAsTouched();
    const newMinute = Number.parseInt(event.value || "0");
    this.timestamp = this.timestamp.set({
      minute: newMinute,
    });
    this.timestampChange.emit(this.timestamp);
    this.onChange(this.timestamp);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(timestamp: DateTime): void {
    this.timestamp = timestamp;
  }
}
