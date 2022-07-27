import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, skipWhile, take, tap } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    return this.authService.user$.pipe(
      // skip the processing pipeling while the value is null
      // canActivate will wait until a non null value is received
      skipWhile((user) => user === null),

      // once a non null value (boolean: auth status of user) is received
      // take mark the Observable (user$) as complete for canActivate
      // canActivate makes decision if user can access the route based on the set value of user$ for all subsequent requests

      take(1),
      tap((user) => {
        if (!user) {
          this.router.navigateByUrl('/auth');
        }
      })
    );
  }
}
