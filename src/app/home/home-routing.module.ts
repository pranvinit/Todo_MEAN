import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  { path: '', redirectTo: 'pending', pathMatch: 'full' },
  { path: 'pending', component: ListComponent },
  { path: 'priority', component: ListComponent },
  { path: 'completed', component: ListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
