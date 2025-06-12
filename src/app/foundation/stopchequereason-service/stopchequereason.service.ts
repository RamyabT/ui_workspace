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
// import { add } from '@amcharts/amcharts4/.internal/core/utils/Array';
import { map, Observable, of,catchError } from 'rxjs';
import { Stopchequereason } from './stopchequereason.model';

@Injectable({
  providedIn: 'root',
})
export class StopchequereasonService  implements BaseFpxDataService<any> {
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

   findByKey(key: Stopchequereason,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindByKeyFn<Stopchequereason|null> {
    return () => {
      const httpRequest = new HttpRequest();
       httpRequest.setResource('/stopchequereason/{id}/{code}');
       httpRequest.setContextPath('Accounts');
       httpRequest.addPathParameter('id', key.id);
       httpRequest.addPathParameter('code', key.code);
      httpRequest.setMethod('GET');
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) => res.body?.stopchequereason ?? null),catchError((err:any) => {
              return of(null)
            }));
      };
  }
   stopChequeReasons: any=[];

 lookup(key: any,httpOption : Map<keyof FpxIHttpOption, Map<string, any>> = new Map(), criteriaQuery?: CriteriaQuery | undefined): LookUpFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setMethod('GET');
      httpRequest.setResource('/stopchequereason');
      httpRequest.setContextPath('Accounts');
      httpRequest.addQueryParameter('lookup', 1);
      // httpRequest.setCriteriaQuery(criteriaQuery);
      return this._httpProvider.invokeRestApi(httpRequest).pipe(
        map((res: IHttpSuccessPayload<ILookupResponse>) => {
          this.stopChequeReasons=res.body?.Data;
          return res.body?.Data || [];
        })
      );
    };
  }
 

}
 

