import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, Subscription, tap } from 'rxjs';
import { repeatWhen } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../service/user.service';
import { NotificationService } from '../service/notification.service';
import {
  ConfirmDialogComponent,
  ConfirmDialogModel,
} from '../common/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.css'],
})
export class AccountPageComponent implements OnInit, OnDestroy {
  basicInfoForm = new FormGroup({
    username: new FormControl({ disabled: true, value: '' }),
    email: new FormControl({ disabled: true, value: '' }),
    studentId: new FormControl({ disabled: false, value: '' }),
    nickname: new FormControl({ disabled: false, value: '' }),
  });

  editPasswordForm = new FormGroup({
    oldPassword: new FormControl(''),
    newPassword: new FormControl('', [Validators.minLength(8)]),
  });

  userSubscription?: Subscription;

  unbindSubscription?: Subscription;

  updateSubscription?: Subscription;

  passwordSubscription?: Subscription;

  infoSaving: boolean = false;

  infoLoading: boolean = true;

  passwordSaving: boolean = false;

  githubBindURL = this.userService.githubBindURL;

  githubLogin?: string;

  infoRefresher$ = new Subject<null>();

  dialogSubscription?: Subscription;

  unbinding: boolean = false;

  constructor(
    private userService: UserService,
    private notificationService: NotificationService,
    private dialog: MatDialog,
  ) {
    this.userSubscription = this.userService
      .getUser()
      .pipe(
        repeatWhen(() =>
          this.infoRefresher$.pipe(
            tap(() => {
              this.infoLoading = true;
              this.githubLogin = undefined;
            }),
          ),
        ),
      )
      .subscribe((user) => {
        this.infoLoading = false;
        if (user?.getGithubId().length) {
          this.githubLogin = user?.getGithubId();
        }
        this.basicInfoForm.setValue({
          username: user?.getUsername(),
          email: user?.getEmail(),
          nickname: user?.getNickname(),
          studentId: user?.getStudentId(),
        });
      });
  }

  onUnbindClicked(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: new ConfirmDialogModel(
        '?????? GitHub ??????',
        `??????????????? GitHub ?????? ${this.githubLogin} ??????`,
        false,
      ),
    });
    if (this.dialogSubscription === undefined) {
      this.dialogSubscription = dialogRef.afterClosed().subscribe((confirmed) => {
        this.dialogSubscription?.unsubscribe();
        this.dialogSubscription = undefined;
        if (!confirmed) {
          return;
        }
        this.unbinding = true;
        this.unbindSubscription = this.userService.unbindGithub().subscribe((success) => {
          this.unbinding = false;
          this.notificationService.showSnackBar(success ? '????????????' : '????????????');
          this.infoRefresher$.next(null);
        });
      });
    }
  }

  onSaveClicked(): void {
    this.infoSaving = true;
    const { nickname, studentId } = this.basicInfoForm.value;
    this.updateSubscription?.unsubscribe();
    this.updateSubscription = this.userService.updateUserInfo(nickname, studentId).subscribe({
      next: (success) => {
        this.infoSaving = false;
        this.notificationService.showSnackBar(success ? '????????????' : '????????????');
      },
      error: ({ message }) => {
        this.infoSaving = false;
        this.notificationService.showSnackBar(`???????????? ${message}`);
      },
    });
  }

  onChangePasswordClicked(): void {
    this.passwordSaving = true;
    this.passwordSubscription?.unsubscribe();
    const { oldPassword, newPassword } = this.editPasswordForm.value;
    this.passwordSubscription = this.userService
      .updatePassword(oldPassword, newPassword)
      .subscribe({
        next: (success) => {
          this.passwordSaving = false;
          if (!success) {
            this.editPasswordForm.get('oldPassword')?.setValue('');
            this.notificationService.showSnackBar('??????????????????');
            return;
          }
          this.editPasswordForm.reset();
          this.notificationService.showSnackBar('??????????????????');
        },
        error: ({ message }) => {
          this.passwordSaving = false;
          this.notificationService.showSnackBar(`???????????? ${message}`);
        },
      });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
    this.passwordSubscription?.unsubscribe();
    this.updateSubscription?.unsubscribe();
    this.unbindSubscription?.unsubscribe();
    this.dialogSubscription?.unsubscribe();
  }
}
