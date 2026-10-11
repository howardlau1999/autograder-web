import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CourseForm, createCourseForm } from './course-form';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
})
export class CourseFormComponent implements OnInit {
  @Input() courseForm: CourseForm = createCourseForm();

  ngOnInit(): void {}
}
