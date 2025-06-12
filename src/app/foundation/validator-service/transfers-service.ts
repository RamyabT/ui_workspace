import { Injectable, EventEmitter } from '@angular/core';
import {
  AsyncValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import {
  BaseFpxDataService,
  CreateFn,
  FindAllFn,
  FindByKeyFn,
  HttpRequest,
  LookUpFn,
  ModifyFn,
  PatchFn,
  CriteriaQuery,
  HttpProviderService,
  ILookUpData,
  FpxIHttpOption,
  IHttpErrorPayload
} from '@fpx/core';
import { IHttpSuccessPayload, ILookupResponse } from '@fpx/core';


import { map, Observable, of, catchError } from 'rxjs';

@Injectable()
export class TransferService implements BaseFpxDataService<any> {
  constructor(private _httpProvider: HttpProviderService) { }
  create(payload: any): CreateFn<any> {
    throw new Error('Method not implemented.');
  }

  findByKey(key: any, httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindByKeyFn<| null> {
    throw new Error('Method not implemented.');
  }
  modify(payload: any, httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
    throw new Error('Method not implemented.');
  }
  delete(payload: any, httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): ModifyFn<any> {
    throw new Error('Method not implemented.');
  }
  patch(payload: any, httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): PatchFn<any> {
    throw new Error('Method not implemented.');
  }

  findAll(criteriaQuery: CriteriaQuery, httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map()): FindAllFn<any> {
    throw new Error('Method not implemented.');
  }

  lookup(key: any, httpOption: Map<keyof FpxIHttpOption, Map<string, any>> = new Map(), criteriaQuery?: CriteriaQuery | undefined): LookUpFn<any> {
    throw new Error('Method not implemented.');
  }

  fetchNickName(nickName: any): Observable<any> {
    const httpRequest = new HttpRequest();
    httpRequest.addPathParameter("nickname", nickName)
    httpRequest.setResource("/beneficiary/nickname/{nickname}");
    httpRequest.setMethod("GET");
    return this._httpProvider.invokeRestApi(httpRequest).pipe(
      map((res: IHttpSuccessPayload<any>) =>{

       return res.body}),
        catchError((err: IHttpErrorPayload) => {
          return of(err.error);
        })
    );
  }


  fetchCreditCardNumber(CCardNumber:any,service:any):Observable<any> {
    const httpRequest = new HttpRequest();
    let payload:any={
      serviceCode:service,
      creditCardNumber:CCardNumber
}
     httpRequest.setResource("/beneficiary/cc");
     httpRequest.setMethod("POST");
     let bodyContent = {"beneficiarycc":payload};
     httpRequest.setBody(bodyContent);
     return this._httpProvider
     .invokeRestApi(httpRequest)
     .pipe(map((res: IHttpSuccessPayload<any>) => res.body.creditCardNumber ?? null),catchError((err:any) => {
       return of(err ?? null)
     })
     );
  }

  fetchaccountNumber(accountNumber: any): Observable<any> {
    const httpRequest = new HttpRequest();
    httpRequest.addPathParameter("accountnumber", accountNumber)
    httpRequest.setResource("/bank-account/{accountnumber}");
    httpRequest.setMethod("GET");
    return this._httpProvider.invokeRestApi(httpRequest).pipe(
      map((res: IHttpSuccessPayload<any>) =>

        res.body.beneInternal ?? null
      )
    );
  }


  fetchEmail(): Observable<any> {
    const httpRequest = new HttpRequest();
    // httpRequest.addPathParameter("accountnumber", accountNumber)
    httpRequest.setResource("/npss/proxyvalidation");
    httpRequest.addHeaderParamter('serviceCode','RETAILNPSSPROXYVALID');
    httpRequest.setContextPath("Payments");
    httpRequest.setMethod("GET");
    return this._httpProvider.invokeRestApi(httpRequest).pipe(
      map((res: IHttpSuccessPayload<any>) =>

        res.body ?? null
      )
    );
  }



  fetchIBAN(mobileNumber: any, beneOption: any): Observable<any> {
    const httpRequest = new HttpRequest();
    httpRequest.setResource("/npss/customer/details");
    if (beneOption == 1) {
      httpRequest.addQueryParameter('mobile', mobileNumber);

    }
    else {
      httpRequest.addQueryParameter('email', mobileNumber);

    }
    httpRequest.addQueryParameter('validationRequired','Y')
    httpRequest.addHeaderParamter('serviceCode', 'RETAILNPSSCUSTDETAILS');
    httpRequest.setContextPath("Payments");
    httpRequest.setMethod("GET");
    return this._httpProvider.invokeRestApi(httpRequest).pipe(
      map((res: IHttpSuccessPayload<any>) =>

        res.body ?? null
      )
    );
  }


  fetchRequestQueue(): Observable<any> {
    const httpRequest = new HttpRequest();
    httpRequest.setResource("/fulfillmentQueue");
    httpRequest.addHeaderParamter('serviceCode', 'RETAILFULFILLMENTSUMMARY');
    httpRequest.setContextPath("Payments");
    httpRequest.setMethod("GET");
    return this._httpProvider.invokeRestApi(httpRequest).pipe(
      map((res: IHttpSuccessPayload<any>) =>

        res.body.fulfillmentQueue ?? null
      )
    );
  }

  fetchDeclineQueue(requestToPayID:any,recipientMobile:any): Observable<any> {
  const httpRequest = new HttpRequest();
  httpRequest.setResource("/fulfillmentQueue/{paymentId}/{recipientMobile}");
  httpRequest.addPathParameter("paymentId",requestToPayID);
  httpRequest.addPathParameter("recipientMobile",recipientMobile);
  httpRequest.addHeaderParamter('serviceCode','RETAILFULFILLMENTDELETE')
  httpRequest.setMethod("DELETE");
  httpRequest.setContextPath('Payments');
  return this._httpProvider
  .invokeRestApi(httpRequest)
  .pipe(map((res: IHttpSuccessPayload<any>) => res.body ?? null),catchError((err:any) => {
    return of(err ?? null)
  })
  );
}



  fetchExchangeRates(fromCurrency: any, toCurrency: any, amount: any): Observable<any> {
    let payload = {
      "fromCurrency": fromCurrency,
      "toCurrency": toCurrency,
      "amount": amount
    }
    const httpRequest = new HttpRequest();
    httpRequest.setMethod('POST');
    httpRequest.setResource('/exchangerate');
    let bodyContent = { "exchangerate": payload };
    httpRequest.setBody(bodyContent);
    return this._httpProvider.invokeRestApi(httpRequest).pipe(
      map((res: IHttpSuccessPayload<any>) =>

        res.body.exchangerate ?? null
      )
    );
  };

  // fetchCharges(amount: any, serviceCode: any, currency: any,accountNumber:any): Observable<any> {
  //   let payload = {
  //     "amount": amount,
  //     "currency": currency,
  //     "serviceCode": serviceCode,
  //     "accountNumber": accountNumber
  //   }
  //   const httpRequest = new HttpRequest();
  //   httpRequest.setMethod('POST');
  //   httpRequest.setResource('/validate/charges');
  //   let bodyContent = { "validateCharges": payload };
  //   httpRequest.setBody(bodyContent);
  //   return this._httpProvider.invokeRestApi(httpRequest).pipe(
  //     map((res: IHttpSuccessPayload<any>) =>

  //       res.body.validateCharges ?? null
  //     )
  //   );
  // };

  // getMomentCurrentDate(){
  //   let currentDate: any = moment().format("YYYY-MM-DD");
  //     return currentDate;
  // }
  // getMomentFutureDate(){
  //   let futureDate: any = moment(new Date()).add(1, "day").format("YYYY-MM-DD");
  //   return futureDate;
  // }
  // caculateEndDate(startDate:any,frequency:any,noOfInstallment:any){
  //   let endDate
  //       if (frequency == '1') {
  //       endDate = moment(startDate).add(Number(noOfInstallment), "d").format('YYYY-MM-DD')
  //     }
  //     else if (frequency == '2') {
  //       endDate = moment(startDate).add(Number(noOfInstallment * 14), 'd').format('YYYY-MM-DD')
  //     }
  //     else if (frequency == '3') {
  //       endDate = moment(startDate).add(Number(noOfInstallment * 7), 'd').format('YYYY-MM-DD')
  //     }
  //     else if (frequency == '4') {
  //       endDate = moment(startDate).add(Number(noOfInstallment), 'M').format('YYYY-MM-DD')
  //     }
  //     else if (frequency == '5') {
  //       endDate = moment(startDate).add(Number(noOfInstallment * 3), 'M').format('YYYY-MM-DD')
  //     }
  //     else if (frequency == '6') {
  //       endDate = moment(startDate).add(Number(noOfInstallment * 6), 'M').format('YYYY-MM-DD')
  //     }
  //     else if (frequency == '7') {
  //       endDate = moment(startDate).add(Number(noOfInstallment), "y").format('YYYY-MM-DD')
  //     }
  //   return endDate

  // }


  getPaymentDetails(paymentId: any): Observable<any> {
    const httpRequest = new HttpRequest();
    httpRequest.addPathParameter("accountnumber", paymentId)
    httpRequest.setResource("/bank-account/{accountnumber}");
    httpRequest.setMethod("GET");
    return this._httpProvider.invokeRestApi(httpRequest).pipe(
      map((res: IHttpSuccessPayload<any>) =>

        res.body.beneInternal ?? null
      )
    );
  }
  downloadPendingDetails(paymentId: any): Observable<any> {
    const httpRequest = new HttpRequest();
    httpRequest.addPathParameter("accountnumber", paymentId)
    httpRequest.setResource("/bank-account/{accountnumber}");
    httpRequest.setMethod("GET");
    return this._httpProvider.invokeRestApi(httpRequest).pipe(
      map((res: IHttpSuccessPayload<any>) =>

        res.body.beneInternal ?? null
      )
    );
  }
  fetchIBANDetails(ibannumber:any):Observable<any> {
    const httpRequest = new HttpRequest();
    httpRequest.addPathParameter("ibannumber",ibannumber)
      httpRequest.setResource("/iban/{ibannumber}");
     httpRequest.setMethod("GET");

      return this._httpProvider
        .invokeRestApi(httpRequest)
        .pipe(map((res: IHttpSuccessPayload<any>) => res.body ?? null),catchError((err:any) => {
              return of(err ?? null)
            }));
  }

  CheckBeneficiary(payload:any){
    const httpRequest = new HttpRequest();
    httpRequest.setResource('/beneficiary/international/check');
    if(payload.iban!=null){
      httpRequest.addQueryParameter('iban',payload.iban);
     }
 else{
  httpRequest.addQueryParameter('accountNumber',payload.AccountNumber);
  }
     httpRequest.addQueryParameter('beneAccType',payload.AccountType);
     httpRequest.addQueryParameter('beneCountry',payload.beneCountry);

    httpRequest.setMethod('GET');
    return this._httpProvider
      .invokeRestApi(httpRequest)
      .pipe(map((res: IHttpSuccessPayload<any>) => res.body?.beneDetails ?? null),catchError((err:any) => {
            return of(err)
          }));
  }
  fetchBicCode(bic:any){
    const httpRequest = new HttpRequest();
    httpRequest.setMethod('GET');
    httpRequest.addPathParameter('bicCode',bic);
    httpRequest.setResource('/bic/{bicCode}');
  
    return this._httpProvider
        .invokeRestApi(httpRequest)
        .pipe(map((res: IHttpSuccessPayload<any>) => res.body?.bic ?? null),catchError((err:any) => {
              return of(err)
            }));
  
  }

  downloadTransferHistory(criteriaDetails: any): Observable<any> {
    const httpRequest = new HttpRequest();
    httpRequest.setResource("/downloadTransactions");
    httpRequest.setContextPath('Payments');
    httpRequest.addQueryParameter('fileType', 'PDF');
    httpRequest.addHeaderParamter('serviceCode','RETAILTRANSFERHISTORY');
    httpRequest.setCriteriaQuery(criteriaDetails);
    httpRequest.setMethod("GET");
    return this._httpProvider.invokeDownloadApi(httpRequest)
  }
  downloadTransferHistoryCSV(criteriaDetails: any): Observable<any> {
    const httpRequest = new HttpRequest();
    httpRequest.setResource("/downloadTransactions");
    httpRequest.setContextPath('Payments');
    httpRequest.addQueryParameter('fileType', 'csv');
    httpRequest.addHeaderParamter('serviceCode','RETAILTRANSFERHISTORY');
    httpRequest.setCriteriaQuery(criteriaDetails);
    httpRequest.setMethod("GET");
    return this._httpProvider.invokeDownloadApi(httpRequest)
  }
  downloadTransferHistoryExcel(criteriaDetails: any): Observable<any> {
    const httpRequest = new HttpRequest();
    httpRequest.setResource("/downloadTransactions");
    httpRequest.setContextPath('Payments');
    httpRequest.addQueryParameter('fileType', 'EXCEL');
    httpRequest.addHeaderParamter('serviceCode','RETAILTRANSFERHISTORY');
    httpRequest.setCriteriaQuery(criteriaDetails);
    httpRequest.setMethod("GET");
    return this._httpProvider.invokeDownloadApi(httpRequest)
  }
  fetchPaymentReceipt(paymentId: any) : Observable<any>{
    const httpRequest = new HttpRequest();
    httpRequest.addPathParameter("paymentId", paymentId)
    httpRequest.setResource("/paymentReceipt/{paymentId}");
    httpRequest.setContextPath('Payments');
    httpRequest.setMethod("GET");
    return this._httpProvider.invokeDownloadApi(httpRequest)
  }
}



