// import { Injectable, EventEmitter } from '@angular/core';
// import {
//   AsyncValidatorFn,
//   AbstractControl,
//   ValidationErrors,
// } from '@angular/forms';
// import {
//   BaseFpxDataService,
//   CreateFn,
//   FindAllFn,
//   FindByKeyFn,
//   HttpRequest,
//   LookUpFn,
//   ModifyFn,
//   PatchFn,
//   CriteriaQuery,
//   HttpProviderService,
//   ILookUpData,
//   FpxIHttpOption
// } from '@fpx/core';
// import { IHttpSuccessPayload,ILookupResponse } from '@fpx/core';
// import { map, Observable, of,catchError } from 'rxjs';
// import { BalanceConfirmationDetails } from './BalanceConfirmationDetails.model';

// @Injectable({
//   providedIn: 'root',
// })
// export class BalanceConfirmationDetailsService  implements BaseFpxDataService<any> {
//   constructor(private _httpProvider : HttpProviderService) {}

//   findAll(): FindAllFn<any> {
//     throw new Error('Method not implemented.');
//   }
//   create(payload: any): CreateFn<any> {
//     throw new Error('Method not implemented.');
//   }
//   modify(payload: any): ModifyFn<any> {
//     throw new Error('Method not implemented.');
//   }

//    findByKey(key: BalanceConfirmationDetails,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindByKeyFn<BalanceConfirmationDetails|null> {
//     return () => {
//       const httpRequest = new HttpRequest();
//        httpRequest.setResource('/BalanceConfirmationDetails/{inventoryNumber}/{serialNo}');
//        httpRequest.addPathParameter('inventoryNumber', key.inventoryNumber);
//        httpRequest.addPathParameter('serialNo', key.serialNo);
//       httpRequest.setMethod('GET');
//       return this._httpProvider
//         .invokeRestApi(httpRequest,httpOption)
//         .pipe(map((res: IHttpSuccessPayload<any>) => res.body?.balanceConfirmationDetails ?? null),catchError((err:any) => {
//               return of(null)
//             }));
//       };
//   }

//  lookup(key: any,httpOption : Map<keyof FpxIHttpOption, Map<string, any>> = new Map(), criteriaQuery: CriteriaQuery  = new CriteriaQuery()): LookUpFn<any> {
//     return () => {
//       const httpRequest = new HttpRequest();
//       httpRequest.setMethod('GET');
//       httpRequest.setResource('/BalanceConfirmationDetails');
//       httpRequest.addQueryParameter('lookup', 1);
//       return this._httpProvider.invokeRestApi(httpRequest).pipe(
//         map((res: IHttpSuccessPayload<ILookupResponse>) => {
//           return res.body?.Data;
//         })
//       );
//     };
//   }
 

// }
 

