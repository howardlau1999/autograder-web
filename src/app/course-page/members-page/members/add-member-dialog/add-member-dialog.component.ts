import { Component, Inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../../../../api/api.service';
import { AddCourseMembersRequest } from '../../../../api/proto/api_pb';
import { CourseRole, CourseRoleMap } from '../../../../api/proto/model_pb';

export interface AddMemberDialogData {
  courseId: number;
}

@Component({
  selector: 'app-add-member-dialog',
  templateUrl: './add-member-dialog.component.html',
  styleUrls: ['./add-member-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
})
export class AddMemberDialogComponent implements OnInit {
  courseId: number;

  addMemberForm = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    role: new FormControl<CourseRoleMap[keyof CourseRoleMap]>(CourseRole.STUDENT, {
      nonNullable: true,
    }),
  });

  constructor(
    private apiService: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: AddMemberDialogData,
    private dialogRef: MatDialogRef<AddMemberDialogComponent>,
    private snackBar: MatSnackBar,
  ) {
    this.courseId = data.courseId;
  }

  ngOnInit(): void {}

  onCancelClicked() {
    this.dialogRef.close();
  }

  onConfirmClicked() {
    if (this.addMemberForm.invalid) return;
    const newMember = new AddCourseMembersRequest.MemberToAdd();
    const { email, name, role } = this.addMemberForm.getRawValue();
    newMember.setEmail(email);
    newMember.setName(name);
    newMember.setRole(role);
    this.apiService.addCourseMembers(this.courseId, [newMember]).subscribe((_resp) => {
      this.snackBar.open('添加课程成员成功', '关闭', { duration: 3000 });
      this.dialogRef.close(true);
    });
  }
}
