import { Injectable, inject } from '@angular/core'
import { FormArray, FormControlStatus, FormGroup } from '@angular/forms'
import {
  BaseFpxComponentState,
  BaseFpxFormHelper,
  HttpProviderService,
  IHttpSuccessPayload,
  RoutingInfo,
  BaseFpxChangeHandler,
  BaseFpxControlEventHandler,
  HttpRequest,
  SpinnerService,
  ILookupResponse,
  FpxModal
} from '@fpx/core'
import { Observable, map, of } from 'rxjs'
import { Router } from '@angular/router'
import { NpssrequestmoneyService } from '../npssrequestmoney-service/npssrequestmoney.service'
import { Npssrequestmoney } from '../npssrequestmoney-service/npssrequestmoney.model'
import { AppConfigService } from 'src/app/dep/services/app-config-service/app-config.service'
export class RetailRequestMoneyConfirmationState extends BaseFpxComponentState {
  private _appConfig: AppConfigService = inject(AppConfigService);

  showSuggestion: boolean = false

  transactionAmount: any = {
    isCurrEditable: true,
    CurrencyList: [{ id: this._appConfig.baseCurrency, text: this._appConfig.baseCurrency }],
    amountInWords: false,
    initCurrency: this._appConfig.baseCurrency,
    defaultFetch: false
  }
  customerDetails: any = {}

  debitAccountDetails: any = {}
}

@Injectable()
export class RetailRequestMoneyConfirmationHelper extends BaseFpxFormHelper<RetailRequestMoneyConfirmationState> {
  constructor (
    private retailRequestMoneyConfirmationService: NpssrequestmoneyService,
    private _httpProvider: HttpProviderService,
    private _router: Router,
    private appConfigService: AppConfigService
  ) {
    super(new RetailRequestMoneyConfirmationState())
  }

  override doPreInit (): void {
    this.setServiceCode('RETAILNPSSREQUESTMONEY');

    let customerDetails = this.appConfigService.getData('npssRequestMoney');
    customerDetails.customerName = customerDetails?.firstName + ' ' + customerDetails?.lastName;
    customerDetails.initial = customerDetails?.firstName.charAt(0) + customerDetails?.lastName.charAt(0);

    this.state.customerDetails = customerDetails;
    let debitAccountDetails = this.appConfigService.getData('npssDetails');

    this.setValue('receipientAccNumber', this.state.customerDetails.accountNumber);
    this.setValue('beneValue', this.state.customerDetails.mobileNumber);
    for (let i = 0; i < debitAccountDetails.accountDetails.length; i++) {
      if (debitAccountDetails.accountDetails[i].defaultAccount == 'Y') {
        this.state.debitAccountDetails = debitAccountDetails.accountDetails[i]
        this.setValue('iban', this.state.debitAccountDetails[i].iban);
        this.setAmountCurrencyList('transactionAmount', [
          {
            id: debitAccountDetails.accountDetails[i].currency,
            text: debitAccountDetails.accountDetails[i].currency
          }
        ]);
      }
    }
  }

  public handleTransactionAmountOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if (value.amount) {
      if (value.amount >  this.state.debitAccountDetails.availableBalance) {
        this.setErrors('transactionAmount', 'maxError');
      }
      else{
      this.setValue('transactionAmount',value.amount);
      this.setValue('transactionCurrency',value.currencyCode);
      }


    }

  }

  public override doPostInit (): void {
    this.addValueChangeHandler('transactionAmount', this.handleTransactionAmountOnvalueChange);
  }
  handleFormOnPresubmit(payload: any) {
    payload.receipientCustomerId = this.state.customerDetails?.receipientCustomerId;
    payload.iban = this.state.debitAccountDetails?.iban;
    payload.receipientAccNumber = this.state.customerDetails?.iban;
    payload.firstName = this.state.customerDetails?.firstName;
    payload.lastName = this.state.customerDetails?.lastName;
    payload.email = this.state.customerDetails?.email;
    payload.mobileNumber = this.state.customerDetails?.mobileNumber;
  }


  public override preSubmitInterceptor (payload: Npssrequestmoney): any {
    // WRITE CODE HERE TO 
    this.handleFormOnPresubmit(payload);
    return payload
  }

  public override postDataFetchInterceptor (payload: Npssrequestmoney) {
    // WRITE CODE HERE TO HANDLE
    return payload
  }

  public override postSubmitInterceptor (response: any): RoutingInfo {
    console.log(response)
    let routingInfo: RoutingInfo = new RoutingInfo()
    routingInfo.setNavigationURL('confirmation')
    if (response.success) {
      let res = response.success?.body?.npssrequestmoney
      routingInfo.setQueryParams({
        response: res
      })
    } else if (response.error) {
      let error = response.error.error
      routingInfo.setQueryParams({
        result: {
          statusCode: 'FAILUR', //SUCCESS | FAILUR | WARNING
          message: error.ErrorMessage,
          description: error.ErrorDescription,
          serviceCode: this.serviceCode
        }
      })
    }
    return routingInfo
  }
  //$START_CUSTOMSCRIPT\n
  //$END_CUSTOMSCRIPT\n
}
