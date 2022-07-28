import { Component, OnInit, Input } from '@angular/core';
import { Todo } from '../todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  @Input() todo: Todo;

  expanded = false;

  constructor() {}

  getPriorityClass() {
    switch (this.todo.priority) {
      case 0:
        return '';
      case 1:
        return 'low';
      case 2:
        return 'mid';
      case 3:
        return 'high';

      default:
        return '';
    }
  }

  ngOnInit(): void {}
}
