import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of, tap } from 'rxjs';
import { AlertService } from '../shared/alerts/alert.service';

export interface Todo {
  _id: string;
  name: string;
  description: string;
  completed: boolean;
  priority: boolean;
  updatedAt: Date;
}

export interface TodosResponse {
  todos: Todo[];
  nbHits: number;
}

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  baseUrl = 'http://localhost:5000/api/v1';

  constructor(private http: HttpClient, private alertService: AlertService) {}

  getAllTodos() {
    return this.http.get<TodosResponse>(`${this.baseUrl}/todos/`).pipe(
      tap(() =>
        this.alertService.addAlert('All todos fetched successfully', 'success')
      ),
      tap((v) => console.log(v)),
      catchError((err) =>
        of(err).pipe(
          tap(() => this.alertService.addAlert('Todo fetching failed', 'error'))
        )
      )
    );
  }

  getTodosByType(type: 'pending' | 'priority' | 'completed') {
    return this.http.get<TodosResponse>(`${this.baseUrl}/todos/${type}`).pipe(
      tap(() =>
        this.alertService.addAlert(
          `${
            type.charAt(0).toUpperCase() + type.slice(1)
          } todos fetched successfully`,
          'success'
        )
      ),
      catchError((err) =>
        of(err).pipe(
          tap(() => this.alertService.addAlert('Todo fetching failed', 'error'))
        )
      )
    );
  }

  createTodo(todo: Partial<Todo>) {
    return this.http.post<Todo>(`${this.baseUrl}/todos`, todo).pipe(
      tap(() =>
        this.alertService.addAlert('Todos created successfully', 'success')
      ),
      catchError((err) =>
        of(err).pipe(
          tap(() => this.alertService.addAlert('Todo creation failed', 'error'))
        )
      )
    );
  }

  updateTodo(todo: Todo) {
    return this.http
      .patch<Todo>(`${this.baseUrl}/todos/${todo._id}`, todo)
      .pipe(
        tap(() =>
          this.alertService.addAlert('Todos updated successfully', 'success')
        ),
        catchError((err) =>
          of(err).pipe(
            tap(() =>
              this.alertService.addAlert('Todo updation failed', 'error')
            )
          )
        )
      );
  }

  deleteTodo(id: number) {
    return this.http.delete(`${this.baseUrl}/todos/${id}`).pipe(
      tap(() =>
        this.alertService.addAlert('Todos deleted successfully', 'success')
      ),
      catchError((err) =>
        of(err).pipe(
          tap(() => this.alertService.addAlert('Todo deletion failed', 'error'))
        )
      )
    );
  }
}
