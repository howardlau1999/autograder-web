import { Component, OnDestroy, OnInit } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, catchError, Observable, of, Subscription, switchMap, take } from 'rxjs';
import { map } from 'rxjs/operators';
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

  filesSub: Subscription | undefined;

  initDownloadSub?: Subscription;

  path$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  downloadPath$: Observable<string[]>;

  fileType?: DownloadFileTypeMap[keyof DownloadFileTypeMap];

  initDownload$: Observable<InitDownloadResponse | null>;

  language: string = '';

  DownloadFileType = DownloadFileType;

  submissionId: number = 0;

  serverHost = environment.serverHost;

  constructor(
    private apiService: ApiService,
    private submissionService: SubmissionService,
    private route: ActivatedRoute,
    private notificationService: NotificationService,
  ) {
    this.treeFlattener = new MatTreeFlattener(
      this.transformer,
      this.getLevel,
      this.isExpandable,
      this.getChildren,
    );

    this.treeControl = new FlatTreeControl(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
    this.filesSub = this.route.parent?.parent?.paramMap
      .pipe(
        switchMap((params) => {
          const submissionId = Number.parseInt(params.get('submissionId') || '0', 10);
          this.submissionId = submissionId;
          this.path$.next(null);
          return this.apiService.getFilesInSubmission(submissionId);
        }),
        map((resp) => {
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
  }

  getDownloadURL(filename: string, token: string) {
    return this.submissionService.getDownloadURL(filename, token);
  }

  onDownloadClicked() {
    this.initDownloadSub?.unsubscribe();
    this.initDownloadSub = this.downloadPath$.pipe(take(1)).subscribe(([url, filename]) => {
      downloadURL(url, filename);
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.filesSub?.unsubscribe();
    this.initDownloadSub?.unsubscribe();
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
    this.path$.next(node.path);
  }
}
