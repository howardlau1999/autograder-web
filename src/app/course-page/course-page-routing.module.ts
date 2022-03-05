import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssignmentsComponent } from './assignments/assignments.component';
import { MembersComponent } from './members/members.component';
import { CoursePageComponent } from './course-page.component';

const routes: Routes = [
  {
    path: '',
    component: CoursePageComponent,
    children: [
      {
        path: 'assignments',
        component: AssignmentsComponent,
      },
      {
        path: 'members',
        component: MembersComponent,
      },
      {
        path: '',
        redirectTo: 'assignments',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursePageRoutingModule {}
