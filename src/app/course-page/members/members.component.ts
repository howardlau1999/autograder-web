import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { mergeWith, Subject, Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MembersDataSource, MembersItem } from './members-datasource';
import { BatchAddMemberDialogComponent } from './batch-add-member-dialog/batch-add-member-dialog.component';
import { AddMemberDialogComponent } from './add-member-dialog/add-member-dialog.component';
import { ApiService } from '../../api/api.service';
import { RemoveMemberDialogComponent } from './remove-member-dialog/remove-member-dialog.component';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css'],
})
export class MembersComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  @ViewChild(MatTable) table!: MatTable<MembersItem>;

  dataSource: MembersDataSource;

  search: string = '';

  courseId: number = 0;

  refresher$: Subject<number> = new Subject<number>();

  addMemberSub: Subscription | undefined;

  removeMemberSub: Subscription | undefined;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['userId', 'username', 'nickname', 'email', 'role', 'operations'];

  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private userService: UserService,
    private apiService: ApiService,
    private snackBar: MatSnackBar,
  ) {
    this.dataSource = new MembersDataSource(
      apiService,
      this.route.parent!.paramMap.pipe(
        map((params) => (this.courseId = Number.parseInt(params.get('courseId') || '0'))),
        mergeWith(this.refresher$),
      ),
    );
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  onBatchAddMemberClicked() {
    this.dialog.open(BatchAddMemberDialogComponent);
  }

  onAddMemberClicked() {
    const dialogRef = this.dialog.open(AddMemberDialogComponent, {
      data: { courseId: this.courseId },
    });
    if (this.addMemberSub === undefined) {
      dialogRef.afterClosed().subscribe((success) => {
        if (success) {
          this.refresher$.next(this.courseId);
        }
        this.addMemberSub?.unsubscribe();
      });
    }
  }

  onDeleteMemberClicked(member: MembersItem) {
    const dialogRef = this.dialog.open(RemoveMemberDialogComponent, {
      data: {
        nickname: member.getNickname(),
        email: member.getEmail(),
      },
    });
    if (this.removeMemberSub === undefined) {
      dialogRef.afterClosed().subscribe((confirmed) => {
        if (confirmed) {
          this.apiService.removeCourseMembers(this.courseId, [member.getUserId()]).subscribe({
            next: (resp) => {
              this.snackBar.open('移除成员成功', '关闭', { duration: 3000 });
              this.refresher$.next(this.courseId);
            },
            error: (err) => {
              console.error(err);
              this.snackBar.open('移除成员出错', '关闭', { duration: 3000 });
            },
          });
        }
        this.removeMemberSub?.unsubscribe();
      });
    }
  }
}
