import { Injectable } from "@angular/core";
import { BaseFpxDataService, CreateFn, CriteriaQuery, FindAllFn, FindByKeyFn, FpxIHttpOption, HttpProviderService, HttpRequest, IHttpSuccessPayload, LoadForm, LookUpFn, ModifyFn, PatchFn } from "@fpx/core";
import { VerifyTFAData } from "./verify-tfa.model";
import { Observable, tap } from "rxjs";
import { UserAuthService } from "@dep/services";
import { TestLoginService } from "src/app/login/test-services/test-login.service";

@Injectable()
export class ObVerifyTFAService implements BaseFpxDataService<any> {
    constructor(
        private _httpProvider : HttpProviderService,
        private _testLoginService: TestLoginService
    ) { }
    
    findByKey(payload: any, httpOption?: Map<keyof FpxIHttpOption, Map<string, any>> | undefined): FindByKeyFn<any> {
        throw new Error("Method not implemented.");
    }
    findAll(criteriaQuery: CriteriaQuery, httpOption?: Map<keyof FpxIHttpOption, Map<string, any>> | undefined): FindAllFn<any> {
        throw new Error("Method not implemented.");
    }
    create(payload: VerifyTFAData, httpOption?: Map<keyof FpxIHttpOption, Map<string, any>> | undefined): CreateFn<any> {
        return () => {
            const httpRequest = new HttpRequest();
            httpRequest.setMethod('POST');
            httpRequest.setResource('/obverifytfa');
            let bodyContent = {
                "obverifytfa": payload
            };
            httpRequest.setBody(bodyContent);
            httpRequest.setContextPath('Customers');
            return this._httpProvider.invokeRestApi(httpRequest);
          };
    }
    lookup(key: unknown, httpOption?: Map<keyof FpxIHttpOption, Map<string, any>> | undefined, criteriaQuery?: CriteriaQuery | undefined): LookUpFn<any> {
        throw new Error("Method not implemented.");
    }
    modify(payload: any, httpOption?: Map<keyof FpxIHttpOption, Map<string, any>> | undefined): ModifyFn<any> {
        throw new Error("Method not implemented.");
    }
    fetchStatistics?(criteriaQuery: CriteriaQuery, httpOption?: Map<keyof FpxIHttpOption, Map<string, any>> | undefined): FindAllFn<any> {
        throw new Error("Method not implemented.");
    }
    patch?(payload: any, httpOption?: Map<keyof FpxIHttpOption, Map<string, any>> | undefined): PatchFn<any> {
        throw new Error("Method not implemented.");
    }
    loadForm?(key: unknown): LoadForm<any> {
        throw new Error("Method not implemented.");
    }
    fetchDeliveryDetails(payload: any):Observable<any>{
        const httpRequest = new HttpRequest();
        httpRequest.setMethod('GET');
        httpRequest.setResource('/tfadeliverydetail/{processId}-{applicantId}');
        httpRequest.setContextPath('Customers');
        httpRequest.addPathParameter('processId', payload.processId);
        httpRequest.addPathParameter('applicantId', payload.applicantId);
        let bodyContent = {};
        httpRequest.setBody(bodyContent);
        return this._httpProvider.invokeRestApi(httpRequest);
    }
    
    resendTfa(payload: any):Observable<any>{
        const httpRequest = new HttpRequest();
        httpRequest.setMethod('POST');
        httpRequest.setContextPath('Customers');
        // httpRequest.setResource('/resendtfa');
        // // httpRequest.addPathParameter('reqRef', payload.reqRef);
        // let bodyContent = {
        //     "resendtfa":payload
        // };
        httpRequest.setResource('/preloginresendtfa');
       let bodyContent = {
            "preloginresendtfa": payload
        };
        httpRequest.setBody(bodyContent);
        return this._httpProvider.invokeRestApi(httpRequest);
    }

    cancelOtp(payload:any):Observable<any>{
        const httpRequest = new HttpRequest();
        httpRequest.setMethod('POST');
        httpRequest.setContextPath('WorkflowService');
        httpRequest.setResource('/canceltfa');
        let bodyContent = {
            "canceltfa": payload
        };
        httpRequest.setBody(bodyContent);
        return this._httpProvider.invokeRestApi(httpRequest);
    }
    
}