import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SpacexListComponent } from './spacex-list/spacex-list.component';

const routes: Routes = [
  { path: '', component: SpacexListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
