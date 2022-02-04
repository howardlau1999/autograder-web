import {Component, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';
import {ApiService} from "../../api/api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SubmissionReportTestcase} from "../../api/proto/model_pb";
import {switchMap} from "rxjs";

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  testcases: SubmissionReportTestcase[] | undefined = [];
  @ViewChildren("testcase", {read: ElementRef}) renderedTestcases!: QueryList<ElementRef>;

  constructor(private apiService: ApiService, private router: Router, private route: ActivatedRoute) {
    this.route.parent?.paramMap.pipe(switchMap(
      params => this.apiService.getSubmissionReport(Number.parseInt(params.get("submissionId") || "0"))))
      .subscribe(resp => {
        this.testcases = resp.getReport()?.getTestsList();
      });
  }

  ngOnInit(): void {
  }

  scrollTo(index: number) {
    this.renderedTestcases.toArray()[index].nativeElement.scrollIntoView();
  }
}
