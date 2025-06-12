import {  EventEmitter, Injectable } from "@angular/core";
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { Observable, catchError, map, of } from "rxjs";
import { CriteriaQuery, HttpProviderService, HttpRequest, IHttpErrorPayload, IHttpSuccessPayload } from "@fpx/core";
import { CommonService } from "src/app/foundation/validator-service/common-service";


@Injectable()
export class DomesticBICBeneficiaryValidator {
    constructor(
      private _httpProvider: HttpProviderService,
      private commonService:CommonService){
    }

    //   BICValidation(
      
    //     eventEmitter: EventEmitter<{
    //       eventName: string;
    //       payload: any;
    //     }>,
    //     creditCardNumberMap:Map<string,string>
    //   ): AsyncValidatorFn {
    //     console.warn('BIC validation begins');
        
    //     return (
    //       control: AbstractControl
    //     ):
    //       | Promise<ValidationErrors | null>
    //       | Observable<ValidationErrors | null> => { 
          
    //         console.log('BIC checked is',control.value);
    //         let formMode=creditCardNumberMap.get('formMode')
    //         if(formMode=='D'){
    //           return of(null) 
    //         }
    //         else{
    //             let bic=control.value;
    //             console.log('BIC',bic);
    //             const httpRequest = new HttpRequest();
    //             httpRequest.setMethod('GET');
    //             httpRequest.addHeaderParamter('serviceCode', 'DEPBICVALIDATION');
    //             httpRequest.setContextPath('Payments');
    //             httpRequest.addPathParameter('bicCode',bic);
    //             httpRequest.setResource('/bic/{bicCode}');
              
    //             return this._httpProvider
    //             .invokeRestApi(httpRequest)
    //             .pipe(
    //               map((res: IHttpSuccessPayload<any>) =>
    //                 res.body?.bic?? null
    //               )
    //             )                
    //             .pipe(map((res: any) => {
    //               console.log(res);
    //               if(res.Body=null){
    //                 console.log(res);
    //                 console.log("BIC");
    //                 return {'invalid_bic':true}; 
    //               }                    
    //            return control.errors;
    //       }
    //       ),
    //                 catchError((err:any) => {
    //                       return of({'invalid_bic':true})
    //                     }));
              
    //           }
    //         }
    // }
    bicFetchValidation(
      
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
        
          console.log('BIC checked is',control.value);
          let formMode=bicMap.get('formMode')
          if(formMode=='D'){
            return of(null) 
          }
          else{
          let bankCode:any;
          let branchCode:any;
          let branchAddress:any;
        let bic = control.value.toUpperCase();
              console.log('BIC',bic);
              const httpRequest = new HttpRequest();
                httpRequest.setMethod('GET');
                httpRequest.addHeaderParamter('serviceCode', 'DEPBICVALIDATION');
                httpRequest.setContextPath('Payments');
                httpRequest.addPathParameter('bicCode',bic);
                httpRequest.setResource('/bic/{bicCode}');
              return this._httpProvider
                .invokeRestApi(httpRequest)
                .pipe(
                  map((res: IHttpSuccessPayload<any>) =>
                    res.body?.bic?? null
                  )
                )                
                .pipe(map((res: any) => {
                  console.log(res);
                  if(res){
                    eventEmitter.emit({
                      eventName: 'bicDataReceived',
                      payload: res                        
                    });
                   
                  }                    
               return null;
          }
          ),
          catchError((err: IHttpErrorPayload) => {
            let error: any = {};
            error['invalid_bic'] = true;
            return of(error);
          })
      );
        }
      
          }
         
    };
}