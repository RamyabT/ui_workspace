import { ChangeDetectorRef, EventEmitter, Injectable } from "@angular/core";
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { Observable, catchError, map, of } from "rxjs";
import { HttpProviderService, HttpRequest, IHttpErrorPayload } from "@fpx/core";
import { InactivedcService } from "src/app/debit-card/inactivedc-service/inactivedc.service";


@Injectable({
  providedIn: "root"
})
export class ActivateDCValidationService {
  [x: string]: any;

  constructor(private _httpProvider: HttpProviderService,
    private _service:InactivedcService) { }



      activateDCValidation(control: any):Observable<any>{
    
        if (control) {
  
          // const key = control.parent?.getRawValue() || {};
  
          const httpRequest = new HttpRequest();
          httpRequest.setResource('/debitcard/{cardRefNumber}/activation');
          httpRequest.setContextPath('DebitCards');
          httpRequest.addHeaderParamter('serviceCode','DCDETAILSVALIDATE')
          httpRequest.addPathParameter('cardRefNumber', control.cardReference);
            httpRequest.addQueryParameter('expiryMonth',control.expiryMonth);
            httpRequest.addQueryParameter('cvv',control.cvv);
            httpRequest.addQueryParameter('expiryyear',control.expiryYear);
          let bodyContent ={};
          httpRequest.setBody(bodyContent);
          httpRequest.setMethod('GET');
          // httpRequest.setContextPath('Accounts');
          return this._httpProvider
            .invokeRestApi(httpRequest)
            .pipe(map((res: any) => {
              return null;
            }), 
              catchError((err: any) => {
               //let error  ={}
               //error[err.error.errorCode] =true
                return of(err.error.debitcard.errorCode);
              })
            );
      }
      else{
      return of(null);
      }
    }

    dcPinValidator(payload:any,cardnumber:any):Observable<any>{
        const httpRequest = new HttpRequest();
        httpRequest.setResource('/debitcard/{cardReference}/pin');
        httpRequest.addHeaderParamter('serviceCode','DCCURRENTPINVALIDATION')
        httpRequest.addPathParameter('cardReference', cardnumber);
        // let bodyContent ={
          

        // };
        httpRequest.setBody(payload);
        httpRequest.setMethod('POST');
         httpRequest.setContextPath('DebitCards');
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

    pcPinValidator(payload:any,cardnumber:any):Observable<any>{
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/prepaidcard/{cardReference}/pin');
      httpRequest.addHeaderParamter('serviceCode','PCCURRENTPINVALIDATION')
      httpRequest.addPathParameter('cardReference', cardnumber);
      // let bodyContent ={
        

      // };
      httpRequest.setBody(payload);
      httpRequest.setMethod('POST');
       httpRequest.setContextPath('DebitCards');
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

  activatePCValidation(control: AbstractControl):Observable<any>{
    
    if (control.value) {

      const key = control.parent?.getRawValue() || {};

      const httpRequest = new HttpRequest();
      httpRequest.setResource('/prepaidcard/{cardRefNumber}/activation');
      httpRequest.setContextPath('DebitCards');
      httpRequest.addHeaderParamter('serviceCode','PCDETAILSVALIDATE')
      httpRequest.addPathParameter('cardRefNumber', key.cardRefNumber);
        httpRequest.addQueryParameter('expiryMonth',key.expiryMonth);
        httpRequest.addQueryParameter('cvv',key.cvv);
        httpRequest.addQueryParameter('expiryyear',key.expiryYear);
      let bodyContent ={};
      httpRequest.setBody(bodyContent);
      httpRequest.setMethod('GET');
      // httpRequest.setContextPath('Accounts');
      return this._httpProvider
        .invokeRestApi(httpRequest)
        .pipe(map((res: any) => {
          return null;
        }), 
          catchError((err: any) => {
           //let error  ={}
           //error[err.error.errorCode] =true
            return of(err.error.debitcard.errorCode);
          })
        );
  }
  else{
  return of(null);
  }
}

  }

