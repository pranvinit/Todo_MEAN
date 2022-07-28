import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, of, tap } from 'rxjs';
import { AlertService } from '../shared/alerts/alert.service';

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
  constructor(
    private http: HttpClient,
    private router: Router,
    private alertService: AlertService
  ) {}
  baseUrl = 'http://localhost:5000/api/v1';

  user$ = new BehaviorSubject(null);

  authorize() {
    return this.http.get<UserResponse>(`${this.baseUrl}/auth/showMe`).pipe(
      tap((res) => {
        this.user$.next(res.user);
        this.alertService.addAlert('User authorized successfully', 'success');
      }),
      catchError((err) =>
        of(err).pipe(
          tap(() => {
            this.user$.next(false);
            this.alertService.addAlert('User authorization failed', 'error');
          })
        )
      )
    );
  }

  register(user: User) {
    return this.http
      .post<UserResponse>(`${this.baseUrl}/auth/register`, user)
      .pipe(
        tap((res) => {
          this.user$.next(res.user);
          this.alertService.addAlert('User registered successfully', 'success');
        }),
        tap(() => this.router.navigateByUrl('/home')),
        catchError((err) =>
          of(err).pipe(
            tap(() => {
              this.user$.next(false);
              this.alertService.addAlert('User authorization failed', 'error');
            })
          )
        )
      );
  }

  login(credentials: Credentials) {
    return this.http
      .post<UserResponse>(`${this.baseUrl}/auth/login`, credentials)
      .pipe(
        tap((res) => {
          this.user$.next(res.user);
          this.alertService.addAlert('User logged in', 'success');
        }),
        tap(() => this.router.navigateByUrl('/home')),
        catchError((err) =>
          of(err).pipe(
            tap(() => {
              this.user$.next(false);
              this.alertService.addAlert('User login failed', 'error');
            })
          )
        )
      );
  }

  logout() {
    return this.http.get<void>(`${this.baseUrl}/auth/logout`).pipe(
      tap(() => this.router.navigateByUrl('/auth')),
      tap(() => {
        this.user$.next(null);
        this.alertService.addAlert('User logged out', 'success');
      })
    );
  }
}
