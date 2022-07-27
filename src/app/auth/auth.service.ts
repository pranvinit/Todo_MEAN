import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, of, tap } from 'rxjs';

interface User {
  name: string;
  email: string;
  photo?: string;
  password: string;
}

interface Credentials {
  emial: string;
  password: string;
}

interface TokenUser {
  userId: string;
  name: string;
  photo: string;
}

interface UserResponse {
  user: TokenUser;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}
  baseUrl = 'http://localhost:5000/api/v1';

  user$ = new BehaviorSubject(null);

  authorize() {
    return this.http.get<UserResponse>(`${this.baseUrl}/auth/showMe`).pipe(
      tap((res) => {
        this.user$.next(res.user);
      }),
      catchError((err) => of(err).pipe(tap(() => this.user$.next(false))))
    );
  }

  register(user: User) {
    return this.http
      .post<UserResponse>(`${this.baseUrl}/auth/register`, user)
      .pipe(
        tap((res) => {
          this.user$.next(res.user);
        }),
        tap(() => this.router.navigateByUrl('/home')),
        catchError((err) => of(err).pipe(tap(() => this.user$.next(false))))
      );
  }

  login(credentials: Credentials) {
    return this.http
      .post<UserResponse>(`${this.baseUrl}/auth/login`, credentials)
      .pipe(
        tap((res) => {
          this.user$.next(res.user);
        }),
        tap(() => this.router.navigateByUrl('/home')),
        catchError((err) => of(err).pipe(tap(() => this.user$.next(false))))
      );
  }

  logout() {
    return this.http.get<void>(`${this.baseUrl}/auth/logout`).pipe(
      tap(() => this.router.navigateByUrl('/auth')),
      tap(() => {
        this.user$.next(null);
      })
    );
  }
}
