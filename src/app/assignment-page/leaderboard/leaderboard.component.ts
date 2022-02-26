import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DateTime } from 'luxon';
import { ApiService } from '../../api/api.service';
import { LeaderboardDataSource, LeaderboardItem } from './leaderboard-datasource';
import { UserService } from '../../service/user.service';
import { exportCSV } from '../../common/csv-exporter/csv.exporter';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css'],
})
export class LeaderboardComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  @ViewChild(MatTable) table!: MatTable<LeaderboardItem>;

  dataSource: LeaderboardDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['rank'];

  columns$: Observable<string[]>;

  userColumns$: Observable<string[]>;

  exportEnabled$: Observable<boolean>;

  assignmentId: number = 0;

  constructor(
    private apiService: ApiService,
    private userService: UserService,
    private route: ActivatedRoute,
  ) {
    this.dataSource = new LeaderboardDataSource(
      apiService,
      this.route.parent!.paramMap.pipe(
        map((params) => {
          this.assignmentId = Number.parseInt(params.get('assignmentId') || '0', 10);
          return this.assignmentId;
        }),
      ),
      this.userService.userId!,
    );
    this.columns$ = this.dataSource.columns$;
    this.userColumns$ = this.dataSource.userColumns$;
    this.exportEnabled$ = this.dataSource.exportEnabled$;
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  onExportClicked() {
    exportCSV(
      this.dataSource.exportData(),
      `leaderboard-${this.assignmentId}-${DateTime.now().toFormat('yyyy-MM-dd_HH-mm-ss')}.csv`,
    );
  }
}
