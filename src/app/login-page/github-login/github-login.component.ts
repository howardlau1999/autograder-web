import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { mergeMap, switchMap, tap } from 'rxjs/operators';
import { catchError, from } from 'rxjs';
import { UserService } from '../../service/user.service';
import { NotificationService } from '../../service/notification.service';

@Component({
  selector: 'app-github-login',
  templateUrl: './github-login.component.html',
  styleUrls: ['./github-login.component.css'],
})
export class GithubLoginComponent implements OnInit {
  login$ = this.route.queryParams.pipe(
    switchMap((params) => this.userService.githubLogin(params['code'])),
    tap(() => this.notificationService.showSnackBar(`欢迎回来，${this.userService.username}`)),
    mergeMap(() => from(this.router.navigate(['/', 'courses']))),
    catchError(({ message }) => {
      let error = message;
      switch (message) {
        case 'EMAIL_DIFFERENT':
          error = 'GitHub 邮箱对应的用户已绑定其他 GitHub ID';
          break;
        case 'USERNAME_DIFFERENT':
          error = 'GitHub 用户名对应的用户已绑定其他 GitHub ID';
          break;
        case 'EMAIL':
          error = 'GitHub 邮箱无效或已被注册';
          break;
        case 'USERNAME':
          error = 'GitHub 用户名无效或已被注册';
          break;
        case 'GET_GITHUB_EMAILS':
          error = '无法获取 GitHub 邮箱';
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
      this.notificationService.showSnackBar(`登录出错 ${error}`);
      return from(this.router.navigate(['/login']));
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
