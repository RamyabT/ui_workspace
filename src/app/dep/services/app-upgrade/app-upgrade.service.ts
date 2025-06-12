import { HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DeviceDetectorService } from "@dep/core";
import {
  CriteriaQuery,
  FindAllFn,
  FpxIHttpOption,
  HttpProviderService,
  HttpRequest,
  IHttpSuccessPayload,
} from "@fpx/core";

import { Observable, map } from "rxjs";
import { DepHttpProviderService } from "../dep-http-provider-service/dep-http-provider.service";

@Injectable({ providedIn: "root" })
export class AppUpgradeService {

  versionResponse: any;
  deviceInfo: any;
  constructor(
    private _httpProvider: DepHttpProviderService
  ) { }


  updateVersionDetails(deviceInfo: any): Observable<any> {
    const httpRequest: HttpRequest = new HttpRequest();

    httpRequest.setResource('/appVersion/{appVersion}');
    httpRequest.addPathParameter('appVersion', deviceInfo?.appVersion);
    httpRequest.addQueryParameter('appType', (deviceInfo?.os).toLowerCase());
    httpRequest.setMethod('GET');

    return this._httpProvider.invokeRestApi(httpRequest).pipe(
      map(
        (response: any) => {
          const appVersionResponse = {
            mandatory: response?.body?.appupgrade?.mandatory,
            updateAvailable: response?.body?.appupgrade?.updateAvailable,
            title: 'VERSION_UPDATE.title',
            description: 'VERSION_UPDATE.description'
          };

          return appVersionResponse;
        }
      )
    );

  }
}


