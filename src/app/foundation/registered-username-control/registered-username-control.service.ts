import { ChangeDetectorRef, EventEmitter, Injectable } from "@angular/core";
import { Casaaccount } from "../casaaccount-service/casaaccount.model";
import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from "@angular/forms";
import { Observable, catchError, map, of, throwError } from "rxjs";
import { CasaaccountService } from "../casaaccount-service/casaaccount.service";
import {
  HttpProviderService,
  HttpRequest,
  IHttpErrorPayload,
  IHttpSuccessPayload,
} from "@fpx/core";

@Injectable()
export class CustomerValidatorService {
  constructor(private _httpProvider: HttpProviderService) {}
  //   getControlName(c: AbstractControl): string | null {
  //     const formGroup = c.parent?.controls;
  //     return Object.keys(formGroup).find(name => c === formGroup[name]) || null;
  // }
//   user(payload: any) {
//     return () => {
//       const httpRequest = new HttpRequest();
//       httpRequest.setMethod("POST");
//       httpRequest.setResource("/depvalidateuser");
//       let bodyContent = { username: payload };
//       httpRequest.setBody(bodyContent);
//       return this._httpProvider.invokeRestApi(httpRequest);
//     };
//   }

  username(
    eventEmitter: EventEmitter<{
      eventName: string;
      payload: any | null;
    }>
  ): AsyncValidatorFn {
    console.warn("Customer Details Validator Begins");
    return (
      control: AbstractControl
    ):
      | Promise<ValidationErrors | null>
      | Observable<ValidationErrors | null> => {
      let payload = control.value.toUpperCase();
      if (payload) {
        const httpRequest = new HttpRequest();
        httpRequest.setMethod("POST");
        httpRequest.setResource("/depvalidateuser");
        httpRequest.setContextPath('IAM');
        let bodyContent = { 
          username: payload,
          isRegister:'0'
         };
        httpRequest.setBody(bodyContent);
        return this._httpProvider.invokeRestApi(httpRequest).pipe(
          map(
            (response: any) => {
            let error: any = {};
            if(response?.body?.status && response?.body?.status == "1"){
              error["Existing_User"] = true;
            } 
            else {
              error = null;
            }
            return error;
          }),
          catchError(
            (err: any) => {
            let error: any = {};
            if(err?.error?.ErrorCode =="DEP10001"){
              error["Existing_User"] = true;
            }
            return of(error);
	    
          })
        );
      } else {
        return of(null);
      }
    };
  }
}
