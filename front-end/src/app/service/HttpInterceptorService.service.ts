import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthenticationService } from './authentication.service';


@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('Intercepted URL-->',request.url);
        return next.handle(request).pipe(catchError(err => {
            console.log ('Error Status is -->', err.status);
            console.log ('Error Message is -->', err.message);
            if (err.status === 401 || err.status === 404){
                // auto logout if 401 response returned from api
                this.authenticationService.logOut();
                // window.location.href = 'http://localhost:4200/login';
                // tslint:disable-next-line: deprecation
                // location.reload(true);
            }
            if (err.status === 403) {
                err.status = 'Invalid Username and Password';
            }
            if (err.status === 200) {
                console.log ('In 200 loop');
               // window.location.href = 'http://localhost:9000/login';
           }
            if (err.status === 500) {
                console.log ('In 500 loop');
           }
            return throwError(err.status);
        }))
    }
}