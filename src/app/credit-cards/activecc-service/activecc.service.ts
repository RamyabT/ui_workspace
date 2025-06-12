import { Injectable, EventEmitter } from '@angular/core';
import {
  AsyncValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import {
  BaseFpxDataService,
  CreateFn,
  FindAllFn,
  FindByKeyFn,
  HttpRequest,
  LookUpFn,
  ModifyFn,
  PatchFn,
  CriteriaQuery,
  HttpProviderService,
  ILookUpData,
  FpxIHttpOption
} from '@fpx/core';
import { IHttpSuccessPayload,ILookupResponse } from '@fpx/core';
//import { add } from '@amcharts/amcharts4/.internal/core/utils/Array';
import { map, Observable, of,catchError } from 'rxjs';
import { Activecc } from './activecc.model';

@Injectable({
  providedIn: 'root',
})
export class ActiveccService  implements BaseFpxDataService<any> {
  constructor(private _httpProvider : HttpProviderService) {}

  findAll(): FindAllFn<any> {
    throw new Error('Method not implemented.');
  }
  create(payload: any): CreateFn<any> {
    throw new Error('Method not implemented.');
  }
  modify(payload: any): ModifyFn<any> {
    throw new Error('Method not implemented.');
  }

   findByKey(key: Activecc,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindByKeyFn<Activecc|null> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setContextPath('CreditCards');

       httpRequest.setResource('/activecc/{cardRefNumber}');
       httpRequest.addPathParameter('cardRefNumber', key.cardRefNumber);
      httpRequest.setMethod('GET');
      httpRequest.addHeaderParamter('serviceCode', 'RETAILCCDETAILS');
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) => res.body?.activecc?? null),catchError((err:any) => {
              return of(null)
            }));
      };
  }

 lookup(key: any,httpOption : Map<keyof FpxIHttpOption, Map<string, any>> = new Map(), criteriaQuery?: CriteriaQuery | undefined): LookUpFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setMethod('GET');
      httpRequest.setResource('/activecc');
      httpRequest.addHeaderParamter('serviceCode', 'RETAILCCACTIVE');
      httpRequest.setContextPath('CreditCards');
      // httpRequest.addQueryParameter('lookup', 1);
      return this._httpProvider.invokeRestApi(httpRequest).pipe(
        map((res: IHttpSuccessPayload<any>) => {
         
          let lookup:any = []
           res.body?.activecc?.forEach((item:any)=>{
              lookup.push({id:item.cardRefNumber,text:item})
           })
           return lookup;
        })
      );
    };
  }
 

}
 

