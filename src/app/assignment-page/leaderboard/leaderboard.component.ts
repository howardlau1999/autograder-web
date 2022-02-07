import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTable} from '@angular/material/table';
import {LeaderboardDataSource, LeaderboardItem} from './leaderboard-datasource';
import {ApiService} from "../../api/api.service";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<LeaderboardItem>;
  dataSource: LeaderboardDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['rank', 'name', 'Accuracy'];
  columns$: Observable<string[]>;

  constructor(private apiService: ApiService, private route: ActivatedRoute) {
    this.dataSource = new LeaderboardDataSource(apiService, this.route.parent!.paramMap.pipe(map(params => {
      return Number.parseInt(params.get('assignmentId') || '0');
    })));
    this.columns$ = this.dataSource.columns$;
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
