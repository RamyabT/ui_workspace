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
import * as moment from 'moment';

import { map, Observable, of, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Casaaccount } from '../casaaccount-service/casaaccount.model';

@Injectable()
export class CommonService implements BaseFpxDataService<any> {

  public casaServiceRestriction: Map<string, any> = new Map();
  
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

  fetchaccountNumber(accountNumber: any): Observable<any> {
    const httpRequest = new HttpRequest();
    httpRequest.addPathParameter("accountnumber", accountNumber)
    httpRequest.setResource("/bank-account/{accountnumber}");
    httpRequest.setContextPath('Accounts');
    httpRequest.setMethod("GET");
    return this._httpProvider.invokeRestApi(httpRequest).pipe(
      map((res: IHttpSuccessPayload<any>) =>

        res.body.beneInternal ?? null
      )
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
    httpRequest.setContextPath('Accounts');
    httpRequest.setBody(bodyContent);
    return this._httpProvider.invokeRestApi(httpRequest).pipe(
      map((res: IHttpSuccessPayload<any>) =>
        res.body.exchangerate ?? null
      )
    );
  };

  downloadSwiftTransaction(instrumentId:any): Observable<any> {
    const httpRequest = new HttpRequest();
    httpRequest.setResource("/swift/transaction/cheque");
    httpRequest.setContextPath('Accounts');
    let payload = {
      "instrumentId":instrumentId
    }
    httpRequest.addHeaderParamter('serviceCode', 'CORPSWIFTTRANCHQ');
    // httpRequest.addHeaderParamter('Content-Type','application/pdf');
    httpRequest.setBody(payload);  
    httpRequest.setMethod("POST");
    return this._httpProvider.invokeDownloadApi(httpRequest)
  }

  fetchCharges(amount: any, serviceCode: any, currency: any, accountNumber: any): Observable<any> {
    let payload = {
      "amount": amount,
      "currency": currency,
      "serviceCode": serviceCode,
      "accountNumber": accountNumber
    }
    const httpRequest = new HttpRequest();
    httpRequest.setMethod('POST');
    httpRequest.setResource('/validate/charges');
    httpRequest.setContextPath('Accounts');
    let bodyContent = { "validateCharges": payload };
    httpRequest.setBody(bodyContent);
    return this._httpProvider.invokeRestApi(httpRequest).pipe(
      map((res: IHttpSuccessPayload<any>) =>

        res.body.validateCharges ?? null
      )
    );
  };
  downloadStatement(criteriaDetails: any): Observable<any> {
    const httpRequest = new HttpRequest();
    httpRequest.setResource("/statementdownload");
    httpRequest.setContextPath('Accounts');
    httpRequest.addQueryParameter('exportType', 'PDF');
    httpRequest.addHeaderParamter('serviceCode','RETAILACCOUNTSTATEMENTDOWNLOAD');
    httpRequest.setCriteriaQuery(criteriaDetails);
    httpRequest.setMethod("GET");
    return this._httpProvider.invokeDownloadApi(httpRequest)
  }
  downloadStatementDetails(transactionReference: any): Observable<any> {
    const httpRequest = new HttpRequest();
    httpRequest.setResource("/statementdownload");
    httpRequest.addQueryParameter('transactionReference', transactionReference);
    httpRequest.setContextPath('Accounts');
    httpRequest.addQueryParameter('exportType', 'PDF');
    httpRequest.addHeaderParamter('serviceCode','RETAILACCOUNTSTMTDTLSDOWNLOAD');
    httpRequest.setMethod("GET");
    return this._httpProvider.invokeDownloadApi(httpRequest)
  }
  downloadDCTransactionStatement(criteriaDetails: any): Observable<any> {
    const httpRequest = new HttpRequest();
    httpRequest.setResource("/dctransactionreport");
    httpRequest.setContextPath('DebitCards');
    httpRequest.addQueryParameter('fileType', 'PDF');
    httpRequest.addHeaderParamter('serviceCode','RETAILDCTRANSACTIONSUMMARY');
    httpRequest.setCriteriaQuery(criteriaDetails);
    httpRequest.setMethod("GET");
    return this._httpProvider.invokeDownloadApi(httpRequest)
  }
  downloadDCTransactionStatementCSV(criteriaDetails: any): Observable<any> {
    const httpRequest = new HttpRequest();
    httpRequest.setResource("/dctransactionreport");
    httpRequest.setContextPath('DebitCards');
    httpRequest.addQueryParameter('fileType', 'CSV');
    httpRequest.addHeaderParamter('serviceCode','RETAILDCTRANSACTIONSUMMARY');
    httpRequest.setCriteriaQuery(criteriaDetails);
    httpRequest.setMethod("GET");
    return this._httpProvider.invokeDownloadApi(httpRequest)
  }
  downloadDCDetails(cardRefNumber: any): Observable<any> {
    const httpRequest = new HttpRequest();
    httpRequest.setResource("/dcdetailsreport/{cardReference}");
    httpRequest.setContextPath('DebitCards');
    httpRequest.addQueryParameter('fileType', 'PDF');
    httpRequest.addPathParameter('cardReference', cardRefNumber);
    httpRequest.addHeaderParamter('serviceCode','RETAILDCDETAILS');
    // httpRequest.setCriteriaQuery(criteriaDetails);
    httpRequest.setMethod("GET");
    return this._httpProvider.invokeDownloadApi(httpRequest)
  }
  downloadCCDetails(cardRefNumber: any): Observable<any> {
    const httpRequest = new HttpRequest();
    httpRequest.setResource("/ccdetailsreport/{cardReference}");
    httpRequest.setContextPath('CreditCards');
    httpRequest.addQueryParameter('fileType', 'PDF');
    httpRequest.addPathParameter('cardReference', cardRefNumber);
    httpRequest.addHeaderParamter('serviceCode','RETAILCCDETAILS');
    // httpRequest.setCriteriaQuery(criteriaDetails);
    httpRequest.setMethod("GET");
    return this._httpProvider.invokeDownloadApi(httpRequest)
  }


  downloadRepaymentScheduleReport(loanAccountNumber:any): Observable<any> {
    const httpRequest = new HttpRequest();
    httpRequest.setResource("/repaymentschedulereport");
    httpRequest.setContextPath('Loans');
    httpRequest.addQueryParameter('fileType', 'PDF');
    httpRequest.addQueryParameter('loanAccountNumber',loanAccountNumber);
    httpRequest.addHeaderParamter('serviceCode', 'RETAILLOANDETAILS');
    httpRequest.setMethod("GET");
    return this._httpProvider.invokeDownloadApi(httpRequest)
  }

  downloadDisbursalScheduleReport(accountNumber:any): Observable<any> {
    const httpRequest = new HttpRequest();
    httpRequest.setResource("/loandisbursalschreport");
    httpRequest.setContextPath('Loans');
    httpRequest.addQueryParameter('fileType', 'PDF');
    httpRequest.addQueryParameter('loanAccountNumber',accountNumber);
    httpRequest.addHeaderParamter('serviceCode', 'RETAILLOANDETAILS');
    httpRequest.setMethod("GET");
    return this._httpProvider.invokeDownloadApi(httpRequest)

  }

  downloadLoanDetailsReport(loanAccountNumber:any): Observable<any> {
    const httpRequest = new HttpRequest();
    httpRequest.setResource("/loandetailsreceipt");
    httpRequest.setContextPath('Loans');
    httpRequest.addQueryParameter('fileType', 'PDF');
    httpRequest.addQueryParameter('loanAccountNumber',loanAccountNumber);
    httpRequest.addHeaderParamter('serviceCode', 'RETAILLOANDETAILS');
    httpRequest.setMethod("GET");
    return this._httpProvider.invokeDownloadApi(httpRequest)
  }
  
  downloadAccountStatement(criteriaDetails: any): Observable<any> {
    const httpRequest = new HttpRequest();
    httpRequest.setResource("/statementdownload");
    httpRequest.setContextPath('Accounts');
    httpRequest.addQueryParameter('exportType', 'CSVDESC');
    httpRequest.addHeaderParamter('serviceCode','RETAILACCOUNTSTATEMENTDOWNLOAD');
    httpRequest.setCriteriaQuery(criteriaDetails);
    httpRequest.setMethod("GET");
    return this._httpProvider.invokeDownloadApi(httpRequest)
  }

  downloadAccountStatementOTN(criteriaDetails: any): Observable<any> {
    const httpRequest = new HttpRequest();
    httpRequest.setResource("/statementdownload");
    httpRequest.setContextPath('Accounts');
    httpRequest.addQueryParameter('exportType', 'CSVASC');
    httpRequest.addHeaderParamter('serviceCode','RETAILACCOUNTSTATEMENTDOWNLOAD');
    httpRequest.setCriteriaQuery(criteriaDetails);
    httpRequest.setMethod("GET");
    return this._httpProvider.invokeDownloadApi(httpRequest)
  }

  downloadQFXAccountStatement(criteriaDetails: any): Observable<any> {
    const httpRequest = new HttpRequest();
    httpRequest.setResource("/statementdownload");
    httpRequest.setContextPath('Accounts');
    httpRequest.addQueryParameter('exportType', 'qfx');
    httpRequest.addHeaderParamter('serviceCode','RETAILACCOUNTSTATEMENTDOWNLOAD');
    httpRequest.setCriteriaQuery(criteriaDetails);
    httpRequest.setMethod("GET");
    return this._httpProvider.invokeDownloadApi(httpRequest)
  }

  downloadOFXAccountStatement(criteriaDetails: any): Observable<any> {
    const httpRequest = new HttpRequest();
    httpRequest.setResource("/statementdownload");
    httpRequest.setContextPath('Accounts');
    httpRequest.addQueryParameter('exportType', 'ofx');
    httpRequest.addHeaderParamter('serviceCode','RETAILACCOUNTSTATEMENTDOWNLOAD');
    httpRequest.setCriteriaQuery(criteriaDetails);
    httpRequest.setMethod("GET");
    return this._httpProvider.invokeDownloadApi(httpRequest)
  }

  downloadQBOAccountStatement(criteriaDetails: any): Observable<any> {
    const httpRequest = new HttpRequest();
    httpRequest.setResource("/statementdownload");
    httpRequest.setContextPath('Accounts');
    httpRequest.addQueryParameter('exportType', 'qbo');
    httpRequest.addHeaderParamter('serviceCode','RETAILACCOUNTSTATEMENTDOWNLOAD');
    httpRequest.setCriteriaQuery(criteriaDetails);
    httpRequest.setMethod("GET");
    return this._httpProvider.invokeDownloadApi(httpRequest)
  }

  downloadPCTransactionStatement(criteriaDetails: any): Observable<any> {
    const httpRequest = new HttpRequest();
    httpRequest.setResource("/pctransactionreport");
    httpRequest.setContextPath('PrepaidCards');
    httpRequest.addQueryParameter('fileType', 'PDF');
    httpRequest.addHeaderParamter('serviceCode','RETAILPCTRANSACTIONHISTORY');
    httpRequest.setCriteriaQuery(criteriaDetails);
    httpRequest.setMethod("GET");
    return this._httpProvider.invokeDownloadApi(httpRequest)
  }
  downloadTaxForm(inventoryNumber:any): Observable<any> {
    const httpRequest = new HttpRequest();
    httpRequest.setResource("/documentdownload/{inventoryNumber}");
      httpRequest.addPathParameter("inventoryNumber", inventoryNumber);
    httpRequest.setContextPath('Common');
    httpRequest.setMethod("GET");
    return this._httpProvider.invokeDownloadApi(httpRequest)
  }
  downloadLoanDisclosure(inventoryNumber:any): Observable<any> {
    const httpRequest = new HttpRequest();
    httpRequest.setResource("/documentdownload/{inventoryNumber}");
      httpRequest.addPathParameter("inventoryNumber", inventoryNumber)
    httpRequest.setContextPath('Common');
    httpRequest.setMethod("GET");
    return this._httpProvider.invokeDownloadApi(httpRequest)
  }
  downloadPCTransactionStatementCSV(criteriaDetails: any): Observable<any> {
    const httpRequest = new HttpRequest();
    httpRequest.setResource("/pctransactionreport");
    httpRequest.setContextPath('PrepaidCards');
    httpRequest.addQueryParameter('fileType', 'CSV');
    httpRequest.addHeaderParamter('serviceCode','RETAILPCTRANSACTIONHISTORY');
    httpRequest.setCriteriaQuery(criteriaDetails);
    httpRequest.setMethod("GET");
    return this._httpProvider.invokeDownloadApi(httpRequest)
  }

  transferEndDate(startDate: any, frequency: any, noOfInstallment: any, paymentDaysInterval: any = undefined) {
    let endDate
    if (frequency == '1') {
      endDate = moment(startDate).add(Number(noOfInstallment - 1), "d").format('YYYY-MM-DD')
    }
    else if (frequency == '2') {
      endDate = moment(startDate).add(Number((noOfInstallment - 1) * 7), 'd').format('YYYY-MM-DD')
    }
    else if (frequency == '3') {
      endDate = moment(startDate).add(Number((noOfInstallment - 1) * 14), 'd').format('YYYY-MM-DD')
    }
    else if (frequency == '4') {
      endDate = moment(startDate).add(Number(noOfInstallment - 1), 'M').format('YYYY-MM-DD')
    }
    else if (frequency == '5') {
      endDate = moment(startDate).add(Number((noOfInstallment - 1) * 6), 'M').format('YYYY-MM-DD')
    }
    else if (frequency == '6') {
      endDate = moment(startDate).add(Number(noOfInstallment - 1), "y").format('YYYY-MM-DD')
    }
    return endDate
  }

  caculateEndDate(startDate: any, frequency: any, noOfInstallment: any, paymentDaysInterval: any = undefined) {
    let endDate
    if (frequency == '1') {
      endDate = moment(startDate).add(Number(noOfInstallment - 1), "d").format('YYYY-MM-DD')
    }
    else if (frequency == '2') {
      endDate = moment(startDate).add(Number((noOfInstallment - 1) * 7), 'd').format('YYYY-MM-DD')
    }
    else if (frequency == '3') {
      endDate = moment(startDate).add(Number((noOfInstallment - 1) * 14), 'd').format('YYYY-MM-DD')
    }
    else if (frequency == '4') {
      endDate = moment(startDate).add(Number(noOfInstallment - 1), 'M').format('YYYY-MM-DD')
    }
    else if (frequency == '5') {
      endDate = moment(startDate).add(Number((noOfInstallment - 1) * 3), 'M').format('YYYY-MM-DD')
    }
    else if (frequency == '6') {
      endDate = moment(startDate).add(Number((noOfInstallment - 1) * 6), 'M').format('YYYY-MM-DD')
    }
    else if (frequency == '7') {
      endDate = moment(startDate).add(Number(noOfInstallment - 1), "y").format('YYYY-MM-DD')
    }
    else if (frequency == '7') {
      endDate = moment(startDate).add(Number(noOfInstallment - 1), "y").format('YYYY-MM-DD')
    }
    else if (frequency == '8') {
      // endDate = moment(startDate).add(Number(noOfInstallment - 1) * paymentDaysInterval).format('YYYY-MM-DD')
      endDate = moment(startDate).add(Number((noOfInstallment - 1) * paymentDaysInterval), 'd').format('YYYY-MM-DD')
    }
    return endDate

  }

  endDateCalculation(startDate: any, frequency: any, noOfInstallment: any,paymentDaysInterval:any = undefined) {
    let endDate
    if (frequency == '1') {
      endDate = moment(startDate).add(Number(noOfInstallment), "d").format('YYYY-MM-DD')
    }
    else if (frequency == '2') {
      endDate = moment(startDate).add(Number((noOfInstallment) * 7), 'd').format('YYYY-MM-DD')
    }
    else if (frequency == '3') {
      endDate = moment(startDate).add(Number((noOfInstallment) * 14), 'd').format('YYYY-MM-DD')
    }
    else if (frequency == '4') {
      endDate = moment(startDate).add(Number(noOfInstallment), 'M').format('YYYY-MM-DD')
    }
    else if (frequency == '5') {
      endDate = moment(startDate).add(Number((noOfInstallment) * 3), 'M').format('YYYY-MM-DD')
    }
    else if (frequency == '6') {
      endDate = moment(startDate).add(Number((noOfInstallment) * 6), 'M').format('YYYY-MM-DD')
    }
    else if (frequency == '7') {
      endDate = moment(startDate).add(Number(noOfInstallment), "y").format('YYYY-MM-DD')
    }
    else if (frequency == '7') {
      endDate = moment(startDate).add(Number(noOfInstallment), "y").format('YYYY-MM-DD')
    }
    else if (frequency == '8') {
      // endDate = moment(startDate).add(Number(noOfInstallment - 1) * paymentDaysInterval).format('YYYY-MM-DD')
      endDate = moment(startDate).add(Number((noOfInstallment) * paymentDaysInterval), 'd').format('YYYY-MM-DD')
    }
    return endDate

  }

  fetchAccountSummary():Observable<any> {
    const httpRequest = new HttpRequest();
    httpRequest.setMethod('GET');
    httpRequest.setResource('/account/summary');
    httpRequest.setContextPath('Accounts');
   httpRequest.addHeaderParamter('serviceCode', 'RETAILSUMMARY');
    return this._httpProvider.invokeRestApi(httpRequest).pipe(
      map((res: IHttpSuccessPayload<any>) => {
        return res.body;
      })
    );
  }

  fetchCardSummary():Observable<any> {
    const httpRequest = new HttpRequest();
    let criteriaQuery  = new CriteriaQuery();
    httpRequest.setMethod('GET');
    httpRequest.setResource('/card/summary');
    httpRequest.addHeaderParamter('serviceCode', 'RETAILCARDTRENDS');
    httpRequest.setCriteriaQuery(criteriaQuery);
    return this._httpProvider.invokeRestApi(httpRequest).pipe(
      map((res: IHttpSuccessPayload<any>) => {
        return res?.body;
      })
    );
  }

  fetchNetworth():Observable<any> {
    const httpRequest = new HttpRequest();
    httpRequest.setMethod('GET');
    httpRequest.setResource('/networth');
    httpRequest.setContextPath('Accounts');
    httpRequest.addHeaderParamter('serviceCode', 'RETAILNETWORTH');
    return this._httpProvider.invokeRestApi(httpRequest).pipe(
      map((res: IHttpSuccessPayload<any>) => {
        return res.body;
      })
    );
  }

  fetchServiceRestriction(accountNumber:string) {
    const httpRequest = new HttpRequest();
    httpRequest.setMethod('GET');
    httpRequest.setResource('/service/restriction');
    httpRequest.addQueryParameter('accountNumber', accountNumber);
    return this._httpProvider.invokeRestApi(httpRequest).pipe(
      map((res: IHttpSuccessPayload<any>) => {
        return res.body?.serviceRestriction;
      })
    );
  }
  formatAmount(number: any) {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
    }).format(number);
  }

  public isSameObject(object1: any, object2: any): boolean {
    if(!object1) return false;

    let compareRes = true;
      for(let key of  Object.keys(object1)){
        try {
          if (object1[key] && ((typeof(object1[key]) === 'string') || (typeof(object1[key]) === 'number') || (typeof(object1[key]) === 'boolean')) && object1[key] != object2[key]) {
            compareRes = false; break
          }
          else if(object1[key] && Array.isArray(object1[key])) {
            object1[key].forEach((element: any,i: any) => {
              Object.keys(element).forEach(key2 => {
                  try {
                    if(object2[key][i] && (element[key2] != object2[key][i][key2])) {
                      compareRes = false; return
                    }
                  } catch (error) {
                    compareRes = false; return
                  }
              });
            });
          }
          else if(object1[key] && typeof object1[key] === 'object') {
            compareRes = this.isSameObject(object1[key],object2[key]);
          }
        }
        catch (error) {
          compareRes = false; break
        }
      };
    
    return compareRes;
  }

  downloadCCTransactionStatement(criteriaDetails: any): Observable<any> {
    const httpRequest = new HttpRequest();
    httpRequest.setResource("/cctransactionreport");
    httpRequest.setContextPath('CreditCards');
    httpRequest.addQueryParameter('fileType', 'PDF');
    httpRequest.addHeaderParamter('serviceCode','RETAILCCTRANSACTION');
    httpRequest.setCriteriaQuery(criteriaDetails);
    httpRequest.setMethod("GET");
    return this._httpProvider.invokeDownloadApi(httpRequest)
  }
  downloadCCTransactionStatementCSV(criteriaDetails: any): Observable<any> {
    const httpRequest = new HttpRequest();
    httpRequest.setResource("/cctransactionreport");
    httpRequest.setContextPath('CreditCards');
    httpRequest.addQueryParameter('fileType', 'CSV');
    httpRequest.addHeaderParamter('serviceCode','RETAILCCTRANSACTION');
    httpRequest.setCriteriaQuery(criteriaDetails);
    httpRequest.setMethod("GET");
    return this._httpProvider.invokeDownloadApi(httpRequest)
  }
  downloadVoidCheque(accountNumber:any): Observable<any> {
    const httpRequest = new HttpRequest();
    httpRequest.setResource("/downloadvoidcheque");
    httpRequest.setContextPath('Accounts');
    // httpRequest.addQueryParameter('fileType', 'PDF');
    httpRequest.addQueryParameter('accountNumber',accountNumber);
    httpRequest.addHeaderParamter('serviceCode', 'RETAILVOIDCHEQUE');
    httpRequest.setMethod("GET");
    // return this._httpProvider.invokeDownloadApi(httpRequest)
    return this._httpProvider.invokeDownloadApi(httpRequest).pipe(
      map((res: IHttpSuccessPayload<any>) => {
        return res;
      })
    );
  }

  downloadLoanStatement(criteriaDetails: any): Observable<any> {
    const httpRequest = new HttpRequest();
    httpRequest.setResource("/loanstatementdownload");
    httpRequest.setContextPath('Loans');
    httpRequest.addQueryParameter('exportType', 'PDF');
    httpRequest.addHeaderParamter('serviceCode','RETAILLOANSTATEMENTDOWNLOAD');
    httpRequest.setCriteriaQuery(criteriaDetails);
    httpRequest.setMethod("GET");
    return this._httpProvider.invokeDownloadApi(httpRequest)
  }
  
  downloadLoanAccountStatement(criteriaDetails: any): Observable<any> {
    const httpRequest = new HttpRequest();
    httpRequest.setResource("/loanstatementdownload");
    httpRequest.setContextPath('Loans');
    httpRequest.addQueryParameter('exportType', 'CSVDESC');
    httpRequest.addHeaderParamter('serviceCode','RETAILLOANSTATEMENTDOWNLOAD');
    httpRequest.setCriteriaQuery(criteriaDetails);
    httpRequest.setMethod("GET");
    return this._httpProvider.invokeDownloadApi(httpRequest)
  }

  downloadLoanAccountStatementOTN(criteriaDetails: any): Observable<any> {
    const httpRequest = new HttpRequest();
    httpRequest.setResource("/loanstatementdownload");
    httpRequest.setContextPath('Loans');
    httpRequest.addQueryParameter('exportType', 'CSVASC');
    httpRequest.addHeaderParamter('serviceCode','RETAILLOANSTATEMENTDOWNLOAD');
    httpRequest.setCriteriaQuery(criteriaDetails);
    httpRequest.setMethod("GET");
    return this._httpProvider.invokeDownloadApi(httpRequest)
  }

  downloadLoanQFXAccountStatement(criteriaDetails: any): Observable<any> {
    const httpRequest = new HttpRequest();
    httpRequest.setResource("/loanstatementdownload");
    httpRequest.setContextPath('Loans');
    httpRequest.addQueryParameter('exportType', 'qfx');
    httpRequest.addHeaderParamter('serviceCode','RETAILLOANSTATEMENTDOWNLOAD');
    httpRequest.setCriteriaQuery(criteriaDetails);
    httpRequest.setMethod("GET");
    return this._httpProvider.invokeDownloadApi(httpRequest)
  }

  downloadOFXLoanAccountStatement(criteriaDetails: any): Observable<any> {
    const httpRequest = new HttpRequest();
    httpRequest.setResource("/loanstatementdownload");
    httpRequest.setContextPath('Loans');
    httpRequest.addQueryParameter('exportType', 'ofx');
    httpRequest.addHeaderParamter('serviceCode','RETAILLOANSTATEMENTDOWNLOAD');
    httpRequest.setCriteriaQuery(criteriaDetails);
    httpRequest.setMethod("GET");
    return this._httpProvider.invokeDownloadApi(httpRequest)
  }

  downloadQBOLoanAccountStatement(criteriaDetails: any): Observable<any> {
    const httpRequest = new HttpRequest();
    httpRequest.setResource("/loanstatementdownload");
    httpRequest.setContextPath('Loans');
    httpRequest.addQueryParameter('exportType', 'qbo');
    httpRequest.addHeaderParamter('serviceCode','RETAILLOANSTATEMENTDOWNLOAD');
    httpRequest.setCriteriaQuery(criteriaDetails);
    httpRequest.setMethod("GET");
    return this._httpProvider.invokeDownloadApi(httpRequest)
  }

  downloadMemberShipStatement(criteriaDetails: any): Observable<any> {
    const httpRequest = new HttpRequest();
    httpRequest.setResource("/membershipstmtdownload");
    httpRequest.setContextPath('Accounts');
    httpRequest.addQueryParameter('exportType', 'PDF');
    httpRequest.addHeaderParamter('serviceCode','RETAILMEMBERSHIPSTMTDOWNLOAD');
    httpRequest.setCriteriaQuery(criteriaDetails);
    httpRequest.setMethod("GET");
    return this._httpProvider.invokeDownloadApi(httpRequest)
  }

  downloadMemberShipAccountStatement(criteriaDetails: any): Observable<any> {
    const httpRequest = new HttpRequest();
    httpRequest.setResource("/membershipstmtdownload");
    httpRequest.setContextPath('Accounts');
    httpRequest.addQueryParameter('exportType', 'CSVDESC');
    httpRequest.addHeaderParamter('serviceCode','RETAILMEMBERSHIPSTMTDOWNLOAD');
    httpRequest.setCriteriaQuery(criteriaDetails);
    httpRequest.setMethod("GET");
    return this._httpProvider.invokeDownloadApi(httpRequest)
  }

  downloadMemberShipAccountStatementOTN(criteriaDetails: any): Observable<any> {
    const httpRequest = new HttpRequest();
    httpRequest.setResource("/membershipstmtdownload");
    httpRequest.setContextPath('Accounts');
    httpRequest.addQueryParameter('exportType', 'CSVASC');
    httpRequest.addHeaderParamter('serviceCode','RETAILMEMBERSHIPSTMTDOWNLOAD');
    httpRequest.setCriteriaQuery(criteriaDetails);
    httpRequest.setMethod("GET");
    return this._httpProvider.invokeDownloadApi(httpRequest)
  }

  downloadMemberShipQFXAccountStatement(criteriaDetails: any): Observable<any> {
    const httpRequest = new HttpRequest();
    httpRequest.setResource("/membershipstmtdownload");
    httpRequest.setContextPath('Accounts');
    httpRequest.addQueryParameter('exportType', 'qfx');
    httpRequest.addHeaderParamter('serviceCode','RETAILMEMBERSHIPSTMTDOWNLOAD');
    httpRequest.setCriteriaQuery(criteriaDetails);
    httpRequest.setMethod("GET");
    return this._httpProvider.invokeDownloadApi(httpRequest)
  }

  downloadOFXMemberShipLoanAccountStatement(criteriaDetails: any): Observable<any> {
    const httpRequest = new HttpRequest();
    httpRequest.setResource("/membershipstmtdownload");
    httpRequest.setContextPath('Accounts');
    httpRequest.addQueryParameter('exportType', 'ofx');
    httpRequest.addHeaderParamter('serviceCode','RETAILMEMBERSHIPSTMTDOWNLOAD');
    httpRequest.setCriteriaQuery(criteriaDetails);
    httpRequest.setMethod("GET");
    return this._httpProvider.invokeDownloadApi(httpRequest)
  }

  downloadQBOMemberShipAccountStatement(criteriaDetails: any): Observable<any> {
    const httpRequest = new HttpRequest();
    httpRequest.setResource("/membershipstmtdownload");
    httpRequest.setContextPath('Accounts');
    httpRequest.addQueryParameter('exportType', 'qbo');
    httpRequest.addHeaderParamter('serviceCode','RETAILMEMBERSHIPSTMTDOWNLOAD');
    httpRequest.setCriteriaQuery(criteriaDetails);
    httpRequest.setMethod("GET");
    return this._httpProvider.invokeDownloadApi(httpRequest)
  }

   fetchLoginDetails(log: boolean): Observable<any> {
    let payload = {
      log: log
    }
    const httpRequest = new HttpRequest();
    httpRequest.setMethod('POST');
    httpRequest.setResource('/loggedon');
    httpRequest.addHeaderParamter('serviceCode','RETAILLOGGEDON');
    let bodyContent = { "loggedon": payload };
    httpRequest.setContextPath('Common');
    httpRequest.setBody(bodyContent);
    return this._httpProvider.invokeRestApi(httpRequest).pipe(
      map((res: IHttpSuccessPayload<any>) =>
        res.body.loggedon ?? null
      ),
      catchError((err:any) => {
        return of(err?.error);
      }));
  };
  TokenExchangeAPI(payload:any): Observable<any> {
    const httpRequest = new HttpRequest();
    httpRequest.setMethod('POST');
    httpRequest.setResource('/tokenexchange');
    httpRequest.addHeaderParamter('serviceCode','RETAILTOKENEXCHANGE');
    let bodyContent = { "tokenexchange": payload };
    httpRequest.setContextPath('IAM');
    httpRequest.setBody(bodyContent);
    return this._httpProvider.invokeRestApi(httpRequest).pipe(
      map((res: IHttpSuccessPayload<any>) =>
        res.body.tokenexchange ?? null
      )
    );
  };

  deleteFromAside(payload: any): Observable<any> {
    const httpRequest = new HttpRequest();
    httpRequest.setMethod('POST');
    httpRequest.setResource('/deletesirequest');
    httpRequest.addHeaderParamter('serviceCode', 'RETAILDELETESCHTRANSFER');
    let bodyContent = { "deletesirequest": payload };
    httpRequest.setContextPath('Payments');
    httpRequest.setBody(bodyContent);
    return this._httpProvider.invokeRestApi(httpRequest).pipe(
      map((res: IHttpSuccessPayload<any>) =>
        res.body ?? null
      )
    );
  };
}
