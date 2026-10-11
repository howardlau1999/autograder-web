import { FormControl, FormGroup, Validators } from '@angular/forms';

export interface CourseFormValue {
  name: string;
  shortName: string;
  description: string;
}

export type CourseForm = FormGroup<{
  [K in keyof CourseFormValue]: FormControl<string>;
}>;

export function createCourseForm(
  initial: CourseFormValue = { name: '', shortName: '', description: '' },
): CourseForm {
  const required = (value: string) =>
    new FormControl(value, { nonNullable: true, validators: [Validators.required] });
  return new FormGroup({
    name: required(initial.name),
    shortName: required(initial.shortName),
    description: required(initial.description),
  });
}
