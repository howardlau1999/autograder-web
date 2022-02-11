import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {FormControl} from "@angular/forms";
import {ApiService} from "../../api/api.service";

@Component({
  selector: 'app-assignment-course-create-dialog',
  templateUrl: './course-create-dialog.component.html',
  styleUrls: ['./course-create-dialog.component.css']
})
export class CourseCreateDialogComponent implements OnInit {
  name = new FormControl('');
  shortName = new FormControl('');
  description = new FormControl('');

  constructor(private dialogRef: MatDialogRef<CourseCreateDialogComponent>, private apiService: ApiService) {
  }

  ngOnInit(): void {
  }

  onCreateClicked() {
    this.apiService.createCourse(this.name.value as string, this.shortName.value as string, this.description.value as string).subscribe(resp => {
      this.dialogRef.close(resp.getCourseId());
    });
  }

  onCancelClicked() {
    this.dialogRef.close(null);
  }
}
