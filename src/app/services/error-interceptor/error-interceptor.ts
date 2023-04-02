import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
        catchError((error: HttpErrorResponse) => {
            console.log(error);
            alert(error.error.message);
            return throwError(error);
        })
    );
  }
}