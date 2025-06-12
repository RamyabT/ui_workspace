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
  BaseFpxFunctionality
} from '@fpx/core';
import { IHttpSuccessPayload, ILookupResponse } from '@fpx/core';
import { map, Observable, of, catchError, BehaviorSubject, Subject } from 'rxjs';
// import { Casaaccount } from './casaaccount.model';
import { ShareInfo } from '@dep/native';
import { TranslateService } from '@ngx-translate/core';
import { APPCONSTANTS } from '@dep/constants';
 import { insurance } from './insurancesummary.model';
import { AppConfigService } from '@dep/services';


@Injectable({
  providedIn: 'root',
})
export class InsurancesummaryService extends BaseFpxFunctionality implements BaseFpxDataService<any> {
  public insuranceSummaryLoad$: BehaviorSubject<any> = new BehaviorSubject(null);
  public insuranceActionPublisher$ = new BehaviorSubject<any>(null);
  private insuranceContextTrigger = new Subject<{ insuranceId: string; insuranceStatus: string }>();

  contextTrigger$ = this.insuranceContextTrigger.asObservable();

  triggerContextMenu(data: { insuranceId: string; insuranceStatus: string }) {
    this.insuranceContextTrigger.next(data);
  }

  constructor(
    private _httpProvider: HttpProviderService,
    private _shareInfo: ShareInfo,
    private _translate: TranslateService,
    private appConfig: AppConfigService
  ) {
    super();
    this.appConfig.setData('insuranceActionPublisher$', {
      observable: this.insuranceActionPublisher$.asObservable(),
      subject: this.insuranceActionPublisher$
    });
  }

  findAll(): FindAllFn<any> {
    throw new Error('Method not implemented.');
  }
  create(payload: any): CreateFn<any> {
    throw new Error('Method not implemented.');
  }
  modify(payload: any): ModifyFn<any> {
    throw new Error('Method not implemented.');
  }

  findByKey(key: insurance, httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindByKeyFn<insurance | null> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/insurance/{insuranceId}');
     httpRequest.addPathParameter('insuranceId', key.insuranceId);
      httpRequest.setMethod('GET');
      httpRequest.addHeaderParamter('serviceCode', 'RETAILINSURANCE');
      httpRequest.setContextPath('Accounts');
      this.showSpinner();
      return this._httpProvider.invokeRestApi(httpRequest, httpOption).pipe(
        map((res: IHttpSuccessPayload<any>) => {
          this.hideSpinner();
          return res.body?.insurance ?? null
        }),
      );
    };
  }

  lookup(key: any, httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map(), criteriaQuery?: CriteriaQuery | undefined): LookUpFn<any> {
    throw new Error('Method not implemented.');
  } 


  fetchInsuranceSummary():Observable<any> {
    const httpRequest = new HttpRequest();
    httpRequest.setMethod('GET');
    httpRequest.setResource('/insurance');
    httpRequest.setContextPath('Deposits');
   httpRequest.addHeaderParamter('serviceCode', 'RETAILINSURANCESUMMARY');
    return this._httpProvider.invokeRestApi(httpRequest).pipe(
      map((res: IHttpSuccessPayload<any>) => {
        return res.body;
      })
    );
  }
  

}


