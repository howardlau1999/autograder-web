import {Component} from '@angular/core';

interface TabLink {
  path: string;
  title: string;
}

@Component({
  selector: 'app-submission-page',
  templateUrl: './submission-page.component.html',
  styleUrls: ['./submission-page.component.css']
})
export class SubmissionPageComponent {
  links: TabLink[] = [{
    path: 'report',
    title: '测试报告',
  }, {
    path: 'leaderboard',
    title: '排行榜'
  }, {
    path: 'files',
    title: '提交文件'
  }];

  constructor() {
  }


}
