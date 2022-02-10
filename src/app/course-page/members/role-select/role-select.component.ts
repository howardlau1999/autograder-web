import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CourseRole, CourseRoleMap} from "../../../api/proto/model_pb";
import {MatSelectChange} from "@angular/material/select";

@Component({
  selector: 'app-role-select',
  templateUrl: './role-select.component.html',
  styleUrls: ['./role-select.component.css']
})
export class RoleSelectComponent implements OnInit {
  @Input() formField: boolean = false;
  @Input() label: string | undefined;
  @Input() role: CourseRoleMap[keyof CourseRoleMap] | undefined = 0;
  @Output() roleChange: EventEmitter<CourseRoleMap[keyof CourseRoleMap]> = new EventEmitter<CourseRoleMap[keyof CourseRoleMap]>();
  roleMap = {
    [CourseRole.TA]: "助教",
    [CourseRole.READER]: "只读",
    [CourseRole.INSTRUCTOR]: "教师",
    [CourseRole.STUDENT]: "学生",
  };
  roles: CourseRoleMap[keyof CourseRoleMap][] = [CourseRole.READER, CourseRole.TA, CourseRole.INSTRUCTOR, CourseRole.STUDENT];
  constructor() { }

  ngOnInit(): void {
  }

  onRoleChange(event: MatSelectChange) {
    this.role = event.value;
    this.roleChange.emit(this.role);
  }

  mapRoleToString(role: CourseRoleMap[keyof CourseRoleMap]) {
    return this.roleMap[role] || "学生";
  }
}
