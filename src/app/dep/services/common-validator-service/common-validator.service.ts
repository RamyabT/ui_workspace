import { Injectable, inject } from "@angular/core";
import { FpxIHttpOption, HttpProviderService, HttpRequest, IHttpSuccessPayload } from "@fpx/core";
import { Observable, map, of } from "rxjs";
import { AppConfigService } from "../app-config-service/app-config.service";

@Injectable()
export class CommonValidatorService {
  constructor(private _httpProvider: HttpProviderService,private _appConfigService:AppConfigService) { }

  validateChecklist(payload: any, httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): Observable<any> {
    const httpRequest = new HttpRequest();
    httpRequest.setMethod('POST');
    httpRequest.setResource('/service/{serviceCode}/checklist');
    httpRequest.addPathParameter('serviceCode', payload.serviceCode);
    let bodyContent = {};
    httpRequest.setBody(bodyContent);

    return this._httpProvider.invokeRestApi(httpRequest, httpOption);
  }

  validateSchTranChecklist(payload: any, httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): Observable<any> {
    const httpRequest = new HttpRequest();
    httpRequest.setMethod('POST');
    httpRequest.setResource('/schtranservice/{serviceCode}/{paymentDate}/checklist');
    httpRequest.addPathParameter('serviceCode', payload.serviceCode);
    httpRequest.addPathParameter('paymentDate', payload.paymentDate);
    let bodyContent = {};
    httpRequest.setBody(bodyContent);

    return this._httpProvider.invokeRestApi(httpRequest, httpOption);
  }

  currencyHolidayCheck(payload: any, httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): Observable<any> {
    const httpRequest = new HttpRequest();
    httpRequest.setMethod('GET');
    httpRequest.setResource('/currency-holiday/{currency}/check');
    httpRequest.addPathParameter('currency', payload);
    return this._httpProvider.invokeRestApi(httpRequest, httpOption);
  }

  deviceDedupeCheck() {
    const httpRequest = new HttpRequest();
    httpRequest.setMethod('GET');
    // httpRequest.setResource('/device/dedupe');
    httpRequest.setResource('/devicetag');
    httpRequest.setContextPath('Common');
    this._appConfigService.getTenantId();
    return this._httpProvider.invokeRestApi(httpRequest).pipe(
      map((res: IHttpSuccessPayload<any>) => {
        return res?.body || [];
      })
    );
  };
}