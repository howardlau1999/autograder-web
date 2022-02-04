import {Component, OnInit, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {ApiService} from "../api/api.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTable} from "@angular/material/table";
import {AssignmentPageDataSource, Item} from "./assignment-page-datasource";
import {MatDialog} from "@angular/material/dialog";
import {UploadDialogComponent} from "./upload-dialog/upload-dialog.component";
import {AsyncSubject, BehaviorSubject, mergeWith, Subject, Subscription, tap} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-assignment-page',
  templateUrl: './assignment-page.component.html',
  styleUrls: ['./assignment-page.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class AssignmentPageComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Item>;
  dataSource: AssignmentPageDataSource;

  columnsToDisplay = ['submissionId', 'submittedAt', 'score', 'operations'];
  assignmentId: number = 0;
  courseId: number = 0;
  expandedSubmission: Item | null = null;
  uploadDialogSubscription: Subscription | null = null;
  ids$: Subject<number[]> = new Subject<number[]>();

  constructor(private apiService: ApiService, public dialog: MatDialog, private router: Router, private route: ActivatedRoute) {
    this.dataSource = new AssignmentPageDataSource(apiService, this.route.paramMap.pipe(map(params => {
      return [Number.parseInt(params.get("courseId") || "0"), Number.parseInt(params.get("assignmentId") || "0")];
    }), mergeWith(this.ids$), tap(ids => {
      const [courseId, assignmentId] = ids;
      this.courseId = courseId;
      this.assignmentId = assignmentId;
    })));
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  viewSubmissionReport(submissionId: number): void {
    this.router.navigate(["submissions", submissionId], {relativeTo: this.route}).then();
  }

  openSubmissionDialog(): void {
    const dialogRef = this.dialog.open(UploadDialogComponent, {
      data: {
        assignmentId: this.assignmentId,
      }
    });
    if (this.uploadDialogSubscription === null) {
      this.uploadDialogSubscription = dialogRef.afterClosed().subscribe((result) => {
        this.uploadDialogSubscription?.unsubscribe();
        this.uploadDialogSubscription = null;
        if (result !== null) {
          this.ids$.next([this.courseId, this.assignmentId]);
        }
      });
    }
  }
}
