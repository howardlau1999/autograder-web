import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatLegacyPaginator as MatPaginator } from '@angular/material/legacy-paginator';
import { MatSort } from '@angular/material/sort';
import { MatLegacyTable as MatTable } from '@angular/material/legacy-table';
import { map } from 'rxjs/operators';
import { UntypedFormControl } from '@angular/forms';
import { MatLegacyCheckboxChange as MatCheckboxChange } from '@angular/material/legacy-checkbox';
import { UsersTableDataSource, UsersTableItem } from './users-table-datasource';
import { AdminService } from '../../../service/admin.service';
import { UserService } from '../../../service/user.service';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css'],
})
export class UsersTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  @ViewChild(MatTable) table!: MatTable<UsersTableItem>;

  dataSource: UsersTableDataSource;

  displayedColumns = [
    'id',
    'username',
    'nickname',
    'studentId',
    'email',
    'githubId',
    'createdAt',
    'isAdmin',
  ];

  searchFormControl = new UntypedFormControl();

  userId: number;

  constructor(private adminService: AdminService, private userService: UserService) {
    this.userId = this.userService.userId!;
    this.dataSource = new UsersTableDataSource(
      this.adminService.getAllUsers().pipe(
        map((resp) => {
          return resp.getUsersList();
        }),
      ),
      this.searchFormControl.valueChanges,
    );
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  onIsAdminChange(event: MatCheckboxChange, userId: number) {
    this.adminService.setAdmin(userId, event.checked).subscribe(() => {});
  }
}
