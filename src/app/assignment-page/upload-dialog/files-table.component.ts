import {AfterViewInit, Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTable} from '@angular/material/table';
import {FilesTableDataSource, FilesTableItem} from './files-table-datasource';
import {Observable, of} from "rxjs";
import {UploadEntry} from "./upload-dialog.component";

@Component({
  selector: 'app-files-table',
  templateUrl: './files-table.component.html',
  styleUrls: ['./files-table.component.css']
})
export class FilesTableComponent implements AfterViewInit {
  @Input() paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<FilesTableItem>;
  @Input() uploadEntries!: Observable<{ [filename: string]: UploadEntry; }>;
  @Output() fileDelete: EventEmitter<string> = new EventEmitter<string>();
  dataSource: FilesTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['filename', 'filesize', 'progress', 'operations'];

  constructor() {
    this.dataSource = new FilesTableDataSource(of({}));
  }

  onDeleteClicked(filename: string) {
    this.fileDelete.emit(filename);
  }

  ngAfterViewInit(): void {
    this.dataSource = new FilesTableDataSource(this.uploadEntries);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
