import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { DateTime } from 'luxon';

export interface ProgrammingAssignmentFormValue {
  name: string;
  releaseDate: DateTime;
  dueDate: DateTime;
  dockerImage: string;
  cpu: number;
  /** MiB */
  memory: number;
  /** KiB */
  uploadLimit: number;
  /** seconds */
  timeout: number;
  description: string;
}

export type ProgrammingAssignmentForm = FormGroup<{
  [K in keyof ProgrammingAssignmentFormValue]: FormControl<ProgrammingAssignmentFormValue[K]>;
}>;

export interface SubmissionLimitFormValue {
  total: number;
  frequency: number;
  period: number;
}

export type SubmissionLimitForm = FormGroup<{
  [K in keyof SubmissionLimitFormValue]: FormControl<number>;
}>;

export const AssignmentDateValidator: ValidatorFn = (
  group: AbstractControl,
): ValidationErrors | null => {
  const releaseDateControl = group.get('releaseDate');
  const dueDateControl = group.get('dueDate');
  const releaseDate: DateTime = releaseDateControl?.value || DateTime.now();
  const dueDate: DateTime = dueDateControl?.value || DateTime.now();
  if (dueDate.toJSDate() < releaseDate.toJSDate()) {
    dueDateControl?.setErrors({ before: true });
    return { dueDate: true };
  }
  return null;
};

export function defaultProgrammingAssignmentFormValue(): ProgrammingAssignmentFormValue {
  return {
    name: '',
    releaseDate: DateTime.now(),
    dueDate: DateTime.now().plus({ days: 7 }),
    dockerImage: '',
    cpu: 1,
    memory: 4096,
    uploadLimit: 128,
    timeout: 600,
    description: '',
  };
}

export function createProgrammingAssignmentForm(
  initial: ProgrammingAssignmentFormValue = defaultProgrammingAssignmentFormValue(),
): ProgrammingAssignmentForm {
  const control = <T>(value: T, validators: ValidatorFn[] = []) =>
    new FormControl(value, { nonNullable: true, validators });
  return new FormGroup(
    {
      name: control(initial.name, [Validators.required]),
      releaseDate: control(initial.releaseDate),
      dueDate: control(initial.dueDate),
      dockerImage: control(initial.dockerImage, [Validators.required]),
      cpu: control(initial.cpu, [Validators.required, Validators.min(0.5), Validators.max(64)]),
      memory: control(initial.memory, [
        Validators.required,
        Validators.min(128),
        Validators.max(65536),
      ]),
      uploadLimit: control(initial.uploadLimit, [
        Validators.required,
        Validators.min(1),
        Validators.max(8192),
      ]),
      timeout: control(initial.timeout, [
        Validators.required,
        Validators.min(1),
        Validators.max(18000),
      ]),
      description: control(initial.description, [Validators.required]),
    },
    { validators: [AssignmentDateValidator] },
  );
}

export function createSubmissionLimitForm(
  initial: SubmissionLimitFormValue = { total: 0, frequency: 1, period: 1 },
): SubmissionLimitForm {
  return new FormGroup({
    total: new FormControl(initial.total, { nonNullable: true }),
    frequency: new FormControl(initial.frequency, { nonNullable: true }),
    period: new FormControl(initial.period, { nonNullable: true }),
  });
}
