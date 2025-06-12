import { Injectable } from "@angular/core";
import { BaseFpxDataService, BaseFpxFunctionality, CreateFn, CriteriaQuery, FindAllFn, FindByKeyFn, FpxIHttpOption, HttpProviderService, HttpRequest, IHttpSuccessPayload, LoadForm, LookUpFn, ModifyFn, PatchFn } from "@fpx/core";
import { Observable, map } from "rxjs";

@Injectable({
    providedIn: 'root',
})

export class BannerAdsService extends BaseFpxFunctionality implements BaseFpxDataService<unknown> {
    constructor(
        private _httpProvider: HttpProviderService
    ) {
        super();
    }

    findByKey(payload: unknown, httpOption?: Map<keyof FpxIHttpOption, Map<string, any>> | undefined): FindByKeyFn<unknown> {
        throw new Error("Method not implemented.");
    }
    findAll(criteriaQuery: CriteriaQuery, httpOption?: Map<keyof FpxIHttpOption, Map<string, any>> | undefined): FindAllFn<unknown> {
        throw new Error("Method not implemented.");
    }
    create(payload: unknown, httpOption?: Map<keyof FpxIHttpOption, Map<string, any>> | undefined): CreateFn<unknown> {
        throw new Error("Method not implemented.");
    }
    lookup(key: unknown, httpOption?: Map<keyof FpxIHttpOption, Map<string, any>> | undefined, criteriaQuery?: CriteriaQuery | undefined): LookUpFn<unknown> {
        throw new Error("Method not implemented.");
    }
    modify(payload: unknown, httpOption?: Map<keyof FpxIHttpOption, Map<string, any>> | undefined): ModifyFn<unknown> {
        throw new Error("Method not implemented.");
    }
    fetchStatistics?(criteriaQuery: CriteriaQuery, httpOption?: Map<keyof FpxIHttpOption, Map<string, any>> | undefined): FindAllFn<unknown> {
        throw new Error("Method not implemented.");
    }
    patch?(payload: unknown, httpOption?: Map<keyof FpxIHttpOption, Map<string, any>> | undefined): PatchFn<unknown> {
        throw new Error("Method not implemented.");
    }
    loadForm?(key: unknown): LoadForm<unknown> {
        throw new Error("Method not implemented.");
    }

    fetchBannerAds(payload: any):Observable<any> {
        const httpRequest = new HttpRequest();
        httpRequest.setMethod('GET');
        httpRequest.setResource('/advertisement/{serviceCode}');
        httpRequest.addPathParameter('serviceCode', payload.serviceCode);
        
        return this._httpProvider.invokeRestApi(httpRequest).pipe(map((res: IHttpSuccessPayload<any>) => res?.body?.advertisements));
    }

    fetchIntercepts(payload: any):Observable<any> {
        const httpRequest = new HttpRequest();
        httpRequest.setMethod('GET');
        httpRequest.setResource('/advertisement/{serviceCode}');
        httpRequest.addPathParameter('serviceCode', payload.serviceCode);
        
        return this._httpProvider.invokeRestApi(httpRequest).pipe(map((res: IHttpSuccessPayload<any>) => res?.body?.advertisements));
    }
}