import { ChangeDetectorRef, EventEmitter, Injectable, Optional } from "@angular/core";
import { Observable, catchError, map, of } from "rxjs";
import { HttpProviderService, HttpRequest, IHttpErrorPayload, IHttpSuccessPayload } from "@fpx/core";

@Injectable({
  providedIn: 'root'
})
export class EtransfersFavouritePaymentsValidator {
  constructor(
    private _httpProvider: HttpProviderService) {
  }
  markFavouritePayments(paymentId: any): Observable<any> {
    const httpRequest = new HttpRequest();
    let payload: any = {
      paymentId: paymentId
    }
    httpRequest.setResource("/favpayments");
    httpRequest.setMethod("POST");
    let bodyContent = { "favpayments": payload };
    httpRequest.setBody(bodyContent);
    httpRequest.setContextPath('Payments');
    return this._httpProvider
      .invokeRestApi(httpRequest)
      .pipe(map((res: IHttpSuccessPayload<any>) => res.body ?? null), catchError((err: any) => {
        return of(err ?? null)
      })
      );
  }
  unMarkFavouritePayments(paymentId: any): Observable<any> {
    const httpRequest = new HttpRequest();
    let payload: any = {
      paymentId: paymentId
    }
    httpRequest.setResource("/favpayments/{paymentId}");
    httpRequest.addPathParameter("paymentId", payload.paymentId);
    httpRequest.setMethod("PUT");
    let bodyContent = { "favpayments": payload };
    httpRequest.setBody(bodyContent);
    httpRequest.setContextPath('Payments');
    return this._httpProvider
      .invokeRestApi(httpRequest)
      .pipe(map((res: IHttpSuccessPayload<any>) => res.body?.paymentId ?? null), catchError((err: any) => {
        return of(err ?? null)
      })
      );


  }
}