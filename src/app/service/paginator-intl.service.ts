import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { Subject } from 'rxjs';

@Injectable()
export class PaginatorIntl implements MatPaginatorIntl {
  changes = new Subject<void>();

  firstPageLabel = $localize`首页`;

  itemsPerPageLabel = $localize`每页个数`;

  lastPageLabel = $localize`尾页`;

  nextPageLabel = $localize`下一页`;

  previousPageLabel = $localize`上一页`;

  getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0) {
      return $localize`第 1/1 页`;
    }
    const amountPages = Math.ceil(length / pageSize);
    return $localize`第 ${page + 1}/${amountPages} 页`;
  }
}
