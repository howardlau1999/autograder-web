import { Component } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

interface TabLink {
  path: string;
  title: string;
}

@Component({
  selector: 'app-submission-page',
  templateUrl: './submission-page.component.html',
  styleUrls: ['./submission-page.component.css'],
})
export class SubmissionPageComponent {
  links: TabLink[] = [
    {
      path: 'report',
      title: '测试报告',
    },
    {
      path: 'leaderboard',
      title: '排行榜',
    },
    {
      path: 'files',
      title: '提交文件',
    },
  ];

  submissionId$: Observable<number>;

  constructor(private route: ActivatedRoute) {
    this.submissionId$ = this.route.paramMap.pipe(
      switchMap((params) => of(Number.parseInt(params.get('submissionId') || '0'))),
    );
  }
}
