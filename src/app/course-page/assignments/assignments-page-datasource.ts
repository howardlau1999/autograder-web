import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map, switchMap } from 'rxjs/operators';
import { merge, Observable } from 'rxjs';
import { GetAssignmentsInCourseResponse } from '../../api/proto/api_pb';
import { ApiService } from '../../api/api.service';

type Item = GetAssignmentsInCourseResponse.CourseAssignmentInfo;
export type CoursePageItem = Item;

/**
 * Data source for the CoursePage view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class AssignmentsPageDatasource extends DataSource<Item> {
  assignments$: Observable<GetAssignmentsInCourseResponse | null>;

  assignments: Item[] = [];

  dataLength: number = 0;

  paginator: MatPaginator | undefined;

  sort: MatSort | undefined;

  constructor(private apiService: ApiService, courseId$: Observable<number>) {
    super();
    this.assignments$ = courseId$.pipe(
      switchMap((courseId) => this.apiService.getAssignmentsInCourse(courseId)),
    );
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
      return merge(
        this.assignments$.pipe(
          map((response) => {
            this.assignments = response?.getAssignmentsList() || [];
            this.dataLength = this.assignments.length;
            return this.assignments;
          }),
        ),
        this.paginator.page,
        this.sort.sortChange,
      ).pipe(
        map(() => {
          return this.getPagedData(this.getSortedData([...this.assignments]));
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
  private getPagedData(data: Item[]): Item[] {
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
  private getSortedData(data: Item[]): Item[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'name':
          return compare(a.getName(), b.getName(), isAsc);
        case 'id':
          return compare(+a.getAssignmentId(), +b.getAssignmentId(), isAsc);
        case 'submitted':
          return compare(+a.getSubmitted(), +b.getSubmitted(), isAsc);
        case 'releaseDate':
          return compare(
            a.getReleaseDate()?.toDate() || new Date(),
            b.getReleaseDate()?.toDate() || new Date(),
            isAsc,
          );
        case 'dueDate':
          return compare(
            a.getDueDate()?.toDate() || new Date(),
            b.getDueDate()?.toDate() || new Date(),
            isAsc,
          );
        default:
          return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number | Date, b: string | number | Date, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
