import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Todo, TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss'],
})
export class TodoFormComponent implements OnInit {
  loading = false;
  operation = 'create';
  todo: Todo | null = null;

  todoForm = new FormGroup({
    name: new FormControl('', {
      validators: [Validators.required, Validators.minLength(2)],
    }),
    description: new FormControl('', {
      validators: [Validators.required, Validators.minLength(2)],
    }),
    completed: new FormControl(false),
    priority: new FormControl(0, {
      validators: [Validators.min(0), Validators.max(3)],
    }),
  });

  constructor(private todoService: TodoService) {}

  get name() {
    return this.todoForm.controls.name;
  }
  get description() {
    return this.todoForm.controls.description;
  }
  get completed() {
    return this.todoForm.controls.completed;
  }
  get priority() {
    return this.todoForm.controls.priority;
  }

  handlePriorityClick(priority: number) {
    this.priority.setValue(priority);
  }

  backIntent = false;

  handleBack() {
    this.backIntent = true;
    setTimeout(() => {
      const url = window.location.pathname.split('/');
      url.pop();
      window.location.replace(url.join('/'));
    }, 300);
  }

  handleSubmit() {
    if (!this.todoForm.valid) return;
    this.loading = true;
    const value = this.todoForm.value;
    if (this.operation === 'create') {
      this.todoService.createTodo(value).subscribe({
        next: () => {
          this.todoForm.reset();
          this.loading = false;
          this.handleBack();
        },
        error: () => {
          this.loading = false;
        },
      });
    }
  }

  ngOnInit(): void {}
}
