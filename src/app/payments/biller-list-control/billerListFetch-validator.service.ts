import {  EventEmitter, Injectable } from "@angular/core";
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { Observable, catchError, map, of } from "rxjs";
import { CriteriaQuery, HttpProviderService, HttpRequest, IHttpErrorPayload, IHttpSuccessPayload } from "@fpx/core";
import * as moment from "moment";
// import { CommonService } from "src/app/foundation/validator-service/common-service";


@Injectable()
export class BillerIdFetchValidatorService {
    constructor(
      private _httpProvider: HttpProviderService){
    }

      
    billerListFetchValidation(
      
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
              let billerId=control.value;
              console.log('billerId',billerId);
              const httpRequest = new HttpRequest();
                httpRequest.setMethod('GET');
                httpRequest.addPathParameter('billerId',billerId);
                const todayDate = new Date();
                let currentDate = moment(todayDate).format("YYYY-MM-DD");
                httpRequest.setContextPath('BillPayments');
                httpRequest.addPathParameter('effDate',currentDate);
                httpRequest.addHeaderParamter('latest','Y')
                httpRequest.setResource('/billinquiryparam/{billerId}/{effDate}');
              //  httpRequest.setResource('/biller/{billerId}');
              return this._httpProvider
                .invokeRestApi(httpRequest)
                .pipe(
                  map((res: IHttpSuccessPayload<any>) =>
                    res.body?.billinquiryparam?? null
                  )
                )                
                .pipe(map((res: any) => {
                  console.log(res);
                  if(res){
                    eventEmitter.emit({
                      eventName: 'billerIdReceived',
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


          billerFetchValidation(
      
            eventEmitter: EventEmitter<{
              eventName: string;
              payload: any;
            }>,
          bicMap:Map<string,string>
          ): AsyncValidatorFn {
            console.warn('Biller validation begins');
            
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
                    let billerId=control.value;
                    console.log('billerId',billerId);
                    const httpRequest = new HttpRequest();
                      httpRequest.setMethod('GET');
                      httpRequest.setContextPath('BillPayments');
                      httpRequest.addPathParameter('billerId',billerId);
                      // const todayDate = new Date();
                      // let currentDate = moment(todayDate).format("YYYY-MM-DD");
                      // httpRequest.addPathParameter('effDate',currentDate);
                      // httpRequest.addHeaderParamter('latest','Y')
                      httpRequest.setResource('/biller/{billerId}');
                    //  httpRequest.setResource('/biller/{billerId}');
                    return this._httpProvider
                      .invokeRestApi(httpRequest)
                      .pipe(
                        map((res: IHttpSuccessPayload<any>) =>
                          res.body?.biller?? null
                        )
                      )                
                      .pipe(map((res: any) => {
                        console.log(res);
                        if(res){
                          eventEmitter.emit({
                            eventName: 'billerIdDataReceived',
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