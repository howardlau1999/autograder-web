import {Component, OnInit, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {ApiService} from "../api/api.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTable} from "@angular/material/table";
import {AssignmentPageDataSource, Item} from "./assignment-page-datasource";
import {MatDialog} from "@angular/material/dialog";
import {UploadDialogComponent} from "./upload-dialog/upload-dialog.component";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";

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

  assignmentId: number = 1;
  expandedSubmission: Item | null = null;
  uploadDialogSubscription: Subscription | null = null;

  constructor(private apiService: ApiService, public dialog: MatDialog, private router: Router) {
    this.dataSource = new AssignmentPageDataSource(apiService);
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  viewSubmissionReport(): void {
    this.router.navigate(["submission"]).then();
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
          this.dataSource.fetchSubmissions();
        }
      });
    }
  }
}
