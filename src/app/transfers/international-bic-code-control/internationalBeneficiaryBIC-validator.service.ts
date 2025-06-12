import {  EventEmitter, Injectable } from "@angular/core";
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { Observable, catchError, map, of } from "rxjs";
import { CriteriaQuery, HttpProviderService, HttpRequest, IHttpErrorPayload, IHttpSuccessPayload } from "@fpx/core";
import {  BeneficiariesMaintanence } from "../beneficiaries-service/beneficiaries.model";
import { CommonService } from "src/app/foundation/validator-service/common-service";


@Injectable()
export class InternationalBeneficiaryBICValidator {
    constructor(
      private _httpProvider: HttpProviderService,
      private commonService:CommonService){
    }

    //   BICValidation(
      
    //     eventEmitter: EventEmitter<{
    //       eventName: string;
    //       payload: any;
    //     }>,
    //     dependentFieldMap: Map<string, string>
    //   ): AsyncValidatorFn {
    //     console.warn('BIC validation begins');
        
    //     return (
    //       control: AbstractControl
    //     ):
    //       | Promise<ValidationErrors | null>
    //       | Observable<ValidationErrors | null> => { 
          
    //         console.log('BIC checked is',control.value);
    //             let bic=control.value;
    //             console.log('BIC',bic);
    //            let isValidationRequired = dependentFieldMap.get('isValidationRequired');
    //             const httpRequest = new HttpRequest();
    //             httpRequest.setContextPath('Payments');
    //             httpRequest.setMethod('GET');
    //             httpRequest.addHeaderParamter('serviceCode', 'DEPBICVALIDATION');
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
    //                   if(dependentFieldMap.get('isValidationRequired')=='0'){
    //                     let error: any = {};
                                
    //                             return of(error);
          
    //                   }
    //                   else{
    //                       return of({'invalid_bic':true})
    //                   }
    //                     }));
              
    //           }
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
          let bankCode:any;
          let branchCode:any;
          let branchAddress:any;
          let isValidationRequired=bicMap.get('isValidationRequired')
              let bic = control.value.toUpperCase();
              console.log('BIC',bic);
              const httpRequest = new HttpRequest();
              httpRequest.setContextPath('Payments');
                httpRequest.setMethod('GET');
                httpRequest.addHeaderParamter('serviceCode', 'DEPBICVALIDATION');
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
                      eventName: 'bicReceived',
                      payload: res                        
                    });
                   
                  }                    
               return control.errors;
          }
          ),
          catchError((err: IHttpErrorPayload) => {
            if(bicMap.get('isValidationRequired')=='0'){
              let error: any = {};
                      
                      return of(error);

            }
            else{
            let error: any = {};
                      error['invalid_bic'] = true;
                      return of(error);
            }
          })
      );
      
          }
         
    };
}