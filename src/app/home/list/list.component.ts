import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Todo } from '../todo.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  todos: Todo[] = [];

  constructor(private route: ActivatedRoute) {
    this.route.data.subscribe(({ data }) => {
      this.todos = data.todos;
    });
  }

  ngOnInit(): void {}
}
