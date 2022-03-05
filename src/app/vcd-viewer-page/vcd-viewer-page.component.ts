import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-vcd-viewer-page',
  templateUrl: './vcd-viewer-page.component.html',
  styleUrls: ['./vcd-viewer-page.component.css'],
})
export class VcdViewerPageComponent implements OnInit {
  url$: Observable<string>;

  total$: Observable<number>;

  constructor(private route: ActivatedRoute) {
    this.url$ = this.route.queryParams.pipe(
      map((params) => {
        return params['url'];
      }),
    );
    this.total$ = this.route.queryParams.pipe(
      map((params) => {
        return Number.parseInt(params['total'] || '0', 10);
      }),
    );
  }

  ngOnInit(): void {}
}
