import {  EventEmitter, Injectable } from "@angular/core";
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { Observable, catchError, map, of } from "rxjs";
import { CriteriaQuery, HttpProviderService, HttpRequest, IHttpErrorPayload, IHttpSuccessPayload } from "@fpx/core";
import { BeneNicknameControlComponent } from "./bene-nickname-control.component";
import { BeneficiariesMaintanence } from "../beneficiaries-service/beneficiaries.model";

@Injectable()
export class NicknameValidator {
    constructor(
      private _httpProvider: HttpProviderService){
    }
    nickNameValidation(
      
        eventEmitter: EventEmitter<{
          eventName: string;
          payload: any;
        }>,
        nameMap:Map<string,string>
      ): AsyncValidatorFn {
        console.warn('Nickname validation begins');
        
        return (
          control: AbstractControl
        ):
          | Promise<ValidationErrors | null>
          | Observable<ValidationErrors | null> => { 
          
            console.log('Nickname checked is',control.value);
            let formMode=nameMap.get('formMode')
            if(formMode=='D'){
              return of(null) 
            }
            else{
            
                let beneNickName=control.value;
                console.log('NickName',beneNickName);
                const httpRequest = new HttpRequest();
                httpRequest.setMethod('GET');
                httpRequest.setResource('/beneficiaries');
                httpRequest.setContextPath('Payments');
                const httpCriteria = new CriteriaQuery();
                httpCriteria.addFilterCritertia('beneNickName', 'String', 'equals', {
                  searchText: beneNickName,
                });
                httpRequest.setCriteriaQuery(httpCriteria);
                return this._httpProvider
                .invokeRestApi(httpRequest)
          .pipe(
            map((res: IHttpSuccessPayload<BeneficiariesMaintanence>) =>{
                console.log(res);
                if(res.body?.beneficiaries!=null){
                    console.log(res);
                    console.log("NickName");
                    return {'nickname_exists_error':true}; 
                }
                eventEmitter.emit({
                    eventName: 'nickNameReceived',
                    payload: {
                      'nickName':BeneNicknameControlComponent
                    }
                    
                  });
                  return control.errors;
            }),
            catchError((err: IHttpErrorPayload) => {
              let error: any = {};
              // error[err.error.errorCode] = true;
              
              error['nickname_fetch_error'] = true;
              // this.changeDetectorRef.markForCheck(); 
              return of(error);
            })
        );
          }
            }
           
      };
    }
  