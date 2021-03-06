import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map, tap } from 'rxjs/operators';
import { merge, Observable } from 'rxjs';
import { GetAllGradersResponse } from '../../../api/proto/api_pb';
import { GraderStatusMetadata } from '../../../api/proto/model_pb';

// TODO: Replace this with your own data model type
export interface GradersTableItem {
  name: string;
  ip: string;
  status: GraderStatusMetadata.StatusMap[keyof GraderStatusMetadata.StatusMap];
  lastHeartbeat: Date;
  id: number;
  concurrency: number;
  tags: string[];
  submissions: number[];
}

/**
 * Data source for the GradersTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class GradersTableDataSource extends DataSource<GradersTableItem> {
  data$: Observable<GradersTableItem[]>;

  data: GradersTableItem[] = [];

  search$: Observable<string>;

  search = '';

  paginator: MatPaginator | undefined;

  sort: MatSort | undefined;

  constructor(data$: Observable<GetAllGradersResponse.Grader[]>, search$: Observable<string>) {
    super();
    this.search$ = search$.pipe(
      tap((value) => {
        this.search = value;
      }),
    );
    this.data$ = data$.pipe(
      map((graders) => {
        return graders.map((grader): GradersTableItem => {
          const metadata = grader.getMetadata();
          const info = metadata!.getInfo();
          return {
            id: grader.getGraderId(),
            ip: metadata!.getIp(),
            name: info!.getHostname(),
            status: metadata!.getStatus(),
            lastHeartbeat: metadata!.getLastHeartbeat()!.toDate(),
            tags: info!.getTagsList(),
            concurrency: info!.getConcurrency(),
            submissions: grader.getSubmissionsList(),
          };
        });
      }),
      tap((graders) => {
        this.data = graders;
      }),
    );
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<GradersTableItem[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(this.data$, this.paginator.page, this.sort.sortChange, this.search$).pipe(
        map(() => {
          return this.getPagedData(this.getSortedData([...this.data]));
        }),
      );
    }
    throw Error('Please set the paginator and sort on the data source before connecting.');
  }

  filterData(data: GradersTableItem[]): GradersTableItem[] {
    if (!this.search) return data;
    return data.filter((item) => {
      return (
        item.tags.includes(this.search) ||
        item.ip.includes(this.search) ||
        item.name.includes(this.search)
      );
    });
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
  private getPagedData(data: GradersTableItem[]): GradersTableItem[] {
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
  private getSortedData(data: GradersTableItem[]): GradersTableItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'name':
          return compare(a.name, b.name, isAsc);
        case 'id':
          return compare(+a.id, +b.id, isAsc);
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
