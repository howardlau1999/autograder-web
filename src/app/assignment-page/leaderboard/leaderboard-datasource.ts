import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map, switchMap } from 'rxjs/operators';
import { BehaviorSubject, merge, Observable } from 'rxjs';
import { Value } from 'google-protobuf/google/protobuf/struct_pb';
import { ApiService } from '../../api/api.service';

export interface LeaderboardItem {
  items: { [k: string]: { value: Value; desc: boolean; order: number } };
  rank: number;
  submissionId: number;
  submittedAt: Date;
  name: string;
  isSelf: boolean;
}

/**
 * Data source for the Leaderboard view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class LeaderboardDataSource extends DataSource<LeaderboardItem> {
  data: LeaderboardItem[] = [];

  data$: Observable<LeaderboardItem[]>;

  columns$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  paginator: MatPaginator | undefined;

  sort: MatSort | undefined;

  constructor(apiService: ApiService, assignmentId$: Observable<number>, userId: number) {
    super();
    this.data$ = assignmentId$.pipe(
      switchMap((assignmentId) => {
        return apiService.getLeaderboard(assignmentId).pipe(
          map((resp) => {
            const sortItems: {
              [k: string]: { isDesc: boolean; order: number };
            } = {};
            this.data = (resp?.getEntriesList() || []).map((entry) => {
              return entry
                .getItemsList()
                .map((item) => {
                  const obj: LeaderboardItem = {
                    items: {},
                    rank: 0,
                    name: entry.getNickname(),
                    isSelf: entry.getUserId() === userId,
                    submittedAt: entry.getSubmittedAt()?.toDate() || new Date(),
                    submissionId: entry.getSubmissionId(),
                  };
                  sortItems[item.getName()] = { isDesc: item.getIsDesc(), order: item.getOrder() };
                  obj.items[item.getName()] = {
                    value: item.getValue() || new Value(),
                    desc: item.getIsDesc(),
                    order: item.getOrder(),
                  };
                  return obj;
                })
                .reduce((accumulator, current) => {
                  Object.keys(current.items).forEach((k) => {
                    accumulator.items[k] = current.items[k];
                  });
                  return accumulator;
                });
            });
            if (this.data.length > 0) {
              const keys = Object.keys(sortItems).sort((a, b) => {
                const aOrder = sortItems[a].order;
                const bOrder = sortItems[b].order;
                if (aOrder > bOrder) return 1;
                if (aOrder < bOrder) return -1;
                return 0;
              });
              this.data = this.data
                .sort((a, b) => {
                  for (let i = 0; i < keys.length; i += 1) {
                    const key = keys[i];
                    const isDesc = a.items[key].desc ? -1 : 1;
                    if (a.items[key].value > b.items[key].value) return 1 * isDesc;
                    if (a.items[key].value < b.items[key].value) return -1 * isDesc;
                  }
                  if (a.submittedAt > b.submittedAt) return 1;
                  if (a.submittedAt < b.submittedAt) return -1;
                  return 0;
                })
                .map((item, index) => {
                  const rankedItem = item;
                  rankedItem.rank = index + 1;
                  return rankedItem;
                });
            }
            this.columns$.next(Object.keys(sortItems));
            return this.data;
          }),
        );
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
