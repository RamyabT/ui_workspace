import {  EventEmitter, Injectable } from "@angular/core";
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { Observable, catchError, map, of } from "rxjs";
import { CriteriaQuery, HttpProviderService, HttpRequest, IHttpErrorPayload, IHttpSuccessPayload } from "@fpx/core";



@Injectable()
export class EtransferContactFetchValidatorService {
    constructor(
      private _httpProvider: HttpProviderService){
    }

      
    etransferContactFetchValidation(
      
      eventEmitter: EventEmitter<{
        eventName: string;
        payload: any;
      }>,
    bicMap:Map<string,string>
    ): AsyncValidatorFn {
      console.warn('etransfer contact');
      
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
                let beneId=control.value
                httpRequest.setMethod('GET');
                httpRequest.setResource('/etransfercontact/{beneId}');
                httpRequest.addHeaderParamter('serviceCode','GETETRFCONTACTREG');
                httpRequest.addPathParameter('beneId',beneId);
                httpRequest.setContextPath('Payments');
              return this._httpProvider
                .invokeRestApi(httpRequest)
                .pipe(
                  map((res: IHttpSuccessPayload<any>) =>
                    res.body?.etransfercontact?? null
                  )
                )                
                .pipe(map((res: any) => {
                  console.log(res);
                  if(res){
                    eventEmitter.emit({
                      eventName: 'contactIdDataReceived',
                      payload: res                        
                    });
                   
                  }                    
               return null;
          }
          ),
          catchError((err: IHttpErrorPayload) => {
            let error: any = {};
            // error[err.error.errorCode] = true;
            
            error['etransfercontact_fetch_error'] = true;
            // this.changeDetectorRef.markForCheck(); 
            return of(error);
          })
      );
        }
      
          }


         
         
    };
//}