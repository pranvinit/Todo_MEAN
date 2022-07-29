import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component';
import { TodoResolverService } from './resolvers/todo-resolver.service';
import { TodoFormComponent } from './todo-form/todo-form.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,

    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'all',
      },
      {
        path: ':type',
        component: ListComponent,
        resolve: { data: TodoResolverService },
        children: [
          { path: 'create', component: TodoFormComponent },
          { path: 'edit', component: TodoFormComponent },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
