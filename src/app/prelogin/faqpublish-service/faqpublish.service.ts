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
 import { Faqpublish, FaqpublishMaintanence } from './faqpublish.model';
@Injectable()
export class FaqpublishService implements BaseFpxDataService<any> {
 constructor(private _httpProvider : HttpProviderService) { }
  create(payload: Faqpublish,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): CreateFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setMethod('POST');
      httpRequest.setResource('/faqpublish');
      let bodyContent = {"faqpublish":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
 
  findByKey(key: Faqpublish,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindByKeyFn<Faqpublish|null> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/faqpublish/{applnCode}/{effDate}');
       httpRequest.addPathParameter('applnCode', key.applnCode);
       httpRequest.addPathParameter('effDate', key.effDate);
       httpRequest.addHeaderParamter('latest','Y');
      httpRequest.setMethod('GET');
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) =>{return  res.body ?{  ...res.body.faqpublish , unauthRecordFlag: res.headers.get('unauthRecordFlag') } : null}));
        
    };
  }
  modify(payload: Faqpublish,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/faqpublish/{applnCode}/{effDate}');
       httpRequest.addPathParameter('applnCode', payload.applnCode);
       httpRequest.addPathParameter('effDate', payload.effDate);
     httpRequest.setMethod('PUT');
      let bodyContent = {"faqpublish":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
   delete(payload: Faqpublish,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/faqpublish/{applnCode}/{effDate}');
       httpRequest.addPathParameter('applnCode', payload.applnCode);
       httpRequest.addPathParameter('effDate', payload.effDate);
     httpRequest.setMethod('DELETE');
      let bodyContent = {"faqpublish":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
   patch(payload: Faqpublish,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): PatchFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/faqpublish/{applnCode}/{effDate}');
       httpRequest.addPathParameter('applnCode', payload.applnCode);
       httpRequest.addPathParameter('effDate', payload.effDate);
     httpRequest.setMethod('PUT');
      let bodyContent = {"faqpublish":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
  
   findAll(criteriaQuery: CriteriaQuery,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindAllFn<FaqpublishMaintanence> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/faqpublish');
      httpRequest.setMethod('GET');
      httpRequest.setCriteriaQuery(criteriaQuery);
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(
          map(
            (res: IHttpSuccessPayload<FaqpublishMaintanence>) =>{
             return{
              data:res.body?.faqpublish || [],
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
    httpRequest.setResource('/faqpublish');
    httpRequest.addQueryParameter('lookup', 1);
    httpRequest.setCriteriaQuery(criteriaQuery);
    return this._httpProvider.invokeRestApi(httpRequest,httpOption).pipe(
        map((res: IHttpSuccessPayload<ILookupResponse>) => {
          return res.body?.Data || [];
        })
      );
    };
  }
  fetchStatistics(criteriaQuery: CriteriaQuery,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindAllFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource("/faqpublish/statistics");
      httpRequest.setMethod("GET");
      httpRequest.setCriteriaQuery(criteriaQuery);
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) => res.body));
    };
  }
  
}
