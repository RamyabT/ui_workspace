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
import { OpennewcasaService } from '../opennewcasa-service/opennewcasa.service';
import { Opennewcasa } from '../opennewcasa-service/opennewcasa.model';
import { CommonService } from "src/app/foundation/validator-service/common-service";
import { CasaaccountService } from "src/app/foundation/casaaccount-service/casaaccount.service";
import { CustomerService } from "src/app/foundation/validator-service/customer.service";
import { AppConfigService } from "@dep/services";
import { ActiveSpaceInfoService } from "@dep/core";
export class RetailOpenNewCasaFormState extends BaseFpxComponentState {
  private _appConfig: AppConfigService = inject(AppConfigService);

  showSuggestion: boolean = false;
  termsFlag: any = {
    textPosition: "after",
    ckValues: { checked: "Y", unchecked: "N" }
  }
  initialDepositAmount: any = {
    isCurrEditable: false,
    CurrencyList: [{ id: this._appConfig.baseCurrency, text: this._appConfig.baseCurrency }],
    amountInWords: false,
    initCurrency: this._appConfig.baseCurrency,
    defaultFetch: true,
  }
  availableBalance: any = {
    isCurrEditable: false,
    CurrencyList: [{ id: this._appConfig.baseCurrency, text: this._appConfig.baseCurrency }],
    amountInWords: false,
    initCurrency: this._appConfig.baseCurrency,
    defaultFetch: true,
  }
  availableBalanceVariable!: any;
  chargesAmount: any = {
    isCurrEditable: false,
    CurrencyList: [{ id: this._appConfig.baseCurrency, text: this._appConfig.baseCurrency }],
    amountInWords: false,
    initCurrency: this._appConfig.baseCurrency,
    defaultFetch: true,
  }
  addressInfo: any = {
    buildingDetails: "",
    cityDetails: "",
    countryDetails: "",
    stateDetails: "",
    pinCode: "",
    email: "",
    mobileNumber: ""
  }
  exchangeDetails: any = {
    exchangeRate: "",
    baseRate: "",
    debitAmount: "",
    creditAmount: ""
  };
  fromCurrencyVariable: any;
  paymentAmountVar!: any;
  toCurrencyVariable: any;
  productInformation: any;
  action: any;
  fromCurrencyVar: any;
  accountTypeDesc:any;
  routingCode:any

}

@Injectable()
export class RetailOpenNewCasaFormHelper extends BaseFpxFormHelper<RetailOpenNewCasaFormState> {
  initialdepositAmount: any;
  addressInfo!: FormGroup;


  constructor(private retailOpenNewCasaFormService: OpennewcasaService,
    private _httpProvider: HttpProviderService,
    private commonService: CommonService,
    private casaservice: CasaaccountService,
    private userService: CustomerService,
    private _appConfig: AppConfigService,
    private _currencyFormatter: FpxCurrenyFormatterPipe,
    private _router: Router,
    private _activeSpaceInfoService: ActiveSpaceInfoService
  ) {
    super(new RetailOpenNewCasaFormState());
  }

  override doPreInit(): void {
    this.setServiceCode("RETAILOPENNEWCASA");
    this.addResetHandler('reset', this._reset);
    this.addValueChangeHandler("accountType", this.handleAccountTypeOnvalueChange);
    this.addValueChangeHandler("productCode", this.handleProductCodeOnvalueChange);
    this.addControlEventHandler("productCodeDataReceived", this.onCasaProductsDataReceived);
    this.addControlEventHandler("debitAccountNumberDataReceived", this.onDebitAccountNumberDataReceived);
    this.addValueChangeHandler("initialDepositAmount", this.handleInitialDepositAmountOnvalueChange);
    this.addValueChangeHandler("ischequebookreq", this.handleIschequebookreqOnvalueChange);
    this.addValueChangeHandler("deliveryOption", this.handleDeliveryOptionOnvalueChange);
    this.addValueChangeHandler('accountCurrency', this.handleAccountCurrencyOnvalueChange);
    this.addControlEventHandler("exchangeRateReceived", this.onExchangeRateDataReceived);
    this.addControlEventHandler('onCustomerDetailsDataReceived', this.handleCustomerDetailsDataReceived);
    this.addValueChangeHandler('openingBranch', this.handleOpeningBranchOnvalueChange);
    this.addValueChangeHandler('termsFlag', this.handleTermsFlagOnvalueChange);

    this.state.action = this.getRoutingParam('action');
  }

  public handleTermsFlagOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if(value =="N"){
      this.setValue('termsFlag',null)
    }
  }

  public handleFormOnLoad() {
    this.userService.fetchCustomer(sessionStorage.getItem('customerCode')).subscribe((res)=>{
      if(res){
        if(res.firstName && res.lastName){
        this.setValue('accountName',res?.firstName+ " "+res?.lastName);
        }
        else if(res.firstName &&  res.lastName == null || res.lastName == undefined){
        this.setValue('accountName',res?.firstName);
        }
        this.setReadonly('accountName',true);
      }
    })
    if (this.formMode == 'ADD') {
      let data: any = [];
      this.setStaticDropdown('accountCurrency', data);
      this.setValue('ischequebookreq', "0");
      this.setValue('deliveryOption', "1");
      this.setValue('availableBalance', { currencyCode: this._appConfig.baseCurrency })
      this.setDisabled('availableBalance', true);
      if (this.formGroup.controls['ischequebookreq']?.value === "1") {
        this.setHidden('deliveryOption', false);
      }
      else {
        this.setHidden('deliveryOption', true);
      }
      this.setHidden('infoNote', true);
      this.setHidden('addressInfo', true);
      this.setHidden('deliveryBranch', true);
      this.setValue('initialDepositAmount', { currencyCode: this._appConfig.baseCurrency });
      this.setValue('chargesAmount',{amount:5.00,currencyCode:this._appConfig.baseCurrency});
      this.setReadonly('chargesAmount', true);
      let accountNum: any = this._activeSpaceInfoService.getAccountNumber();
      this.setValue('debitAccountNumber', accountNum)
      this.setHidden('exchangeDetails', true);
    this.setValue('termsFlag',null);

    }
    else {
      // this.setValue('debitAccountNumber', this.getValue('debitAccountNumber'));
      this.setValue('accountCurrency',this.getValue('accountCurrency'))
      this.setValue('initialDepositAmount', { amount: this.getValue('initialDepositAmount'), currencyCode: this.getValue('accountCurrency') })
      if (this.getValue('accountCurrency') == this.state.toCurrencyVariable) {
        this.setHidden('exchangeDetails', true);
      }
      else {
        this.setHidden('exchangeDetails', false);
      }
      if (this.getValue('ischequebookreq') === "1") {
        this.setHidden('deliveryOption', false);
      this.setHidden('infoNote', false);
      }
      else {
        this.setHidden('deliveryOption', true);
      this.setHidden('infoNote', true);
      }
      if (this.getValue('deliveryOption') == '2') {
        this.setHidden('addressInfo', false);
        this.setDisabled('addressInfo', true);
        this.setHidden('deliveryBranch', true);
      }
      else {
        this.setHidden('addressInfo', true);
        this.setDisabled('addressInfo', true);
        // this.setHidden('openingBranch', false);
        // this.setValue('openingBranch', this.getValue('openingBranch'));
        this.setDisabled('openingBranch', true);
        this.setValue('deliveryBranch', this.getValue('deliveryBranch'));

      }
      this.setValue('chargesAmount',{amount:5.00,currencyCode:this._appConfig.baseCurrency});
      this.setDisabled('chargesAmount',true)
    }
  }
  public handleFormOnPresubmit(payload: any) {
    // WRITE CODE HERE TO HANDLE
    if (payload.initialDepositAmount) {
      payload.depositCurrency = payload.initialDepositAmount.currencyCode;
      payload.initialDepositAmount = payload.initialDepositAmount.amount;
      payload.debitCurrency = this.state.fromCurrencyVariable;
      // this.state.chargesAmount.amount = 0;
      payload.chargesAmount = payload.chargesAmount.amount;
      if (payload.ischequebookreq == '' || payload.ischequebookreq == undefined) {
        payload.ischequebookreq = '0';
      }
    }
    payload.productDescription = this.state.productInformation?.productDescription;
    if (payload.inventoryNumber == "") {
      delete payload.inventoryNumber
    }
    payload.routingCode = this.state.routingCode;
    payload.accountTypeDesc = this.state.accountTypeDesc;
  }
  private _reset: FpxResetHandler = (payload: any) => {
    console.log("payload", payload);
    this.reset('accountType');
    this.reset('productCode');
    this.reset('accountName');
    this.reset('openingBranch');
    this.reset('accountCurrency');
    this.reset('debitAccountNumber');
    this.reset('availableBalance');
    this.reset('initialDepositAmount');
    this.reset('ischequebookreq');
    this.reset('deliveryOption');
    this.reset('remarks');
    this.reset('deliveryBranch');
    this.setValue('ischequebookreq', "0");
    this.setValue('deliveryOption', "1");
    if (this.formGroup.controls['ischequebookreq']?.value == "0") {
      this.setHidden('deliveryOption', true);
      this.setHidden('infoNote', true);
      this.setHidden('deliveryBranch', true);
    }
    else {
      this.setHidden('deliveryOption', false);
      this.setHidden('infoNote', true);
      this.setHidden('deliveryBranch', false);
    }
    this.handleFormOnLoad();
  }
  public handleProductCodeOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if(this.formMode == 'ADD'){
    this.reset('accountCurrency');
    this.reset('initialDepositAmount');
    this.setHidden('exchangeDetails',true);
    }
  }
  public handleAccountTypeOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    // WRITE CODE HERE TO HANDLE 
    //tool generated code based on Orchestration Instructions

    if (value && this.formMode == 'ADD') {

      this.reset('productCode', "")
      this.setHidden('exchangeDetails', true);
      if (value == 'SBA') {
        this.state.accountTypeDesc ="Savings Account";
      }
      if (value == 'CAA') {
        this.state.accountTypeDesc ="Current Account";
      }
    }
  }
  public onCasaProductsDataReceived: BaseFpxControlEventHandler = (payload: any) => {
    // WRITE CODE HERE TO HANDLE 
    if (payload && this.formMode == 'ADD') {
      this.state.productInformation = payload;
      // this.state.accountTypeDesc =payload.accountTypeDesc;
      // this.setValue('accountCurrency', payload.currency);
      this.setValue('productDescription',payload?.productDescription);
      let data: any = [];
      payload.casaAllowedCurrency?.forEach((element: any) => {
        data.push({ id: element.currency.currencyCode, text: element.currency.currencyName })
      });
      let initialDepositAmount;
      payload.casaAllowedCurrency?.forEach((element: any) => {
        initialDepositAmount = element.minimumBalanceAmount
      })
      console.log("Initial Deposit Amount", initialDepositAmount);

      this.setStaticDropdown('accountCurrency', data);
      this.setValue('accountCurrency',data[0].id);
      // this.setValue('initialDepositAmount', { amount: initialDepositAmount })
      this.setValue('initialDepositAmount', { amount:'0.00'});
      // if (payload?.casaparameters?.chequeEnabled == '1') {
      //   this.setHidden('ischequebookreq', false);
      // }
      // else {
      //   this.setHidden('ischequebookreq', true);
      // }
      this.setHidden('exchangeDetails',true);

    }

  }
  public handleAccountCurrencyOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if (value && this.formMode == 'ADD') {
      this.setValue('initialDepositAmount', { amount:'0.00',currencyCode: value });
      // this.formGroup.get('initialDepositAmount')?.setErrors(null);
      this.setHidden('exchangeDetails',true);

      this.state.toCurrencyVariable = value; 
      this.setVariable('toCurrencyVariable', value);
      // this.reset('initialDepositAmount',{amount:0.00,currencyCode:value})
      // this.setVariable('fromCurrencyVariable', value);
    }
  }
  public onDebitAccountNumberDataReceived: BaseFpxControlEventHandler = (payload: any) => {
    // WRITE CODE HERE TO HANDLE 
    if (payload) {
      this.state.fromCurrencyVariable = payload.accountCurrency;
      this.setVariable('fromCurrencyVariable', payload.accountCurrency);
      this.state.availableBalanceVariable = payload.availableBalance;
      this.setVariable('availableBalanceVariable', this.state.availableBalanceVariable);
      this.setValue('availableBalance', { amount: payload.availableBalance, currencyCode: payload.accountCurrency });
      if(this.formMode =='ADD'){
      this.setValue('initialDepositAmount', { amount:'0.00',currencyCode: this.getValue('accountCurrency') });
      this.setHidden('exchangeDetails',true);
      }
      this.state.routingCode = payload.routingCode;
    }

  }
  public handleCustomerDetailsDataReceived: BaseFpxControlEventHandler = (payload: any) => {

    if (payload) {
      this.state.addressInfo.buildingDetails = payload.buildingId + "," + payload.buildingName;
      this.state.addressInfo.cityDetails = payload.city;
      this.state.addressInfo.stateDetails = payload.stateName;
      this.state.addressInfo.countryDetails = payload.countryName;
      this.state.addressInfo.pinCode = payload.pincode;
      this.setValue('addressInformation',this.state.addressInfo.buildingDetails+","+this.state.addressInfo.cityDetails+","+this.state.addressInfo.stateDetails+","+this.state.addressInfo.countryDetails+","+this.state.addressInfo.pinCode);
    }

  }
  public onExchangeRateDataReceived: BaseFpxControlEventHandler = (payload: any) => {
    if (payload && this.formMode == 'ADD') {
      this.setValue('exchangeRate', Number(payload.exchangeRate));
      this.setValue('baseRate', Number(payload.baseRate));
      if(this.state.toCurrencyVariable == undefined || this.state.toCurrencyVariable == null){
        this.setHidden('exchangeDetails',true);
      }
      else if (this.state.fromCurrencyVariable != this.state.toCurrencyVariable) {
        this.setHidden('exchangeDetails', false);
      }
      else {
        this.setHidden('exchangeDetails', true);
      }
      // this.state.exchangeDetails.exchangeRate = '1' + " " + this.state.fromCurrencyVariable + " = " + this.state.toCurrencyVariable + " " + payload.exchangeRate;
      this.state.exchangeDetails.exchangeRate  = '1' + " " + this.state.toCurrencyVariable + " = " +  " " + payload.exchangeRate + " "+this.state.fromCurrencyVariable;
      this.state.exchangeDetails.debitAmount = payload.debitAmount +" "+this.state.fromCurrencyVariable ;
      this.state.exchangeDetails.creditAmount = payload.creditAmount +" "+ this.state.toCurrencyVariable;
      this.state.paymentAmountVar = payload.debitAmount;
      let minimumBalanceAmount: any = [];
      this.state.productInformation?.casaAllowedCurrency?.forEach((element: any) => {
        // data.push({ id: element.currency.currencyCode, text: element.currency.currencyName })
        if (element.currency.currencyCode == this.getValue('accountCurrency')) {
          minimumBalanceAmount = element.minimumBalanceAmount;
        }
      });
      if (this.getValue('initialDepositAmount').amount< minimumBalanceAmount) {
        this.setErrors('initialDepositAmount', 'minimumAmount', { minimumAmount: minimumBalanceAmount + " "+this.state.fromCurrencyVariable})
      }
      else{
        let chargesAmount=Number(this.getValue('chargesAmount').amount);
        let amount = Number(this.getValue('initialDepositAmount').amount);
        if((amount+chargesAmount) > this.getValue('availableBalance').amount){
          this.setErrors('initialDepositAmount','insufficient_balance_error');
        }

      }
    }
  }
  public handleInitialDepositAmountOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if (value && this.formMode == 'ADD') {
      if(value && this.state.toCurrencyVariable == undefined || this.state.toCurrencyVariable == null){
        this.setHidden('exchangeDetails',true);
      }
      else if (value.amount && this.state.fromCurrencyVariable != value.currencyCode) {
        this.setHidden('exchangeDetails', false);
      }
      else {
        this.setHidden('exchangeDetails', true);
      }
    }
    // this.setHidden('exchangeDetails',true);


  }
  public handleIschequebookreqOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    // WRITE CODE HERE TO HANDLE 
    //tool generated code based on Orchestration Instructions
    if (value && this.formMode == 'ADD') {
      if (value == '1') {
        this.setHidden('deliveryOption', false);
        this.setHidden('deliveryBranch', false);
      this.setHidden('infoNote',false);
      }
      else{
        this.setHidden('deliveryOption', true);
        this.setHidden('deliveryBranch', true);
      this.setHidden('infoNote',true);
      }
      this.setValue('deliveryOption', '1');
      this.setHidden('addressInfo', true);
    }
    if (value == 0 && this.formMode == 'VIEW') {
      this.setHidden('deliveryOption', true);
      this.setHidden('deliveryBranch', true);
      this.setHidden('addressInfo', true);
    }
    else if (value == 1 && this.formMode == 'VIEW') {
      this.setHidden('deliveryOption', false);
    }

  }
  public handleOpeningBranchOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if (value && this.formMode=='ADD') {
      this.setValue('deliveryBranch', value);
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
    if (value) {
      if (value == '2') {
        this.setHidden('addressInfo', false);
        //SandBox 24 Demo Changes
        // if(this.getValue('addressInformation')==null ||this.getValue('addressInformation')==""){
        //   this.showFailAlert('Alert','You have no contact details,please select branch');
        //   this.setValue('deliveryOption','1');
        //   this.setHidden('addressInfo', true);
        //   this.setDisabled('addressInfo', true);
        //   this.setHidden('deliveryBranch', false);
        // }
        // else{
          this.setDisabled('addressInfo', true);
          this.setHidden('deliveryBranch', true);
        // }
        
      }
      else {
        // this.handleFormOnChargesAmountCalc();
        this.setHidden('addressInfo', true);
        this.setDisabled('addressInfo', true);
        this.setHidden('deliveryBranch', false);
      }
    }

  }

  public override doPostInit(): void {
    //this.addressInfo=this.formGroup.get("addressInfo") as FormGroup;
    this.addressInfo = this.formGroup.get("addressInfo") as FormGroup;
      this.handleFormOnLoad();
    if (this.formMode == 'VIEW') {
      this.formGroup.disable();
    }
  }

  public override preSubmitInterceptor(payload: Opennewcasa): any {
    // WRITE CODE HERE TO HANDLE 
    this.handleFormOnPresubmit(payload);
    return payload;
  }


  public override postDataFetchInterceptor(payload: Opennewcasa) {
    // WRITE CODE HERE TO HANDLE 
    // payload.initialDepositAmount = { amount: payload.initialDepositAmount, currencyCode: payload.depositCurrency };
    payload.chargesAmount = { amount: payload.chargesAmount, currencyCode: this._appConfig.baseCurrency };
    this.state.exchangeDetails.creditAmount = payload?.depositCurrency + " " + this._currencyFormatter.transform(payload?.initialDepositAmount, payload?.depositCurrency);
    // this.state.exchangeDetails.exchangeRate = payload.exchangeRate;
    this.state.toCurrencyVariable = payload?.debitCurrency;
    this.state.exchangeDetails.exchangeRate = payload?.baseRate + " " + payload.depositCurrency + " = "  + payload.exchangeRate + " " + payload.debitCurrency;
    this.state.exchangeDetails.debitAmount = payload.debitAmount +" "+payload.accountCurrency ;;
      this.state.exchangeDetails.creditAmount = payload.initialDepositAmount +" "+ this.state.toCurrencyVariable;

    this.setVariable('toCurrencyVariable', payload?.debitCurrency);
    // this.setValue('debitCurrency',payload?.debitCurrency);

    return payload;
  }


  public override postSubmitInterceptor(response: any): RoutingInfo {
    console.log(response);
    let routingInfo: RoutingInfo = new RoutingInfo();
    if (response.success) {
      let res = response.success?.body?.opennewcasa;
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
    return routingInfo;
  }
  //$START_CUSTOMSCRIPT\n
  productPayload: any;
  debitAccountPayload: any = {};

  //$END_CUSTOMSCRIPT\n
}


