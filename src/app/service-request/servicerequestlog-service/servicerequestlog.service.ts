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
import { IHttpSuccessPayload, ILookupResponse } from '@fpx/core';
// import { add } from '@amcharts/amcharts4/.internal/core/utils/Array';
import { map, Observable, of, catchError } from 'rxjs';
import { Servicerequestlog, ServicerequestlogMaintanence } from './servicerequestlog.model';
@Injectable()
export class ServicerequestlogService implements BaseFpxDataService<any> {
  private _correlationId: string = '';
  constructor(private _httpProvider: HttpProviderService) { }
  create(payload: Servicerequestlog, httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): CreateFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setMethod('POST');
      httpRequest.setResource('/servicerequestlog');
      let bodyContent = { "servicerequestlog": payload };
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest, httpOption);
    };
  }

  findByKey(key: Servicerequestlog, httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindByKeyFn<Servicerequestlog | null> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/servicerequestlog/{inventoryNumber}');
      httpRequest.addPathParameter('inventoryNumber', key.inventoryNumber);
      httpRequest.setMethod('GET');
      return this._httpProvider
        .invokeRestApi(httpRequest, httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) => { return res.body ? { ...res.body.servicerequestlog, unauthRecordFlag: res.headers.get('unauthRecordFlag') } : null }));

    };
  }
  modify(payload: Servicerequestlog, httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/servicerequestlog/{inventoryNumber}');
      httpRequest.addPathParameter('inventoryNumber', payload.inventoryNumber);
      httpRequest.setMethod('PUT');
      let bodyContent = { "servicerequestlog": payload };
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest, httpOption);
    };
  }
  delete(payload: Servicerequestlog, httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/servicerequestlog/{inventoryNumber}');
      httpRequest.addPathParameter('inventoryNumber', payload.inventoryNumber);
      httpRequest.setMethod('DELETE');
      let bodyContent = { "servicerequestlog": payload };
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest, httpOption);
    };
  }
  patch(payload: Servicerequestlog, httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): PatchFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/servicerequestlog/{inventoryNumber}');
      httpRequest.addPathParameter('inventoryNumber', payload.inventoryNumber);
      httpRequest.setMethod('PUT');
      let bodyContent = { "servicerequestlog": payload };
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest, httpOption);
    };
  }

  findAll(criteriaQuery: CriteriaQuery, httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindAllFn<ServicerequestlogMaintanence> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/servicerequestlog');
      httpRequest.setMethod('GET');
      httpRequest.addHeaderParamter('serviceCode', 'RETAILCBAED');
      criteriaQuery.addSortCriteria('initOn', 'desc', 'Timestamp');
      httpRequest.setCriteriaQuery(criteriaQuery);
      httpRequest.setContextPath('WorkflowService');

      if (this._correlationId) {
        httpRequest.addHeaderParamter("correlationId", this._correlationId);
      }

      return this._httpProvider
        .invokeRestApi(httpRequest, httpOption)
        .pipe(
          map(
            (res: IHttpSuccessPayload<ServicerequestlogMaintanence>) => {
              this._correlationId = '';
              if (res?.headers?.get('correlationId')) {
                this._correlationId = res.headers.get('correlationId');
              }

              return {
                data: res.body?.servicerequestlog || [],
                criteriaQuery : criteriaQuery,
                totalRowCount: res.headers.get('Totalrowcount')
              }
            }
          )
        );
    };
  }

  lookup(key: any, httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map(), criteriaQuery: CriteriaQuery = new CriteriaQuery()): LookUpFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setMethod('GET');
      httpRequest.setResource('/servicerequestlog');
      httpRequest.addQueryParameter('lookup', 1);
      httpRequest.setCriteriaQuery(criteriaQuery);
      httpRequest.setContextPath('WorkflowService');
      return this._httpProvider.invokeRestApi(httpRequest, httpOption).pipe(
        map((res: IHttpSuccessPayload<ILookupResponse>) => {
          return res.body?.Data || [];
        })
      );
    };
  }
  fetchStatistics(criteriaQuery: CriteriaQuery, httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindAllFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource("/servicerequestlog/statistics");
      httpRequest.setMethod("GET");
      httpRequest.setCriteriaQuery(criteriaQuery);
      httpRequest.setContextPath('WorkflowService');
      return this._httpProvider
        .invokeRestApi(httpRequest, httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) => res.body));
    };
  }
  fetchSummary(): Observable<any> {
    const httpRequest = new HttpRequest();
    httpRequest.setResource("/servicerequest/summary");
    httpRequest.setMethod("GET");
    httpRequest.setContextPath('WorkflowService');
    // httpRequest.setCriteriaQuery(criteriaQuery);
    return this._httpProvider
      .invokeRestApi(httpRequest)
      .pipe(map((res: IHttpSuccessPayload<any>) => res.body));
  }

  fetchReadStatus(payload: any): Observable<any> {
    const httpRequest = new HttpRequest();
    httpRequest.setResource("/servicerequestnotification/{sourceReferenceNumber}/{userId}");
    httpRequest.setMethod("GET");
    httpRequest.addPathParameter('sourceReferenceNumber', payload.sourceReferenceNumber);
    httpRequest.addPathParameter('userId', payload.userId);
    httpRequest.setContextPath('WorkflowService');
    // httpRequest.setCriteriaQuery(criteriaQuery);
    return this._httpProvider
      .invokeRestApi(httpRequest)
      .pipe(map((res: IHttpSuccessPayload<any>) => res.body));
  }

  updateReadStatus(payload: any): Observable<any> {
    const httpRequest = new HttpRequest();
    httpRequest.setResource("/servicerequestnotification/{sourceReferenceNumber}/{userId}");
    httpRequest.setMethod("PUT");
    httpRequest.addPathParameter('sourceReferenceNumber', payload.sourceReferenceNumber);
    httpRequest.addPathParameter('userId', payload.userId);
    let bodyContent = { "servicerequestnotification": payload };
    httpRequest.setBody(bodyContent);
    httpRequest.setContextPath('WorkflowService');
    return this._httpProvider.invokeRestApi(httpRequest);
  }

  stopProcess(serviceNumber: any): Observable<any> {
    const httpRequest = new HttpRequest();
    httpRequest.addPathParameter('serviceNumber', serviceNumber);
    httpRequest.setResource("/stop/process/{serviceNumber}");
    httpRequest.setMethod("GET");
    httpRequest.setContextPath('WorkflowService');
    // httpRequest.setCriteriaQuery(criteriaQuery);
    return this._httpProvider
      .invokeRestApi(httpRequest)
      .pipe(map((res: IHttpSuccessPayload<any>) => res));
  }
}
