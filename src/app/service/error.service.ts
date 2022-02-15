import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { grpc } from '@improbable-eng/grpc-web';
import { toLowerCase } from 'fp-ts/string';
import { of } from 'rxjs';
import { left } from 'fp-ts/Either';
import { Router } from '@angular/router';
import { RPCError } from '../api/api.service';
import { NotificationService } from './notification.service';

export type FormFieldError = 'invalid' | 'duplicated';

export interface FormError {
  field: string;
  message: string;
  error: FormFieldError;
}

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  constructor(private notificationService: NotificationService, private router: Router) {}

  handleUnknownError(errorMessage: string) {
    this.notificationService.showSnackBar(`未知错误 ${errorMessage}`);
  }

  handleInvalidToken() {
    this.notificationService.showSnackBar(`登录已过期`);
    this.router.navigate(['/', 'login']).then();
  }

  getFormError(err: RPCError) {
    const { status, message } = err;
    const error: FormFieldError = status === grpc.Code.AlreadyExists ? 'duplicated' : 'invalid';
    const field = toLowerCase(message).replace(/(_[a-z])/g, (s) => s[1].toUpperCase());
    return of(
      left({
        field,
        error,
        message,
      }),
    );
  }

  handleFormError(form: FormGroup): (err: FormError) => any {
    return (err: FormError) => {
      const { field, error, message } = err;
      const control = form.get(field);
      if (control === null) {
        this.notificationService.showSnackBar(`未知错误 ${message}`);
        return;
      }
      const errors = { [error]: true };
      control.setErrors(errors);
    };
  }
}
