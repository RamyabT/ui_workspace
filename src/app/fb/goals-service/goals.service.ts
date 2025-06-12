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
import { map, Observable, of,catchError } from 'rxjs';
import { GoalData,  Goals } from './goals.model';

@Injectable({
  providedIn: 'root',
})
export class GoalsService  implements BaseFpxDataService<any> {
  constructor(private _httpProvider : HttpProviderService) {}



    create(payload: Goals,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): CreateFn<any> {
      return () => {
        const httpRequest = new HttpRequest();
        httpRequest.setMethod('POST');
        httpRequest.setResource('/goals');
        httpRequest.setContextPath("Accounts");
        let bodyContent = {"fbgoalsreq":payload};
        httpRequest.setBody(bodyContent);
        return this._httpProvider.invokeRestApi(httpRequest,httpOption);
      };
    }
    
 
  modify(payload: any): ModifyFn<any> {
    throw new Error('Method not implemented.');
  }

   findByKey(key: Goals,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindByKeyFn<Goals|null> {
    return () => {
      const httpRequest = new HttpRequest();
       httpRequest.setResource('/goals/{inventoryNumber}');
       httpRequest.addPathParameter('inventoryNumber', key.inventoryNumber);
      httpRequest.setMethod('GET');
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) => res.body?.goals ?? null),catchError((err:any) => {
              return of(null)
            }));
      };
  }


findAll(criteriaQuery: CriteriaQuery,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindAllFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/goals');
      httpRequest.setMethod('GET');
      httpRequest.addHeaderParamter('serviceCode', 'RETAILGOALINFO');
      httpRequest.setContextPath('Accounts');
      criteriaQuery.setPageCount(1000)
       httpRequest.setCriteriaQuery(criteriaQuery);
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(
          map(
            (res: IHttpSuccessPayload<GoalData>) =>{
             return{
              data:res.body?.goals || [],
              totalRowCount:res.headers.get('Totalrowcount')
              }
            }
          )
        );
    };
  }

 lookup(key: any,httpOption : Map<keyof FpxIHttpOption, Map<string, any>> = new Map(),criteriaQuery: CriteriaQuery = new CriteriaQuery()): LookUpFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setMethod('GET');
      httpRequest.setResource('/goals');
      httpRequest.addQueryParameter('lookup', 1);
      httpRequest.setCriteriaQuery(criteriaQuery);
      return this._httpProvider.invokeRestApi(httpRequest).pipe(
        map((res: IHttpSuccessPayload<ILookupResponse>) => {
          return res.body?.Data || [];
        })
      );
    };
  }
 
  fetchGoals(accountNumber:any):Observable<any>{
    const httpRequest = new HttpRequest();
              httpRequest.setResource('/goallist/{childAccNo}');
              httpRequest.setContextPath('Accounts');
              httpRequest.addPathParameter('childAccNo', accountNumber);
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
}
 

