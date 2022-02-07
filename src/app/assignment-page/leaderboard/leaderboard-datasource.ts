import {DataSource} from '@angular/cdk/collections';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {map, switchMap} from 'rxjs/operators';
import {merge, Observable, of as observableOf} from 'rxjs';
import {ApiService} from "../../api/api.service";
import {Value} from "google-protobuf/google/protobuf/struct_pb";

export interface LeaderboardItem {
  items: {[k: string]: {value: Value, desc: boolean}};
  rank: number;
  name: string;
}

/**
 * Data source for the Leaderboard view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class LeaderboardDataSource extends DataSource<LeaderboardItem> {
  data: LeaderboardItem[] = [];
  data$: Observable<LeaderboardItem[]>;
  columns$: Observable<string[]>;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor(apiService: ApiService, assignmentId$: Observable<number>) {
    super();
    this.data$ = assignmentId$.pipe(switchMap(assignmentId => {
      return apiService.getLeaderboard(assignmentId).pipe(map(resp => {
        return this.data = resp.getEntriesList().map(entry => {
          return entry.getItemsList().map(item => {
            let obj: LeaderboardItem = {items: {}, rank: 0, name: entry.getNickname()};
            obj.items[item.getName()] = {'value': item.getValue() || new Value(), 'desc': item.getOrder() === 1};
            return obj;
          }).reduce((accumulator, current) => {
            for (const k of Object.keys(current.items)) {
              accumulator.items[k] = current.items[k];
            }
            return accumulator;
          });
        });
      }));
    }));
    this.columns$ = this.data$.pipe(map(items => {
      if (items.length === 0) return [];
      return [...Object.keys(items[0].items)];
    }));
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
      return merge(this.data$, this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.data]));
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
  }

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: LeaderboardItem[]): LeaderboardItem[] {
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
  private getSortedData(data: LeaderboardItem[]): LeaderboardItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isDesc = this.sort?.direction === 'desc';
      const key = this.sort?.active;
      if (key === undefined) return 0;
      return compare(a.items[key].value, b.items[key].value, isDesc);
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: Value, b: Value, isDesc: boolean): number {
  let compare: number = 0;
  if (a.hasNumberValue() && b.hasNumberValue()) {
    compare = a.getNumberValue() < b.getNumberValue() ? -1: 1;
  }
  if (a.hasStringValue() && b.hasStringValue()) {
    compare = a.getStringValue() < b.getStringValue() ? -1: 1;
  }
  return compare * (isDesc ? -1 : 1);
}
