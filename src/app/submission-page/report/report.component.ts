import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, mergeMap, Observable, of, switchMap } from 'rxjs';
import { map } from 'rxjs/operators';
import { SubmissionReport } from '../../api/proto/model_pb';
import { ApiService } from '../../api/api.service';
import { GetSubmissionReportResponse } from '../../api/proto/api_pb';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
})
export class ReportComponent implements OnInit {
  report$: Observable<SubmissionReport | undefined> | undefined;

  error: string | null = null;

  @ViewChildren('testcase', { read: ElementRef }) renderedTestcases!: QueryList<ElementRef>;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.report$ = this.route.parent?.paramMap.pipe(
      switchMap((params) => {
        const submissionId = Number.parseInt(params.get('submissionId') || '0');
        return this.apiService.getSubmissionReport(submissionId).pipe(
          catchError((err) => {
            this.error = err;
            if (err === 'RUNNING') {
              return this.apiService.subscribeSubmission(submissionId).pipe(
                mergeMap((_) => {
                  this.error = null;
                  return this.apiService.getSubmissionReport(submissionId);
                }),
              );
            }
            return of(new GetSubmissionReportResponse());
          }),
          map((resp) => {
            return resp?.getReport();
          }),
        );
      }),
    );
  }

  ngOnInit(): void {}

  scrollTo(index: number) {
    this.renderedTestcases.toArray()[index].nativeElement.scrollIntoView();
  }
}
