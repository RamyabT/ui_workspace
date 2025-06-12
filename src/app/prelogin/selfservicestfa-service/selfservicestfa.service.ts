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
import { IHttpSuccessPayload,ILookupResponse } from '@fpx/core';
import { map, Observable, of,catchError, throwError, tap } from 'rxjs';
 import { Selfservicestfa, SelfservicestfaMaintanence } from './selfservicestfa.model';
import { AppConfigService } from '@dep/services';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonService } from 'src/app/foundation/validator-service/common-service';
import { TestLoginService } from 'src/app/login/test-services/test-login.service';
@Injectable()
export class SelfservicestfaService implements BaseFpxDataService<any> {
  public flag : number | undefined = undefined;
 constructor(
  private _httpProvider : HttpProviderService,
  public _commonService: CommonService,
  private httpClient: HttpClient,
  private _appConfig : AppConfigService,
  private _testLoginService: TestLoginService
) { }
  create(payload: Selfservicestfa,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): CreateFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      let serviceCode = this._appConfig.getData('otpService');
      if (serviceCode === 'FORGOTPASSWORD') {
        httpRequest.setContextPath('IAM');
     }else{
        httpRequest.setContextPath('Customers');
     }
      httpRequest.setMethod('POST');
      httpRequest.setResource('/selfservicestfa');
      let bodyContent = {"selfservicestfa":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
 
  findByKey(key: Selfservicestfa,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindByKeyFn<Selfservicestfa|null> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/selfservicestfa/{otp}');
       httpRequest.addPathParameter('otp', key.otp);
      httpRequest.setMethod('GET');
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) =>{return  res.body ?{  ...res.body.selfservicestfa , unauthRecordFlag: res.headers.get('unauthRecordFlag') } : null}),catchError((err:any) => {
              return of(null)
            }));
        
    };
  }
  modify(payload: Selfservicestfa,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/selfservicestfa/{otp}');
       httpRequest.addPathParameter('otp', payload.otp);
     httpRequest.setMethod('PUT');
      let bodyContent = {"selfservicestfa":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
   delete(payload: Selfservicestfa,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/selfservicestfa/{otp}');
       httpRequest.addPathParameter('otp', payload.otp);
     httpRequest.setMethod('DELETE');
      let bodyContent = {"selfservicestfa":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
   patch(payload: Selfservicestfa,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): PatchFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/selfservicestfa/{otp}');
       httpRequest.addPathParameter('otp', payload.otp);
     httpRequest.setMethod('PUT');
      let bodyContent = {"selfservicestfa":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest,httpOption);
    };
  }
  
   findAll(criteriaQuery: CriteriaQuery,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindAllFn<SelfservicestfaMaintanence> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/selfservicestfa');
      httpRequest.setMethod('GET');
      httpRequest.setCriteriaQuery(criteriaQuery);
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(
          map(
            (res: IHttpSuccessPayload<SelfservicestfaMaintanence>) =>{
             return{
              data:res.body?.selfservicestfa || [],
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
    httpRequest.setResource('/selfservicestfa');
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
      httpRequest.setResource("/selfservicestfa/statistics");
      httpRequest.setMethod("GET");
      httpRequest.setCriteriaQuery(criteriaQuery);
      return this._httpProvider
        .invokeRestApi(httpRequest,httpOption)
        .pipe(map((res: IHttpSuccessPayload<any>) => res.body));
    };
  }
  invokeGoogleMapApi(request: HttpRequestPayload, showSpinner = true): Observable<any> {
    let requestURL = environment.googleMapApiURL;
    requestURL += request.resource + "&key=" + environment.googleMapVariable;
    requestURL = encodeURI(requestURL);
    return this.httpClient.get(requestURL);
  }

}
