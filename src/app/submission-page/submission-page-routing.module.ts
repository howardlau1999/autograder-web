import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubmissionPageComponent } from './submission-page.component';
import { ReportComponent } from './report/report.component';
import { LeaderboardComponent } from '../assignment-page/leaderboard/leaderboard.component';
import { FilesComponent } from './files/files.component';

const routes: Routes = [
  {
    path: '',
    component: SubmissionPageComponent,
    children: [
      {
        path: 'report',
        component: ReportComponent,
      },
      {
        path: 'files',
        component: FilesComponent,
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'report',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubmissionPageRoutingModule {}
