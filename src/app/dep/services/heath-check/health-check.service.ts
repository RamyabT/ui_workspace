import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { HttpProviderService, HttpRequest, IHttpErrorPayload, IHttpSuccessPayload } from "@fpx/core";
import { Observable, catchError, map, throwError } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class HealthCheckService{
  constructor(private httpProvider: HttpProviderService) {
    
  }

  healthCheckCommon(): Observable<any> {
    const httpRequest: HttpRequest = new HttpRequest();
    httpRequest.setContextPath('CommonHealthCheck');
    httpRequest.setResource("/version");
    httpRequest.setMethod("GET");
    return this.httpProvider.invokeRestApi(httpRequest)
  }

  healthCheckAccounts(): Observable<any> {
    const httpRequest: HttpRequest = new HttpRequest();
    httpRequest.setContextPath('AccountsHealthCheck');
    httpRequest.setResource("/version");
    httpRequest.setMethod("GET");
    return this.httpProvider.invokeRestApi(httpRequest);
  }
  healthCheckIam(): Observable<any> {
    const httpRequest: HttpRequest = new HttpRequest();
    httpRequest.setContextPath('IAMHealthHealthCheck');
    httpRequest.setResource("/version");
    httpRequest.setMethod("GET");
    return this.httpProvider.invokeRestApi(httpRequest);
  }
  healthCheckWorkFlow(): Observable<any> {
    const httpRequest: HttpRequest = new HttpRequest();
    httpRequest.setContextPath('WorkflowHealthCheck');
    httpRequest.setResource("/version");
    httpRequest.setMethod("GET");
    return this.httpProvider.invokeRestApi(httpRequest);
   
  }

  checkApplicationStatus(): Observable<any> {
    const httpRequest: HttpRequest = new HttpRequest();
    httpRequest.setResource("/healthcheck");
    httpRequest.setMethod("GET");
    httpRequest.setContextPath('IAM');
    return this.httpProvider.invokeRestApi(httpRequest).pipe(
      map(
        (response:any) => {
          const applicationConfigResponse = {
            httpStatus: response?.status,
          };
          return applicationConfigResponse;
        },
        catchError((err: any) => {
          return throwError(err);
        })
      )
    );
  }



}
