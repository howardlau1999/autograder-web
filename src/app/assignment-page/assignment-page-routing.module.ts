import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubmissionsComponent } from './submissions/submissions.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { InspectionComponent } from './inspection/inspection.component';
import { AssignmentPageComponent } from './assignment-page.component';

const routes: Routes = [
  {
    path: '',
    component: AssignmentPageComponent,
    children: [
      {
        path: 'submissions',
        component: SubmissionsComponent,
      },
      {
        path: 'leaderboard',
        component: LeaderboardComponent,
      },
      {
        path: 'inspection',
        component: InspectionComponent,
      },
      {
        path: 'inspection/:userId',
        component: InspectionComponent,
      },
      {
        path: '',
        redirectTo: 'submissions',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssignmentPageRoutingModule {}
