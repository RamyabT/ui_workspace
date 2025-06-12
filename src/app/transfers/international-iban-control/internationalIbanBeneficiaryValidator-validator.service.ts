import {  EventEmitter, Injectable } from "@angular/core";
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { Observable, catchError, map, of } from "rxjs";
import { CriteriaQuery, HttpProviderService, HttpRequest, IHttpErrorPayload, IHttpSuccessPayload } from "@fpx/core";
import {  BeneficiariesMaintanence } from "../beneficiaries-service/beneficiaries.model";
import { CommonService } from "src/app/foundation/validator-service/common-service";


@Injectable()
export class InternationalIbanBeneficiaryValidator {
    constructor(
      private _httpProvider: HttpProviderService,
      private commonService:CommonService){
    }
    ibanDuplicateValidation(
      
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
                let serviceCode=ibanMap.get('serviceCode');
                let iban=control.value;
                console.log('IBAN',iban);
                const httpRequest = new HttpRequest();
                httpRequest.setContextPath('Payments');
                httpRequest.setMethod('GET');
                httpRequest.setResource('/beneficiaries');
                const httpCriteria = new CriteriaQuery();
                httpCriteria.addFilterCritertia('beneAccount', 'String', 'equals', {
                  searchText: iban
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
                    console.log("IBAN");
                    return {'iban_exists_error':true}; 
                }
                // eventEmitter.emit({
                //     eventName: 'accountNumberReceived',
                //     payload: {
                //       'accountNumber':DomesticAccountNumberControlComponent
                //     }
                    
                //   });
                 return control.errors;
            }
            ),
            catchError((err: IHttpErrorPayload) => {
              let error: any = {};
                      error['fetchError'] = true;
                      return of(error);
            })
        );
        
            }
           
      };

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
                httpRequest.addHeaderParamter('serviceCode', 'DEPIBANVALIDATION');
                httpRequest.setResource('/iban/{ibannumber}');
                // httpRequest.addPathParameter('ibannumber', iban);
                httpRequest.addPathParameter('ibannumber', iban);
                // httpRequest.addHeaderParamter('serviceCode', 'CORPBENEDOMESTIC');
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
                        eventName: 'ibanDataReceived',
                        payload: res                        
                      });
                     
                    }                    
                 return control.errors;
            }
            ),
            catchError((err: IHttpErrorPayload) => {
              let error: any = {};
              // error[err.error.errorCode] = true;
              
              error['iban_fetch_error'] = true;
              // this.changeDetectorRef.markForCheck(); 
              return of(error);
            })
        );
        
            }
           
      };

    }