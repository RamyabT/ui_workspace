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
import { map, Observable, of, catchError } from 'rxjs';
import { Billeraccount, BilleraccountMaintanence } from './billeraccount.model';
import { AppConfigService } from '@dep/services';
@Injectable()
export class BilleraccountService implements BaseFpxDataService<any> {
  private _correlationId: string = '';

  constructor(private _httpProvider: HttpProviderService, private _appConfig: AppConfigService) { }
  create(payload: Billeraccount, httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): CreateFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setMethod('POST');
      httpRequest.setContextPath('BillPayments');
      httpRequest.setResource('/billeraccountreq');
      let bodyContent = { "billeraccountreq": payload };
      httpRequest.addHeaderParamter('serviceCode', 'RETAILBILLERACCOUNT')
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest, httpOption);
      // const httpRequest = new HttpRequest();
      // httpRequest.setMethod('POST');
      // httpRequest.setContextPath('BillPayments');
      // httpRequest.setResource('/billeraccount');
      // let bodyContent = {"billeraccount":payload};
      // httpRequest.setBody(bodyContent);
      // return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }

  validateUniqueCreditAccount(key: any, httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindByKeyFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/validateCreditAccount');
      httpRequest.setContextPath('BillPayments');
      httpRequest.addQueryParameter('billerCreditAccount', key.billerCreditAccount);
      httpRequest.setMethod('GET');
      return this._httpProvider.invokeRestApi(httpRequest, httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) => { return res?.body?.validateCreditAccount }));
    };
  }

  validatebiller(payload: any, httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindByKeyFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setMethod('POST');
      httpRequest.setContextPath('BillPayments');
      httpRequest.setResource('/validatebiller');
      let bodyContent = { "billeraccount": payload };
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest, httpOption);
    };
  }


  findByKey(key: Billeraccount, httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindByKeyFn<Billeraccount | null> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/billeraccount/{billerBeneficiaryId}');
      httpRequest.setContextPath('BillPayments');
      httpRequest.addPathParameter('billerBeneficiaryId', key.billerBeneficiaryId);
      httpRequest.setMethod('GET');
      return this._httpProvider
        .invokeRestApi(httpRequest, httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) => { return res.body ? { ...res.body.billeraccount, unauthRecordFlag: res.headers.get('unauthRecordFlag') } : null }));

    };
  }
  modify(payload: Billeraccount, httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/billeraccount/{billerBeneficiaryId}');
      httpRequest.setContextPath('BillPayments');
      httpRequest.addPathParameter('billerBeneficiaryId', payload.billerBeneficiaryId);
      httpRequest.setMethod('PUT');
      let bodyContent = { "billeraccount": payload };
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest, httpOption);
    };
  }
  delete(payload: Billeraccount, httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/billeraccount/{billerBeneficiaryId}');
      httpRequest.setContextPath('BillPayments');
      httpRequest.addPathParameter('billerBeneficiaryId', payload.billerBeneficiaryId);
      httpRequest.setMethod('DELETE');
      let bodyContent = { "billeraccount": payload };
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest, httpOption);
    };
  }
  patch(payload: Billeraccount, httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): PatchFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/billeraccount/{billerBeneficiaryId}');
      httpRequest.setContextPath('BillPayments');
      httpRequest.addPathParameter('billerBeneficiaryId', payload.billerBeneficiaryId);
      httpRequest.setMethod('PUT');
      let bodyContent = { "billeraccount": payload };
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest, httpOption);
    };
  }

  findAll(criteriaQuery: CriteriaQuery, httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindAllFn<any> {

    // let billerAccounts = this._appConfig.getData('BILLERACCOUNTAPIRETURNDATA');
    // if (billerAccounts) {
    //   return () => {
    //     return of(billerAccounts);
    //   };
    // }

    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/billeraccount');
      httpRequest.setContextPath('BillPayments');
      httpRequest.setMethod('GET');
      criteriaQuery.addFilterCritertia('status', 'String', 'equals', {
        'searchText': 'A'
      });
      criteriaQuery.addSortCriteria('createdOn', 'desc', 'Timestamp');
      criteriaQuery.setPaginationCriteria('1', 1000);
      httpRequest.setCriteriaQuery(criteriaQuery);
      httpRequest.addHeaderParamter('serviceCode','RETAILSAVEDBILLERLIST');

      if (this._correlationId) {
        httpRequest.addHeaderParamter("correlationId", this._correlationId);
      }

      return this._httpProvider
        .invokeRestApi(httpRequest, httpOption)
        .pipe(
          map(
            (res: IHttpSuccessPayload<BilleraccountMaintanence>) => {
              this._correlationId = '';

              this._appConfig.setData('RETAILBILLPAYEEACCOUNTS', res.body?.billeraccount || []);

              // let billerAccountApiReturnData = {
              //   data: res.body?.billeraccount || [],
              //   totalRowCount: res.headers.get('Totalrowcount')
              // }

              // this._appConfig.setData('BILLERACCOUNTAPIRETURNDATA', billerAccountApiReturnData);


              if (res?.headers?.get('correlationId')) {
                this._correlationId = res.headers.get('correlationId');
              }
              return {
                data: res.body?.billeraccount || [],
                totalRowCount: res.headers.get('Totalrowcount')
              }

            }, (error: any) => {
              console.log("error", error);
              return {
                data: [],
                totalRowCount: 0
              }
            }
          ) ?? null, catchError((res: any) =>{
            return of({
              data: res.error
            }?? null)
          })
        );
    };
  }

  lookup(key: any, httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map(), criteriaQuery: CriteriaQuery = new CriteriaQuery()): LookUpFn<any> {
    return () => {
    const httpRequest = new HttpRequest();
    httpRequest.setMethod('GET');
    httpRequest.setResource('/billeraccount');
    httpRequest.setContextPath('BillPayments');
    httpRequest.addHeaderParamter('serviceCode','RETAILSAVEDBILLERLIST');
    // httpRequest.addQueryParameter('lookup', 1);
    criteriaQuery.addFilterCritertia('status', 'String', 'equals', {
      'searchText': 'A'
    });
    criteriaQuery.setPaginationCriteria('1',1000)
    httpRequest.setCriteriaQuery(criteriaQuery);
    return this._httpProvider.invokeRestApi(httpRequest,httpOption).pipe(
        map((res: IHttpSuccessPayload<any>) => {
          res.body?.billeraccount?.map((item: any) => item.id = item.billerBeneficiaryId);
          return res.body?.billeraccount || [];
        })
      );
    };
  }
  fetchStatistics(criteriaQuery: CriteriaQuery, httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindAllFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setContextPath('BillPayments');
      httpRequest.setResource("/billeraccount/statistics");
      httpRequest.setMethod("GET");
      httpRequest.setCriteriaQuery(criteriaQuery);
      return this._httpProvider
        .invokeRestApi(httpRequest, httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) => res.body));
    };
  }

}
