import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InspectionComponent } from './inspection/inspection.component';

const routes: Routes = [
  {
    path: ':userId',
    component: InspectionComponent,
  },
  {
    path: '',
    component: InspectionComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InspectionPageRoutingModule {}
