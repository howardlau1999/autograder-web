import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CourseRole, CourseRoleMap } from '../../../api/proto/model_pb';

@Component({
  selector: 'app-role-select',
  templateUrl: './role-select.component.html',
  styleUrls: ['./role-select.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: RoleSelectComponent,
    },
  ],
})
export class RoleSelectComponent implements OnInit, ControlValueAccessor {
  @Input() formField: boolean = false;

  @Input() label: string | undefined;

  @Input() role: CourseRoleMap[keyof CourseRoleMap] | undefined = 0;

  @Output() roleChange: EventEmitter<CourseRoleMap[keyof CourseRoleMap]> = new EventEmitter<
    CourseRoleMap[keyof CourseRoleMap]
  >();

  touched = false;

  @Input() disabled = false;

  roleMap = {
    [CourseRole.TA]: '助教',
    [CourseRole.READER]: '只读',
    [CourseRole.INSTRUCTOR]: '教师',
    [CourseRole.STUDENT]: '学生',
  };

  roles: CourseRoleMap[keyof CourseRoleMap][] = [
    CourseRole.READER,
    CourseRole.TA,
    CourseRole.INSTRUCTOR,
    CourseRole.STUDENT,
  ];

  constructor() {}

  onChange = (_: CourseRoleMap[keyof CourseRoleMap]) => {};

  onTouched = () => {};

  ngOnInit(): void {}

  onRoleChange(event: MatSelectChange) {
    this.markAsTouched();
    this.role = event.value;
    this.roleChange.emit(this.role);
  }

  mapRoleToString(role: CourseRoleMap[keyof CourseRoleMap]) {
    return this.roleMap[role] || '学生';
  }

  markAsTouched() {
    if (!this.touched) {
      this.touched = true;
      this.onTouched();
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(obj: CourseRoleMap[keyof CourseRoleMap]): void {
    this.role = obj;
    this.roleChange.emit(this.role);
  }
}
