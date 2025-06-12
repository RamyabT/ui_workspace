import { Injectable } from "@angular/core";
import { BaseFpxDataService, CreateFn, CriteriaQuery, FindAllFn, FindByKeyFn, FpxIHttpOption, HttpProviderService, HttpRequest, IHttpSuccessPayload, LoadForm, LookUpFn, ModifyFn, PatchFn } from "@fpx/core";
import { map } from "rxjs";

@Injectable({
    providedIn: 'root',
})

export class EnableBiometricService implements BaseFpxDataService<unknown> {
    constructor(
        private _httpProvider: HttpProviderService
    ) { }
    findByKey(payload: unknown, httpOption?: Map<keyof FpxIHttpOption, Map<string, any>> | undefined): FindByKeyFn<unknown> {
        throw new Error("Method not implemented.");
    }
    findAll(criteriaQuery: CriteriaQuery, httpOption?: Map<keyof FpxIHttpOption, Map<string, any>> | undefined): FindAllFn<unknown> {
        throw new Error("Method not implemented.");
    }
    create(payload: unknown, httpOption?: Map<keyof FpxIHttpOption, Map<string, any>> | undefined): CreateFn<unknown> {
        return () => {
            const httpRequest = new HttpRequest();
            httpRequest.setMethod('POST');
            httpRequest.setResource('/enablebiometric');
            httpRequest.setContextPath('Common');
            httpRequest.setBody({"enablebiometric": payload});
            httpRequest.addHeaderParamter("serviceCode", "MANAGEBIOMETRIC");

            return this._httpProvider.invokeRestApi(httpRequest)
        };
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

    registerBiometric(payload: any) {
        return () => {
            const httpRequest = new HttpRequest();
            httpRequest.setMethod('POST');
            httpRequest.setResource('/biometricregistration');
            httpRequest.setContextPath('IAM');
            httpRequest.setBody(payload);

            return this._httpProvider.invokeRestApi(httpRequest);
        };
    }

}