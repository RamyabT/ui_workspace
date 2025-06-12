import { Injectable } from "@angular/core";
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
  FpxModal
} from "@fpx/core";
import { Observable, map, of } from "rxjs";
import { Router } from "@angular/router";
import { SchedulebillpaymentslogService } from '../schedulebillpaymentslog-service/schedulebillpaymentslog.service';
import { Schedulebillpaymentslog } from '../schedulebillpaymentslog-service/schedulebillpaymentslog.model';
import { AppConfigService } from "@dep/services";
import { CasaaccountService } from "src/app/foundation/casaaccount-service/casaaccount.service";
import moment from "moment";
import { CommonService } from "src/app/foundation/validator-service/common-service";
import { APPCONSTANTS } from "@dep/constants";
export class RetailScheduleBillPaymentsFormState extends BaseFpxComponentState {
  showSuggestion: boolean = false;
  paymentDate: any = {
    minDate: "",
    maxDate: "",
  }

  endDate: any = {
    minDate: "",
    maxDate: "",
  }
  operationMode: any;
  action: any;
  paymentId: string | undefined;
  deleteModebillerParam: any;
  sourceAccount: any;
  beneficiaryName: any;
  productDesc: any;
  paymentAmount: any = {
    isCurrEditable: false,
    CurrencyList: [{ id: APPCONSTANTS.baseCurrency, text: APPCONSTANTS.baseCurrency }],
    amountInWords: false,
    initCurrency: APPCONSTANTS.baseCurrency,
    defaultFetch: true,
  }
  amount:any;
  date:any;
  noOfPayments:any;
  paidInstallments: any;
  scheduleTypeVar: any;
  paymentCurrencyVar: any;
  accountBalanceVar: any;
}


@Injectable()
export class RetailScheduleBillPaymentsFormHelper extends BaseFpxFormHelper<RetailScheduleBillPaymentsFormState> {

  constructor(private retailScheduleBillPaymentsFormService: SchedulebillpaymentslogService,
    private _httpProvider: HttpProviderService, private _router: Router,
    private _appConfig: AppConfigService,
    private _casaAccountService: CasaaccountService,
    private _commonService: CommonService) {
    super(new RetailScheduleBillPaymentsFormState());
  }

  override doPreInit(): void {
    this.setServiceCode("RETAILSCHBILLPAYMENTS");
    // this.removeShellBtn('RESET');
    // this.addShellButton('Back', 'D', 'btn-secondary', 'ENTRY');
    // this.setShellBtnMethod('D', this.backNavigate.bind(this));
    this.addResetHandler('reset', this._onReset);
  }
  private _onReset = () => {
    if(this.state.scheduleTypeVar=='2'){
      this.reset('paymentAmount');
      this.setValue('paymentAmount', {amount: this.state.amount, currencyCode: this.state.paymentCurrencyVar});
      this.reset('paymentDate');
      this.setValue('paymentDate', this.state.date);
    }
    else{
      this.reset('paymentAmount');
      this.reset('numberOfPayments');
      this.setValue('numberOfPayments',this.state.noOfPayments);
      this.setValue('paymentAmount', {amount: this.state.amount, currencyCode: this.state.paymentCurrencyVar});

    }
    
  }

  public handleFormOnLoad() {
    this.state.paymentDate.minDate=new Date();
    let res = this._appConfig.getData('setScheduleData');
    this.setValue('scheduleId', res?.paymentId);
    this.setValue('sourceAccount', res?.sourceAccount);
    this.setValue('beneficiaryName', res?.beneficiaryName);
    this.setValue('paymentFrequency', res?.paymentFrequency);
    this.setValue('operationMode', 'M');
    this.setValue('serviceCode', 'RETAILSCHBILLPAYMENTS');
    this.setValue('numberOfPayments', res?.numberOfPayments);
    this.setValue('paymentDate', moment(res?.paymentDate).format('YYYY-MM-DD'));
    this.setValue('paymentAmount', {amount: res?.paymentAmount, currencyCode: res?.paymentCurrency });
    this.state.amount = res?.paymentAmount;
    this.state.paymentCurrencyVar=res?.paymentCurrency
    this.state.date = moment(res?.paymentDate).format('YYYY-MM-DD');
    this.state.noOfPayments = res?.numberOfPayments;
    this.state.paidInstallments=res?.paidInstallments;
    this.state.scheduleTypeVar= res?.scheduleType;
    this.setEndDate();
    this.state.beneficiaryName = res?.beneficiaryName;
    this.state.sourceAccount = res?.sourceAccount;
    let key: any = {
      accountNumber: res?.sourceAccount
    }
    this._casaAccountService.findByKey(key)().subscribe((res: any) => {
      if (res) {
        this.state.productDesc = res?.productDesc;
        if (res.availableBalance || res?.availableBalance != undefined || res?.availableBalance != '') {
          this.state.accountBalanceVar = res.availableBalance;
        }
        else {
          this.state.accountBalanceVar = 0;
        }
      }
    })

    if(res?.scheduleType == '2'){
      this.setValue('scheduleType', false);
      this.setHidden('numberOfPayments',true);
      this.setHidden('paymentFrequency',true);
      this.setHidden('scheduleType',true);
      this.setHidden('endDate',true);
    }
    else if(res?.scheduleType == '3'){
      this.setHidden('numberOfPayments',false);
      this.setHidden('paymentFrequency',false);
      this.setHidden('endDate',false);
      this.setReadonly('paymentFrequency',true);
      if(!res?.numberOfPayments){
        this.setHidden('endDate',true);
      }
      this.setReadonly('endDate',true);
      this.setValue('scheduleType', true);
      this.setHidden('scheduleType',false);
      this.setReadonly('scheduleType',true);
      this.setReadonly('paymentDate',true);
    }
  }

  public handlePaymentDateOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    // WRITE CODE HERE TO HANDLE 
    //tool generated code based on Orchestration Instructions
    if(value){
      this.setEndDate();
      if(value!= this.state.date){
        this.setHidden('hiddenField', true);
        this.formGroup.get("hiddenField")?.disable();
      }
      else{
        if(this.state.amount == this.formGroup.controls['paymentAmount'].value.amount && this.state.noOfPayments == this.formGroup.controls['numberOfPayments'].value){
          this.setHidden('hiddenField', false);
        }
        else{
          this.setHidden('hiddenField', true);
          this.formGroup.get("hiddenField")?.disable();
        }
      }
    }
  }

  public handlePaymentFrequencyOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    // WRITE CODE HERE TO HANDLE 
    //tool generated code based on Orchestration Instructions
    if(value){
      this.setEndDate();
    }
  }

  public handleNumberOfPaymentsOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formArray: FormGroup
  ) => {
    if (value) {
      this.setEndDate();
      if(value!= this.state.noOfPayments){
        this.setHidden('hiddenField', true);
        this.formGroup.get("hiddenField")?.disable();
      }
      else{
        if(this.state.amount == this.formGroup.controls['paymentAmount'].value.amount && this.state.date == this.formGroup.controls['paymentDate'].value){
          this.setHidden('hiddenField', false);
        }
        else{
          this.setHidden('hiddenField', true);
          this.formGroup.get("hiddenField")?.disable();
        }
      }

      if(value < (this.state.noOfPayments - this.state.paidInstallments)){
        this.setHidden('hiddenField', false);
        this.setErrors('numberOfPayments','remPaymentsErr')
      }
      else{
        this.setHidden('hiddenField', true);
      }
    }
  }

  public handlePaymentAmountOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formArray: FormGroup
  ) => {
    if (value) {
      this.setEndDate();
      if(value.amount==0){
        this.setErrors('paymentAmount','zero_value_error')
      }
      if (value.amount != this.state.amount) {
        this.setHidden('hiddenField', true);
        this.formGroup.get("hiddenField")?.disable();
      }
      else{
        if(this.state.noOfPayments == this.formGroup.controls['numberOfPayments'].value && this.state.date == this.formGroup.controls['paymentDate'].value){
          this.setHidden('hiddenField', false);
        }
        else{
          this.setHidden('hiddenField', true);
          this.formGroup.get("hiddenField")?.disable();
        }
      }
    }
  }

  setEndDate() {
    if(this.formGroup.controls['paymentDate'].value, this.formGroup.controls['paymentFrequency'].value, this.formGroup.controls['numberOfPayments'].value) {
      let paymentEndDateVar: any = this._commonService.caculateEndDate(this.formGroup.controls['paymentDate'].value, this.formGroup.controls['paymentFrequency'].value, this.formGroup.controls['numberOfPayments'].value);
      if (paymentEndDateVar) {
       this.setValue('endDate',moment(paymentEndDateVar).format('YYYY-MM-DD'))
      }
    }
    
  }
  // backNavigate(){
  //   this._router.navigate(['payments-space','entry-shell','payments','view-scheduled-bills-form']);
  // }

  public override doPostInit(): void {
    this.handleFormOnLoad();
    this.addValueChangeHandler("paymentFrequency", this.handlePaymentFrequencyOnvalueChange);
    this.addValueChangeHandler("numberOfPayments", this.handleNumberOfPaymentsOnvalueChange);
    this.addValueChangeHandler("paymentDate", this.handlePaymentDateOnvalueChange);
    this.addValueChangeHandler("paymentAmount", this.handlePaymentAmountOnvalueChange);
  }

  public handleFormOnPresubmit(payload: any) { 
    if(payload.scheduleType == true){
      payload.scheduleType ='3';
    }
    else{
      payload.scheduleType ='2';
    }
    payload.paymentCurrency = this.getValue('paymentAmount')?.currencyCode;
    payload.paymentAmount = this.getValue('paymentAmount')?.amount;
  }

  public handleFormOnPostsubmit(response: any, routingInfo: any) {
    // WRITE CODE HERE TO HANDLE
    if (response.success) {
      let res: any = response.success?.body?.schedulebillpaymentslog;
      routingInfo.setQueryParams({
        response: res
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

  public override preSubmitInterceptor(payload: Schedulebillpaymentslog): any {
    // WRITE CODE HERE TO HANDLE 
    this.handleFormOnPresubmit(payload);
    return payload;
  }


  public override postDataFetchInterceptor(payload: Schedulebillpaymentslog) {
    // WRITE CODE HERE TO HANDLE 
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


