import { Injectable } from "@angular/core";
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
  ILookUpData,
  LoadForm,
  IHttpSuccessPayload,
  ILookupResponse,
  HttpRequestPayload,
  IHttpErrorPayload,
} from "@fpx/core";
import { environment } from "src/environments/environment";
import { catchError, map, of, throwError } from "rxjs";
import { SelfservicestfaService } from "../../selfservicestfa-service/selfservicestfa.service";

@Injectable()
export class GooglemapBranchService {
  directionsRenderer: google.maps.DirectionsRenderer | any;
  directionsService: google.maps.DirectionsService | any;
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

  fetchBranchMaster() {

    const httpRequest = new HttpRequest();
    httpRequest.setMethod("GET");
    httpRequest.setResource("/branches");
    httpRequest.setContextPath('Common');
     return this._httpProvider.invokeRestApi(httpRequest).pipe(
      map((res: IHttpSuccessPayload<any>) => {
        return res.body.branches;
      }),
      catchError((err: IHttpErrorPayload) => {
        return throwError(err);
      })
    );


    // const httpRequest: HttpRequestPayload = {
    //   resource: "/branchCodes",
    //   method: "GET",
    // };

    // return this._httpProvider.invokeApi(httpRequest).pipe(
    //   map((res: IHttpSuccessPayload<any>) => {
    //     return res.body.branchCodes;
    //   }),
    //   catchError((err: IHttpErrorPayload) => {
    //     return throwError(err);
    //   })
    // );
  }

  // fetchBranchRepMaster(latitude:any, longitude:any) {
  //   const position = {
  //     longitude: longitude,
  //     latitude: latitude,
  //     //  longitude: 30.0444,
  //     // latitude: 31.2357
  //   };


    
  //   const httpRequest: HttpRequestPayload = {
  //     resource: "/branchrep",
  //     body: { branchrep: position },
  //     method: "POST",
  //   };

  //   return this._httpProvider.invokeRestApiw(httpRequest).pipe(
  //     map((res: IHttpSuccessPayload<any>) => {
  //       console.log("Hellllll", res.body);
  //       return res.body;
  //     }),
  //     catchError((err: IHttpErrorPayload) => {
  //       return throwError(err);
  //     })
  //   );
  // }
  fetchGoogleApiDistance(latitude:any, longitude:any,response:any) {
    const position = {
       longitude: String(longitude),
       latitude: String(latitude),
       //"longitude": "30.0444",
        // "latitude": "31.2357"
    };
    let destValue;
    for (let key in response) {
      //for(var key=0;key<25;key++){
      if(destValue!=undefined)
        destValue=destValue+response[key].latitude+','+response[key].longitude+'|';
        else
        destValue=response[key].latitude+','+response[key].longitude+'|';
    }
    const httpRequest: HttpRequestPayload = {
      resource: "destinations="+latitude+","+longitude+"&origins="+destValue,
      method: "GET",
    };
    return this.selfservicestfaService.invokeGoogleMapApi(httpRequest).pipe(
      map((res: IHttpSuccessPayload<any>) => {
        console.log('Google Map api: ',res);
        return res;
      }),
      catchError((err: IHttpErrorPayload) => {
        return throwError(err);
      })
    );
  
  // fetchAtmRepMaster(latitude, longitude) {
  //   const position = {
  //    //longitude: longitude,
  //   //latitude: latitude,
  //      longitude: 30.0444,
  //      latitude: 31.2357,
  //   };
  //   const httpRequest: HttpRequestPayload = {
  //     resource: "/atmrep",
  //     body: { atmrep: position },
  //     method: "POST",
  //   };

  //   return this._httpProvider.invokeApi(httpRequest).pipe(
  //     map((res: IHttpSuccessPayload) => {
  //       console.log("Hellllll", res.body);
  //       return res.body.atmrep;
  //     }),
  //     catchError((err: IHttpErrorPayload) => {
  //       return throwError(err);
  //     })
  //   );
  // }
    }
}
