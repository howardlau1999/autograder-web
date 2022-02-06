import {Component, OnInit} from '@angular/core';
import {Observable, of, switchMap} from "rxjs";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-assignment-page',
  templateUrl: './assignment-page.component.html',
  styleUrls: ['./assignment-page.component.css'],

})
export class AssignmentPageComponent implements OnInit {
  assignmentId$: Observable<number>;

  constructor(private route: ActivatedRoute) {
    this.assignmentId$ = this.route.paramMap.pipe(
      switchMap(params => of(Number.parseInt(params.get('assignmentId') || '0')),
      ));
  }

  ngOnInit(): void {
  }


}
