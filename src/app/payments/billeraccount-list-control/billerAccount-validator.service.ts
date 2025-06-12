import {  EventEmitter, Injectable } from "@angular/core";
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { Observable, catchError, map, of } from "rxjs";
import { CriteriaQuery, HttpProviderService, HttpRequest, IHttpErrorPayload, IHttpSuccessPayload } from "@fpx/core";
import * as moment from "moment";
// import { CommonService } from "src/app/foundation/validator-service/common-service";


@Injectable()
export class BillerAccountFetchValidatorService {
    constructor(
      private _httpProvider: HttpProviderService){
    }

      
    billerAccFetchValidation(
      
      eventEmitter: EventEmitter<{
        eventName: string;
        payload: any;
      }>,
    bicMap:Map<string,string>
    ): AsyncValidatorFn {
      console.warn('BIC validation begins');
      
      return (
        control: AbstractControl
      ):
        | Promise<ValidationErrors | null>
        | Observable<ValidationErrors | null> => { 
        
          //console.log('BIC checked is',control.value);
        //   let formMode=bicMap.get('formMode')
        //   if(formMode=='D'){
        //     return of(null) 
        //   }
         // else{
          let bankCode:any;
          let branchCode:any;
          let branchAddress:any;
              const httpRequest = new HttpRequest();
                let billerBeneficiaryId=control.value
                httpRequest.setMethod('GET');
                httpRequest.setResource('/billeraccount/{billerBeneficiaryId}');
                httpRequest.addPathParameter('billerBeneficiaryId',billerBeneficiaryId);
                httpRequest.setContextPath('BillPayments');
                // const httpCriteria = new CriteriaQuery();
                // httpCriteria.addFilterCritertia('status', 'String', 'equals', {
                //   'searchText': 'A'
                // });

                //httpRequest.setCriteriaQuery(httpCriteria);
              return this._httpProvider
                .invokeRestApi(httpRequest)
                .pipe(
                  map((res: IHttpSuccessPayload<any>) =>
                    res.body?.billeraccount?? null
                  )
                )                
                .pipe(map((res: any) => {
                  console.log(res);
                  if(res){
                    eventEmitter.emit({
                      eventName: 'billerBeneficiaryIdDataReceived',
                      payload: res                        
                    });
                   
                  }                    
               return null;
          }
          ),
          catchError((err: IHttpErrorPayload) => {
            let error: any = {};
            // error[err.error.errorCode] = true;
            
            error['bic_fetch_error'] = true;
            // this.changeDetectorRef.markForCheck(); 
            return of(error);
          })
      );
        }
      
          }


         
         
    };
//}