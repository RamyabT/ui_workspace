import { Injectable } from '@angular/core';
import { HttpProviderService, HttpRequest, IHttpSuccessPayload } from '@fpx/core';
import { Observable, Subject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class NpssMainService {
  private emitChangeSource = new Subject<any>();
  changeEmitted$ = this.emitChangeSource.asObservable();
  emitChange(change: any) {
      this.emitChangeSource.next(change);
  }

  constructor(private _httpProvider: HttpProviderService) { }

  fetchNpssUserStaus(): Observable<NpssCustomerStatus> {
    const httpRequest = new HttpRequest();
    httpRequest.setResource("/npss/customer/status");
    httpRequest.setMethod("GET");
    httpRequest.addHeaderParamter('serviceCode', "RETAILNPSSCUSTSTATUS");
    httpRequest.setContextPath("Payments");
    return this._httpProvider
      .invokeRestApi(httpRequest)
      .pipe(map((res: IHttpSuccessPayload<any>) => res.body));
  }
    fetchSplitQrRequest(payload:any): Observable<any> {
    const httpRequest = new HttpRequest();
    httpRequest.setResource("/splitbillqrrequest");
    httpRequest.setMethod("POST");
    let bodyContent = { "splitbillqrrequest": payload };
    httpRequest.setBody(bodyContent);
    httpRequest.addHeaderParamter("serviceCode", "RETAILSPLITQRREQ");
    httpRequest.setContextPath("Payments");
    return this._httpProvider
      .invokeRestApi(httpRequest)
      .pipe(map((res: IHttpSuccessPayload<any>) => res.body));
  }
    fetchSplitBillDetails(payload:any):Observable<any>{
    const httpRequest = new HttpRequest();
    httpRequest.setResource("/splitbill/details/{reqToPay}");
    httpRequest.addPathParameter('reqToPay', payload);
    httpRequest.setMethod("GET");
    httpRequest.addHeaderParamter("serviceCode", "RETAILSPLITBILLQRDETAIL");
    httpRequest.setContextPath("Payments");
    return this._httpProvider
      .invokeRestApi(httpRequest)
      .pipe(map((res: IHttpSuccessPayload<any>) => res.body));
  }
}

export interface NpssCustomerStatus {
  status: string;
  accountDetails?: NpssCustomerAccounts[];
}

export interface NpssCustomerAccounts {
  iban: string;
  currency: string;
  isPrimary?: "Y" | "N";
}