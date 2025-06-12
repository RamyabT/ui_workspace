import { Injectable, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, of, Subject } from "rxjs";
import { LanguageService } from "../language/language.service";
import { FPXFileUploadService } from "@fpx/core";
import { HttpProviderService, HttpRequest } from "@fpx/core";

@Injectable({
  providedIn: "root",
})
export class CustomFileUploadService extends FPXFileUploadService {
  
  constructor(private _httpProvider: HttpProviderService) {
    super();
  }
  
  override fileDetails(data: any) {
 return of({});
  }

  upload(data: any): Observable<any> { 
      const httpRequest = new HttpRequest();
      httpRequest.setMethod('POST');
      httpRequest.setResource('/documentupload?documentType=PASSPORT');
      httpRequest.addHeaderParamter('Content-Type', 'multipart/form-data');
      httpRequest.setAuthTokenRequired(true);
      httpRequest.aesEncryptionRequired("NO");
      let bodyContent = data;
      httpRequest.setBody(bodyContent);
      return this._httpProvider.invokeRestApi(httpRequest); 
  }

  download(data: any): Observable<any> {
    const httpRequest = new HttpRequest();
    httpRequest.setMethod('GET');
    httpRequest.setResource(`/documentdownload/${data}`);
    return this._httpProvider.invokeDownloadApi(httpRequest);
  }
}
