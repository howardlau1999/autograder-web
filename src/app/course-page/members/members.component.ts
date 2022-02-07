import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTable} from '@angular/material/table';
import {MembersDataSource, MembersItem} from './members-datasource';
import {MatDialog} from "@angular/material/dialog";
import {BatchAddMemberDialogComponent} from "./batch-add-member-dialog/batch-add-member-dialog.component";
import {AddMemberDialogComponent} from "./add-member-dialog/add-member-dialog.component";

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
  displayedColumns = ['id', 'name', 'email', 'operations'];

  constructor(private dialog: MatDialog) {
    this.dataSource = new MembersDataSource();
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
}
