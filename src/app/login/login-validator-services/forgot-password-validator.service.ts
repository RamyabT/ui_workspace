import { ChangeDetectorRef, EventEmitter, Injectable } from "@angular/core";
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { Observable, catchError, map, of } from "rxjs";
import { CreateFn, FpxIHttpOption, HttpProviderService, HttpRequest, IHttpErrorPayload } from "@fpx/core";

@Injectable({
    providedIn: "root"
  })

  export class ForgotpasswordService {
    [x: string]: any;
    constructor(private _httpProvider: HttpProviderService) { }
      validateuser(payload: unknown,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): CreateFn<any> {
        return () => {
            const httpRequest = new HttpRequest();
            httpRequest.setContextPath('IAM');
            httpRequest.setMethod('POST');
            httpRequest.setResource('/depvalidateuser');
            httpRequest.setAuthTokenRequired(false);
            httpRequest.setBody(payload);
            return this._httpProvider.invokeRestApi(httpRequest,httpOption);
          };
      }    
      validateuserstatus(payload: unknown,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): CreateFn<any> {
        return () => {
            const httpRequest = new HttpRequest();
            httpRequest.setContextPath('IAM');
            httpRequest.setMethod('POST');
            httpRequest.setResource('/validateuserstatus');
            httpRequest.setAuthTokenRequired(false);
            httpRequest.setBody(payload);
            return this._httpProvider.invokeRestApi(httpRequest,httpOption);
          };
      }    

  }