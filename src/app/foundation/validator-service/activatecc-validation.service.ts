import { ChangeDetectorRef, EventEmitter, Injectable } from "@angular/core";
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { Observable, catchError, map, of } from "rxjs";
import { HttpProviderService, HttpRequest, IHttpErrorPayload } from "@fpx/core";
import { InactivedcService } from "src/app/debit-card/inactivedc-service/inactivedc.service";


@Injectable({
  providedIn: "root"
})
export class ActivateCCValidationService {
  [x: string]: any;

  constructor(private _httpProvider: HttpProviderService,
    private _service:InactivedcService) { }



      activateCCValidation(control: AbstractControl):Observable<any>{
    
        if (control.value) {
  
          const key = control.parent?.getRawValue() || {};
  
          const httpRequest = new HttpRequest();
          httpRequest.setResource('/creditcard/{cardRefNumber}/activation');
          httpRequest.setContextPath('CreditCards');
          httpRequest.addHeaderParamter('serviceCode','CCDETAILSVALIDATE')
          httpRequest.addPathParameter('cardRefNumber', key.cardReference);
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
                return of(err.error.creditcard.errorCode);
              })
            );
      }
      else{
      return of(null);
      }
    }

    ccPinValidator(payload:any,cardnumber:any):Observable<any>{
        const httpRequest = new HttpRequest();
        httpRequest.setResource('/creditcard/{cardReference}/pin');
        httpRequest.addHeaderParamter('serviceCode','RETAILCCCURRENTPIN')
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
  }

