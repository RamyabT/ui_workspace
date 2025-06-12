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
import { Etransfercontact } from './etransfercontact.model';

@Injectable({
  providedIn: 'root',
})
export class EtransfercontactService  implements BaseFpxDataService<any> {
  constructor(private _httpProvider : HttpProviderService) {}

  create(payload: any): CreateFn<any> {
    throw new Error('Method not implemented.');
  }
  modify(payload: any): ModifyFn<any> {
    throw new Error('Method not implemented.');
  }

   findByKey(key: Etransfercontact,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindByKeyFn<Etransfercontact|null> {
    return () => {
      const httpRequest = new HttpRequest();
       httpRequest.setResource('/etransfercontact/{beneId}');
       httpRequest.addHeaderParamter('serviceCode','GETETRFCONTACTREG');
       httpRequest.setContextPath('Payments');
       httpRequest.addPathParameter('beneId', key.beneId);
      httpRequest.setMethod('GET');
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) => res.body?.etransfercontact ?? null),catchError((err:any) => {
              return of(null)
            }));
      };
  }

 lookup(key: any,httpOption : Map<keyof FpxIHttpOption, Map<string, any>> = new Map(),criteriaQuery: CriteriaQuery = new CriteriaQuery()): LookUpFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setMethod('GET');
      httpRequest.setResource('/etransfercontact');
      httpRequest.setContextPath('Payments');
      httpRequest.addHeaderParamter('serviceCode','GETALLETRFCONTACTREG');
      // httpRequest.addQueryParameter('lookup', 1);
      // httpRequest.setCriteriaQuery(criteriaQuery);
      criteriaQuery.removeFilterCriteria('text');

    if(key.searchText){
      criteriaQuery.setFilterExpression("or");
      criteriaQuery.addFilterCritertia('firstName','String','contains',{
        searchText : key.searchText
      })
      criteriaQuery.addFilterCritertia('phoneNumber','String','contains',{
        searchText : key.searchText
      })
      criteriaQuery.addFilterCritertia('emailId','String','contains',{
        searchText : key.searchText
      })
    }

    httpRequest.setCriteriaQuery(criteriaQuery);
    return this._httpProvider.invokeRestApi(httpRequest,httpOption).pipe(
        map((res: IHttpSuccessPayload<any>) => {
          res.body?.etransfercontact?.map((item:any) => item.id = item.beneId);
          return res.body?.etransfercontact || [];
        })
      );
    };
  }
 
  findAll(criteriaQuery: CriteriaQuery,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindAllFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/etransfercontact');
      httpRequest.setMethod('GET');
      httpRequest.addHeaderParamter('serviceCode','GETALLETRFCONTACTREG');
      httpRequest.setCriteriaQuery(criteriaQuery);
      httpRequest.setContextPath('Payments');
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(
          map(
            (res: IHttpSuccessPayload<any>) =>{
             return{
              data:res.body?.etransfercontact || [],
              totalRowCount:res.headers.get('Totalrowcount')
              }
            }
          )
        );
    };
  }

  getEtransferContacts(): FindAllFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setMethod('GET');
      httpRequest.setResource('/etransfercontact');
      httpRequest.addHeaderParamter('serviceCode','GETALLETRFCONTACTREG');
      httpRequest.setContextPath('Payments');
      return this._httpProvider.invokeRestApi(httpRequest).pipe(
        map((res: IHttpSuccessPayload<any>) => {
          return res.body.etransfercontact;
        })
      );
    };
  }
 
 
}
 

