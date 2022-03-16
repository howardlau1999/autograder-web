import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { map } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { CoursesTableDataSource, CoursesTableItem } from './courses-table-data-source';
import { AdminService } from '../../../service/admin.service';
import { UserService } from '../../../service/user.service';

@Component({
  selector: 'app-courses-table',
  templateUrl: './courses-table.component.html',
  styleUrls: ['./courses-table.component.css'],
})
export class CoursesTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  @ViewChild(MatTable) table!: MatTable<CoursesTableItem>;

  dataSource: CoursesTableDataSource;

  displayedColumns = ['id', 'name', 'shortName', 'joinCode', 'allowsJoin'];

  searchFormControl = new FormControl();

  userId: number;

  constructor(private adminService: AdminService, private userService: UserService) {
    this.userId = this.userService.userId!;
    this.dataSource = new CoursesTableDataSource(
      this.adminService.getAllCourses().pipe(
        map((resp) => {
          return resp.getCoursesList();
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
}
