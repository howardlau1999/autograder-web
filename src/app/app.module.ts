import {Injectable, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoginPageComponent} from './login-page/login-page.component';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {AssignmentPageComponent} from './assignment-page/assignment-page.component';
import {MatTableModule} from '@angular/material/table';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatBadgeModule} from '@angular/material/badge';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatPaginatorIntl, MatPaginatorModule} from "@angular/material/paginator";
import {DashboardPageComponent} from './dashboard-page/dashboard-page.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatMenuModule} from '@angular/material/menu';
import {LayoutModule} from '@angular/cdk/layout';
import {CoursePageComponent} from './course-page/course-page.component';
import {MatSortModule} from '@angular/material/sort';
import {SubmissionPageComponent} from './submission-page/submission-page.component';
import {MatTreeModule} from '@angular/material/tree';
import {UploadDialogComponent} from './assignment-page/upload-dialog/upload-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {FilesTableComponent} from './assignment-page/upload-dialog/files-table.component';
import {Subject} from "rxjs";

@Injectable()
export class PaginatorIntl implements MatPaginatorIntl {
  changes = new Subject<void>();

  firstPageLabel = $localize`首页`;
  itemsPerPageLabel = $localize`每页个数`;
  lastPageLabel = $localize`尾页`;
  nextPageLabel = $localize`下一页`;
  previousPageLabel = $localize`上一页`;

  getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0) {
      return $localize`第 1/1 页`;
    }
    const amountPages = Math.ceil(length / pageSize);
    return $localize`第 ${page + 1}/${amountPages} 页`;
  }
}

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    AssignmentPageComponent,
    DashboardPageComponent,
    CoursePageComponent,
    SubmissionPageComponent,
    UploadDialogComponent,
    FilesTableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatProgressBarModule,
    MatToolbarModule,
    MatBadgeModule,
    MatSidenavModule,
    MatPaginatorModule,
    MatGridListModule,
    MatMenuModule,
    LayoutModule,
    MatSortModule,
    MatTreeModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'standard'}},
    {provide: MatPaginatorIntl, useClass: PaginatorIntl},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
