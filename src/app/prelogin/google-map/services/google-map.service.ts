import { Injectable } from "@angular/core";
import { catchError, map, throwError } from "rxjs";
import { HttpRequestPayload, IHttpErrorPayload, IHttpSuccessPayload,ILookupResponse } from '@fpx/core';
import {
  BaseFpxDataService,
  CreateFn,
  FindAllFn,
  FindByKeyFn,
  HttpRequest,
  LookUpFn,
  ModifyFn,
  CriteriaQuery,
  HttpProviderService,
  ILookUpData
} from '@fpx/core';
import { SelfservicestfaService } from "../../selfservicestfa-service/selfservicestfa.service";

@Injectable()
export class GoogleMapService {
  directionsRenderer: google.maps.DirectionsRenderer | undefined ;
  directionsService: google.maps.DirectionsService | undefined

  constructor(public _httpProvider: HttpProviderService, public selfservicestfaService: SelfservicestfaService) {}

  getCurrentLocation(successCallback: any, errorCallBack: any) {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          successCallback(position);
        },
        () => {
          errorCallBack("DENIED");
        }
      );
    } else {
      errorCallBack();
    }
  }

  fetchAtmMaster() {

    const httpRequest = new HttpRequest();
    
    httpRequest.setMethod("GET");
    httpRequest.setResource("/atmmaster");
    httpRequest.setContextPath('Common');

     return this._httpProvider.invokeRestApi(httpRequest).pipe(
      map((res: IHttpSuccessPayload<any>) => res.body.atmmaster),
      catchError((err: IHttpErrorPayload) => {
        return throwError(err);
      })
    );
    }
    }

