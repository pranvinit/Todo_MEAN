import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component';
import { TodoResolverService } from './resolvers/todo-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,

    children: [
      {
        path: '',
        component: ListComponent,
        resolve: { data: TodoResolverService },
      },
      {
        path: ':type',
        component: ListComponent,
        resolve: { data: TodoResolverService },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
