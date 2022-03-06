import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubmissionPageComponent } from './submission-page.component';
import { ReportComponent } from './report-view-page/report/report.component';

const routes: Routes = [
  {
    path: '',
    component: SubmissionPageComponent,
    children: [
      {
        path: 'report',
        loadChildren: () =>
          import('./report-view-page/report-view-page.module').then((m) => m.ReportViewPageModule),
      },
      {
        path: 'files',
        loadChildren: () =>
          import('./files-preview-page/files-preview-page.module').then(
            (m) => m.FilesPreviewPageModule,
          ),
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
