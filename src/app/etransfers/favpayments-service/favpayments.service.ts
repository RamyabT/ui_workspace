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
import { map, Observable, of, catchError, Subject } from 'rxjs';
import { Favpayments, FavpaymentsMaintanence } from './favpayments.model';
@Injectable({
  providedIn: 'root'
})
export class FavpaymentsService implements BaseFpxDataService<any> {
  private _correlationId: string = '';

  isFavETransferAvailable = new Subject<boolean>();
  refreshFavETransaferSub$ = new EventEmitter<Favpayments | null>();
  refreshViewAllFavETransaferSub$ = new EventEmitter<Favpayments | null>();
   constructor(private _httpProvider : HttpProviderService) { }
  
    refreshFavETransfer(favpayments: Favpayments){
      this.refreshFavETransaferSub$.emit(favpayments); 
    }
    refreshViewAllFavETransfer(favpayments: Favpayments){
      this.refreshViewAllFavETransaferSub$.emit(favpayments); 
    }
    create(payload: Favpayments,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): CreateFn<any> {
      return () => {
        const httpRequest = new HttpRequest();
        httpRequest.setMethod('POST');
        httpRequest.setContextPath('Payments');
        httpRequest.setResource('/favpayments');
        let bodyContent = {"favpayments":payload};
        httpRequest.setBody(bodyContent);
        return this._httpProvider.invokeRestApi(httpRequest,httpOption);
      };
    }
   
    findByKey(key: Favpayments,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindByKeyFn<Favpayments|null> {
      return () => {
        const httpRequest = new HttpRequest();
        httpRequest.setContextPath('Payments');
        httpRequest.setResource('/favpayments/{inventoryNumber}');
         httpRequest.addPathParameter('inventoryNumber', key.inventoryNumber);
        httpRequest.setMethod('GET');
        return this._httpProvider
          .invokeRestApi(httpRequest,httpOption)
          .pipe(map((res: IHttpSuccessPayload<any>) =>{ return  res.body ? {  ...res.body.favpayments , unauthRecordFlag: res.headers.get('unauthRecordFlag') } : null}), map((res:any) => {
            return res ? {...res,  beneficiaries:res.beneficiaries?.inventoryNumber,} : null
          }));
          
      };
    }
    modify(payload: Favpayments,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
      return () => {
        const httpRequest = new HttpRequest();
        httpRequest.setContextPath('Payments');
        httpRequest.setResource('/favpayments/{inventoryNumber}');
         httpRequest.addPathParameter('inventoryNumber', payload.inventoryNumber);
       httpRequest.setMethod('PUT');
        let bodyContent = {"favpayments":payload};
        httpRequest.setBody(bodyContent);
        return this._httpProvider.invokeRestApi(httpRequest,httpOption);
      };
    }
     delete(payload: Favpayments,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
      return () => {
        const httpRequest = new HttpRequest();
        httpRequest.setContextPath('Payments');
        httpRequest.setResource('/favpayments/{inventoryNumber}');
         httpRequest.addPathParameter('inventoryNumber', payload.inventoryNumber);
       httpRequest.setMethod('DELETE');
        let bodyContent = {"favpayments":payload};
        httpRequest.setBody(bodyContent);
        return this._httpProvider.invokeRestApi(httpRequest,httpOption);
      };
    }
     patch(payload: Favpayments,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): PatchFn<any> {
      return () => {
        const httpRequest = new HttpRequest();
        httpRequest.setContextPath('Payments');
        httpRequest.setResource('/favpayments/{inventoryNumber}');
         httpRequest.addPathParameter('inventoryNumber', payload.inventoryNumber);
       httpRequest.setMethod('PUT');
        let bodyContent = {"favpayments":payload};
        httpRequest.setBody(bodyContent);
        return this._httpProvider.invokeRestApi(httpRequest,httpOption);
      };
    }
    
     findAll(criteriaQuery: CriteriaQuery,httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindAllFn<FavpaymentsMaintanence> {
      return () => {
        const httpRequest = new HttpRequest();
        httpRequest.setContextPath('Payments');
        httpRequest.setResource('/favpayments');
        httpRequest.setMethod('GET');
        httpRequest.addHeaderParamter('serviceCode','RETAILETRANSFERFAVPAYMENTS');
        httpRequest.setCriteriaQuery(criteriaQuery);
  
        if(this._correlationId){
          httpRequest.addHeaderParamter("correlationId", this._correlationId);
        }
  
        return this._httpProvider
          .invokeRestApi(httpRequest,httpOption)
          .pipe(
            map(
              (res: IHttpSuccessPayload<FavpaymentsMaintanence>) =>{
                this._correlationId = '';
                if (res?.headers?.get('correlationId')) {
                  this._correlationId = res.headers.get('correlationId');
                }
               return{
                data:res.body?.favpayments || [],
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
      httpRequest.setContextPath('Payments');
      httpRequest.setMethod('GET');
      httpRequest.setResource('/favpayments');
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
        httpRequest.setContextPath('Payments');
        httpRequest.setResource("/favpayments/statistics");
        httpRequest.setMethod("GET");
        httpRequest.setCriteriaQuery(criteriaQuery);
        return this._httpProvider
          .invokeRestApi(httpRequest,httpOption)
          .pipe(map((res: IHttpSuccessPayload<any>) => res.body));
      };
    }
    
  }
  