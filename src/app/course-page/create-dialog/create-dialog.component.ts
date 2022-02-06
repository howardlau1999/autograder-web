import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ApiService} from "../../api/api.service";

export interface CourseCreateDialogData {

}

@Component({
  selector: 'app-create-dialog',
  templateUrl: './create-dialog.component.html',
  styleUrls: ['./create-dialog.component.css']
})
export class CreateDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<CreateDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: CourseCreateDialogData,
              private apiService: ApiService
  ) { }

  ngOnInit(): void {
  }

}
