// import { Injectable } from "@angular/core";
// import { AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn } from "@angular/forms";
// import { HttpProviderService, HttpRequest, IHttpErrorPayload, IHttpSuccessPayload } from "@fpx/core";
// import { Observable, map, catchError, of } from "rxjs";


// @Injectable({
//   providedIn: "root"
// })
// export class IBANValidationService {

//   constructor(private _httpProvider: HttpProviderService) { }

//   chequeNumValidator(): AsyncValidatorFn {
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
//         httpRequest.setMethod('GET');
//         return this._httpProvider
//           .invokeRestApi(httpRequest)
//           .pipe(map((res: any) => {
//             return null;
//           }), 
//             catchError((err: IHttpErrorPayload) => {
//               let error: any = {};
//               error['Invalid_Cheque_number'] = true;
//               return of(error);
//             })
//           );
//       } else {
//         return of(null)
//       }
//     };
//   }
// }


import { Injectable } from "@angular/core";
import { AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn } from "@angular/forms";
import { HttpProviderService, HttpRequest, IHttpErrorPayload, IHttpSuccessPayload } from "@fpx/core";
import { Observable, map, catchError, of } from "rxjs";


@Injectable({
  providedIn: "root"
})
export class IBANValidationService {

  constructor(private _httpProvider: HttpProviderService) { }

  IBANValidation(value:any) {
    console.warn('IBan async validator');
   
        const httpRequest = new HttpRequest();
        httpRequest.setResource('/iban/{ibannumber}');
        httpRequest.addPathParameter('ibannumber', value);
        httpRequest.addHeaderParamter('serviceCode', 'CORPBENEDOMESTIC');
        httpRequest.setMethod('GET');
        return this._httpProvider
          .invokeRestApi(httpRequest)
          .pipe(map((res: any) => {
            return res.body;
          }), 
            catchError((err: IHttpErrorPayload) => {
              return of(err.error);
            })
          );
      }
    }
