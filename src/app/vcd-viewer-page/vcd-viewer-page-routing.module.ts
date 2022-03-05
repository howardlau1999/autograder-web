import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VcdViewerPageComponent } from './vcd-viewer-page.component';

const routes: Routes = [
  {
    path: '',
    component: VcdViewerPageComponent,
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class VcdViewerPageRoutingModule {}
