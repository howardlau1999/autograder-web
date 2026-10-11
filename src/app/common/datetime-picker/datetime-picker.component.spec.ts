import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideLuxonDateAdapter } from '@angular/material-luxon-adapter';

import { DatetimePickerModule } from './datetime-picker.module';
import { DatetimePickerComponent } from './datetime-picker.component';

describe('DatetimePickerComponent', () => {
  let component: DatetimePickerComponent;
  let fixture: ComponentFixture<DatetimePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatetimePickerModule],
      providers: [provideRouter([]), provideLuxonDateAdapter()],
    }).compileComponents();
    fixture = TestBed.createComponent(DatetimePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
