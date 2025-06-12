import { ChangeDetectorRef, EventEmitter, Injectable } from "@angular/core";
import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from "@angular/forms";
import { Observable, catchError, map, of, throwError } from "rxjs";
import {
  CriteriaQuery,
  HttpProviderService,
  HttpRequest,
  IHttpErrorPayload,
  IHttpSuccessPayload,
} from "@fpx/core";
import { DelegateuserMaintanence } from "../delegateuser-service/delegateuser.model";
import { DelegateUsernameControlComponent } from "./delegate-username-control.component";

@Injectable()
export class CustomerValidatorService {
  constructor(private _httpProvider: HttpProviderService) {}
//     getControlName(c: AbstractControl): string | null {
//       const formGroup = c.parent?.controls;
//       return Object.keys(formGroup).find(name => c === formGroup[name]) || null;

//   }
  user(payload: any) {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setMethod("POST");
      httpRequest.setResource("/depvalidateuser");
      let bodyContent = { username: payload };
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest);
    };
  }

  username(
    eventEmitter: EventEmitter<{
      eventName: string;
      payload: any | null;
    }>,
    userNameMap:Map<string,string>
  ): AsyncValidatorFn {
    console.warn("Customer Details Validator Begins");
    return (
      control: AbstractControl
    ):
      | Promise<ValidationErrors | null>
      | Observable<ValidationErrors | null> => {
        let formMode=userNameMap.get('formMode')
            if(formMode=='D' || formMode=='M' ){
              return of(null) 
            }
      else{
      let payload = control.value.toUpperCase();
      if (payload) {
        const httpRequest = new HttpRequest();
        httpRequest.setMethod("POST");
        httpRequest.setResource("/depvalidateuser");
        httpRequest.setContextPath('IAM');
        let bodyContent = { 
          username: payload,
        //   isRegister:'0'
         };
        httpRequest.setBody(bodyContent);
        return this._httpProvider.invokeRestApi(httpRequest).pipe(
          map(
            (response: any) => {
            let error: any = {};
            if(response?.body?.status && response?.body?.status == "1"){
              error["Existing_User"] = true;
            } 
            else {
              error = null;
            }
            return error;
          }),
          catchError(
            (err: any) => {
            let error: any = {};
            if(err?.error?.ErrorCode =="DEP10001"){
              error["Existing_User"] = true;
            }
            return of(error);
        
          })
        );
      } else {
        return of(null);
      }
    }
    };
  }

  delegateusername(
       
         eventEmitter: EventEmitter<{
           eventName: string;
           payload: any;
         }>,
         userNameMap:Map<string,string>
       ): AsyncValidatorFn {
         console.warn('Username validation begins');
         
         return (
           control: AbstractControl
         ):
           | Promise<ValidationErrors | null>
           | Observable<ValidationErrors | null> => { 
           
             console.log('Username checked is',control.value);
             let formMode=userNameMap.get('formMode')
             if(formMode=='D' || formMode=='M'){
               return of(null) 
             }
             else{
             
                 let userName=control.value;
                 console.log('UserName',userName);
                 const httpRequest = new HttpRequest();
                 httpRequest.setMethod('GET');
                 httpRequest.setResource('/delegateuser');
                 httpRequest.setContextPath('Common');
                 const httpCriteria = new CriteriaQuery();
                 httpCriteria.addFilterCritertia('userName', 'String', 'equals', {
                   searchText: userName,
                 });
                 httpRequest.setCriteriaQuery(httpCriteria);
                 return this._httpProvider
                 .invokeRestApi(httpRequest)
           .pipe(
             map((res: IHttpSuccessPayload<DelegateuserMaintanence>) =>{
                 console.log(res);
                 if(res.body?.delegateuser!=null){
                     console.log(res);
                     console.log("UserName");
                     return {'username_exists_error':true}; 
                 }
                 eventEmitter.emit({
                     eventName: 'nickNameReceived',
                     payload: {
                       'userName':DelegateUsernameControlComponent
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
