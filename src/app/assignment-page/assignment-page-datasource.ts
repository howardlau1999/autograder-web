import {DataSource} from '@angular/cdk/collections';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {map, switchMap} from 'rxjs/operators';
import {Observable, of as observableOf, merge, BehaviorSubject, tap, Subscription} from 'rxjs';
import {GetSubmissionsInAssignmentResponse} from "../api/proto/api_pb";
import {ApiService} from "../api/api.service";
import {SubmissionStatus} from "../api/proto/model_pb";

export type Item = GetSubmissionsInAssignmentResponse.SubmissionInfo;

/**
 * Data source for the CoursePage view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class AssignmentPageDataSource extends DataSource<Item> {
  data$: Observable<Item[]>;
  subs: Subscription[] = [];
  data: Item[] = [];
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor(private apiService: ApiService, params$: Observable<number[]>) {
    super();
    this.data$ = params$.pipe(switchMap(ids => {
      this.subs.forEach(sub => sub.unsubscribe());
      this.subs = [];
      const [courseId, assignmentId] = ids;
      return this.apiService.getSubmissionsInAssignment(courseId, assignmentId);
    }), map(resp => {
      this.data = resp.getSubmissionsList();
      this.subs = this.data.filter(submission => submission.getStatus() === SubmissionStatus.RUNNING).map(submission => {
        return this.apiService.subscribeSubmission(submission.getSubmissionId()).subscribe(resp => {
          submission.setStatus(resp.getStatus());
          submission.setScore(resp.getScore());
          submission.setMaxScore(resp.getMaxscore());
        });
      });
      return this.data;
    }));
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Item[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(this.data$.pipe(map((submissions) => {
        this.data = submissions;
        return this.data;
      })), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData(this.data));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: Item[]): Item[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: Item[]): Item[] {
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
