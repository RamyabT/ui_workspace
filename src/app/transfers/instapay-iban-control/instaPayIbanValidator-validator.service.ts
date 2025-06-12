import { InstaPayIbanControlComponent } from './instapay-iban-control.component';
import {  EventEmitter, Injectable } from "@angular/core";
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { Observable, catchError, map, of } from "rxjs";
import { CriteriaQuery, HttpProviderService, HttpRequest, IHttpErrorPayload, IHttpSuccessPayload } from "@fpx/core";
import {  BeneficiariesMaintanence } from "../beneficiaries-service/beneficiaries.model";
import { CommonService } from "src/app/foundation/validator-service/common-service";


@Injectable()
export class InstaPayIbanValidator {
    constructor(
      private _httpProvider: HttpProviderService,
      private commonService:CommonService){
    }

      ibanFetchValidation(
      
        eventEmitter: EventEmitter<{
          eventName: string;
          payload: any;
        }>,
        ibanMap:Map<string,string>
      ): AsyncValidatorFn {
        console.warn('IBAN validation begins');
        
        return (
          control: AbstractControl
        ):
          | Promise<ValidationErrors | null>
          | Observable<ValidationErrors | null> => { 
          
            console.log('IBAN checked is',control.value);
            let routingCode:any;
            let bankCode:any;
            let branchCode:any;
            let bankAddress:any;
                let serviceCode=ibanMap.get('serviceCode');
                let iban=control.value;
                console.log('IBAN',iban);
                const httpRequest = new HttpRequest();
                httpRequest.setContextPath('Payments');
                httpRequest.setResource('/iban/{ibannumber}');
                httpRequest.addPathParameter('ibannumber', iban);
                httpRequest.addHeaderParamter('serviceCode', 'DEPIBANVALIDATION');
                httpRequest.setMethod('GET');
                return this._httpProvider
                  .invokeRestApi(httpRequest)
                  .pipe(
                    map((res: IHttpSuccessPayload<any>) =>
                      res.body?? null
                    )
                  )                
                  .pipe(map((res: any) => {
                    console.log(res);
                    if(res){
                      eventEmitter.emit({
                        eventName: 'instaPayibanDataReceived',
                        payload: res                        
                      });
                     
                    }                    
                 return control.errors;
            }
            ),
            catchError((res: any) => {
              let error: any = {};
              // error[err.error.errorCode] = true;
              
              error['fetchError'] = res.error.ErrorMessage;
              // this.changeDetectorRef.markForCheck(); 
              return of(error);
            })
        );
        
            }
           
      };

    }