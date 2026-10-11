import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
})
export class CourseFormComponent implements OnInit {
  @Input() courseForm = new UntypedFormGroup({
    name: new UntypedFormControl('', [Validators.required]),
    shortName: new UntypedFormControl('', [Validators.required]),
    description: new UntypedFormControl('', [Validators.required]),
  });

  ngOnInit(): void {}
}
