import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map, tap } from 'rxjs/operators';
import { merge, Observable } from 'rxjs';
import { Value } from 'google-protobuf/google/protobuf/struct_pb';

export interface LeaderboardItem {
  items: { [k: string]: { value: Value; desc: boolean; order: number; suffix: string } };
  rank: number;
  submissionId: number;
  submittedAt: Date;
  nickname: string;
  username: string;
  studentId: string;
  isSelf: boolean;
  userId: number;
}

/**
 * Data source for the Leaderboard view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class LeaderboardDataSource extends DataSource<LeaderboardItem> {
  data: LeaderboardItem[] = [];

  data$: Observable<LeaderboardItem[]>;

  paginator: MatPaginator | undefined;

  sort: MatSort | undefined;

  constructor(data$: Observable<LeaderboardItem[]>) {
    super();
    this.data$ = data$.pipe(
      tap((data) => {
        this.data = data;
      }),
    );
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<LeaderboardItem[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(this.data$, this.paginator.page, this.sort.sortChange).pipe(
        map(() => {
          return this.getPagedData(this.getSortedData([...this.data]));
        }),
      );
    }
    throw Error('Please set the paginator and sort on the data source before connecting.');
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: LeaderboardItem[]): LeaderboardItem[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    }
    return data;
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: LeaderboardItem[]): LeaderboardItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isDesc = this.sort?.direction === 'desc';
      const key = this.sort?.active;
      if (key === undefined) return 0;
      if (key === 'rank') {
        return compareNative(a.rank, b.rank, isDesc);
      }
      if (key === 'submittedAt') {
        return compareNative(a.submittedAt, b.submittedAt, isDesc);
      }
      return compare(a.items[key].value, b.items[key].value, isDesc);
    });
  }

  getSubmissionIds() {
    return this.data.map((item) => item.submissionId);
  }

  exportData(columns: string[]) {
    const data = this.data.map((item) => {
      return [
        item.rank.toString(),
        item.username,
        item.nickname,
        item.studentId,
        item.submissionId,
        item.submittedAt,
      ].concat(
        columns.map((key) => {
          const { value } = item.items[key];
          return value.hasNumberValue()
            ? value.getNumberValue().toString()
            : value.getStringValue();
        }),
      );
    });
    const fields = [
      'rank',
      'username',
      'nickname',
      'studentId',
      'submissionId',
      'submittedAt',
    ].concat(columns);
    return { data, fields };
  }
}

function compareNative(a: number | Date, b: number | Date, isDesc: boolean): number {
  let result: number = 0;
  if (a > b) result = 1;
  else result = -1;
  return result * (isDesc ? -1 : 1);
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: Value, b: Value, isDesc: boolean): number {
  let result: number = 0;
  if (a.hasNumberValue() && b.hasNumberValue()) {
    result = a.getNumberValue() < b.getNumberValue() ? -1 : 1;
  }
  if (a.hasStringValue() && b.hasStringValue()) {
    result = a.getStringValue() < b.getStringValue() ? -1 : 1;
  }
  return result * (isDesc ? -1 : 1);
}
