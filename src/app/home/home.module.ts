import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ListComponent } from './list/list.component';
import { TodoComponent } from './todo/todo.component';
import { TodoFormComponent } from './todo-form/todo-form.component';
import { HomeComponent } from './home/home.component';
@NgModule({
  declarations: [
    SidebarComponent,
    ListComponent,
    TodoComponent,
    TodoFormComponent,
    HomeComponent,
  ],
  imports: [CommonModule, HomeRoutingModule],
})
export class HomeModule {}
