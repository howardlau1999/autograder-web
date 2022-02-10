import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTable} from '@angular/material/table';
import {MembersDataSource, MembersItem} from './members-datasource';
import {MatDialog} from "@angular/material/dialog";
import {BatchAddMemberDialogComponent} from "./batch-add-member-dialog/batch-add-member-dialog.component";
import {AddMemberDialogComponent} from "./add-member-dialog/add-member-dialog.component";
import {ActivatedRoute} from "@angular/router";
import {map} from "rxjs/operators";
import {ApiService} from "../../api/api.service";
import {CourseRole, CourseRoleMap} from "../../api/proto/model_pb";
import {RemoveMemberDialogComponent} from "./remove-member-dialog/remove-member-dialog.component";
import {UserService} from "../../service/user.service";

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<MembersItem>;
  dataSource: MembersDataSource;
  search: string = '';

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['userId', 'username', 'nickname', 'email', 'role', 'operations'];

  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private userService: UserService,
    private apiService: ApiService,
  ) {
    this.dataSource = new MembersDataSource(apiService, this.route.parent!.paramMap.pipe(
      map(params => Number.parseInt(params.get("courseId") || "0"))
    ));
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
    this.dialog.open(AddMemberDialogComponent);
  }

  onDeleteMemberClicked(data: any) {
    console.log(data);
    this.dialog.open(RemoveMemberDialogComponent);
  }

}
