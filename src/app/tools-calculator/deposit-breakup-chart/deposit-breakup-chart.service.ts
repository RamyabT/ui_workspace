import { Injectable } from '@angular/core';
import { HttpProviderService, FindAllFn, HttpRequest, IHttpSuccessPayload, FpxIHttpOption, FindByKeyFn, CreateFn, CriteriaQuery, LookUpFn, ModifyFn, PatchFn, LoadForm } from '@fpx/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class depositBreakupChartService {

  constructor(private _httpProvider: HttpProviderService) {}
  findAllStatic() {
    // return [
      // {
      // id: 'Deposit Breakup',
      // text: '44,000.00 USD'
  // } 
// ]
  }
  
  findAll(): FindAllFn<any> {
    return () => {
      const httpRequest = new HttpRequest();
      httpRequest.setResource("/billPayment");
      httpRequest.setMethod("GET");
      return this._httpProvider.invokeRestApi(httpRequest).pipe(
        map((res: IHttpSuccessPayload<any>) => {
          return {
            data: res.body?.billPayment || [],
            totalRowCount: res.headers.get("Totalrowcount"),
          };
        })
      );
    };
  }

  findByKey(
    payload: any,
    httpOption?: Map<keyof FpxIHttpOption, Map<string, any>> | undefined
  ): FindByKeyFn<any> {
    throw new Error("Method not implemented.");
  }
  create(
    payload: any,
    httpOption?: Map<keyof FpxIHttpOption, Map<string, any>> | undefined
  ): CreateFn<any> {
    throw new Error("Method not implemented.");
  }
  lookup(
    key: unknown,
    httpOption?: Map<keyof FpxIHttpOption, Map<string, any>> | undefined,
    criteriaQuery?: CriteriaQuery | undefined
  ): LookUpFn<any> {
    throw new Error("Method not implemented.");
  }
  modify(
    payload: any,
    httpOption?: Map<keyof FpxIHttpOption, Map<string, any>> | undefined
  ): ModifyFn<any> {
    throw new Error("Method not implemented.");
  }
  fetchStatistics?(
    criteriaQuery: CriteriaQuery,
    httpOption?: Map<keyof FpxIHttpOption, Map<string, any>> | undefined
  ): FindAllFn<any> {
    throw new Error("Method not implemented.");
  }
  patch?(
    payload: any,
    httpOption?: Map<keyof FpxIHttpOption, Map<string, any>> | undefined
  ): PatchFn<any> {
    throw new Error("Method not implemented.");
  }
  loadForm?(key: unknown): LoadForm<any> {
    throw new Error("Method not implemented.");
  }
}
