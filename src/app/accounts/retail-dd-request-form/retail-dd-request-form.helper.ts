import { Injectable, inject } from "@angular/core";
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
  FpxCurrenyFormatterPipe,
  FpxResetHandler
} from "@fpx/core";
import { Observable, map, of } from "rxjs";
import { Router } from "@angular/router";
import { DdrequestService } from '../ddrequest-service/ddrequest.service';
import { Ddrequest } from '../ddrequest-service/ddrequest.model';
import { CommonService } from "src/app/foundation/validator-service/common-service";
import moment from "moment";
import { CustomerService } from "src/app/foundation/validator-service/customer.service";
import { AppConfigService } from "@dep/services";
import { ActiveSpaceInfoService } from "@dep/core";
import { DepAlertComponent } from "src/app/dep/core/component/dep-alert/dep-alert.component";
import { formatDate } from "@angular/common";
export class RetailDDRequestFormState extends BaseFpxComponentState {
  private _appConfig: AppConfigService = inject(AppConfigService);

  showSuggestion: boolean = false;
  issueDate: any = {
    minDate: new Date("25-10-2023"),
    maxDate: new Date("31-07-2023"),
  }
  amount: any = {
    isCurrEditable: true,
    CurrencyList: [{ id: this._appConfig.baseCurrency, text: this._appConfig.baseCurrency }],
    amountInWords: false,
    initCurrency: this._appConfig.baseCurrency,
    defaultFetch: true,
  }
  chargesAmount: any = {
    isCurrEditable: false,
    CurrencyList: [{ id: this._appConfig.baseCurrency, text: this._appConfig.baseCurrency }],
    amountInWords: false,
    initCurrency: this._appConfig.baseCurrency,
    defaultFetch: true,
  }
  terms: any = {
    textPosition: "after",
    ckValues: { checked: "Y", unchecked: "N" }
  }
  accountBalanceVariable: any;
  exchangeDetails: any = {
    creditAmount: "",
    debitAmount: "",
    exchangeRate: ""
  }
  addressInfo: any = {
    buildingDetails: "",
    cityDetails: "",
    stateDetails: "",
    countryDetails: "",
    pinCode: "",
    email: "",
    mobile: ""
  }
  IntialCurrency: any;
  fromCurrencyVariable: any;
  paymentAmountVar!: any;
  toCurrencyVariable: any;
  availableBalance: any = {
    isCurrEditable: false,
    CurrencyList: [{ id: this._appConfig.baseCurrency, text: this._appConfig.baseCurrency }],
    amountInWords: false,
    initCurrency: this._appConfig.baseCurrency,
    defaultFetch: true,
  }
  mode: any;
  debitcurrency:any;
}


@Injectable()
export class RetailDDRequestFormHelper extends BaseFpxFormHelper<RetailDDRequestFormState> {
  addressInfo!: FormGroup;

  constructor(private retailDDRequestFormService: DdrequestService,
    private commonservice: CommonService,
    private _httpProvider: HttpProviderService, private _router: Router,
    private userService: CustomerService,
    private appConfigService: AppConfigService,
    private _currencyFormatter: FpxCurrenyFormatterPipe,
    private _activeSpaceInfoService: ActiveSpaceInfoService
  ) {
    super(new RetailDDRequestFormState());
  }

  override doPreInit(): void {
    this.addResetHandler('reset', this._reset);
    this.setServiceCode("RETAILDDREQ");
    this.addValueChangeHandler("accountNumber", this.handleAccountNumberOnvalueChange);
    this.addControlEventHandler("accountNumberDataReceived", this.onAccountNumberDataReceived);
    this.addValueChangeHandler("amount", this.handleAmountOnvalueChange);
    this.addValueChangeHandler("beneficiaryName", this.handleBeneficiaryNameOnvalueChange);
    this.addValueChangeHandler("deliveryOption", this.handleDeliveryOptionOnvalueChange);
    this.addControlEventHandler("exchangeRateReceived", this.onExchangeRateDataReceived);
    this.addValueChangeHandler('terms', this.handleTermsFlagOnvalueChange);
    this.addControlEventHandler("onCustomerDetailsDataReceived", this.handleCustomerDetailsDataReceived);
    this.addControlEventHandler("chargesRateReceived", this.onChargesRateDataReceived);
    this.state.mode = this.getRoutingParam('mode')
  }


  private _reset: FpxResetHandler = (payload: any) => {
    this.formGroup.reset();
    this.handleFormOnLoad();
  }

  public handleTermsFlagOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if(value =="N"){
      this.setValue('terms',null)
    }
  }
  public onChargesRateDataReceived: BaseFpxControlEventHandler = (payload: any) => {
      if (payload.insufficientBalance) {
        const fpxModal = new FpxModal();
        fpxModal.setComponent(DepAlertComponent);
        fpxModal.setDisableClose(false);
        fpxModal.setPanelClass('dep-alert-popup');
        fpxModal.setBackDropClass('dep-popup-back-drop');
        fpxModal.setData({
          title: "RetailSchedulePaymentTemplateComponent.delAlertTtl",
          message: "Your total transaction amount with charges " + payload.totalAmount + " is greater than Available Balance",
          okBtnLbl: "Okay"
        });
        // fpxModal.setAfterClosed(this.contextmenuModelAfterClose);
        this.setValue('chargesAmount', { amount: payload.totalChargeAmnBaseCurr, currencyCode: payload.baseCurrency });
        this.openModal(fpxModal);

      }

      else {
        this.setValue('chargesAmount', { amount: payload.totalChargeAmnBaseCurr, currencyCode: payload.baseCurrency });

      }
  }
  public handleFormOnLoad() {
    // WRITE CODE HERE TO HANDLE
    if (this.formMode == 'ADD') {
      let accNum = this._activeSpaceInfoService.getAccountNumber();
      if (accNum) {
        this.setValue('accountNumber', accNum);
      }
      this.state.issueDate.minDate = new Date();
      let formatedDate=formatDate(this.state.issueDate.minDate,'yyyy-MM-dd','en-US');
      this.setValue('issueDate', formatedDate);
      this.state.issueDate.maxDate = new Date(new Date().setMonth(new Date().getMonth() + 6));
      // this.state.chargesAmount.amount = 0;
      this.setValue('deliveryOption', '1');
      this.setHidden('addressInfo', true);
      this.setValue('amount', { currencyCode: this.appConfigService.baseCurrency });
      this.setReadonly('chargesAmount', true);
      this.setHidden('exchangeDetails', true);
      // this.setValue('availableBalance',{currencyCode:this.appConfigService.baseCurrency});
      this.setDisabled('availableBalance', true);
    this.setValue('terms',null);
    }
    else {
      this.setValue('amount', { amount: this.getValue('amount').amount, currencyCode: this.getValue('currency') })
      if (this.getValue('deliveryOption') == '2') {
        this.setHidden('addressInfo', false);
        this.setHidden('dlvryBranch', true);
      }
      else {
        this.setHidden('addressInfo', true);
        this.setHidden('dlvryBranch', false);
      this.setValue('dlvryBranch',this.getValue('dlvryBranch'));
        this.setDisabled('dlvryBranch', true);
      }
    }
    this.setValue('chargesAmount',{amount:5.00,currencyCode:this.appConfigService.baseCurrency});
    
  }

  public onAccountNumberDataReceived: BaseFpxControlEventHandler = (payload: any) => {
    // WRITE CODE HERE TO HANDLE 

    if (payload) {
      // this.state.availableBalance.CurrencyList = [{id:payload.accountCurrency,text:payload.accountCurrency}]
      this.setValue('availableBalance', { amount: payload.availableBalance, currencyCode: payload.accountCurrency });
      if(this.formMode=='VIEW'){
        let amount=this.state.exchangeDetails.debitAmount;
        if(payload.accountCurrency !=this.getValue('currency')){
        this.state.exchangeDetails.debitAmount=amount+" "+this._currencyFormatter.transform(amount,payload.accountCurrency);
        this.state.exchangeDetails.exchangeRate='1' + " " + payload.accountCurrency + " = " +  " " +  this.state.exchangeDetails.exchangeRate + " "+this.getValue('currency');
        }
        else{
          this.setHidden('exchangeDetails', true);
        }
      }
      this.state.accountBalanceVariable = payload.availableBalance;
      this.state.fromCurrencyVariable = payload.accountCurrency;
      this.state.debitcurrency = payload.accountCurrency;
      //this.state.toCurrencyVariable = this.appConfigService.baseCurrency;
      //this.setVariable('toCurrencyVariable', this.appConfigService.baseCurrency);
      this.setVariable('fromCurrencyVariable', payload.accountCurrency);
      this.setVariable('accountBalanceVariable', payload.availableBalance);
    }
  }
  public handleAccountNumberOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    // WRITE CODE HERE TO HANDLE 
    //tool generated code based on Orchestration Instructions
    if (value && this.formMode == 'ADD') {

      this.reset('terms', "");

      this.setHidden('exchangeDetails', true);
    }
  }
  public handleAmountOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    // WRITE CODE HERE TO HANDLE 
    //tool generated code based on Orchestration Instructions
    if (value && this.formMode == 'ADD') {
      if (value.amount) {
        this.state.toCurrencyVariable = value.currencyCode;

        if (this.state.fromCurrencyVariable != value.currencyCode) {
          this.setHidden('exchangeDetails', false);
        }
        else {
          let charges = Number(this.getValue('chargesAmount').amount);
          if (Number(value.amount+charges) > Number(this.state.accountBalanceVariable)) {
            this.setErrors('amount', 'insufficient_balance_error');
          }
          this.setHidden('exchangeDetails', true);
        }
      }
    }

  }
  public handleBeneficiaryNameOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if (value && this.formMode == 'ADD') {
      if (value.includes('')) {
        this.setValue('beneficiaryName', value.trim())
      }
    }
  }
  public handleDeliveryOptionOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    // WRITE CODE HERE TO HANDLE 
    //tool generated code based on Orchestration Instructions
    if (value && this.formMode == 'ADD') {
      if (value == '2') {
        this.setHidden('addressInfo', false);
        this.setHidden('dlvryBranch', true);
      }
      else {
        this.setHidden('addressInfo', true);
        this.setHidden('dlvryBranch', false);
      }
    }

  }
  public handleCustomerDetailsDataReceived: BaseFpxControlEventHandler = (payload: any) => {

    if (payload) {
      this.state.addressInfo.buildingDetails = payload.buildingId + "," + payload.buildingName
      this.state.addressInfo.cityDetails = payload.city
      this.state.addressInfo.stateDetails = payload.stateName
      this.state.addressInfo.countryDetails = payload.countryName
      this.state.addressInfo.pinCode = payload.pincode
      this.setValue('addressInformation', this.state.addressInfo.buildingDetails + "," + this.state.addressInfo.cityDetails + "," + this.state.addressInfo.stateDetails + "," + this.state.addressInfo.countryDetails + "," + this.state.addressInfo.pinCode);
    }

  }
  public onExchangeRateDataReceived: BaseFpxControlEventHandler = (payload: any) => {
    if (payload && this.formMode == 'ADD') {
      if(payload.exchangeRate == null || payload.exchangeRate == undefined || payload.exchangeRate == ""){
        payload.exchangeRate = 1
      }else{
      this.setValue('exchangeRate', Number(payload.exchangeRate));
      }
      this.setValue('baseRate', Number(payload.baseRate));
      let charges = Number(this.getValue('chargesAmount').amount);
      if ((payload.creditAmount+charges) > this.state.accountBalanceVariable) {
        this.setErrors('amount', 'insufficient_balance_error');
      }
      // this.state.exchangeDetails.exchangeRate = payload.baseRate + " " + this.state.toCurrencyVariable + " = " + this.state.fromCurrencyVariable + " " + payload.exchangeRate;
      // this.state.exchangeDetails.debitAmount = this.state.fromCurrencyVariable + " " + this._currencyFormatter.transform(payload.creditAmount, this.state.fromCurrencyVariable);
      // this.state.exchangeDetails.creditAmount = this.state.toCurrencyVariable + " " + this._currencyFormatter.transform(this.getValue('amount').amount, this.state.toCurrencyVariable);
      this.state.exchangeDetails.exchangeRate  = '1' + " " + this.state.toCurrencyVariable + " = " +  " " + payload.exchangeRate + " "+this.state.fromCurrencyVariable;
      this.state.exchangeDetails.debitAmount = payload.creditAmount+" "+this.state.fromCurrencyVariable ;
      this.state.exchangeDetails.creditAmount =this.getValue('amount').amount +" "+ this.state.toCurrencyVariable;
      this.state.paymentAmountVar = payload.debitAmount;
    }
  }

  public override doPostInit(): void {
    // this.addValueChangeHandler("accountNumber", this.handleAccountNumberOnvalueChange);
    // this.addControlEventHandler("accountNumberDataReceived", this.onAccountNumberDataReceived);
    // this.addValueChangeHandler("amount", this.handleAmountOnvalueChange);
    // this.addValueChangeHandler("beneficiaryName", this.handleBeneficiaryNameOnvalueChange);
    // this.addValueChangeHandler("deliveryOption", this.handleDeliveryOptionOnvalueChange);
    // this.addControlEventHandler("exchangeRateReceived", this.onExchangeRateDataReceived);
    // this.addControlEventHandler("onCustomerDetailsDataReceived", this.handleCustomerDetailsDataReceived);
    // this.handleFormOnLoad();

    this.addressInfo = this.formGroup.get("addressInfo") as FormGroup;
      this.handleFormOnLoad();
  }

  public handleFormOnPresubmit(payload: any) {
    // WRITE CODE HERE TO HANDLE
    payload.currency = this.getValue('amount').currencyCode
    payload.amount = this.getValue('amount').amount
    payload.chargesAmount = this.getValue('chargesAmount').amount;
    if (payload.remarks == "") {
      delete payload.remarks
    }
    if (payload.inventoryNumber == "") {
      delete payload.inventoryNumber
    }
    if(payload.exchangeRate == null || payload.exchangeRate == undefined || payload.exchangeRate == ""){
      payload.exchangeRate = 1
    }
    if(this.state.debitcurrency){
      payload.debitCurrency = this.state.debitcurrency;
    }
  }
  public override postDataFetchInterceptor(payload: Ddrequest) {
    // WRITE CODE HERE TO HANDLE 
    this.setValue('accountNumber', payload.accountNumber);
    payload.amount = { amount: payload.amount, currencyCode: this.getValue('currency') };
    this.state.exchangeDetails.creditAmount = payload?.currency + " " + this._currencyFormatter.transform(payload?.amount?.amount, payload?.currency);
    this.state.exchangeDetails.exchangeRate = Number(payload.exchangeRate);
    this.state.exchangeDetails.debitAmount = payload.equiAmount;
    this.state.toCurrencyVariable = payload?.currency;
    this.setVariable('toCurrencyVariable', this.state.toCurrencyVariable);
    if (this.getValue('deliveryOption') == '2') {
      this.setHidden('addressInfo', false);
      this.setHidden('dlvryBranch', true);
    }
    else {
      this.setHidden('addressInfo', true);
      this.setHidden('dlvryBranch', false);
      this.setReadonly('dlvryBranch', true);
    }
    return payload;
  }
  public handleFormOnPostsubmit(response: any, routingInfo: any) {
    // WRITE CODE HERE TO HANDLE
    if (response.success) {
      let res: any = response.success?.body?.ddrequest;
      routingInfo.setQueryParams({
        response: res,
        result: {
          serviceCode: this.serviceCode,
        }
      });
    }
    else if (response.error) {
      let error: any = response.error.error;
      routingInfo.setQueryParams({
        response: error,
        serviceCode: this.serviceCode.value
      });
    }
    return response;
  }
  public override preSubmitInterceptor(payload: Ddrequest): any {
    // WRITE CODE HERE TO HANDLE 
    this.handleFormOnPresubmit(payload);
    return payload;
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


