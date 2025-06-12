import { Injectable } from "@angular/core";
import { Data, Router } from "@angular/router";
import {
  FpxFormControlErrorMessage,
  ContextMenuModel,
  HttpRequestPayload,
  BaseFpxFunctionality,
  HttpProviderService,
  HttpPayload,
  HttpRequest,
} from "@fpx/core";
import { HTTP } from "@ionic-native/http/ngx";
import { catchError, from, map, throwError } from "rxjs";
import { SmartDeviceService } from "../../smart-device/smart-device.service";
import { DeviceDetectorService } from "@dep/core";
import { environment } from "src/environments/environment";
import { DepHttpConfig } from "../DepHttpConfig.service";
import { APPCONSTANTS } from "@dep/constants";
import { SpinnerDialog } from "@awesome-cordova-plugins/spinner-dialog/ngx";

declare let cordova: any;
@Injectable({
  providedIn: "root",
})
export class DepHttpProviderService extends HttpProviderService {
  defaultContext: string = environment.defaultPublisher;

  constructor(
    public secureHTTP: HTTP,
    public _smartDeviceService: SmartDeviceService,
    private deviceDetectorService: DeviceDetectorService,
    private _router: Router,
    private _depHttpConfig: DepHttpConfig,
    private _spinnerDialog: SpinnerDialog
  ) {
    super();

    if (this.deviceDetectorService.isHybrid() && APPCONSTANTS.enableSSLPinning) {
      this.setInvokeRestApiInterceptor(
        "invokeRestApiInterceptor",
        this.secureInvokeRestApi
      );

      this.setInvokeRestApiInterceptor(
        "invokeDownloadApiInterceptor",
        this.secureDownloadApi
      );
    
    }
  }

  public secureInvokeRestApi = (url: string, payload: HttpPayload, headers: any) => {
    let request = payload;
    let isMultipart:boolean = false;
    if (request.headerParams) {
      request.headerParams.map((param: any) => {
        if (param.key == 'Content-Type') {
          delete headers['Content-Type'];
          isMultipart = true;
        }
        else headers[param.key] = param.value;
      });
    }
    
    if(headers?.authorization && headers?.authorization.length < 10){
      delete headers['authorization'];
    }

    if(isMultipart) this.secureHTTP.setDataSerializer("multipart");
    else this.secureHTTP.setDataSerializer("json");
    let secureHTTPResponse: any;
    
    if (payload.method == "GET") {
      secureHTTPResponse = this.secureHTTP.get(url, payload.body,headers);
    } else if (payload.method == "POST") {
      secureHTTPResponse = this.secureHTTP.post(url, payload.body, headers);
    } else if (payload.method == "PUT") {
      secureHTTPResponse = this.secureHTTP.put(url, payload.body, headers);
    } else if (payload.method == "DELETE") {
      secureHTTPResponse = this.secureHTTP.delete(url, payload.body, headers);
    } else if (payload.method == "PATCH") {
      secureHTTPResponse = this.secureHTTP.patch(url, payload.body, headers);
    }
    return from(secureHTTPResponse).pipe(
      map((response: any) => {
        let newRes: any = {};
        let _responseDataStr = response["data"];
        let _responseData: any;
        if(this._depHttpConfig.encryptEnabled && _responseDataStr && request.encryptionRequired != 'NO'){
          let data = JSON.parse(_responseDataStr).data;
          _responseData = this._depHttpConfig.decrypt(data);
        } else{
          _responseData = _responseDataStr ? JSON.parse(_responseDataStr) : "";
        }
        
        newRes["body"] = _responseData || "";
        newRes["status"] = response["status"];
        const headerMap = new Map(Object.entries(response["headers"]));
        newRes["headers"] = headerMap;
        console.log("status response", newRes);
        
        return newRes;
      }),
      catchError((err:any) => {
        let newErrRes: any = {};

        if (err.status == 401) {
          newErrRes = err;
          this._router.navigate([
            "display-shell",
            "http-status",
            "unauthorized",
          ]);
        } else if (err.status == 503) {
          newErrRes = err;
          this._router.navigate([
            "display-shell",
            "http-status",
            "service-unavailable",
          ]);
        } else if (err.status == 502) {
          newErrRes = err;
          this._router.navigate([
            "display-shell",
            "http-status",
            "bad-gateway",
          ]);
        }
        else if (err.status == 526 || err.status == 495 || err.status==-2) {
          newErrRes = err;
          
          this._router.navigate([
            "display-shell",
            "http-status",
            "ssl-certificate-error"
          ])
        } else {
          let errStr = err.error;
          let _errorData: any;

          if(this._depHttpConfig.encryptEnabled && errStr){
            let data = JSON.parse(errStr).data;
            _errorData = this._depHttpConfig.decrypt(data);
          } else{
            _errorData = errStr ? JSON.parse(errStr) : "";
          }

          newErrRes["error"] = _errorData || "";
          newErrRes["status"] = err["status"];
          const headerMap = new Map(Object.entries(err["headers"]));
          newErrRes["headers"] = headerMap;
        }
        
        return throwError(newErrRes);
      }));
  };

  public secureDownloadApi = (url: string, payload: HttpPayload, headers: any) => {
    let request = payload;
    if (request.headerParams) {
      request.headerParams.map((param: any) => {
        headers[param.key] = param.value;
      });
    }

    headers.responseType = 'blob';

    let secureHTTPResponse:any;
    let requestOption: any = {
      method: payload.method.toLowerCase(), 
      data: payload.body,
      headers: headers,
      responseType: "blob"
    }

    this._spinnerDialog.show("", "", true);

    secureHTTPResponse = this.secureHTTP.sendRequest(url, requestOption);
    return from(secureHTTPResponse).pipe(
      map((response: any) => {
        this._spinnerDialog.hide();

        let _responseData = response["data"];
        let newRes: any = {};        
        newRes["body"] = _responseData || "";
        newRes["status"] = response["status"];
        const headerMap = new Map(Object.entries(response["headers"]));
        newRes["headers"] = headerMap;
        console.log("status response", newRes);
        
        return newRes;
      }),
      catchError((err:any) => {
        this._spinnerDialog.hide();

        let newErrRes: any = {};

        if (err.status == 401) {
          newErrRes = err;
          this._router.navigate([
            "display-shell",
            "http-status",
            "unauthorized",
          ]);
        } else if (err.status == 503) {
          newErrRes = err;
          this._router.navigate([
            "display-shell",
            "http-status",
            "service-unavailable",
          ]);
        } else if (err.status == 502) {
          newErrRes = err;
          this._router.navigate([
            "display-shell",
            "http-status",
            "bad-gateway",
          ]);
        }
        else if (err.status == 526 || err.status == 495 || err.status==-2) {
          newErrRes = err;
          
          this._router.navigate([
            "display-shell",
            "http-status",
            "ssl-certificate-error"
          ])
        } else {
          let errStr = err.error;
          let _errorData: any;

          if(this._depHttpConfig.encryptEnabled && errStr){
            let data = JSON.parse(errStr).data;
            _errorData = this._depHttpConfig.decrypt(data);
          } else{
            _errorData = errStr ? JSON.parse(errStr) : "";
          }

          newErrRes["error"] = _errorData || "";
          newErrRes["status"] = err["status"];
          const headerMap = new Map(Object.entries(err["headers"]));
          newErrRes["headers"] = headerMap;
        }
        
        return throwError(newErrRes);
      }));
  }


  getDefaultContext() {
    return environment.defaultPublisher;
  }
  getBaseURL(){
    return environment.baseURL;
  }
}
