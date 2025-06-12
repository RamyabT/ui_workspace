import { HttpProviderService, HttpRequest } from "@fpx/core";
import { FpxProcessService } from "@fpx/layout";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { ComponentType } from "@angular/cdk/portal";

@Injectable({
    providedIn: 'root',
})
export class CustomProcessService extends FpxProcessService {
    constructor(
        private _httpProvider: HttpProviderService) {
        super();
    }
    
    override fetchProcess(payload: any): Observable<any> {
        const httpRequest = new HttpRequest();
        httpRequest.setMethod('GET');
        httpRequest.setResource('/process/{processId}');
        httpRequest.setContextPath('WorkflowService');
        httpRequest.addPathParameter('processId', payload.processId);
        httpRequest.setContextPath('WorkflowService');
        let bodyContent = payload;
        httpRequest.setBody(bodyContent);

        return this._httpProvider.invokeRestApi(httpRequest);
    }

    override doCheckerProcess = (payload: any, taskId: any): Observable<any> => {
        const bodyContent = {
            "requestReference": taskId?.requestReference,
            "decision": payload?.decision,
            "remarks": payload?.comments
        }

        const httpRequest = new HttpRequest();
        httpRequest.setMethod("POST");
        httpRequest.setResource("/checker/process");
        httpRequest.addHeaderParamter("serviceCode", "CHECKERWF");
        httpRequest.setBody(bodyContent);
        httpRequest.setContextPath('WorkflowService');
        return this._httpProvider.invokeRestApi(httpRequest);
    }
}