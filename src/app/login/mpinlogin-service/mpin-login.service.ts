import { Injectable } from "@angular/core";
import { AppConfigService, UserAuthService } from "@dep/services";
import { BaseFpxDataService, CreateFn, CriteriaQuery, FindAllFn, FindByKeyFn, FpxIHttpOption, HttpProviderService, HttpRequest, IHttpSuccessPayload, LoadForm, LookUpFn, ModifyFn, PatchFn } from "@fpx/core";
import { map, tap } from "rxjs";
import { TestLoginService } from "../test-services/test-login.service";

@Injectable({
  providedIn: 'root',
})

export class MpinLoginService implements BaseFpxDataService<unknown>{

    constructor(
        private _httpProvider: HttpProviderService,
        private _userAuth: UserAuthService,
        private _appConfig: AppConfigService,
        private _testLoginService: TestLoginService
      ) {}

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
            httpRequest.setResource('/retail/mpinlogin');
            httpRequest.setContextPath('IAM');
            httpRequest.setBody(payload);
            httpRequest.setAuthTokenRequired(false);
            httpRequest.addHeaderParamter('serviceCode', "RETAILMPINLOGIN");
      
            return this._httpProvider.invokeRestApi(httpRequest).pipe(
              map((res: IHttpSuccessPayload<any>) => {
                if(res?.body?.authToken){
		            this._testLoginService.onAuthTokenReceived(res?.body);
                }
                return res;
              })
            );
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

}