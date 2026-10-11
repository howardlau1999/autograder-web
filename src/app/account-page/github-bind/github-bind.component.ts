import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { mergeMap, switchMap, tap } from 'rxjs/operators';
import { catchError, from, throwError } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../service/notification.service';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-github-bind',
  templateUrl: './github-bind.component.html',
  styleUrls: ['./github-bind.component.css'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
})
export class GithubBindComponent implements OnInit {
  bindResult$ = this.route.queryParams.pipe(
    switchMap((params) => {
      if (!this.userService.verifyGithubState(UserService.GITHUB_BIND_STATE_KEY, params['state'])) {
        return throwError(() => ({ message: 'STATE_MISMATCH' }));
      }
      return this.userService.bindGithub(params['code']);
    }),
    tap((resp) =>
      this.notificationService.showSnackBar(resp.getSuccess() ? `绑定成功` : `绑定失败，请重试`),
    ),
    mergeMap(() => from(this.router.navigate(['/', 'account']))),
    catchError(({ message }) => {
      let error = message;
      switch (message) {
        case 'STATE_MISMATCH':
          error = 'GitHub 回调校验失败，请重新发起绑定';
          break;
        case 'ALREADY_IN_USE':
          error = '该 GitHub 账户已绑定其他用户，请先解绑';
          break;
        case 'INVALID_CODE':
          error = 'GitHub 验证过期，请重试';
          break;
        case 'GET_GITHUB_USER':
          error = '获取 GitHub 用户信息失败';
          break;
        default:
          error = `未知错误 ${error}`;
          break;
      }
      this.notificationService.showSnackBar(`绑定出错 ${error}`);
      return from(this.router.navigate(['/', 'account']));
    }),
  );

  constructor(
    private notificationService: NotificationService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {}
}
