import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Data, Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";


@Injectable()
export class HttpResponseInceptor implements HttpInterceptor {
    constructor(private _router : Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                return event;
            }),
            catchError((err: HttpErrorResponse): Observable<any> => {
                if (err instanceof HttpErrorResponse && err.status == 401) {
                    this._router.navigate(['display-shell','http-status','unauthorized'])
                }else if (err instanceof HttpErrorResponse && err.status == 503){
                    this._router.navigate(['display-shell','http-status','service-unavailable']);
                }else if (err instanceof HttpErrorResponse && err.status == 502){
                    this._router.navigate(['display-shell','http-status','bad-gateway']);
                }
                return throwError(err);
            }));
    }
}
