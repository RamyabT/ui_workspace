import {  EventEmitter, Injectable } from "@angular/core";
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { Observable, catchError, map, of } from "rxjs";
import { CriteriaQuery, HttpProviderService, HttpRequest, IHttpErrorPayload, IHttpSuccessPayload } from "@fpx/core";
import {  BeneficiariesMaintanence } from "../beneficiaries-service/beneficiaries.model";
import { CommonService } from "src/app/foundation/validator-service/common-service";
import { InternationalAccountNumberControlComponent } from "./international-account-number-control.component";


@Injectable()
export class InternationalBeneficiaryValidator {
    constructor(
      private _httpProvider: HttpProviderService,
      private commonService:CommonService){
    }
    accountNumberValidation(
      
        eventEmitter: EventEmitter<{
          eventName: string;
          payload: any;
        }>,
        accountNumberMap:Map<string,string>
      ): AsyncValidatorFn {
        console.warn('Account Number validation begins');
        
        return (
          control: AbstractControl
        ):
          | Promise<ValidationErrors | null>
          | Observable<ValidationErrors | null> => { 
          
            console.log('Account Number checked is',control.value);
                let serviceCode=accountNumberMap.get('serviceCode');
                let accountNumber=control.value;
                console.log('AccountNumber',accountNumber);
                const httpRequest = new HttpRequest();
                httpRequest.setContextPath('Payments');
                httpRequest.setMethod('GET');
                httpRequest.setResource('/beneficiaries');
                const httpCriteria = new CriteriaQuery();
                httpCriteria.addFilterCritertia('beneAccount', 'String', 'equals', {
                  searchText: accountNumber
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
                    console.log("AccountNumber");
                    return {'accountnumber_exists_error':true}; 
                }
                eventEmitter.emit({
                    eventName: 'accountNumberReceived',
                    payload: {
                      'accountNumber':InternationalAccountNumberControlComponent
                    }
                    
                  });
                  return control.errors;
            }),
            catchError((err: IHttpErrorPayload) => {
              let error: any = {};
              // error[err.error.errorCode] = true;
              
              error['accountnumber_fetch_error'] = true;
              // this.changeDetectorRef.markForCheck(); 
              return of(error);
            })
        );
            }
           
      };
    }
  