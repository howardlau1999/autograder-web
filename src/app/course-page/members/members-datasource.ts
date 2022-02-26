import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { merge, Observable, tap } from 'rxjs';
import { GetCourseMembersResponse } from '../../api/proto/api_pb';

export type MembersItem = GetCourseMembersResponse.MemberInfo;

/**
 * Data source for the Members view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class MembersDataSource extends DataSource<MembersItem> {
  data$: Observable<MembersItem[]>;

  data: MembersItem[] = [];

  paginator: MatPaginator | undefined;

  sort: MatSort | undefined;

  constructor(members$: Observable<MembersItem[]>) {
    super();
    this.data$ = members$.pipe(
      tap((data) => {
        this.data = data;
      }),
    );
  }

  exportData() {
    const fields = ['userId', 'username', 'nickname', 'studentId', 'githubId', 'email', 'role'];
    const data = this.data.map((item) => {
      return [
        item.getUserId(),
        item.getUsername(),
        item.getNickname(),
        item.getStudentId(),
        item.getGithubId(),
        item.getEmail(),
        item.getRole(),
      ];
    });
    return { fields, data };
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<MembersItem[]> {
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
  private getPagedData(data: MembersItem[]): MembersItem[] {
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
  private getSortedData(data: MembersItem[]): MembersItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'username':
          return compare(a.getUsername(), b.getUsername(), isAsc);
        case 'userId':
          return compare(+a.getUserId(), +b.getUserId(), isAsc);
        default:
          return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
