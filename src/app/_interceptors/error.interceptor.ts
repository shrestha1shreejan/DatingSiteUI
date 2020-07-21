import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErroInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError(httpError => {
                /// handling 401 unauthorized errors
                if (httpError.status === 401) {
                    return throwError(httpError.statusText);
                }

                if (httpError instanceof HttpErrorResponse) {
                    /// handing 503 Internal serve type error
                    const applicationError = httpError.headers.get('Application-Error');
                    if (applicationError) {
                        return throwError(applicationError);
                    }

                    /// handling model state error or state error
                    const serverError = httpError.error;
                    let modelStateError = '';
                    /// checking if serverError.errors is not empty and if it is an object
                    if (serverError.errors && typeof serverError.errors === 'object') {
                        for (const key in serverError.errors) {
                            if (serverError.errors[key]) {
                                modelStateError += serverError.errors[key] + '\n';
                            }
                        }
                    }
                    /// in case we reveive 'Server Error' its not an unhandler error type
                    return throwError(modelStateError || serverError || 'Server Error');
                }
            })
        );
    }
}

// constructing a provider for the interceptor
export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErroInterceptor,
    multi: true
}