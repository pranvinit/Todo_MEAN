import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
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

  constructor(
    private todoService: TodoService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {}

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

  handleCheckbox(e: any) {
    const { checked } = e.target as HTMLInputElement;
    this.completed.setValue(checked);
  }

  backIntent = false;

  handleBack() {
    this.backIntent = true;
    setTimeout(() => {
      this.location.back();
    }, 300);
  }

  handleCancel() {
    this.location.back();
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
    } else if (this.operation === 'update') {
      this.todoService.updateTodo({ ...this.todo, ...value }).subscribe({
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

  ngOnInit(): void {
    const { todo } = history.state;
    const { path } = this.route.snapshot.routeConfig;

    if (todo?._id) {
      this.todo = todo;
      this.operation = 'update';
      this.todoForm.patchValue({
        name: todo.name || '',
        description: todo.description || '',
        completed: !!todo.completed,
        priority: todo.priority || 0,
      });
    } else if (path === 'edit' && !todo) {
      this.router.navigateByUrl('/home');
    }
  }
}
