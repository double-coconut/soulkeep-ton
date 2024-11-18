import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from '@common/services/auth.service';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

export const InterceptorSkipHeader = 'X-Skip-Interceptor';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (request.headers.has(InterceptorSkipHeader)) {
      const headers = request.headers.delete(InterceptorSkipHeader);
      return next.handle(request.clone({ headers }));
    }
    const token = this.authService.splToken;
    return next
      .handle(
        request.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
      )
      .pipe(
        catchError((e) => {
          this.router.navigateByUrl('/');
          return throwError(e);
        })
      );
  }
}
