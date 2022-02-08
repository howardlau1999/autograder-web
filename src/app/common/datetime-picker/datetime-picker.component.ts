import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DateTime} from 'luxon';
import {MatDatepickerInputEvent} from "@angular/material/datepicker";
import {MatSelectChange} from "@angular/material/select";
@Component({
  selector: 'app-datetime-picker',
  templateUrl: './datetime-picker.component.html',
  styleUrls: ['./datetime-picker.component.css']
})
export class DatetimePickerComponent implements OnInit {
  @Input() label: string = '';
  @Input() timestamp: DateTime = DateTime.now();
  @Output() timestampChange: EventEmitter<DateTime> = new EventEmitter<DateTime>();
  hours = Array(24).fill(0).map((_, i) => i);
  minutes = Array(60).fill(0).map((_, i) => i);
  constructor() { }

  ngOnInit(): void {
  }

  onDateChange(event: MatDatepickerInputEvent<DateTime>) {
    const newDate = event.value;
    if (newDate === null) return;
    this.timestamp = this.timestamp.set({
      year: newDate.year,
      month: newDate.month,
      day: newDate.day,
    });
    this.timestampChange.emit(this.timestamp);
  }

  onHourChange(event: MatSelectChange) {
    const newHour = Number.parseInt(event.value || "0");
    this.timestamp = this.timestamp.set({
      hour: newHour,
    });
    this.timestampChange.emit(this.timestamp);
  }

  onMinuteChange(event: MatSelectChange) {
    const newMinute = Number.parseInt(event.value || "0");
    this.timestamp = this.timestamp.set({
      minute: newMinute,
    });
    this.timestampChange.emit(this.timestamp);
  }
}
