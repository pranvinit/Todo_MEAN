import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { catchError, map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

interface EmailAvailabilityResponse {
  available: boolean;
  msg: string;
}

@Injectable({
  providedIn: 'root',
})
export class EmailValidator implements AsyncValidator {
  url = 'http://localhost:5000/api/v1/auth/email/availability';
  constructor(private http: HttpClient) {}

  validate = (control: AbstractControl): Observable<ValidationErrors> => {
    const email = control.value;

    return this.http.post<EmailAvailabilityResponse>(this.url, { email }).pipe(
      map(() => null),
      catchError(() => {
        return of({ emailNotUnique: true });
      })
    );
  };
}
