import { ChangeDetectorRef, EventEmitter, Injectable } from "@angular/core";
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { Observable, catchError, map, of } from "rxjs";
import { HttpProviderService, HttpRequest, IHttpErrorPayload } from "@fpx/core";

@Injectable({
    providedIn: "root"
  })

  export class CreditcardService {
    [x: string]: any;
    constructor(private _httpProvider: HttpProviderService) { }

    CreditCardPinValidator(payload:any,cardnumber:any):Observable<any>{
        const httpRequest = new HttpRequest();
        httpRequest.setResource('/creditcard/{cardreference}/pin');
        httpRequest.addPathParameter('cardreference', cardnumber);
        // let bodyContent ={
          

        // };
        httpRequest.setBody(payload);
        httpRequest.setMethod('POST');
        // httpRequest.setContextPath('Accounts');
        return this._httpProvider
          .invokeRestApi(httpRequest)
          .pipe(map((res: any) => {
            return null;
          }), 
            catchError((err: any) => {
              return of(err.error);
            })
          );
        }


        fetchCreditCardLimits(productCode:any,cardRefNumber:any){
          const httpRequest = new HttpRequest();
          httpRequest.setResource('/creditcard/{cardref}/product/{productcode}/limits');
          httpRequest.addPathParameter('productcode', productCode);
          httpRequest.addPathParameter('cardref', cardRefNumber);
          httpRequest.setMethod('GET');
          return this._httpProvider
          .invokeRestApi(httpRequest)
          .pipe(map((res: any) => {
            return res.body;
          }), 
            catchError((err: any) => {
              return of(err.error.errorCode);
            })
          );
      
        }
      

  }