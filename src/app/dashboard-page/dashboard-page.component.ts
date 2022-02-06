import {Component} from '@angular/core';
import {map} from 'rxjs/operators';
import {ApiService} from "../api/api.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {JoinDialogComponent} from "./join-dialog/join-dialog.component";
import {CreateDialogComponent} from "./create-dialog/create-dialog.component";

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent {
  cards$ = this.apiService.getCourseList(1).pipe(map((response) => {
    return response.getCoursesList();
  }));

  constructor(private dialog: MatDialog,
              private apiService: ApiService,
              private router: Router) {
  }

  joinCourse() {
    this.dialog.open(JoinDialogComponent);
  }

  createCourse() {
    this.dialog.open(CreateDialogComponent);
  }

  gotoCourse(courseId: number) {
    this.router.navigate(["/courses", courseId]).then();
  }
}
