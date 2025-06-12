import { Injectable } from '@angular/core';
import { BaseFpxDataService, CreateFn, CriteriaQuery, FindAllFn, FindByKeyFn, FpxIHttpOption, HttpProviderService, HttpRequest, IHttpSuccessPayload, LoadForm, LookUpFn, ModifyFn, PatchFn } from '@fpx/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FbSummaryService implements BaseFpxDataService<any> {
  public pfmSpendsSub$: BehaviorSubject<any> = new BehaviorSubject(null);
  public fbAccountNoTransfer =new BehaviorSubject('');

  constructor(private _httpProvider: HttpProviderService) { }
  findByKey(payload: any, httpOption?: Map<keyof FpxIHttpOption, Map<string, any>>): FindByKeyFn<any> {
    throw new Error('Method not implemented.');
  }
  findAll(criteriaQuery: CriteriaQuery, httpOption?: Map<keyof FpxIHttpOption, Map<string, any>>): FindAllFn<any> {
    throw new Error('Method not implemented.');
  }
  create(payload: any, httpOption?: Map<keyof FpxIHttpOption, Map<string, any>>): CreateFn<any> {
    throw new Error('Method not implemented.');
  }
  lookup(key: unknown, httpOption?: Map<keyof FpxIHttpOption, Map<string, any>>, criteriaQuery?: CriteriaQuery): LookUpFn<any> {
    throw new Error('Method not implemented.');
  }
  modify(payload: any, httpOption?: Map<keyof FpxIHttpOption, Map<string, any>>): ModifyFn<any> {
    throw new Error('Method not implemented.');
  }
  fetchStatistics?(criteriaQuery: CriteriaQuery, httpOption?: Map<keyof FpxIHttpOption, Map<string, any>>): FindAllFn<any> {
    throw new Error('Method not implemented.');
  }
  patch?(payload: any, httpOption?: Map<keyof FpxIHttpOption, Map<string, any>>): PatchFn<any> {
    throw new Error('Method not implemented.');
  }
  loadForm?(key: unknown): LoadForm<any> {
    throw new Error('Method not implemented.');
  }

   
  fetchtaskDetails(accno : any): Observable<any> {
    const httpRequest = new HttpRequest();
    httpRequest.setResource('/tasks');
    httpRequest.setMethod('GET');
    httpRequest.addQueryParameter('childAccNo', accno);
    httpRequest.addHeaderParamter('serviceCode', 'RETAILTASKINFO');
    httpRequest.setContextPath('Accounts');
    return this._httpProvider
      .invokeRestApi(httpRequest)
      .pipe(
        map(
          (res: IHttpSuccessPayload<any>) => {
            return {
              data: res.body || [],
              totalRowCount: "5"
            }
          }
        )
      );
  }

  fetchtasksummary(): Observable<any> {
    const httpRequest = new HttpRequest();
    httpRequest.setResource('/children/taskSummary');
    httpRequest.setMethod('GET');
     httpRequest.addHeaderParamter('serviceCode', 'RETAILTASKINFO');
    httpRequest.setContextPath('Accounts');
    return this._httpProvider
      .invokeRestApi(httpRequest)
      .pipe(
        map(
          (res: IHttpSuccessPayload<any>) => {
            return {
              data: res.body || [],
              totalRowCount: res.headers.get('Totalrowcount')
            }
          }
        )
      );
  }



  

  fetchDashboadSummary(): Observable<any> {
    const httpRequest = new HttpRequest();
    httpRequest.setResource('/child/account');
    httpRequest.setMethod('GET');
     httpRequest.addHeaderParamter('serviceCode', 'RETAILFAMILYBANKING');
    httpRequest.setContextPath('Accounts');
    return this._httpProvider
      .invokeRestApi(httpRequest)
      .pipe(
        map(
          (res: IHttpSuccessPayload<any>) => {
            return {
              data: res.body || [],
              totalRowCount: res.headers.get('Totalrowcount')
            }
          }
        )
      );
  }
  

  fetchchildrenSpends(): Observable<any> {
    const httpRequest = new HttpRequest();
    httpRequest.setResource('/pfmspends');
    httpRequest.addQueryParameter('period', '2023-05');
    httpRequest.addQueryParameter('customerCode', '8000101');
    httpRequest.addHeaderParamter('serviceCode', 'RETAILPFMSPENDS');
    httpRequest.setContextPath('Payments');
    httpRequest.setMethod('GET');
    return this._httpProvider
      .invokeRestApi(httpRequest).pipe(
        map((res: IHttpSuccessPayload<any>) => {
          this.pfmSpendsSub$.next(res.body.pfmspends ?? null);
          return {
            data: res.body.pfmspends ?? null
          }
        }
        )
      );
  }
  getPfmSpendsSubTrigger() {
    return this.pfmSpendsSub$.asObservable();
  }
}
