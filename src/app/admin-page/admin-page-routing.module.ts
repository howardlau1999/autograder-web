import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPageComponent } from './admin-page.component';
import { GradersComponent } from './graders/graders.component';
import { UsersComponent } from './users/users.component';
import { CoursesComponent } from './courses/courses.component';

const routes: Routes = [
  {
    path: '',
    component: AdminPageComponent,
    children: [
      { path: 'graders', component: GradersComponent },
      { path: 'users', component: UsersComponent },
      { path: 'courses', component: CoursesComponent },
      { path: '', redirectTo: 'graders', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPageRoutingModule {}
