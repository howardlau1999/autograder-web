import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map, tap } from 'rxjs/operators';
import { merge, Observable } from 'rxjs';
import { GetAllUsersResponse } from '../../../api/proto/api_pb';
import UserInfo = GetAllUsersResponse.UserInfo;

export type UsersTableItem = UserInfo;

/**
 * Data source for the UsersTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class UsersTableDataSource extends DataSource<UsersTableItem> {
  data$: Observable<UsersTableItem[]>;

  data: UsersTableItem[] = [];

  search: string = '';

  search$: Observable<string>;

  paginator: MatPaginator | undefined;

  sort: MatSort | undefined;

  constructor(data$: Observable<UsersTableItem[]>, search$: Observable<string>) {
    super();
    this.data$ = data$.pipe(
      tap((data) => {
        this.data = data;
      }),
    );
    this.search$ = search$.pipe(
      tap((value) => {
        this.search = value;
      }),
    );
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<UsersTableItem[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(this.data$, this.paginator.page, this.sort.sortChange, this.search$).pipe(
        map(() => {
          return this.getPagedData(this.getSortedData(this.filterData([...this.data])));
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

  private filterData(data: UsersTableItem[]): UsersTableItem[] {
    if (!this.search) {
      return data;
    }
    return data.filter((item) => {
      const user = item.getUser();
      return (
        user?.getUsername().includes(this.search) ||
        user?.getNickname().includes(this.search) ||
        user?.getEmail().includes(this.search) ||
        user?.getGithubId().includes(this.search) ||
        user?.getStudentId().includes(this.search)
      );
    });
  }

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: UsersTableItem[]): UsersTableItem[] {
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
  private getSortedData(data: UsersTableItem[]): UsersTableItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
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
