import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup } from '@angular/forms';

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
  constructor(private snackBar: MatSnackBar) {}

  handleUnknownError(errorMessage: string) {
    this.snackBar.open(`未知错误 ${errorMessage}`, '关闭', { duration: 3000 });
  }

  handleFormError(form: FormGroup): (err: FormError) => any {
    return (err: FormError) => {
      const { field, error, message } = err;
      const control = form.get(field);
      if (control === null) {
        this.snackBar.open(`未知错误 ${message}`, '关闭', { duration: 3000 });
        return;
      }
      const errors = { [error]: true };
      control.setErrors(errors);
    };
  }
}
