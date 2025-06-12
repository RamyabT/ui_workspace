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
  FpxModalAfterClosed,
  FpxResetHandler
} from "@fpx/core";
import { Observable, map, of } from "rxjs";
import { Router } from "@angular/router";
import { WalletTransferService } from '../walletTransfer-service/walletTransfer.service';
import { WalletTransfer } from '../walletTransfer-service/walletTransfer.model';
import { AppConfigService } from "@dep/services";
import { MobileNumberSearchFormComponent } from "../mobile-number-search-form/mobile-number-search-form.component";
import { WalletrequestmoneyService } from "../walletrequestmoney-service/walletrequestmoney.service";
import { DeviceDetectorService } from "@dep/core";
import { DepConfirmationComponent } from "src/app/dep/core/component/dep-confirmation/dep-confirmation.component";
export class RetailWalletTransferFormState extends BaseFpxComponentState {
  private _appConfig: AppConfigService = inject(AppConfigService);
  showSuggestion: boolean = false;
  paymentAmount: any = {
    isCurrEditable: true,
    CurrencyList: [{ id: this._appConfig.baseCurrency, text: this._appConfig.baseCurrency }],
    amountInWords: false,
    initCurrency: this._appConfig.baseCurrency,
    defaultFetch: false,
  }
  senderName: string = '';
  senderInitial: string = '';
  accountBalanceVariable: any;
  fromCurrencyVariable: any = this._appConfig.baseCurrency;
  toCurrencyVariable: any;
  exchangeDetails: any = {
    creditAmount: "",
    debitAmount: "",
    exchangeRate: ""
  }
  termsFlag: any = {
    textPosition: "after",
    ckValues: { checked: "Y", unchecked: "N" }
  }
  paymentAmountVar: any;
  payeeWalletDetails: any;
  creditWalletDetails: any;
  payeeDetailsAvailable: boolean = false;
  fulfillRequestDetails: any;
  historyDetails: any;
  chargesAmount: any = {
    isCurrEditable: true,
    CurrencyList: [],
    amountInWords: false,
    initCurrency: this._appConfig.baseCurrency,
    defaultFetch: false,
  }
  charges: any = {
    amount: 0,
    currencyCode: this._appConfig.baseCurrency
  };
  readOnlyFormcontrols: string[] = ['sourceWalletAccount', 'creditWalletAccount', 'paymentAmount']
  routeService: string = '';
}


@Injectable()
export class RetailWalletTransferFormHelper extends BaseFpxFormHelper<RetailWalletTransferFormState> {

  constructor(private retailWalletTransferFormService: WalletTransferService,
    private _appConfig: AppConfigService,
    private _httpProvider: HttpProviderService, private _router: Router,
    private retailWalletReqMoneyFormService: WalletrequestmoneyService,
    private _deviceDetectorService: DeviceDetectorService) {
    super(new RetailWalletTransferFormState());
  }

  override doPreInit(): void {
    this.setServiceCode("RETAILWALLETTRANSFER");
  }


  public override doPostInit(): void {
    this.addControlEventHandler("sourceWalletAccountDataReceived", this.onSourceAccountDataReceived);
    this.addControlEventHandler("chargesRateReceived", this.onChargesRateDataReceived);
    this.addControlEventHandler("exchangeRateReceived", this.onExchangeRateDataReceived);
    this.addValueChangeHandler('sourceWalletAccount', this.sourceWalletAccountOnValueChange);
    this.addValueChangeHandler('paymentAmount', this.paymentAmountOnValueChange);
    this.addValueChangeHandler("contactPhoneNumber", this.handleContactNumberOnValueChange);
    this.handleFormOnLoad();
    this.addResetHandler('reset', this._reset);
  }
  private _reset: FpxResetHandler = (payload: any) => {
    this.formGroup.reset();
    this.handleFormOnLoad();
    this.state.senderName = '';
    this.state.senderInitial = '';
  }

  handleFormOnLoad() {
    this.state.routeService = this.getRoutingParam('serviceCode');
    this.setDisabled('remarks', true);
    if (this._appConfig.hasData('RETAILWALLETREQUESTMONEY') && this.state.routeService == 'RETAILWALLETREQUESTMONEY') {
      this.state.fulfillRequestDetails = this._appConfig.getData('RETAILWALLETREQUESTMONEY');
      this.state.fulfillRequestDetails.paymentAmount = { amount: this.state.fulfillRequestDetails.paymentAmount, currencyCode: this.state.fromCurrencyVariable };
      this.state.senderName = this.state.fulfillRequestDetails.payeeName;
      this.state.senderInitial = this.state.fulfillRequestDetails.payeeName?.charAt(0);
      this.setValue('contactPhoneNumber',this.state.fulfillRequestDetails.contactPhoneNumber);
      this.setValue('paymentAmount',this.state.fulfillRequestDetails.paymentAmount);
      this.state.readOnlyFormcontrols.forEach((item: string) => {
        this.setReadonly(item, true);
      })
      this.setHidden('contactPhoneNumber', true);
    }
    else if (this._appConfig.hasData('DECLINEWALLETREQUEST') && this.state.routeService == 'DECLINEWALLETREQUEST') {
      this.state.fulfillRequestDetails = this._appConfig.getData('DECLINEWALLETREQUEST');
      this.state.fulfillRequestDetails.paymentAmount = { amount: this.state.fulfillRequestDetails.paymentAmount, currencyCode: this.state.fromCurrencyVariable };
      this.state.senderName = this.state.fulfillRequestDetails.payeeName;
      this.state.senderInitial = this.state.fulfillRequestDetails.payeeName?.charAt(0);
      this.setValue('contactPhoneNumber',this.state.fulfillRequestDetails.contactPhoneNumber);
      this.setValue('paymentAmount',this.state.fulfillRequestDetails.paymentAmount);
      this.state.readOnlyFormcontrols.forEach((item: string) => {
        this.setReadonly(item, true);
      })
      this.setHidden('contactPhoneNumber', true);
      this.setDisabled('remarks', false);
      // this.removeShellBtn('SUBMIT');
      // this.addShellButton('Decline', 'DECLINE', 'primary', 'ENTRY', 'submit');
      // this.setShellBtnMethod('DECLINE', this.triggerSubmit);
    }
    else if (this._appConfig.hasData('payeeWalletDetails')) {
      this.state.payeeDetailsAvailable = true;
      this.state.payeeWalletDetails = this._appConfig.getData('payeeWalletDetails');
      this.showSpinner();
      setTimeout(() => {
        this.setValue('contactPhoneNumber', this.state.payeeWalletDetails.businessId);
      }, 1000);
      if (this.state.payeeWalletDetails.paymentAmount) {
        this.setValue('paymentAmount', { amount: this.state.payeeWalletDetails.paymentAmount, currencyCode: this.state.fromCurrencyVariable });
        this.setReadonly('paymentAmount', true);
      }
    } else if (this._appConfig.hasData('RETAILWALLETHISTORY') && this.state.routeService == 'RETAILWALLETSENDMONEY') {
      this.state.historyDetails = this._appConfig.getData('RETAILWALLETHISTORY');
      this.state.historyDetails.paymentAmount = { amount: this.state.historyDetails.paymentAmount, currencyCode: this.state.fromCurrencyVariable };
      this.formGroup.patchValue(this.state.historyDetails);
    }
    this.setVariable('serviceCodeVariable', 'RETAILWALLETTRANSFER');
    this.setValue('chargesBorneBy', '1');
    this.setHidden('chargesBorneBy', true);
    this.setHidden('chargesAmount', true);
    this.setHidden('exchangeDetails', true);
    if (!this._deviceDetectorService.isHybrid()) {
      this.setHidden('selectContact', true);
    }
  }
  public onChargesRateDataReceived: BaseFpxControlEventHandler = (payload: any) => {
    if (payload.totalChargeAmnBaseCurr) {
      this.setValue('chargesAmount', { amount: payload.totalChargeAmnBaseCurr, currencyCode: payload.baseCurrency });
    }
    else {
      this.setValue('chargesAmount', { amount: 5, currencyCode: this._appConfig.baseCurrency });
      this.state.charges = { amount: 5, currencyCode: this._appConfig.baseCurrency };
    }
    this.setHidden('chargesBorneBy', true);
    this.setHidden('chargesAmount', true);
  }

  public handleContactNumberOnValueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if (value && status == 'VALID') {
      this.validateWalletBusinessId();
      this.reset('creditWalletAccount');
      this.setHidden('creditWalletAccount', true);
      this.reset('sourceWalletAccount');
      if (this.state.payeeWalletDetails) {
        this.setHidden('contactPhoneNumber', true);
      }
      this.amountResetHandler();
    }
  }
  validateWalletBusinessId() {
    let payload = {
      "walletAccInfo": {
        "mobileNumber": this.getValue('contactPhoneNumber')
      }
    };
    this.retailWalletReqMoneyFormService.mobileNumberValidator(payload).subscribe({
      next: (res: any) => {
        this.hideSpinner();
        if (res.body?.walletAccDetails) {
          setTimeout(() => {
            this.setValue("creditWalletAccount", res.body.walletAccDetails.walletAccNum);
            this.state.creditWalletDetails = res.body.walletAccDetails;
            this.state.senderName = res.body.walletAccDetails.walletNickName;
            this.state.senderInitial = res.body.walletAccDetails.walletNickName?.charAt(0);
            this.state.toCurrencyVariable = res.body.walletAccDetails.walletCurrency;
            if(this.state.routeService == 'DECLINEWALLETREQUEST' || this.state.routeService == 'RETAILWALLETREQUESTMONEY'){
              this.setValue('sourceWalletAccount',this.state.fulfillRequestDetails.sourceWalletAccount);
            }
            this.setValue('paymentAmount', { amount: this.state.fulfillRequestDetails.paymentAmount.amount, currencyCode: this.state.fromCurrencyVariable });
            this.setVariable("toAccountVariable", res.body.walletAccDetails?.walletAccNum);
            this.setVariable('toCurrencyVariable', res.body.walletAccDetails.walletCurrency);
            if (!this.state.payeeWalletDetails) {
              this.setHidden('creditWalletAccount', false);
              this.setReadonly("creditWalletAccount", true);
            }
          }, 1000);
        }
        else {
          this.walletNotFound();
        }
      }
    })
  }
  walletNotFound() {
    let modal = new FpxModal();
    modal.setComponent(DepConfirmationComponent);
    modal.setPanelClass('dep-alert-popup');
    modal.setBackDropClass('dep-popup-back-drop');
    modal.setDisableClose(false);
    modal.setData({
      message: "There is no wallet account for the given mobile number",
      okBtnLbl: "Invite",
      cancelBtnLbl: "Cancel"
    });
    modal.setAfterClosed(this.flashCardModelAfterClose);
    this.openModal(modal);
  }

  flashCardModelAfterClose: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
    if (payload == 1) {
    }
    else if (payload == 0) {
      let service = this._appConfig.getServiceDetails('RETAILWALLET');
      this._router.navigate(service.servicePath);
    }
  }

  public sourceWalletAccountOnValueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if (value) {
      this.setHidden('chargesBorneBy', false);
      this.reset('chargesBorneBy', '1');
      this.setHidden('chargesBorneBy', true);
    }
  }

  amountResetHandler() {
    if (this.state.payeeWalletDetails?.paymentAmount) {
      this.setValue('paymentAmount', { amount: this.state.payeeWalletDetails.paymentAmount, currencyCode: this.state.fromCurrencyVariable });
      this.setVariable('paymentAmountVariable', this.state.payeeWalletDetails.paymentAmount);
      this.setReadonly('paymentAmount', true);
    }
    else if (this.state.fulfillRequestDetails?.paymentAmount) {
      this.setValue('paymentAmount', { amount: this.state.fulfillRequestDetails.paymentAmount.amount, currencyCode: this.state.fromCurrencyVariable });
      this.setVariable('paymentAmountVariable', this.state.fulfillRequestDetails.paymentAmount.amount);
      this.setReadonly('paymentAmount', true);
    }
    else {
      this.reset('paymentAmount', { amount: 0, currencyCode: this.state.fromCurrencyVariable });
    }
    this.setHidden('exchangeDetails', true);
  }
  updatePaymentCurrencyList() {
    let currencyList: any = [];
    let selectCurrency: string = '';
    if (this.state?.fromCurrencyVariable && this.state?.toCurrencyVariable) {
      if (this.state.fromCurrencyVariable == this.state.toCurrencyVariable) {
        currencyList.push({
          id: this.state.fromCurrencyVariable,
          text: this.state.fromCurrencyVariable,
        });
        selectCurrency = this.state.fromCurrencyVariable;
      } else {
        currencyList.push({
          id: this.state.fromCurrencyVariable,
          text: this.state.fromCurrencyVariable,
        });
        currencyList.push({
          id: this.state.toCurrencyVariable,
          text: this.state.toCurrencyVariable,
        });
        selectCurrency = this.state.fromCurrencyVariable;
      }
    } else {
      if (this.state?.fromCurrencyVariable) {
        currencyList.push({
          id: this.state.fromCurrencyVariable,
          text: this.state.fromCurrencyVariable,
        });
        selectCurrency = this.state.fromCurrencyVariable;
      } else if (this.state?.toCurrencyVariable) {
        currencyList.push({
          id: this.state.toCurrencyVariable,
          text: this.state.toCurrencyVariable,
        });
        selectCurrency = this.state.toCurrencyVariable;
      }
    }

    this.setAmountCurrencyList("paymentAmount", currencyList);
    let payeeAmount = this.state.fulfillRequestDetails.paymentAmount.amount || this.state.payeeWalletDetails.paymentAmount;
    if (payeeAmount) {
      this.setValue('paymentAmount', { amount: payeeAmount, currencyCode: selectCurrency });
      this.setVariable('paymentAmountVariable', payeeAmount);
    }
    else {
      this.reset('paymentAmount', { amount: 0, currencyCode: selectCurrency });
    }
  }
  public paymentAmountOnValueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if (value.amount > 0) {
      if (value.currencyCode != this.state.toCurrencyVariable) {
        this.setHidden('exchangeDetails', false);
      }
      else if (value.currencyCode == this.state.toCurrencyVariable) {
        this.setHidden('exchangeDetails', true);
      }
    }
  }

  public onSourceAccountDataReceived: BaseFpxControlEventHandler = (payload: any) => {
    // WRITE CODE HERE TO HANDLE 
    if (payload) {
      this.state.accountBalanceVariable = payload.availableBalance;
      this.state.fromCurrencyVariable = payload.currency;
      this.setVariable('accountBalanceVariable', payload.availableBalance);
      this.setVariable("fromAccountVariable", payload?.walletAccountNumber);
      this.setVariable('fromCurrencyVariable', payload.currency);
      this.setValue('paymentAmount', { amount: 0, currencyCode: payload.currency });
      this.setVariable('paymentAmountVariable', 0);
      if (this.state.payeeWalletDetails) {
        this.setValue('paymentAmount', { amount: this.state.payeeWalletDetails.paymentAmount, currencyCode: payload.currency });
        this.setVariable('paymentAmountVariable', this.state.payeeWalletDetails.paymentAmount);
        if (this.state.toCurrencyVariable != payload.currency) {
          this.setHidden('exchangeDetails', false);
        }
      }
      this.updatePaymentCurrencyList();
    }
  }

  public onExchangeRateDataReceived: BaseFpxControlEventHandler = (payload: any) => {
    if (payload && this.formMode == 'ADD') {
      if (payload.exchangeRate == null || payload.exchangeRate == undefined || payload.exchangeRate == "") {
        payload.exchangeRate = 1;
      } else {
        this.setValue('exchangeRate', Number(payload.exchangeRate));
      }
      this.state.exchangeDetails.exchangeRate = '1' + " " + this.state.toCurrencyVariable + " = " + " " + payload.exchangeRate + " " + this.state.fromCurrencyVariable;
      this.state.exchangeDetails.debitAmount = payload.debitAmount + " " + this.state.fromCurrencyVariable;
      this.state.exchangeDetails.creditAmount = payload.creditAmount + " " + this.state.toCurrencyVariable;
      this.state.paymentAmountVar = payload.debitAmount;
    }
  }

  searchMobileNumber() {
    let modal = new FpxModal();
    modal.setComponent(MobileNumberSearchFormComponent);
    modal.setPanelClass('dep-info-popup');
    modal.setDisableClose(false);
    modal.setData({
      title: "Search mobile number",
    });
    modal.setAfterClosed(this.onSelectMobileNumber);
    this.openModal(modal);
  }
  onSelectMobileNumber: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
    if (payload) {
      this.setValue('contactPhoneNumber', payload);
    }
  }
  override onReview(): void {
    this.setHidden('selectContact', true);
  }
  override backToEntryMode(): void {
    if (!this._deviceDetectorService.isHybrid()) {
      this.setHidden('selectContact', false);
    }
  }

  public override preSubmitInterceptor(payload: WalletTransfer): any {
    // WRITE CODE HERE TO HANDLE 
    if (this.state.payeeDetailsAvailable) {
      payload.creditWalletAccount = this.state.creditWalletDetails.walletId;
    }
    if (this.state.routeService == 'RETAILWALLETREQUESTMONEY') {
      payload.fulfillRefNum = this.state.fulfillRequestDetails.fulfillRefNum;
    }
    payload.operationMode = 'A';
    if (this.state.routeService == 'DECLINEWALLETREQUEST') {
      payload.operationMode = 'D';
    }
    payload.paymentCurrency = this.state.fromCurrencyVariable;
    payload.paymentAmount = Number(payload.paymentAmount.amount);
    payload.chargesAmount = this.getValue('chargesAmount').amount;
    return payload;
  }

  public override postDataFetchInterceptor(payload: WalletTransfer) {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }


  public override postSubmitInterceptor(response: any): RoutingInfo {
    console.log(response);
    let routingInfo: RoutingInfo = new RoutingInfo();
    routingInfo.setNavigationURL("confirmation");
    if (response.success) {
      routingInfo.setQueryParams({
        response: response.success?.body?.walletTransfer,
        status: "success",
      });
    } else if (response.error) {
      routingInfo.setQueryParams({ errMsg: response.error?.error?.ErrorMessage, status: "failed" });
    }
    return routingInfo;
  }

  override ngOnDestroy(): void {
    if (this._appConfig.hasData('RETAILWALLETREQUESTMONEY')) {
      this._appConfig.removeData('RETAILWALLETREQUESTMONEY');
    }
    else if (this._appConfig.hasData('payeeWalletDetails')) {
      this._appConfig.removeData('payeeWalletDetails');
    }
  }
  //$START_CUSTOMSCRIPT\n
  //$END_CUSTOMSCRIPT\n
}


