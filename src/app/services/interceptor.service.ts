
import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })

// Service in charge of intercepting all http requests of the app.
// Specifically for this app, it checks if an 404 error has happened, because the only way that error it's currently produced
// it's by a missing config.json file.
// In case the file it's not loaded/found, the console will show the corresponding error message.
export class ErrorInterceptorService implements HttpInterceptor {
    constructor() { }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError((requestError) => {
                // Special case for demo purposes
                // In case config.json is not available this Error will show on the console 
                if (requestError.status === 404) {
                    const { error } = requestError;
                    const messageError = new Error(error)
                    console.log(messageError)
                }
                return throwError(() => new Error(requestError));
            }))
    }
}