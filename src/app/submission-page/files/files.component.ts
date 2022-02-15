import { Component, OnDestroy, OnInit } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, Subscription, switchMap } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from '../../api/api.service';
import { DownloadFileType, DownloadFileTypeMap, FileTreeNode } from '../../api/proto/api_pb';
import { environment } from '../../../environments/environment';

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

  downloadSub: Subscription;

  path$: Subject<string | null> = new Subject<string | null>();

  selectedPath: string | null = null;

  fileType?: DownloadFileTypeMap[keyof DownloadFileTypeMap];

  fileURL: string = '';

  filesize?: number = 0;

  language: string = '';

  DownloadFileType = DownloadFileType;

  submissionId: number = 0;

  serverHost = environment.serverHost;

  constructor(private apiService: ApiService, private route: ActivatedRoute) {
    this.treeFlattener = new MatTreeFlattener(
      this.transformer,
      this.getLevel,
      this.isExpandable,
      this.getChildren,
    );

    this.treeControl = new FlatTreeControl(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
    this.filesSub = this.route.parent?.paramMap
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
      )
      .subscribe((nodes) => {
        this.dataSource.data = nodes;
      });
    this.downloadSub = this.path$
      .pipe(
        switchMap((path) => {
          if (path === null) {
            return of(null);
          }
          this.selectedPath = path;
          return this.apiService.initDownload(this.submissionId, path);
        }),
      )
      .subscribe((resp) => {
        if (resp == null) {
          this.fileType = undefined;
          this.filesize = undefined;
          return;
        }
        const url = `${
          this.serverHost
        }/AutograderService/FileDownload/${resp.getFilename()}?token=${encodeURIComponent(
          resp.getToken(),
        )}`;
        this.language = resp.getFilename().split('.').pop() || '';
        this.fileURL = url.toString();
        this.fileType = resp.getFileType();
        this.filesize = resp.getFilesize();
      });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.filesSub?.unsubscribe();
    this.downloadSub.unsubscribe();
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
