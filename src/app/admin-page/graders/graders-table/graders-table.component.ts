import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { map, repeatWhen } from 'rxjs/operators';
import { interval } from 'rxjs';
import { GradersTableDataSource, GradersTableItem } from './graders-table-datasource';
import { AdminService } from '../../../service/admin.service';
import { GraderStatusMetadata } from '../../../api/proto/model_pb';

@Component({
  selector: 'app-graders-table',
  templateUrl: './graders-table.component.html',
  styleUrls: ['./graders-table.component.css'],
})
export class GradersTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  @ViewChild(MatTable) table!: MatTable<GradersTableItem>;

  dataSource: GradersTableDataSource;

  displayedColumns = ['id', 'name', 'tags', 'ip', 'concurrency', 'status', 'lastHeartbeat'];

  getStatusClassname(status: GraderStatusMetadata.StatusMap[keyof GraderStatusMetadata.StatusMap]) {
    switch (status) {
      case GraderStatusMetadata.Status.OFFLINE:
        return 'offline';
      case GraderStatusMetadata.Status.ONLINE:
        return 'online';
      default:
        return 'unknown';
    }
  }

  getStatusName(status: GraderStatusMetadata.StatusMap[keyof GraderStatusMetadata.StatusMap]) {
    switch (status) {
      case GraderStatusMetadata.Status.OFFLINE:
        return '离线';
      case GraderStatusMetadata.Status.ONLINE:
        return '在线';
      default:
        return '未知';
    }
  }

  constructor(private adminService: AdminService) {
    this.dataSource = new GradersTableDataSource(
      this.adminService.getAllGraders().pipe(
        repeatWhen(() => interval(10000)),
        map((resp) => {
          return resp.getGradersList();
        }),
      ),
    );
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
