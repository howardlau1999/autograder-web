import {Component} from '@angular/core';
import {map, switchMap} from 'rxjs/operators';
import {ApiService} from "../api/api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {JoinDialogComponent} from "./join-dialog/join-dialog.component";
import {CourseCreateDialogComponent} from "./course-create-dialog/course-create-dialog.component";
import {mergeWith, Subject, Subscription} from "rxjs";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent {
  refresher: Subject<null> = new Subject<null>();
  cards$ = this.refresher.pipe(
    mergeWith(this.route.paramMap),
    switchMap(_ => this.apiService.getCourseList().pipe(
      map((response) => {
        return response.getCoursesList();
      }),
    )),
  );
  createDialogSubscription: Subscription | null = null;

  constructor(private dialog: MatDialog,
              private apiService: ApiService,
              private router: Router, private route: ActivatedRoute, private snackBar: MatSnackBar) {
  }

  joinCourse() {
    this.dialog.open(JoinDialogComponent);
  }

  createCourse() {
    const dialogRef = this.dialog.open(CourseCreateDialogComponent);
    if (this.createDialogSubscription === null) {
      const config: MatSnackBarConfig = {
        duration: 3000,
      }
      this.createDialogSubscription = dialogRef.afterClosed().subscribe(result => {
        if (result !== null) {
          this.refresher.next(null);
          this.snackBar.open("课程创建成功", "关闭", config);
        } else {
          this.snackBar.open("创建已取消", "关闭", config);
        }
      });
    }
  }

  gotoCourse(courseId: number) {
    this.router.navigate(["/courses", courseId]).then();
  }
}
