import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

export class AuthInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const reqWithCreds = req.clone({
      withCredentials: true,
    });

    // next.handle(req) returns an obervable that emits serveral events like (sent, uploadProgress, response)
    // this value can be checked for type with the HttpEventType interface
    // we can add a pipe and handle incoming responses
    return next.handle(reqWithCreds);
  }
}
