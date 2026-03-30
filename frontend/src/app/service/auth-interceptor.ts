import { HttpEvent, HttpHandler, HttpHandlerFn, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from './auth-service';


export function authInterceptor(req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {

  const idToken = localStorage.getItem("id_token");
  const authService = inject(AuthService);


  const request = idToken
    ? req.clone({
        headers: req.headers.set("Authorization", "Bearer " + idToken)
      })
    : req;

  return next(request).pipe(
    catchError((err) => {
      if (err.status === 401 || err.status === 403) {
        console.warn('Unauthorized, logging out...');
        authService.logout();
      }

      return throwError(() => err);
    })
  );
}
