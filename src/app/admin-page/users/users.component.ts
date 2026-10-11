import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
})
export class UsersComponent implements OnInit {
  ngOnInit(): void {}
}
