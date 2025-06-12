import { Injectable } from "@angular/core";
import { BaseFpxDataService, CreateFn, CriteriaQuery, FindAllFn, FindByKeyFn, FpxIHttpOption, HttpProviderService, HttpRequest, LoadForm, LookUpFn, ModifyFn, PatchFn } from "@fpx/core";
import { workflowHistoryData } from "./workflow-history.model";
import { Observable } from "rxjs";

@Injectable()
export class workflowHistoryService implements BaseFpxDataService<any> {
    constructor(private _httpProvider : HttpProviderService) { }
    
    findByKey(payload: any, httpOption?: Map<keyof FpxIHttpOption, Map<string, any>> | undefined): FindByKeyFn<any> {
        throw new Error("Method not implemented.");
    }
    findAll(criteriaQuery: CriteriaQuery, httpOption?: Map<keyof FpxIHttpOption, Map<string, any>> | undefined): FindAllFn<any> {
        throw new Error("Method not implemented.");
    }
    create(payload: workflowHistoryData, httpOption?: Map<keyof FpxIHttpOption, Map<string, any>> | undefined): CreateFn<any> {
        throw new Error("Method not implemented.");
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
    fetchWorkflowHistory(payload: any):Observable<any>{
        const httpRequest = new HttpRequest();
        httpRequest.setMethod('GET');
        httpRequest.setContextPath("WorkflowService")
        httpRequest.setResource('/workflow/history/{reqRef}');
        httpRequest.addPathParameter('reqRef', payload);
        let bodyContent = {};
        httpRequest.setBody(bodyContent);
        return this._httpProvider.invokeRestApi(httpRequest);
    }
    
}