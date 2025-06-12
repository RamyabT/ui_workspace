import { Injectable } from "@angular/core";
import { BaseFpxDataService, CreateFn, CriteriaQuery, FindAllFn, FindByKeyFn, FpxIHttpOption, HttpProviderService, HttpRequest, LoadForm, LookUpFn, ModifyFn, PatchFn } from "@fpx/core";
import { VerifyTFAData } from "./verify-tfa.model";
import { Observable } from "rxjs";
import { AppConfigService } from "@dep/services";

@Injectable()
export class VerifyTFAService implements BaseFpxDataService<any> {
    constructor(
        private _httpProvider: HttpProviderService,
        private _appConfig: AppConfigService
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
            httpRequest.setResource('/verifytfa');
            httpRequest.setContextPath('WorkflowService');
            let bodyContent = {
                "verifytfa": payload
            };
            httpRequest.setBody(bodyContent);
            httpRequest.setContextPath('WorkflowService');
            return this._httpProvider.invokeRestApi(httpRequest,httpOption);
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
        httpRequest.setResource('/tfadeliverydetail/{reqRef}');
        httpRequest.setContextPath('WorkflowService');
        let reqRef = payload.reqRef;
        if(payload.serviceCode == "RETAILSELFREG" || payload.serviceCode == "RETAILMIGRATEDUSER"){
            reqRef = reqRef + "-" + payload.reqRef;
        }
        httpRequest.addPathParameter('reqRef', reqRef);
        let bodyContent = {};
        httpRequest.setBody(bodyContent);
        return this._httpProvider.invokeRestApi(httpRequest);
    }
    // resendTfa(payload: any):Observable<any>{
    //     const httpRequest = new HttpRequest();
    //     httpRequest.setMethod('POST');
    //     httpRequest.setContextPath('WorkflowService');
    //     httpRequest.setResource('/resendtfa');
    //     // httpRequest.addPathParameter('reqRef', payload.reqRef);
    //     let bodyContent = {
    //         "resendtfa":payload
    //     };
    //     httpRequest.setBody(bodyContent);
    //     return this._httpProvider.invokeRestApi(httpRequest);
    // }
    resendTfa(payload: any): Observable<any> {
        const httpRequest = new HttpRequest();
        httpRequest.setMethod('POST');
        httpRequest.setContextPath('WorkflowService');

        let isPrelogin = this._appConfig.hasData('otpService') && (["PRELOGIN", "FORGOTPASSWORD","FORGOTUSERNAME","UNLOCKUSER","SELFREG","RETAILNPSSLOGIN"].indexOf(this._appConfig.getData('otpService')) > -1)
        let bodyContent = {};

        if(isPrelogin){
            
            let service=this._appConfig.getData('otpService') ;
            if( service == 'FORGOTUSERNAME' ||service == "SELFREG"){
                httpRequest.setContextPath('Customers');
            }else{
                httpRequest.setContextPath('IAM');
            }

            httpRequest.setResource('/preloginresendtfa');
            bodyContent = {
                "preloginresendtfa": payload
            };
        } else {
            httpRequest.setContextPath('WorkflowService');
            httpRequest.setResource('/resendtfa');
            bodyContent = {
                "resendtfa": payload
            };
        }

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