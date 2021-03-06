import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map, tap } from 'rxjs/operators';
import { merge, Observable, Subscription } from 'rxjs';
import { SubmissionInfo } from '../../api/proto/api_pb';
import { SubmissionStatus } from '../../api/proto/model_pb';
import { SubmissionService } from '../../service/submission.service';

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number | Date, b: string | number | Date, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

export type SubmissionsItem = SubmissionInfo;

/**
 * Data source for the CoursePage view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class SubmissionsTableDataSource extends DataSource<SubmissionsItem> {
  data$: Observable<SubmissionsItem[]>;

  data: SubmissionsItem[] = [];

  paginator: MatPaginator | undefined;

  sort: MatSort | undefined;

  constructor(data$: Observable<SubmissionsItem[]>) {
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
  connect(): Observable<SubmissionsItem[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(this.data$, this.paginator.page, this.sort.sortChange).pipe(
        map(() => {
          return this.getPagedData(this.getSortedData(this.data));
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
  private getPagedData(data: SubmissionsItem[]): SubmissionsItem[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.slice(startIndex, startIndex + this.paginator.pageSize);
    }
    return data;
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: SubmissionsItem[]): SubmissionsItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'submissionId':
          return compare(a.getSubmissionId(), b.getSubmissionId(), isAsc);
        case 'submittedAt':
          return compare(
            a.getSubmittedAt()?.toDate() || new Date(),
            b.getSubmittedAt()?.toDate() || new Date(),
            isAsc,
          );
        case 'status':
          return compare(a.getStatus(), b.getStatus(), isAsc);
        case 'score':
          return compare(a.getScore(), b.getScore(), isAsc);
        default:
          return 0;
      }
    });
  }
}
