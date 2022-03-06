import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssignmentPageComponent } from './assignment-page.component';

const routes: Routes = [
  {
    path: '',
    component: AssignmentPageComponent,
    children: [
      {
        path: 'submissions',
        loadChildren: () =>
          import('./submissions-page/submissions-page.module').then((m) => m.SubmissionsPageModule),
      },
      {
        path: 'leaderboard',
        loadChildren: () =>
          import('./leaderboard-page/leaderboard-page.module').then((m) => m.LeaderboardPageModule),
      },
      {
        path: 'inspection',
        loadChildren: () =>
          import('./inspection-page/inspection-page.module').then((m) => m.InspectionPageModule),
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
