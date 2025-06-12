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
  FpxIHttpOption,
  HttpRequestPayload
} from '@fpx/core';
import { IHttpSuccessPayload, ILookupResponse } from '@fpx/core';
//import { add } from '@amcharts/amcharts4/.internal/core/utils/Array';
import { map, Observable, of, catchError, Subject } from 'rxjs';
import { Deposits, DepositsMaintanence, DepositsSummary } from './deposits.model';
import { APPCONSTANTS } from '@dep/constants';
import { ShareInfo } from '@dep/native';
import { TranslateService } from '@ngx-translate/core';
import { ActiveSpaceInfoService } from '@dep/core';
@Injectable(
  {providedIn:"root"}
)
export class DepositsService implements BaseFpxDataService<any> {
  
  depositActionPublisher: Subject<any> | undefined
  depositList!: DepositsSummary[];
  constructor(private _httpProvider: HttpProviderService,
  
     private _shareInfo: ShareInfo,
        private _translate: TranslateService,
        private _activeSpaceInfoService: ActiveSpaceInfoService,
  ) { }
  create(payload: Deposits, httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): CreateFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setMethod('POST');
      httpRequest.setResource('/deposits');
      httpRequest.setContextPath('Deposits');
      let bodyContent = { "deposits": payload };
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest, httpOption);
    };
  }

  findByKey(key: Deposits, httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindByKeyFn<Deposits | null> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/deposits/{accountNumber}');
      httpRequest.addPathParameter('accountNumber', key.accountNumber);
      httpRequest.setContextPath('Deposits');
      httpRequest.addHeaderParamter('serviceCode','RETAILDEPOSIT');
      httpRequest.addQueryParameter('accountType', key.accountType);

      httpRequest.setMethod('GET');
      return this._httpProvider
        .invokeRestApi(httpRequest, httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) => res.body?.deposits ?? null), catchError((err: any) => {
          return of(null)
        }));
    };
  }
  modify(payload: Deposits, httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/deposits/{accountNumber}');
      httpRequest.addPathParameter('accountNumber', payload.accountNumber);
      httpRequest.setContextPath('Deposits');
      httpRequest.setMethod('PUT');
      let bodyContent = { "deposits": payload };
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest, httpOption);
    };
  }
  delete(payload: Deposits, httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/deposits/{accountNumber}');
      httpRequest.addPathParameter('accountNumber', payload.accountNumber);
      httpRequest.setContextPath('Deposits');
      httpRequest.setMethod('DELETE');
      let bodyContent = { "deposits": payload };
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest, httpOption);
    };
  }
  patch(payload: Deposits, httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): PatchFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/deposits/{accountNumber}');
      httpRequest.addPathParameter('accountNumber', payload.accountNumber);
      httpRequest.setContextPath('Deposits');
      httpRequest.setMethod('PUT');
      let bodyContent = { "deposits": payload };
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest, httpOption);
    };
  }

  findAll(criteriaQuery: CriteriaQuery, httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindAllFn<DepositsMaintanence> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/deposits');
      httpRequest.setMethod('GET');
      httpRequest.setContextPath('Deposits');
      httpRequest.addHeaderParamter('serviceCode','RETAILDEPOSITSUMMARY');
      httpRequest.setCriteriaQuery(criteriaQuery);
      return this._httpProvider
        .invokeRestApi(httpRequest, httpOption)
        .pipe(
          map(
            (res: IHttpSuccessPayload<DepositsMaintanence>) => {
              return {
                data: res.body?.deposits || [],
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
      httpRequest.setResource('/deposits');
      httpRequest.setContextPath('Deposits');
      httpRequest.addQueryParameter('lookup', 1);
      httpRequest.setCriteriaQuery(criteriaQuery);
      httpRequest.addQueryParameter('customerCode', key['customerCode']);
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
      httpRequest.setResource("/deposits/statistics");
      httpRequest.setContextPath('Deposits');
      httpRequest.setMethod("GET");
      httpRequest.setCriteriaQuery(criteriaQuery);
      return this._httpProvider
        .invokeRestApi(httpRequest, httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) => res.body));
    };
  }
  
  downloadDetails(accountNumber:any){
    const httpRequest = new HttpRequest();
    httpRequest.setResource("/depositreceipt");
    httpRequest.setContextPath('Deposits');
    httpRequest.addQueryParameter('accountNumber', accountNumber);
    httpRequest.addHeaderParamter('serviceCode','RETAILDEPOSIT');
    httpRequest.addQueryParameter('accountType',this._activeSpaceInfoService.getAccountType());
    // httpRequest.addQueryParameter('customerCode', customerCode);
    httpRequest.setMethod("GET");
    // httpRequest.setCriteriaQuery(criteriaQuery);
    return this._httpProvider.invokeDownloadApi(httpRequest)
  }

  fetchDeposits(): Observable<Deposits[]> {
    const httpRequest = new HttpRequest();
    httpRequest.setMethod('GET');
    httpRequest.setResource('/deposits');
    httpRequest.addHeaderParamter('serviceCode','RETAILDEPOSITSUMMARY');

    httpRequest.setContextPath('Deposits');
    return this._httpProvider.invokeRestApi(httpRequest).pipe(
      map((res: IHttpSuccessPayload<any>) => {
        return res.body.deposits || [];
      })
    );
  }

  shareAccountInfo(cardData: Deposits) {
    let accountInfo: string = APPCONSTANTS.shareAccountInfoData(cardData);
    this._shareInfo.shareInfo(accountInfo, this._translate.instant('DEPOSITSUMMARYCARD.shareSuccess'));
  }
  setdepositList(allDeposits: DepositsSummary[]) {
    this.depositList=allDeposits
  }

  getdepositList() {
    return this.depositList
  }

}
