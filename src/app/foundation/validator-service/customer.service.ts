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

@Injectable()
export class CustomerService implements BaseFpxDataService<any> {
  //temp fix
  showUserProfile: boolean = false;
 constructor(private _httpProvider : HttpProviderService) { }
 create(payload: any): CreateFn<any> {
  throw new Error('Method not implemented.');
}

  findByKey(key: any,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindByKeyFn<|null> {
    throw new Error('Method not implemented.');
  }
  modify(payload: any,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
    throw new Error('Method not implemented.');
  }
   delete(payload: any,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
    throw new Error('Method not implemented.');
  }
   patch(payload: any,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): PatchFn<any> {
    throw new Error('Method not implemented.');
  }

   findAll(criteriaQuery: CriteriaQuery,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindAllFn<any> {
    throw new Error('Method not implemented.');
  }

  lookup(key: any,httpOption : Map<keyof FpxIHttpOption, Map<string, any>> = new Map(), criteriaQuery?: CriteriaQuery | undefined): LookUpFn<any> {
    throw new Error('Method not implemented.');
  }

  fetchCustomer(customerCode:any):Observable<any> {
    const httpRequest = new HttpRequest();
      httpRequest.setResource("/customer");
      httpRequest.addHeaderParamter('serviceCode','RETAILCUSTOMERDETAILS');
    httpRequest.setContextPath('Customers');
     httpRequest.setMethod("GET");
      return this._httpProvider.invokeRestApi(httpRequest).pipe(
        map((res: IHttpSuccessPayload<any>) =>
        res.body.customer ?? null)
      );
  }

  fetchUserRelationshipDetails(): Observable<any> {
    const httpRequest = new HttpRequest();
    httpRequest.addHeaderParamter('serviceCode', 'RETAILESTMTRELATIONSHIP');
    httpRequest.setMethod("GET");
    httpRequest.setContextPath("Accounts");
    httpRequest.setResource("/estmtrelationship");
    return this._httpProvider.invokeRestApi(httpRequest).pipe(
      map((res: IHttpSuccessPayload<any>) =>
        res.body ?? null),
      catchError(() => {
        return of (null)
      })
    );
  }

  getUserAccountStatement(payload:any):Observable<any>{
    const httpRequest = new HttpRequest();
    httpRequest.addHeaderParamter('serviceCode', 'ACCOUNTESTATEMENT');
    httpRequest.setMethod('POST');
      httpRequest.setResource('/accountStatement');
      httpRequest.setContextPath('Accounts');
      let bodyContent = {"accountStatement":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest).pipe(
        map((res: IHttpSuccessPayload<any>) =>
        res?.body?? null)
      );

  }

  


  fetchUserProfile():Observable<any> {
    const httpRequest = new HttpRequest();
      httpRequest.setResource("/userprofile");
    httpRequest.setContextPath('Common');
     httpRequest.setMethod("GET");
      return this._httpProvider.invokeRestApi(httpRequest).pipe(
        map((res: IHttpSuccessPayload<any>) =>

        res.body.userprofile ?? null)
      );
  }
  updateUserProfile(payload:any):Observable<any> {
    const httpRequest = new HttpRequest();
      httpRequest.setResource("/userprofile");
    httpRequest.setContextPath('Common');
     httpRequest.setMethod("PUT");
     let bodyContent = {"userprofile":payload};
     httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest).pipe(
        map((res: IHttpSuccessPayload<any>) =>
        res?.body?.userprofile ?? null)
      );
  }
  getCreditCardStatement(payload:any):Observable<any>{
    const httpRequest = new HttpRequest();
    httpRequest.addHeaderParamter('serviceCode', 'RETAILCCSTATEMENT');
    httpRequest.setMethod('POST');
      httpRequest.setResource('/creditcardStatement');
      httpRequest.setContextPath('Cards');
      let bodyContent = {"creditcardStatement":payload};
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest).pipe(
        map((res: IHttpSuccessPayload<any>) =>
        res?.body?? null)
      );

  }
}
