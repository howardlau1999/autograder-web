import {Component} from '@angular/core';
import {map} from 'rxjs/operators';
import {Breakpoints, BreakpointObserver} from '@angular/cdk/layout';
import {ApiService} from "../api/api.service";

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent {
  cards = this.apiService.getCourseList(1).pipe(map((response) => {
    return response.getCoursesList();
  }));

  constructor(private apiService: ApiService) {
  }
}
