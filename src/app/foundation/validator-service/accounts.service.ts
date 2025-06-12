import { EventEmitter, Injectable } from "@angular/core";
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { ErrorFormat, HttpProviderService, HttpRequest, IHttpErrorPayload, IHttpSuccessPayload } from "@fpx/core";
import { Observable, catchError, map, of } from "rxjs";



@Injectable({
    providedIn:'root'
})
export class AccountsService{
    constructor(private _httpProvider: HttpProviderService) { }
    // chequeNumValidator(): AsyncValidatorFn {
    //     console.warn('cheque comp status async validator');
    //     return (
    //       control: AbstractControl
    //     ):
    //       | Promise<ValidationErrors | null>
    //       | Observable<ValidationErrors | null> => {
    //       console.warn('IN chequeNumberControlValidation');
    //       if (control.value) {
    
    //         const key = control.parent?.getRawValue() || {};
    
    //         const httpRequest = new HttpRequest();
    //         httpRequest.setResource('/account/{accountNum}/cheque/{chequeNum}');
    //         httpRequest.addPathParameter('accountNum', key.accountNumber);
    //         if (key.chequeNumber) {
    //           httpRequest.addPathParameter('chequeNum', key.chequeNumber);
    //         }
    //         else {
    //           httpRequest.addPathParameter('chequeNum', key.fromChequeNumber);
    //           httpRequest.addQueryParameter('toChequeNum',key.toChequeNumber);
    //         }
    //        // httpRequest.addQueryParameter('status',"S");
    //         httpRequest.setMethod('GET');
    //         return this._httpProvider
    //           .invokeRestApi(httpRequest)
    //           .pipe(map((res: any) => {
    //             return null;
    //           }), 
    //             catchError((err: any) => {
    //               let error: ErrorFormat = {};
    //               error[err.error.errorCode] = true;
    //               return of(error);
      
    //             })
    //           );
    //       } else {
    //         return of(null)
    //       }
    //     };
    //   }
    AccountNickNameValidator(control: AbstractControl): Observable<any> {
      if (control.value) {
        const key = control.parent?.getRawValue() || {};
  
        const httpRequest = new HttpRequest();
        httpRequest.setResource('/account/nickname/{nickName}');
        httpRequest.setContextPath('Accounts');
        httpRequest.addPathParameter('nickName', key.nickName);
        let bodyContent = {};
        httpRequest.setBody(bodyContent);
  
        httpRequest.setMethod('GET');
        return this._httpProvider
          .invokeRestApi(httpRequest)
          .pipe(map((res: any) => {
            return null;
          }),
            catchError((err: any) => {
              //let error  ={}
              //error[err.error.errorCode] =true
              return of(err.error.ErrorCode);
            })
          );
      }
      else {
        return of(null);
      }
    }
      chequeNumValidator(control: AbstractControl):Observable<any>{
    
        if (control.value) {
  
          const key = control.parent?.getRawValue() || {};
  
          const httpRequest = new HttpRequest();
          httpRequest.setResource('/account/{accountNum}/cheque/{chequeNum}');
          httpRequest.setContextPath('Accounts');
          httpRequest.addHeaderParamter('serviceCode','CHEQUENUMBERVALIDATOR');
          httpRequest.addPathParameter('accountNum', key.accountNumber);
          if (key.chequeNumber) {
            httpRequest.addPathParameter('chequeNum', key.chequeNumber);
          }
          else {
            httpRequest.addPathParameter('chequeNum', key.fromChequeNumber);
            httpRequest.addQueryParameter('toChequeNum',key.toChequeNumber);
          }
          // httpRequest.addQueryParameter('status', 'S');
          let bodyContent ={};
          httpRequest.setBody(bodyContent);
          httpRequest.setMethod('GET');
          // httpRequest.setContextPath('Accounts');
          return this._httpProvider
            .invokeRestApi(httpRequest)
            .pipe(map((res: any) => {
              return null;
            }), 
              catchError((err: any) => {
               //let error  ={}
               //error[err.error.errorCode] =true
                return of(err.error.errorCode);
              })
            );
      }
      else{
      return of(null);
      }
    }
    account(accountNumber:any){
      const httpRequest = new HttpRequest();
          httpRequest.setResource('/casaaccount/{accountNumber}');
          httpRequest.setContextPath('Accounts');
          httpRequest.addPathParameter('accountNumber', accountNumber);
          httpRequest.setMethod('GET');
          return this._httpProvider
          .invokeRestApi(httpRequest)
          .pipe(map((res: any) => {
            return res.body;
          }), 
            catchError((err: any) => {
             //let error  ={}
             //error[err.error.errorCode] =true
              return of(err.error.errorCode);
            })
          );
          
    }
    estmtAccountValidation(value :any) {
    
      console.warn('Estatament  async validator');
  
          const httpRequest = new HttpRequest();
          httpRequest.setResource('/account/{accountNum}/estatement');
          httpRequest.setContextPath('Accounts');
          httpRequest.addHeaderParamter('serviceCode','RETAILESTMTVALIDATE');
           httpRequest.addPathParameter('accountNum', value);
          httpRequest.setMethod('GET');
          let bodyContent = {};
        httpRequest.setBody(bodyContent);
        // httpRequest.setContextPath('Accounts');
          return this._httpProvider
            .invokeRestApi(httpRequest).pipe(
              map((res:any) => {
                  return res}),
            catchError((err: IHttpErrorPayload) => {
              let error: any = {};
              // error[err.error.errorCode] = true;
              error[err.error.errorCode] = true;
              return of(error);
            })
          );
          
      };
      downloadAccountDetails(accountNumber: any): Observable<any> {
        const httpRequest = new HttpRequest();
        httpRequest.addPathParameter("accountNumber", accountNumber)
        httpRequest.setResource("/downloadaccountdetails/{accountNumber}");
        httpRequest.setContextPath('Accounts');
        httpRequest.setMethod("GET");
        return this._httpProvider.invokeDownloadApi(httpRequest)
      };
      AccountPinValidator(payload:any,accountNumber:any):Observable<any>{
        const httpRequest = new HttpRequest();
        httpRequest.setResource('/account/{accountNumber}/pin');
        httpRequest.addHeaderParamter('serviceCode','ACCOUNTCURRENTPINVALIDATION')
        httpRequest.addPathParameter('accountNumber', accountNumber);
        // let bodyContent ={
          

        // };
        httpRequest.setBody(payload);
        httpRequest.setMethod('POST');
         httpRequest.setContextPath('Accounts');
        return this._httpProvider
          .invokeRestApi(httpRequest)
          .pipe(map((res: any) => {
            return null;
          }), 
            catchError((err: any) => {
              return of(err.error);
            })
          );
      }

      ManageTransactionLimits(){
        const httpRequest = new HttpRequest();
          httpRequest.setResource('/service/transaction/limits');
          httpRequest.addHeaderParamter('serviceCode','RETAILTRANLIMITSDETAILS')
          httpRequest.setContextPath('Accounts');
          httpRequest.setMethod('GET');
          return this._httpProvider
          .invokeRestApi(httpRequest)
          .pipe(map((res: any) => {
            return res.body;
          }), 
            catchError((err: any) => {
              return of(err.error.errorCode);
            })
          );
        }
}