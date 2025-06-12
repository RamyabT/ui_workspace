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
  CriteriaQuery,
  FpxResetHandler
} from "@fpx/core";
import { Observable, map, of } from "rxjs";
import { Router } from "@angular/router";
import { InstapayService } from '../instapay-service/instapay.service';
import { Instapay } from '../instapay-service/instapay.model';
import { MomentService } from "src/app/foundation/validator-service/moment-service";
import { AppConfigService } from "@dep/services";
export class RetailInstaPayFormState extends BaseFpxComponentState {
  private _appConfig: AppConfigService = inject(AppConfigService);
  showSuggestion: boolean = false;
  paymentAmount: any = {
    isCurrEditable: true,
    CurrencyList: [],
    amountInWords: true,
    initCurrency: this._appConfig.baseCurrency,
    defaultFetch: true,
  }

  termsFlag: any = {
    textPosition: "after",
    ckValues: { checked: "Y", unchecked: "N" }
  }
  bankDetails: any = {
    routingCode: "",
    bankCode: "",
    branchCode: "",
    bankAddress: ""
  }
  paymentSummary: any = {
    debitAmount: "",
    creditAmount: "",
    exchangeRate: "",
    chargesAmount: ""
  };
  debitAccountData: any;
  fromCurrencyVariable: any;
  accountBalanceVar: any;
  toCurrencyVariable: any;
  visibilityChange: boolean = false;
  autoComplete: boolean = false;
  modeVar: any;
  transferSummary: any = {
    paymentId: "",
    paymentStatus: ""
  };
}


@Injectable()
export class RetailInstaPayFormHelper extends BaseFpxFormHelper<RetailInstaPayFormState>{

  constructor(private retailInstaPayFormService: InstapayService, private _httpProvider: HttpProviderService, private _router: Router,
    private momentService: MomentService,
    private _currencyFormatter: FpxCurrenyFormatterPipe,
    private _appConfig: AppConfigService
  ) {
    super(new RetailInstaPayFormState());
  }

  override doPreInit(): void {
    let mode: any = this.getRoutingParam('mode');
    this.state.modeVar = this.getRoutingParam('mode');
    let paymentId: any = this.getRoutingParam('paymentId');
    let serviceCode: any = this.getRoutingParam('serviceCode');
    this.setHidden('transferSummary', true);
    // this.setRepairableControls(['paymentAmount', 'sourceAccount']);
    // this.addControlEventHandler("sourceAccountDataReceived", this.onSourceAccountDataReceived);
    // this.addControlEventHandler("instaPayibanDataReceived", this.onInstaPayibanDataReceived);

    if (paymentId && mode && serviceCode == 'RETAILSCHINSTA'){
      this.setShellBtnMethod('reset', this.handleFormOnLoad);
      this.setServiceCode("RETAILSCHINSTA");
      this.setDataService(this.retailInstaPayFormService)
    }
    else{
    this.setShellBtnMethod('reset', this.handleFormOnLoad);
    this.setServiceCode("RETAILTRANINSTA");
    this.setDataService(this.retailInstaPayFormService);
    }
    if(this.formMode == 'ADD'){
    this.addResetHandler('reset', this._reset);
    }

  }
  private _reset: FpxResetHandler = (payload: any) => {
    this.reset('paymentAmount');
    this.reset('sourceAccount');
    this.reset('iban');
    this.reset('confirmIban');
    this.setValue('purpose', "001");
    this.setDisabled('creditAmount', true);
    this.setDisabled('creditCurrency', true);
    this.setDisabled('debitAmount', true);
    this.setDisabled('debitCurrency', true);
    this.setDisabled('paymentId', true);
    this.setHidden('bankDetails', true);
    this.setHidden('paymentSummary', true);
    let Date: any = this.momentService.getInstance();
    let currentDate: any = Date.format("YYYY-MM-DD");
    this.setValue('paymentDate', currentDate);
  }
  public handleFormOnLoad() {

    let mode: any = this.getRoutingParam('mode');
    if(mode == 'V'){
      this.removeShellBtn('BACK');
    }
     if (mode) {
      this.addResetHandler('reset',this._onReset);
      let debitAmountVar = this.getValue('debitAmount');
      let debitCurrencyVar = this.getValue('debitCurrency');
      let creditAmountVar = this.getValue('creditAmount');
      let creditCurrencyVar = this.getValue('creditCurrency');
      let testvar = this.getValue('creditAccountNumber');
      let paymentId: any = this.getRoutingParam('paymentId');
      let routingParam: any = this.getRoutingParam();
      if (this.getRoutingParam('mode') == 'R') {

        this.retailInstaPayFormService.findByKey(routingParam)().subscribe((res) => {
          if (res) {
            this.patchValue(res);
            this.setValue('termsFlag','N');
            let Date: any = this.momentService.getInstance();
            let currentDate: any = Date.format("YYYY-MM-DD");
            this.setValue('paymentDate', currentDate);
            this.setReadonly('paymentDate', true);
            this.setAmountCurrencyList('paymentAmount',[{
              id:res?.paymentCurrency,
              text:res?.paymentCurrency
           }])
            this.setValue('iban', res.creditAccountNumber);
            this.setValue('confirmIban', res.creditAccountNumber);
            this.setReadonly('iban',true);
            this.setReadonly('confirmIban',true);
            this.setReadonly('paymentDate',true);
            this.setReadonly('sourceAccount',true);
            this.setReadonly('beneficiaryId', true);
            this.setHidden('paymentSummary', false);
            this.setDisabled('paymentId', true);
            this.setVariable('fromCurrencyVariable', this.getValue('debitCurrency'));
            this.state.fromCurrencyVariable = this.getValue('debitCurrency');
            this.setVariable('toCurrencyVariable', res.creditCurrency);
            this.state.toCurrencyVariable = res.creditCurrency;
            this.setValue('paymentAmount', { amount: res?.paymentAmount, currencyCode: res?.paymentCurrency });
            this.setValue('rateApplied', res?.rateApplied);
            this.setValue('purpose',res?.purpose);
            this.setValue('baseRateApplied', res?.baseRateApplied);
            this.setReadonly('purpose',true);
            if(this.getValue('debitCurrency')!=res?.creditCurrency){
              this.setHidden('paymentSummary',false);
              this.state.paymentSummary.debitAmount =  res?.debitAmount+ " "+ this.getValue('debitCurrency');
              this.state.paymentSummary.creditAmount =res?.creditAmount+ " " +res?.creditCurrency;
              this.state.paymentSummary.exchangeRate = '1' + " " + this.getValue('debitCurrency') + " = " +  " " + this.getValue('rateApplied') + " "+res?.creditCurrency
            }
            else{
              this.setHidden('paymentSummary',true);
            }
            
          }
        });
      }
      else if (this.getRoutingParam('mode') == 'V') {
        // this.setDisabled('paymentId', true);
       
        this.state.transferSummary.paymentId = this.getValue('paymentId');
        let statusVar = this.getRoutingParam('status');
        this.state.transferSummary.paymentStatus = statusVar;
        this.setHidden('transferSummary', false);
        this.retailInstaPayFormService.findByKey(routingParam)().subscribe((res) => {
          if (res) {
            this.patchValue(res);
            this.setValue('iban', res.creditAccountNumber);
            this.setValue('confirmIban', res.creditAccountNumber);
            this.setVariable('fromCurrencyVariable', this.getValue('debitCurrency'));
            this.state.fromCurrencyVariable = this.getValue('debitCurrency');
            this.setVariable('toCurrencyVariable', res.creditCurrency);
            this.state.toCurrencyVariable = res.creditCurrency;
            this.setValue('paymentAmount', { amount: res?.paymentAmount, currencyCode: res?.paymentCurrency });
            if(this.getValue('debitCurrency')!=res?.creditCurrency){
              this.setHidden('paymentSummary',false);
              this.state.paymentSummary.debitAmount = debitAmountVar+ " "+ this.getValue('debitCurrency');
              this.state.paymentSummary.creditAmount =creditAmountVar+ " " +res?.creditCurrency;
              this.state.paymentSummary.exchangeRate = '1' + " " + this.getValue('debitCurrency') + " = " +  " " + this.getValue('rateApplied') + " "+res?.creditCurrency;
            }
            else{
              this.setHidden('paymentSummary',true);
            }
              this.setHidden('disclaimer-box',true);
          }
        });
       
       

      }
    }
    else {
      this.setValue('purpose', "001");
      this.setValue('termsFlag',null)
      this.setDisabled('creditAmount', true);
      this.setDisabled('creditCurrency', true);
      this.setDisabled('debitAmount', true);
      this.setDisabled('debitCurrency', true);
      this.setDisabled('paymentId', true);
      this.setHidden('bankDetails', true);
      this.setHidden('paymentSummary', true);
      let Date: any = this.momentService.getInstance();
      let currentDate: any = Date.format("YYYY-MM-DD");
      this.setValue('paymentDate', currentDate);
    }
  }



  public handleFormOnPresubmit(payload: any) {
    // WRITE CODE HERE TO HANDLE
    payload.paymentAmount = this.getValue('paymentAmount').amount;
    payload.paymentCurrency = this.getValue('paymentAmount').currencyCode;
    // let bankCodeVar: string = payload.bankCode.split("-");
    // let branchCodeVar: string = payload.bankCode.split("-");
    // payload.bankCode = bankCodeVar[0];
    // payload.branchCode = branchCodeVar[0];
  }




  public onSourceAccountDataReceived: BaseFpxControlEventHandler = (payload: any) => {
    // WRITE CODE HERE TO HANDLE 
    if (payload) {
      this.state.debitAccountData = payload;
      this.setVariable('fromCurrencyVariable', payload.accountCurrency);

      if(!payload.accountCurrency || !payload.accountNumber){
        this.setErrors('sourceAccount',"invalidAccountErr");
      }
      else{
        this.setVariable('fromCurrencyVariable', payload.accountCurrency);
        this.state.fromCurrencyVariable = payload.accountCurrency;
      }
      // this.setVariable('fromCurrencyVariable', payload.accountCurrency);
      // this.state.fromCurrencyVariable = payload.accountCurrency;
      this.setVariable('accountBalanceVariable', payload.availableBalance);
      this.state.accountBalanceVar = payload.availableBalance;
      console.log(payload.accountCurrency)

      if ((this.state.modeVar == null || this.state.modeVar == "" || this.state.modeVar == undefined)) {
        this.setValue('paymentAmount', {
          amount: 0
        });
        this.setHidden('paymentSummary', true);
      }
      
      this.updatePaymentCurrencyList();

    }
  }

  public onInstaPayibanDataReceived: BaseFpxControlEventHandler = (res: any) => {
    if (res) {
      this.setHidden('bankDetails', false);
      this.setVariable('toCurrencyVariable', res.currency);
      this.setValue("beneCurrency", res.currency);
      this.state.toCurrencyVariable = res.currency;

      if ((this.state.modeVar == null || this.state.modeVar == "" || this.state.modeVar == undefined)) {
        this.reset('paymentAmount', {
          amount: 0,
          currencyCode: this._appConfig.baseCurrency
        });
        this.setHidden('paymentSummary', true);
      }
      
      this.updatePaymentCurrencyList();
      this.setReadonly('bankCode',true);
      this.setReadonly('beneficiaryName',true);
      this.setReadonly('branchCode',true);
      this.setReadonly('branchAddress',true);
      this.setReadonly('routingCode',true);
      this.setValue("accountNumber", res.iBanNumber);
      this.setValue("beneficiaryName", res.beneName);
      this.setValue("routingCode", res.bic);
      this.setValue("bankCode", res.bankCode + '-' + res.bankName);
      this.setValue("branchCode", res.branchCode + '-' + res.branchName);
      this.setValue("branchAddress", res.bankAddress);
      // this.setHidden('bankDetails', false);
      // this.setHidden('beneDetails', false);
      // this.setHidden('termsDetails', false);
    }
  }

  updatePaymentCurrencyList(){
    let currencyList: any = [];
    let selectCurrency:string = '';
    if(this.state?.fromCurrencyVariable && this.state?.toCurrencyVariable){
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
      if(this.state?.fromCurrencyVariable) {
        currencyList.push({
          id: this.state.fromCurrencyVariable,
          text: this.state.fromCurrencyVariable,
        });
        selectCurrency = this.state.fromCurrencyVariable;
      } else if(this.state?.toCurrencyVariable){
        currencyList.push({
          id: this.state.toCurrencyVariable,
          text: this.state.toCurrencyVariable,
        });
        selectCurrency = this.state.toCurrencyVariable;
      }
    }

    

    this.setAmountCurrencyList("paymentAmount", currencyList);

    // setTimeout(()=>{
    //   this.setValue('paymentAmount', {
    //     amount: 0,
    //     currencyCode: selectCurrency
    //   });
    // });
  }

  private _onReset = () => {
    if(this.state.modeVar=='M' || "R")
    this.handleFormOnLoad();
  }

  public onExchangeRateDataReceived: BaseFpxControlEventHandler = (payload: any) => {
    if (payload.zeroValue) {
      this.setHidden('paymentSummary', true);
    }
    else if (this.state.fromCurrencyVariable == this.state.toCurrencyVariable) {
      this.setHidden('paymentSummary', true);
      this.setValue('rateApplied', payload.exchangeRate);
      this.setValue('baseRateApplied', payload.baseRate);
    }
    else {
      this.setHidden('paymentSummary', false);
      this.setValue('rateApplied', payload.exchangeRate);
      this.setValue('baseRateApplied', payload.baseRate);
      this.state.paymentSummary.exchangeRate  = '1' + " " + this.state.toCurrencyVariable + " = " +  " " + payload.exchangeRate + " "+this.state.fromCurrencyVariable;
      this.state.paymentSummary.debitAmount = payload.debitAmount +" "+this.state.fromCurrencyVariable ;
      this.state.paymentSummary.creditAmount = payload.creditAmount +" "+ this.state.toCurrencyVariable;
      


    }
  }

  public handleTermsFlagOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    // WRITE CODE HERE TO HANDLE 
    //tool generated code based on Orchestration Instructions
    if(value =="N" || value == "" || value == undefined || value == null){
      this.setValue('termsFlag',null)
    }
  }
  public override doPostInit(): void {
    this.handleFormOnLoad();
    this.addControlEventHandler("sourceAccountDataReceived", this.onSourceAccountDataReceived);
    this.addControlEventHandler("exchangeRateReceived", this.onExchangeRateDataReceived);
    this.addValueChangeHandler("confirmIban", this.handleConfirmIbanOnvalueChange);
    this.addValueChangeHandler("termsFlag", this.handleTermsFlagOnvalueChange);
    this.addValueChangeHandler("iban", this.handleIbanOnvalueChange);
    this.addControlEventHandler("instaPayibanDataReceived", this.onInstaPayibanDataReceived);

  }

  public handleConfirmIbanOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if (this.getValue('iban') != this.getValue('confirmIban')) {
      this.setErrors('confirmIban', 'confirmIbanError')
    }
  }

  public handleIbanOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
   this.reset('confirmIban',true);
  }



  public override preSubmitInterceptor(payload: Instapay): any {
    // WRITE CODE HERE TO HANDLE 
    this.handleFormOnPresubmit(payload);
    return payload;
  }


  public override postDataFetchInterceptor(payload: Instapay) {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }

  public handleFormOnPostsubmit(response: any, routingInfo: any) {
    // WRITE CODE HERE TO HANDLE
    // if (response.success) {
    //   let result = response.success?.body?.instapay
    //   let date = this.momentService.getInstance()
    //   let dateWithTime = date.format('YYYY-MM-DD HH:mm:ss');
    //   let sc: any = this.serviceCode;

    //   routingInfo.setQueryParams({
    //     response: result,
    //     result: {
    //       statusCode: "WARNING", //SUCCESS | FAILUR | WARNING
    //       message: "Transaction Successful",
    //       description: "Your transaction has been sent for approval !!!",
    //       serviceCode: this.serviceCode,
    //       additionalInfo: [
    //         {
    //           label: "Reference No",
    //           value: result.processId
    //         },
    //         {
    //           label: "Date & Time",
    //           value: dateWithTime
    //         }
    //       ]
    //     }
    //   });
    // } else if (response.error) {
    //   let error = response.error.error;
    //   routingInfo.setQueryParams({
    //     result: {
    //       statusCode: "FAILUR", //SUCCESS | FAILUR | WARNING
    //       message: error.ErrorMessage,
    //       description: error.ErrorDescription,
    //       serviceCode: this.serviceCode,
    //     }
    //   });
    // }
    // return response;
    if (response.success) {
      let res = response.success?.body?.instapay
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


