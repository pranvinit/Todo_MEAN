import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Todo, TodoService } from '../todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  @Input() todo: Todo;

  expanded = false;
  deleteIntent = false;
  updateIntent = false;

  constructor(
    private todoService: TodoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

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

  handleDelete() {
    this.todoService.deleteTodo(this.todo._id).subscribe({
      next: () => {
        window.location.reload();
      },
    });
  }

  handleEdit() {
    const { type } = this.route.snapshot.params;
    console.log(this.todo);

    this.router.navigateByUrl(`/home/${type}/edit`, {
      state: { todo: this.todo },
    });
  }

  ngOnInit(): void {}
}
