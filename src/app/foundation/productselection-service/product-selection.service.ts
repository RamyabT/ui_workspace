import { Injectable } from '@angular/core';
import { BaseFpxDataService, CreateFn, CriteriaQuery, FindAllFn, FindByKeyFn, HttpProviderService, HttpRequest, IHttpSuccessPayload, ILookupResponse, LookUpFn, ModifyFn, FpxIHttpOption } from '@fpx/core';
import { Observable, catchError, map, of } from 'rxjs';
import { ProductInfo, ProductInfoMaintanence } from './productInfo.model';

@Injectable({
  providedIn: 'root'
})
export class ProductSelectionControlService implements BaseFpxDataService<any> {

  constructor(private _httpProvider: HttpProviderService) { }
  findByKey(payload: any): FindByKeyFn<any> {
    throw new Error('Method not implemented.');
  }
  findAll(criteriaQuery: CriteriaQuery, httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindAllFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource('/productInfo');
      httpRequest.setMethod('GET');
      httpRequest.setCriteriaQuery(criteriaQuery);
      httpRequest.setContextPath('Customers');
      return this._httpProvider
        .invokeRestApi(httpRequest, httpOption)
        .pipe(
          map(
            (res: IHttpSuccessPayload<any>) => {
              return res.body?.productInfo;
            }
          )
        );
    };
  }
  create(payload: any): CreateFn<any> {
    throw new Error('Method not implemented.');
  }
  lookup(key: unknown): LookUpFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setMethod('GET');
      httpRequest.setResource('/productInfo');
      httpRequest.setContextPath('Customers');
      return this._httpProvider.invokeRestApi(httpRequest).pipe(
        map((res: IHttpSuccessPayload<any>) => {
          console.log(res)
          return res.body;
        },
          catchError((err: any) => {
            console.log(err)
            return of(null)
          }))
      );
    }
  }
  modify(payload: any): ModifyFn<any> {
    throw new Error('Method not implemented.');
  }

  getProductInfo(): Observable<any> {
    const httpRequest = new HttpRequest();
    httpRequest.setMethod('GET');
    httpRequest.setResource('/productInfo');
    httpRequest.setContextPath('Customers');

    return this._httpProvider.invokeRestApi(httpRequest).pipe(
      map((res: IHttpSuccessPayload<any>) => {
        return res.body?.productInfo;
      }),
      catchError((err: any) => {
        console.log(err)
        return of(null)
      }));
  }
}
