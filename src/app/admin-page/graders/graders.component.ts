import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-graders',
  templateUrl: './graders.component.html',
  styleUrls: ['./graders.component.css'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
})
export class GradersComponent implements OnInit {
  ngOnInit(): void {}
}
