import { Component, OnDestroy, OnInit } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, catchError, Observable, of, Subscription, switchMap, tap } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../../api/api.service';
import {
  DownloadFileType,
  DownloadFileTypeMap,
  FileTreeNode,
  InitDownloadResponse,
} from '../../../api/proto/api_pb';
import { environment } from '../../../../environments/environment';
import { SubmissionService } from '../../../service/submission.service';
import { NotificationService } from '../../../service/notification.service';
import { downloadURL } from '../../../common/downloader/url.downloader';

/** File node data with possible child nodes. */
export type FileNode = FileTreeNode;

/**
 * Flattened tree node that has been created from a FileNode through the flattener. Flattened
 * nodes include level index and whether they can be expanded or not.
 */
export interface FlatTreeNode {
  name: string;
  type: string;
  level: number;
  expandable: boolean;
  path: string;
}

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css'],
})
export class FilesComponent implements OnInit, OnDestroy {
  treeControl: FlatTreeControl<FlatTreeNode>;

  treeFlattener: MatTreeFlattener<FileNode, FlatTreeNode>;

  dataSource: MatTreeFlatDataSource<FileNode, FlatTreeNode>;

  filesSubscription: Subscription | undefined;

  initDownloadSubscription?: Subscription;

  path$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  downloadPath$: Observable<string[]>;

  fileType?: DownloadFileTypeMap[keyof DownloadFileTypeMap];

  initDownload$: Observable<InitDownloadResponse | null>;

  language: string = '';

  DownloadFileType = DownloadFileType;

  submissionId: number = 0;

  serverHost = environment.serverHost;

  filesLoading: boolean = true;

  initDownloading: boolean = false;

  fileContentLoading: boolean = false;

  urlAvailable: boolean = true;

  fileContent$: Observable<string>;

  constructor(
    private apiService: ApiService,
    private submissionService: SubmissionService,
    private route: ActivatedRoute,
    private notificationService: NotificationService,
    private http: HttpClient,
  ) {
    this.treeFlattener = new MatTreeFlattener(
      this.transformer,
      this.getLevel,
      this.isExpandable,
      this.getChildren,
    );

    this.treeControl = new FlatTreeControl(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
    this.filesSubscription = this.route.parent?.parent?.paramMap
      .pipe(
        switchMap((params) => {
          const submissionId = Number.parseInt(params.get('submissionId') || '0', 10);
          this.submissionId = submissionId;
          this.path$.next(null);
          return this.apiService.getFilesInSubmission(submissionId);
        }),
        map((resp) => {
          this.filesLoading = false;
          return resp.getRootsList() || [];
        }),
        catchError(({ message }) => {
          this.notificationService.showSnackBar(`无法获取文件列表 ${message}`);
          return of([]);
        }),
      )
      .subscribe((nodes) => {
        this.dataSource.data = nodes;
      });
    this.initDownload$ = this.path$.pipe(
      switchMap((path) => {
        if (path === null) {
          return of(null);
        }
        return this.apiService.initDownload(this.submissionId, path);
      }),
      tap(() => {
        this.urlAvailable = true;
      }),
      catchError(({ message }) => {
        this.notificationService.showSnackBar(`无法下载 ${message}`);
        return of(null);
      }),
    );
    this.downloadPath$ = this.initDownload$.pipe(
      map((resp) => {
        if (resp === null) return ['', ''];
        return [
          this.submissionService.getDownloadURL(resp.getFilename(), resp.getToken()),
          resp.getFilename(),
        ];
      }),
    );
    this.fileContent$ = this.downloadPath$.pipe(
      switchMap(([url, filename]) => {
        return url
          ? this.http.get(url, { responseType: 'text' }).pipe(
              tap(() => {
                this.fileContentLoading = false;
              }),
              map((data) => {
                const parts = filename.split('.');
                const ext = parts.length ? parts[parts.length - 1] : '';
                if (ext !== 'md') {
                  return `\`\`\`${ext}\n${data}\n\`\`\``;
                }
                return data;
              }),
            )
          : of('');
      }),
    );
  }

  getDownloadURL(filename: string, token: string) {
    return this.submissionService.getDownloadURL(filename, token);
  }

  onDownloadClicked() {
    this.initDownloadSubscription?.unsubscribe();
    this.initDownloading = true;
    this.initDownloadSubscription = this.downloadPath$.subscribe(([url, filename]) => {
      this.initDownloading = false;
      if (!url || !filename) return;
      downloadURL(url, filename);
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.filesSubscription?.unsubscribe();
    this.initDownloadSubscription?.unsubscribe();
  }

  /** Transform the data to something the tree can read. */
  transformer(node: FileNode, level: number): FlatTreeNode {
    return {
      name: node.getName(),
      type: node.getNodeType() === FileTreeNode.Type.FILE ? 'file' : 'folder',
      level,
      expandable: node.getNodeType() === FileTreeNode.Type.FOLDER,
      path: node.getPath(),
    };
  }

  /** Get the level of the node */
  getLevel(node: FlatTreeNode): number {
    return node.level;
  }

  /** Get whether the node is expanded or not. */
  isExpandable(node: FlatTreeNode): boolean {
    return node.expandable;
  }

  /** Get whether the node has children or not. */
  hasChild(index: number, node: FlatTreeNode): boolean {
    return node.expandable;
  }

  /** Get the children for the node. */
  getChildren(node: FileNode): FileNode[] | null | undefined {
    return node.getChildrenList();
  }

  treeNodeClicked(node: FlatTreeNode) {
    this.urlAvailable = false;
    this.path$.next(node.path);
  }
}
