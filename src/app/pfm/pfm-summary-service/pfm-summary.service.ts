import { Injectable } from '@angular/core';
import { BaseFpxDataService, CreateFn, CriteriaQuery, FindAllFn, FindByKeyFn, FpxIHttpOption, HttpProviderService, HttpRequest, IHttpSuccessPayload, LoadForm, LookUpFn, ModifyFn, PatchFn } from '@fpx/core';
import { BehaviorSubject, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PfmSummaryService implements BaseFpxDataService<any> {
  public pfmSpendsSub$: BehaviorSubject<any> = new BehaviorSubject(null);

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
  fetchPortfolioSummary(): Observable<any> {
    const httpRequest = new HttpRequest();
    httpRequest.setResource('/pfmsummary');
    httpRequest.setMethod('GET');
    httpRequest.addHeaderParamter('serviceCode', 'RETAILPFMPORTFOLIOSUM');
    httpRequest.setContextPath('Payments');
    return this._httpProvider
      .invokeRestApi(httpRequest)
      .pipe(
        map(
          (res: IHttpSuccessPayload<any>) => {
            return {
              data: res.body?.summary || [],
              totalRowCount: res.headers.get('Totalrowcount')
            }
          }
        )
      );
  }
  
  fetchPfmSpends(): Observable<any> {
    const httpRequest = new HttpRequest();
    httpRequest.setResource('/pfmspends');
    httpRequest.addQueryParameter('period', '2023-05');
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
  fetchAssetsSummary(): Observable<any> {
    const httpRequest = new HttpRequest();
    httpRequest.setMethod('GET');
    httpRequest.setContextPath('Common');
    httpRequest.addHeaderParamter('serviceCode', 'RETAILASSETSTRENDS');
    httpRequest.setResource('/assets/summary');

    httpRequest.setBody({});
    return this._httpProvider.invokeRestApi(httpRequest).pipe(
        map((res: any) => {
            console.log(res);
            return res?.body?.assets;
        })
    );
}

fetchLiabilitySummary(): Observable<any> {
    const httpRequest = new HttpRequest();
    httpRequest.setMethod('GET');
    httpRequest.setContextPath('Common');
    httpRequest.addHeaderParamter('serviceCode', 'RETAILLIABTRENDS');
    httpRequest.setResource('/liabilities/summary');

    httpRequest.setBody({});
    return this._httpProvider.invokeRestApi(httpRequest).pipe(
        map((res: any) => {
            console.log(res);
            return res?.body?.liabilities;
        })
    );
  }
  fetchPfmCashflow(criteriaQuery:CriteriaQuery): Observable<any> {
    const httpRequest = new HttpRequest();
    httpRequest.setResource('/pfmcashflow');
    httpRequest.addQueryParameter('period', criteriaQuery.getQueryparam('period'));
    httpRequest.addHeaderParamter('serviceCode', 'RETAILPFMCASHFLOW');
    httpRequest.setContextPath('Payments');
    httpRequest.setMethod('GET');
    return this._httpProvider
      .invokeRestApi(httpRequest).pipe(
        map((res: IHttpSuccessPayload<any>) => {
          return res.body.pfmcashflow ? res.body.pfmcashflow : [] ;
        }
        )
      );
  }

}
