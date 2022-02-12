import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { merge, Observable } from 'rxjs';
import { UploadEntry } from './upload-dialog.component';

// TODO: Replace this with your own data model type
export type FilesTableItem = UploadEntry;

/**
 * Data source for the FilesTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class FilesTableDataSource extends DataSource<FilesTableItem> {
  data$: Observable<FilesTableItem[]>;

  data: FilesTableItem[] = [];

  paginator: MatPaginator | undefined;

  sort: MatSort | undefined;

  constructor(observable: Observable<{ [filename: string]: UploadEntry }>) {
    super();
    this.data$ = observable.pipe(
      map((entries) => {
        const items: FilesTableItem[] = [];
        for (const fn in entries) {
          const entry = entries[fn];
          items.push(entry);
        }
        return (this.data = items);
      }),
    );
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<FilesTableItem[]> {
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
  private getPagedData(data: FilesTableItem[]): FilesTableItem[] {
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
  private getSortedData(data: FilesTableItem[]): FilesTableItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'filename':
          return compare(a.filename, b.filename, isAsc);
        case 'progress':
          return compare(a.uploadProgress, b.uploadProgress, isAsc);
        case 'filesize':
          return compare(a.filesize, b.filesize, isAsc);
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
