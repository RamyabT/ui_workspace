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
  BaseFpxFunctionality,
  FpxModal,
  FpxModalAfterClosed
} from '@fpx/core';
import { IHttpSuccessPayload, ILookupResponse } from '@fpx/core';
import { map, Observable, of, catchError } from 'rxjs';
import { Casaaccount } from './casaaccount.model';
import { ShareInfo } from '@dep/native';
import { TranslateService } from '@ngx-translate/core';
import { APPCONSTANTS } from '@dep/constants';
import { DepConfirmationComponent } from 'src/app/dep/core/component/dep-confirmation/dep-confirmation.component';

@Injectable({
  providedIn: 'root',
})
export class CasaaccountService extends BaseFpxFunctionality implements BaseFpxDataService<any> {
  constructor(
    private _httpProvider: HttpProviderService,
    private _shareInfo: ShareInfo,
    private _translate: TranslateService
  ) {
    super();
  }

  findAll(): FindAllFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setMethod('GET');
      httpRequest.setResource('/casaaccount');
      httpRequest.addHeaderParamter('serviceCode', 'RETAILCASACCOUNTSUMMARY');
      httpRequest.setContextPath('Accounts');
      return this._httpProvider.invokeRestApi(httpRequest).pipe(
        map((res: IHttpSuccessPayload<any>) => {
          return res.body.casaaccount;
        })
      );
    };
  }
  create(payload: any): CreateFn<any> {
    throw new Error('Method not implemented.');
  }
  modify(payload: any): ModifyFn<any> {
    throw new Error('Method not implemented.');
  }

  findByKey(key: Casaaccount, httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindByKeyFn<Casaaccount | null> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/casaaccount/{accountNumber}');
      httpRequest.addPathParameter('accountNumber', key.accountNumber);
      httpRequest.setMethod('GET');
      httpRequest.addHeaderParamter('serviceCode', 'RETAILACCOUNT');
      httpRequest.setContextPath('Accounts');
      // this.showSpinner();
      return this._httpProvider.invokeRestApi(httpRequest, httpOption).pipe(
        map((res: IHttpSuccessPayload<any>) => {
          //this.hideSpinner();
          return res.body?.casaaccount ?? null
        }), catchError((error) => {
          return of(null);
        })
      );
    };
  }

  lookup(key: any, httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map(), criteriaQuery?: CriteriaQuery | undefined): LookUpFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setMethod('GET');
      httpRequest.setResource('/casaaccount');
      httpRequest.addQueryParameter('lookup', 1);
      httpRequest.setContextPath('Accounts');
      return this._httpProvider.invokeRestApi(httpRequest).pipe(
        map((res: IHttpSuccessPayload<ILookupResponse>) => {
          return res.body?.Data;
        })
      );
    };
  }

  fetchCasaAccounts(doEmptyAccountCheck = false): Observable<Casaaccount[]> {
    const httpRequest = new HttpRequest();
    httpRequest.setMethod('GET');
    httpRequest.setResource('/casaaccount');
    httpRequest.setContextPath('Accounts');
    httpRequest.addHeaderParamter('serviceCode', 'RETAILCASACCOUNTSUMMARY');
    return this._httpProvider.invokeRestApi(httpRequest).pipe(
      map((res: IHttpSuccessPayload<any>) => {
        // res.body.casaaccount = {};
        if(doEmptyAccountCheck && (!res || !res?.body || !res?.body?.casaaccount || Object.keys(res?.body.casaaccount).length == 0 || res?.body?.casaaccount?.length == 0)){
          this.onEmptyCasaAccount();
          return of([]);
        }
        else {
          return res?.body?.casaaccount || [];
        }
      }),
      catchError((error) => {
        return of([]);
      })
    );
  }

  onEmptyCasaAccount() {
    let modal = new FpxModal();
    modal.setComponent(DepConfirmationComponent);
    modal.setPanelClass('dep-alert-popup');
    modal.setBackDropClass(['dep-popup-back-drop','dep-confirmation-backdrop-2', 'logout-backdrop', 'bottom-transparent-overlay']);
    modal.setDisableClose(true);
    modal.setData({
      title: 'EmptyCasaAccountPopup.title',
      message: 'EmptyCasaAccountPopup.message',
      confirmationIcon: 'empty-account-icon',
      okBtnLbl: 'EmptyCasaAccountPopup.okBtnLbl',
      cancelBtnLbl: 'EmptyCasaAccountPopup.cancelBtnLbl'
    });
    modal.setAfterClosed(this.onEmptyCasaAccountModelAfterClose);
    this.openModal(modal)
  }

  onEmptyCasaAccountModelAfterClose: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
    if (payload === 1) {
      this._angularRouter.navigate(['home']);
    } else {
      this._angularRouter.navigate(['home']);
    }
  }

  fetchPreferredAccount(): Observable<any[]> {
    const httpRequest = new HttpRequest();
    httpRequest.setMethod('GET');
    httpRequest.setResource('/preferredaccount');
    httpRequest.setContextPath('Common');
    httpRequest.addHeaderParamter('serviceCode', 'BILLPAYMENTS');
    return this._httpProvider.invokeRestApi(httpRequest).pipe(
      map((res: IHttpSuccessPayload<any>) => {
        return res.body?.preferredaccount || [];
      })
    );
  }

  postPreferredAccount(body: any): Observable<any[]> {
    const httpRequest = new HttpRequest();
    httpRequest.setMethod('POST');
    httpRequest.setResource('/preferredaccount');
    httpRequest.setContextPath('Common');
    httpRequest.setBody(body)
    httpRequest.addHeaderParamter('serviceCode', 'BILLPAYMENTS');
    return this._httpProvider.invokeRestApi(httpRequest).pipe(
      map((res: IHttpSuccessPayload<any>) => {
        return res.body?.preferredaccount;
      })
    );
  }

  fetchAccountsInsights(accountNumber: string): Observable<any> {
    const httpRequest = new HttpRequest();
    httpRequest.setMethod('GET');
    httpRequest.setResource('/assets/account/{accountNumber}/summary');
    httpRequest.addHeaderParamter('serviceCode', 'RETAILACCOUNTINSIGHTS');
    httpRequest.addPathParameter('accountNumber', accountNumber);
    httpRequest.addQueryParameter('fromDate', '2023-01-01');
    httpRequest.addQueryParameter('toDate', '2024-01-31');
    httpRequest.addQueryParameter('direction', 'I');
    httpRequest.setContextPath('Accounts');
    return this._httpProvider.invokeRestApi(httpRequest).pipe(
      map((res: IHttpSuccessPayload<any>) => {
        return res.body?.accountinsights;
      })
    );
  }

  shareAccountInfo(cardData: Casaaccount, doShowToast = true, enableSocialShare = false) {
    console.log(cardData)
    // let accountNumber=cardData.accountNumber.slice(2);
    // cardData.accountNumber=accountNumber;
    let accountInfo: string = APPCONSTANTS.shareAccountInfoData(cardData);
  console.log("account info ",accountInfo)
    this._shareInfo.shareInfo(accountInfo, this._translate.instant('CASASUMMARYCARD.shareSuccess'), doShowToast, enableSocialShare);
  }

  fetchCasaForUserPermission(customerCode:string = ""):Observable<Casaaccount | null>{
    const httpRequest = new HttpRequest();
    httpRequest.setMethod("GET");
    httpRequest.setResource("/casaaccount");
    httpRequest.setContextPath('Accounts');
    httpRequest.addHeaderParamter("ServiceCode", "RETAILCASACCOUNTSUMMARY");
    httpRequest.addQueryParameter("customerCode", customerCode?.toString());
    return this._httpProvider.invokeRestApi(httpRequest);
  }


}


