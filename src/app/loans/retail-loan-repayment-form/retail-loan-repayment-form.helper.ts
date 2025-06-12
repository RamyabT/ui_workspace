import { inject, Injectable } from "@angular/core";
import { FormArray, FormControlStatus, FormGroup } from "@angular/forms";
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
  FpxModal,
  FpxResetHandler,
  FpxCurrenyFormatterPipe
} from "@fpx/core";
import { Observable, map, of } from "rxjs";
import { Router } from "@angular/router";
import { LoanrepaymentService } from '../loanrepayment-service/loanrepayment.service';
import { Loanrepayment } from '../loanrepayment-service/loanrepayment.model';
import { AppConfigService,LanguageService } from "@dep/services";
import { ActiveSpaceInfoService, DeviceDetectorService } from "@dep/core";
import { formatDate } from "@angular/common";
import { LoansService } from "../loans-service/loans.service";
import moment from "moment";

export class RetailLoanRepaymentState extends BaseFpxComponentState {
  private _appConfig: AppConfigService = inject(AppConfigService);
  showSuggestion: boolean = false;
  termsFlag: any = {
    textPosition: "after",
    ckValues: { checked: "Y", unchecked: "N" }
  }
  dueAmount: any = {
    isCurrEditable: false,
    CurrencyList: [{ id: this._appConfig.baseCurrency, text: this._appConfig.baseCurrency }],
    amountInWords: false,
    initCurrency: this._appConfig.baseCurrency,
    defaultFetch: true,
  }
  balance: any = {
    isCurrEditable: false,
    CurrencyList: [{ id: this._appConfig.baseCurrency, text: this._appConfig.baseCurrency }],
    amountInWords: false,
    initCurrency: this._appConfig.baseCurrency,
    defaultFetch: true,
  }
  fromCurrencyVariable: any;
  toCurrencyVariable: any;
  currency: any;
  debitAmount: any;
  availableBalanceVariable: any;
  paymentSummary: any = {
    accountName: "",
    product: "",
    currency: "",
    initialDepositAmount: "",
    debitAmount: "",
    creditAmount: "",
    exchangeRate: "",
    chargesAmount: ""
  };

  loanDetails: any = {
    installmentAmount: "",
    loanCurrency: "",
  };
  repaidDate: any = {
    minDate: "",
    maxDate: "",
  }
  chargesAmount: any = {
    isCurrEditable: false,
    CurrencyList: [{ id: this._appConfig.baseCurrency, text: this._appConfig.baseCurrency }],
    amountInWords: false,
    initCurrency: this._appConfig.baseCurrency,
    defaultFetch: true,
  }
  setError:any

}


@Injectable()
export class RetailLoanRepaymentHelper extends BaseFpxFormHelper<RetailLoanRepaymentState> {
  loanDetails! : FormGroup;
  constructor(
    private retailLoanRepaymentService: LoanrepaymentService,
    private _httpProvider: HttpProviderService,
    private _router: Router,
    public _device: DeviceDetectorService,
    private _activeSpaceInfoService: ActiveSpaceInfoService,
    private _currencyFormatter: FpxCurrenyFormatterPipe,
    private _loansService: LoansService,
    private _appConfig: AppConfigService,
    private _langService: LanguageService
  ) {
    super(new RetailLoanRepaymentState());
  }

  override doPreInit(): void {
    this.setServiceCode("RETAILLOANREPAYMENT");
    this.addValueChangeHandler("paymentOption", this.handlePaymentOptionOnvalueChange);
  }

  public handlePaymentOptionOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    this.state.setError =''
    if (this.formGroup.get('paymentOption')?.value != "0") {
      this.setReadonly('dueAmount', false);
      this.reset('dueAmount');
    }
    else {
      this.setValue('dueAmount', { amount: this.state.loanDetails.installmentAmount, currencyCode: this.state.loanDetails.accountCurrency });
      this.setReadonly('dueAmount', true);
    }
  }

  public handleFormOnLoad() {
    // WRITE CODE HERE TO HANDLE
    this.setReadonly('dueAmount', true);
    this.setHidden('exchangeDetails', true);

    if (this.formMode == 'ADD') {
      this.setValue('paymentOption', "0");
      let accNum = this._activeSpaceInfoService.getAccountNumber();
      if (accNum) {
        this.setValue('loanAccountNumber', accNum);
      }
      this.setHidden('loanDetails',true)
      let newDate = new Date();
      this.setValue('repaidDate', formatDate(newDate, 'yyyy-MM-dd', 'en-US'));
      this.setReadonly('repaidDate', true);
      this.setValue('chargesAmount', { amount: 100, currencyCode: this._appConfig.baseCurrency });
      this.setReadonly('chargesAmount', true);
      this._loansService.loanDetails(accNum as any)().subscribe({
        next: (res) => {
          this.hideSpinner();
          this.state.loanDetails = res as any;
          if (res) {
            this.setHidden('loanDetails', false);
            this.state.loanDetails.nextDueDate=moment(res.nextDueDate, 'YYYY-MM-DD').format('DD MMM yyyy');
          }
          else {
            this.setHidden('loanDetails', true);
          }
          this.state.toCurrencyVariable = this.state.loanDetails.accountCurrency
          this.setVariable('toCurrencyVariable', this.state.toCurrencyVariable);
          // this.setValue('dueAmount', { amount: this.state.loanDetails.installmentAmount, currencyCode: this.state.loanDetails.accountCurrency })
          //  this.setValue('dueAmount',{ amount:payload.installmentAmount ,currencyCode: payload.accountCurrency })
        },
        error: (reason) => {
          console.error("loan Find By Key Error: ", reason);
        }
      })
    }
  }

  public handleDueAmountOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    this.reset('termsFlag');
    if (this.state.loanDetails.installmentAmount == 0 || this.state.loanDetails.installmentAmount == undefined) {
      this.state.paymentSummary.creditAmount = this.state.currency + " " + this._currencyFormatter.transform(0.00, this.state.currency);
      this.state.paymentSummary.debitAmount = this.state.currency + " " + this._currencyFormatter.transform(0.00, this.state.currency);
    }
    if (value.amount > 0) {
      if (this.state.loanDetails.installmentAmount == 0 || this.state.loanDetails.installmentAmount == undefined) {
        this.setErrors('dueAmount', 'due_amount_error');
      }
      else if (this.state.loanDetails.installmentAmount <= 0) {
        this.setErrors('dueAmount', 'due_amount_error1');
      }
      else {
        this.formGroup.get('dueAmount')?.setErrors(null);
      }
      if (value.amount >= Math.round(this.state.loanDetails.totalOutstanding * 100) / 100) {
        this.setValue('paymentOptionFlag','')
        this.state.setError = this._langService.getLabel('RetailLoanRepayment.errors.outstandingAmountError');
      }
      // else if (this.formGroup.get('paymentOption')?.value == "1" && this.state.loanDetails.installmentAmount <= value.amount) {
      //   this.setValue('paymentOptionFlag','')
      //   this.state.setError = this._langService.getLabel('RetailLoanRepayment.errors.outstandingAmountError');
      // }
      // else if (this.formGroup.get('paymentOption')?.value == "2" && this.state.loanDetails.installmentAmount > value.amount) {
      //   this.setValue('paymentOptionFlag','')
      //   this.state.setError = this._langService.getLabel('RetailLoanRepayment.errors.overpaymentAmountError');
      // }
      else{
        this.state.setError =''
        this.setValue('paymentOptionFlag',1)
      }
    }
  }


  public debitAccountNumberDataReceived: BaseFpxControlEventHandler = (payload: any) => {
    if (payload) {
      this.setValue('paymentOption', "0");
      this.state.currency = payload.accountCurrency;
      this.state.fromCurrencyVariable = payload.accountCurrency;
      this.setVariable('fromCurrencyVariable', payload.accountCurrency);
      this.state.availableBalanceVariable = payload.availableBalance;
      this.setVariable('availableBalanceVariable', this.state.availableBalanceVariable);
      this.setValue('dueAmount', { amount: this.state.loanDetails.installmentAmount, currencyCode: this.state.loanDetails.accountCurrency })
      if (payload.availableBalance < this.state.loanDetails.installmentAmount || payload.availableBalance == '') {
        this.setErrors('dueAmount', "insufficient_balance_error");
      }
      else {
        this.formGroup.get('dueAmount')?.setErrors(null);
      }
      if (payload.accountCurrency == this.state.loanDetails.accountCurrency) {
        this.setHidden('exchangeDetails', true);
      }
    }
  }

  public onExchangeRateDataReceived: BaseFpxControlEventHandler = (payload: any) => {
    if (payload) {
      this.setValue('exchangeRate', Number(payload.exchangeRate));
      this.setValue('baseRate', Number(payload.baseRate))
      this.state.debitAmount = payload.debitAmount;
      this.state.paymentSummary.exchangeRate  = '1' + " " + this.state.toCurrencyVariable + " = " +  " " + payload.exchangeRate + " "+this.state.fromCurrencyVariable;
      this.state.paymentSummary.debitAmount = payload.debitAmount +" "+this.state.fromCurrencyVariable ;
    this.state.paymentSummary.creditAmount = payload.creditAmount +" "+ this.state.toCurrencyVariable;
    }
  }

  public handleDebitAccountNumberOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    // WRITE CODE HERE TO HANDLE 
    //tool generated code based on Orchestration Instructions

    if (value) {
      this.setHidden('exchangeDetails', false);
      this.reset('remarks');
      this.reset('termsFlag');

    }
  }

  private onReset: FpxResetHandler = (payload: any) => {
    console.log("payload", payload);
    this.reset('loanAccountNumber');
    this.reset('debitAccountNumber');
    this.reset('dueAmount');
    this.reset('balance');
    this.reset('repaidDate');
    this.reset('remarks');
    this.reset('termsFlag');
    this.reset('paymentOption');
    this.reset('chargesAmount', "");
    this.reset('loanDetails');
    this.setValue('paymentOption', "0");
    this.setValue('chargesAmount', { amount: 100, currencyCode: this._appConfig.baseCurrency });
    this.setReadonly('chargesAmount', true);
    let newDate = new Date();
    this.setValue('repaidDate', formatDate(newDate, 'yyyy-MM-dd', 'en-US'));
    this.setHidden('balance', true);
    this.setHidden('exchangeDetails', true);
    this.handleFormOnLoad()
  }


  public override doPostInit(): void {
    this.addValueChangeHandler("dueAmount", this.handleDueAmountOnvalueChange);
    this.addControlEventHandler("debitAccountNumberDataReceived", this.debitAccountNumberDataReceived);
    this.addControlEventHandler("exchangeRateReceived", this.onExchangeRateDataReceived);
    this.addValueChangeHandler("debitAccountNumber", this.handleDebitAccountNumberOnvalueChange);

    this.addResetHandler('reset', this.onReset);
    this.loanDetails = this.formGroup.get("loanDetails") as FormGroup;
    this.handleFormOnLoad();
  }


  public override preSubmitInterceptor(payload: Loanrepayment): any {
    // WRITE CODE HERE TO HANDLE 
    if (payload.inventoryNumber == "") {
      delete payload.inventoryNumber
    }
    if (payload.remarks == "") {
      delete payload.remarks
    }
    if (payload.dueAmount) {
      payload.loanCurrency = payload.dueAmount.currencyCode;
      payload.dueAmount = payload.dueAmount.amount;
    }

    // let newDate: any = new Date();
    // let repaidDate = formatDate(newDate, 'yyyy-MM-dd', 'en-US');
    // payload.repaidDate = repaidDate;
    payload.chargesAmount = this.getValue('chargesAmount').amount;
    payload.debitAmount = this.state.debitAmount;
    payload.debitCurrency = this.state.fromCurrencyVariable;
    return payload;

  }


  public override postDataFetchInterceptor(payload: Loanrepayment) {
    // WRITE CODE HERE TO HANDLE 

    return payload;
  }


  public handleFormOnPostsubmit(response: any, routingInfo: any) {
    // WRITE CODE HERE TO HANDLE
    if (response.success) {
      let res = response.success?.body?.loanrepayment;
      routingInfo.setQueryParams({
        response: res
      });
    } else if (response.error) {
      let error = response.error.error;
      routingInfo.setQueryParams({
        response: error,
        serviceCode: this.serviceCode.value
      });
    }
    return response;
  }
  public override postSubmitInterceptor(response: any): RoutingInfo {
    console.log(response);
    let routingInfo: RoutingInfo = new RoutingInfo();
    this.handleFormOnPostsubmit(response, routingInfo);
    return routingInfo;
  }
  //$START_CUSTOMSCRIPT\n
  //$END_CUSTOMSCRIPT\n
}


