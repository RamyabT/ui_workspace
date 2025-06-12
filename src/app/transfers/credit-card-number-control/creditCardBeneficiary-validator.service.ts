import {  EventEmitter, Injectable } from "@angular/core";
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { Observable, catchError, map, of } from "rxjs";
import { CriteriaQuery, HttpProviderService, HttpRequest, IHttpErrorPayload, IHttpSuccessPayload } from "@fpx/core";
import {  BeneficiariesMaintanence } from "../beneficiaries-service/beneficiaries.model";
import { CommonService } from "src/app/foundation/validator-service/common-service";
import { CreditCardNumberControlComponent } from "./credit-card-number-control.component";


@Injectable()
export class CreditCardBeneficiaryValidator {
    constructor(
      private _httpProvider: HttpProviderService,
      private commonService:CommonService){
    }
    creditCardNumberValidation(
      
      
        eventEmitter: EventEmitter<{
          eventName: string;
          payload: any;
        }>,
        creditCardNumberMap:Map<string,string>
      ): AsyncValidatorFn {
        console.warn('Credit Card Number validation begins');
                
        return (
          control: AbstractControl
        ):
          | Promise<ValidationErrors | null>
          | Observable<ValidationErrors | null> => { 
                                                                             
          
            console.log('Credit Card Number checked is',control.value);
            console.log('Credit Card Number checked is',control.parent)
            let formMode=creditCardNumberMap.get('formMode')
            if(formMode=='D'){
              return of(null);
            }
            else{
             
            
                let serviceCode=creditCardNumberMap.get('serviceCode');
                let creditCardNumber=control.value;
    
                const httpRequest = new HttpRequest();
            
                httpRequest.setMethod('GET');
                httpRequest.setContextPath('Payments');
                httpRequest.setResource('/beneficiaries');
                
                
                const httpCriteria = new CriteriaQuery();
                httpCriteria.addFilterCritertia('beneAccount', 'String', 'equals', {
                  searchText: creditCardNumber
                });
                httpCriteria.addFilterCritertia('serviceCode', 'String', 'equals', {
                searchText:serviceCode
                });
                httpRequest.setCriteriaQuery(httpCriteria);
                return this._httpProvider
                .invokeRestApi(httpRequest)
          .pipe(
            map((res: IHttpSuccessPayload<BeneficiariesMaintanence>) =>{
                console.log(res);
                if(res.body?.beneficiaries!=null){
                    console.log(res);
                    console.log("CreditCardNumber");
                    return {'creditcardnumber_exists_error':true}; 
                }
                eventEmitter.emit({
                    eventName: 'NumberReceived',
                    payload: {
                      'accountNumber':CreditCardNumberControlComponent
                    }
                    
                  });
                  return control.errors;
            }),
            catchError((err: IHttpErrorPayload) => {
              let error: any = {};
              // error[err.error.errorCode] = true;
              
              error['creditcardnumber_fetch_error'] = true;
              // this.changeDetectorRef.markForCheck(); 
              return of(error);
            })
        );
          
            
          }
          
          
          
          
      };
    }
  }
    
    
     


