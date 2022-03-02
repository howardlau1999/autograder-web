import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map, tap } from 'rxjs/operators';
import { merge, Observable } from 'rxjs';
import { InspectAllSubmissionsInAssignmentResponse } from '../../../api/proto/api_pb';

// TODO: Replace this with your own data model type
export type InspectionTableItem = InspectAllSubmissionsInAssignmentResponse.UserSubmissionInfo;

export class InspectionTableDataSource extends DataSource<InspectionTableItem> {
  data$: Observable<InspectionTableItem[]>;

  data: InspectionTableItem[] = [];

  paginator: MatPaginator | undefined;

  sort: MatSort | undefined;

  search$: Observable<string>;

  search: string = '';

  constructor(inspection$: Observable<InspectionTableItem[]>, search$: Observable<string>) {
    super();
    this.data$ = inspection$.pipe(
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
  connect(): Observable<InspectionTableItem[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(this.data$, this.paginator.page, this.sort.sortChange, this.search$).pipe(
        map(() => {
          return this.getPagedData(
            this.getSortedData(this.filterData([...this.data], this.search)),
          );
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

  private filterData(data: InspectionTableItem[], search: string) {
    if (!search) return data;
    return data.filter((item) => {
      return (
        item.getUserId().toString() === search ||
        item.getNickname().includes(search) ||
        item.getUsername().includes(search) ||
        item.getStudentId().includes(search)
      );
    });
  }

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: InspectionTableItem[]): InspectionTableItem[] {
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
  private getSortedData(data: InspectionTableItem[]): InspectionTableItem[] {
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
