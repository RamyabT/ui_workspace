import { Injectable, inject } from "@angular/core";
import { FormArray, FormControlStatus, FormGroup, Validators } from "@angular/forms";
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
  FpxAppConfig,
  FpxModalAfterClosed
} from "@fpx/core";
import { Observable, map, of } from "rxjs";
import { Router } from "@angular/router";
import { CctransferService } from '../cctransfer-service/cctransfer.service';
import { Cctransfer } from '../cctransfer-service/cctransfer.model';
import { Pymts } from '../pymts-service/pymts.model';
import { ScheduleccService } from "../schedulecc-service/schedulecc.service";
import { ScheduleccreqService } from "../scheduleccreq-service/scheduleccreq.service";
import { MomentService } from "src/app/foundation/validator-service/moment-service";
import { AppConfigService, CommonValidatorService, DepHttpConfig } from "@dep/services";
import moment from "moment";
import { DeviceDetectorService } from "@dep/core";
import { DepConfirmationComponent } from "src/app/dep/core/component/dep-confirmation/dep-confirmation.component";
export class RetailCCTransferFormState extends BaseFpxComponentState {
  private _appConfig: AppConfigService = inject(AppConfigService);
  showSuggestion: boolean = false;
  paymentAmount: any = {
    isCurrEditable: true,
    CurrencyList: [],
    amountInWords: true,
    initCurrency: this._appConfig.baseCurrency,
    defaultFetch: true,
  };
  // paymentAmount: any = {
  //   isCurrEditable: true,
  //   CurrencyList: [],
  //   amountInWords: true,
  //   initCurrency: this._appConfig.baseCurrency,
  //   defaultFetch: true,
  // }
  paymentDate: any = {
    minDate: "",
    maxDate: "",
  }
  termsFlag: any = {
    textPosition: "after",
    ckValues: { checked: "Y", unchecked: "N" }
  }
  paymentSummary: any = {
    debitAmount: "",
    creditAmount: "",
    exchangeRate: "",
    chargesAmount: ""
  };
  chargesAmount: any = {
    isCurrEditable: true,
    CurrencyList: [],
    amountInWords: false,
    initCurrency: this._appConfig.baseCurrency,
    defaultFetch: false,
  }
  fromCurrencyVariable: any;
  toCurrencyVariable: any;
  debitAccountData: any;
  accountBalanceVar: any;
  beneData: any;
  modeVar: any;
  numberOfPaymentVar: any;
  transferSummary: any = {
    paymentId: "",
    paymentStatus: ""
  };
  paidInstallments: any;
  holiday=0
  cutOffTimeVar=0;
  errorCode:any;
  nextPaymentDate : any;
}


@Injectable()
export class RetailCCTransferFormHelper extends BaseFpxFormHelper<RetailCCTransferFormState>{
  paymentSummary!: FormGroup;
  private _serviceCodeDetails:FpxAppConfig = inject(FpxAppConfig);
  private _depHttpConfig: DepHttpConfig = inject(DepHttpConfig);
  constructor(private retailCCTransferFormService: CctransferService,
    private _httpProvider: HttpProviderService
    , private _router: Router,
    private siccreqService: ScheduleccreqService,
    private siccService: ScheduleccService,
    private momentService: MomentService,
    private _currencyFormatter: FpxCurrenyFormatterPipe,
    private _appConfig: AppConfigService,
    public deviceService: DeviceDetectorService,
    protected _validatorService: CommonValidatorService

  ) {
    super(new RetailCCTransferFormState());
  }

  override doPreInit(): void {
    let mode: any = this.getRoutingParam('mode');
    this.addResetHandler('reset',this._onReset);

    this.setHidden('transferSummary', true);
    this.state.modeVar = this.getRoutingParam('mode');
    let paymentId: any = this.getRoutingParam('paymentId');
    let serviceCode: any = this.getRoutingParam('serviceCode');
    let inventoryNumber = this.getRoutingParam('inventoryNumber');
    
    // this.addControlEventHandler("sourceAccountDataReceived", this.onSourceAccountDataReceived);
    // this.addControlEventHandler("beneficiaryIdDataReceived", this.onBeneficiaryIdDataReceived);
    if (paymentId && mode && serviceCode == 'RETAILSCHCC') {
      this.setServiceCode("RETAILSCHCC");
      this.setDataService(this.siccService);
      this.addResetHandler('reset',this._onReset);
    }
    else {
      this.setServiceCode("RETAILTRANCC");
    }

    
  }

  private _onReset = () => {
    if (this.state.modeVar == 'M' || this.state.modeVar == "R" || this.state.modeVar=='D'){
      this.handleFormOnLoad();
      }
      else{
        this.reset('sourceAccount');
        this.reset('paymentAmount',{amount:0});
        if(this.getRoutingParam('inventoryNumber')){
          this.setValue('beneficiaryId', this.getRoutingParam('inventoryNumber'));
          this.setReadonly('beneficiaryId', true);
        }
        else{
          this.reset('beneficiaryId')
        }
        this.reset('scheduleType');
        this.reset('paymentDate');
        this.reset('termsFlag');
        this.reset('remarks');
        this.reset('transferType');
        this.reset('purpose');
        this.setHidden('scheduleHandler',true);
        this.setHidden('paymentSummary',true);
        this.setValue('chargesAmount',{amount:5.00})
      }
  }

  public handleFormOnLoad() {
    let mode: any = this.getRoutingParam('mode');

    if(mode == 'V'){
      this.removeShellBtn('BACK');
    }

    /*for Manage Schedule transfer Modify and Delete mode*/
     if (mode) {
      this.addResetHandler('reset',this._onReset);
      let debitAmountVar = this.getValue('debitAmount');
      let debitCurrencyVar = this.getValue('debitCurrency');
      let creditAmountVar = this.getValue('creditAmount');
      let creditCurrencyVar = this.getValue('creditCurrency');
      let paymentId: any = this.getRoutingParam('paymentId');
      let serviceCode: any = this.getRoutingParam('serviceCode');
      let routingParam: any = this.getRoutingParam();
      let paymentFrequencyVar = this.getValue('paymentFrequency');
      let paymentDaysIntervalVar = this.getValue('paymentDaysInterval');
      this.setValue('chargesAmount', { amount: 5 });

      /*for Manage Schedule transfer Modify and Delete mode*/
      if (paymentId && mode == 'M' || mode == 'D') {

        this.siccService.findByKey(routingParam)().subscribe((res) => {
          console.log("Response", res);
          if (res) {
            if (mode == 'M') {
              this.patchValue(res);
              this.setReadonly('sourceAccount',true);
              this.setValue('termsFlag', "N");
              this.setDisabled('paymentId', true);
              this.setValue('scheduleId', res.paymentId);
              this.setValue('remarks', this.getValue('remarks'))
              this.setHidden('paymentSummary', false);
              this.setVariable('fromCurrencyVariable', res.debitCurrency);
              this.state.fromCurrencyVariable = res.debitCurrency;
              this.setVariable('toCurrencyVariable', res.creditCurrency);
              this.state.toCurrencyVariable = res.creditCurrency;
              this.setValue('paymentAmount', { amount: res?.paymentAmount, currencyCode: res?.paymentCurrency });
              this.setReadonly('paymentAmount',true);
              this.setReadonly('beneficiaryId', true);
              this.setReadonly('scheduleType', true);
              this.setReadonly('chargesBorneBy', true);
              this.setReadonly('beneficiaryAdvice', true);
              this.setReadonly('paymentDate', true);
              this.setReadonly('purpose', true);
              this.setValue('rateApplied', res?.rateApplied);
              this.setValue('rateApplied', res?.baseRateApplied);
              this.setAmountCurrencyList('chargesAmount', [{ id: this._appConfig.baseCurrency, text: this._appConfig.baseCurrency }]);
              this.setReadonly('chargesAmount', true);
              if(res?.debitCurrency!=res?.creditCurrency){
                this.setHidden('paymentSummary',false);
                this.state.paymentSummary.debitAmount = res?.debitAmount+ " "+ res?.debitCurrency;
                this.state.paymentSummary.creditAmount =res?.creditAmount+ " " +res?.creditCurrency;
                this.state.paymentSummary.exchangeRate = '1' + " " + res?.debitCurrency + " = " +  " " + this.getValue('rateApplied') + " "+res?.creditCurrency;
                }
              else{
                this.setHidden('paymentSummary',true);
              }
              if (this.getValue('scheduleType') == "2") {
                this.setHidden('scheduleHandler', true);
                this.setReadonly('paymentDate', false);
              }
              else {
                this.setReadonly('paymentDate', true);
                if (res?.paymentFrequency == '8') {
                  this.setHidden('scheduleHandler.paymentDaysInterval', false);
                  this.setValue('scheduleHandler.paymentDaysInterval', res.paymentDaysInterval);
                  this.setReadonly('scheduleHandler.paymentDaysInterval', true);
                }
                this.setHidden('scheduleHandler', false);
                this.setValue('scheduleHandler.paymentFrequency', res?.paymentFrequency);
                this.setValue('scheduleHandler.numberOfPayments', res?.numberOfPayments);
                this.state.numberOfPaymentVar = this.getValue('numberOfPayments');
                this.state.paidInstallments=res?.paidInstallments

                this.setHidden('scheduleHandler.endDate', false);
                this.setValue('scheduleHandler.endDate', res?.endDate);
                this.setReadonly('scheduleHandler.paymentFrequency', true);
                this.setReadonly('scheduleHandler.endDate', true);
                // this.reset('remarks',true);
                if(!res.numberOfPayments){
                  this.setHidden("scheduleHandler.endDate",true);
                }
              }
           
            }
            if (mode == 'D') {
              this.patchValue(res);
              this.setDisabled('paymentId', true);
              this.setValue('termsFlag','N');
              this.setValue('scheduleId', res.paymentId);
              this.setVariable('fromCurrencyVariable', res.debitCurrency);
              this.state.fromCurrencyVariable = res.debitCurrency;
              this.setVariable('toCurrencyVariable', res.creditCurrency);
              this.state.toCurrencyVariable = res.creditCurrency;
              this.setValue('paymentAmount', { amount: res?.paymentAmount, currencyCode: res?.paymentCurrency });
              this.setValue('scheduleHandler.paymentFrequency', res?.paymentFrequency);
              this.setValue('scheduleHandler.numberOfPayments', res?.numberOfPayments);
              this.setReadonly('sourceAccount', true);
              this.setReadonly('beneficiaryId', true);
              this.setReadonly('paymentAmount', true);
              this.setReadonly('scheduleType', true);
              this.setReadonly('scheduleHandler.paymentFrequency', true);
              this.setReadonly('scheduleHandler.numberOfPayments', true);
              this.setReadonly('scheduleHandler.endDate', true);
              this.setReadonly('paymentDate', true);
              this.setReadonly('scheduleHandler.endDate', true);
              this.setReadonly('chargesBorneBy', true);
              this.setReadonly('purpose', true);
              this.setValue('chargesAmount', { amount: 5 });
              this.setAmountCurrencyList('chargesAmount', [{ id: this._appConfig.baseCurrency, text: this._appConfig.baseCurrency }]);
              this.setReadonly('chargesAmount', true);
              if(res?.debitCurrency!=res?.creditCurrency){
                this.setHidden('paymentSummary',false);
                this.state.paymentSummary.debitAmount = res?.debitAmount+ " "+ res?.debitCurrency;
                this.state.paymentSummary.creditAmount =res?.creditAmount+ " " +res?.creditCurrency;
                this.state.paymentSummary.exchangeRate = '1' + " " + res?.debitCurrency + " = " +  " " + this.getValue('rateApplied') + " "+res?.creditCurrency;
                }
              else{
                this.setHidden('paymentSummary',true);
              }
              
              if (res?.paymentFrequency == '8') {
                this.setHidden('scheduleHandler.paymentDaysInterval', false);
                this.setValue('scheduleHandler.paymentDaysInterval', res?.paymentDaysInterval);
                this.setReadonly('scheduleHandler.paymentDaysInterval', true);
              }

            }

          }
        });
      }
      else if (this.getRoutingParam('mode') == 'R') {
        this.retailCCTransferFormService.findByKey(routingParam)().subscribe((res) => {
          if (res) {
            this.patchValue(res);
            let Date: any = this.momentService.getInstance();
            let currentDate: any = Date.format("YYYY-MM-DD");
            this.setValue('paymentDate', currentDate);
            this.setReadonly('paymentDate', true);
            this.setReadonly('beneficiaryId', true);
            this.setHidden('paymentSummary', false);
            this.setDisabled('paymentId', true);
            this.setVariable('fromCurrencyVariable', res.debitCurrency);
            this.state.fromCurrencyVariable = res.debitCurrency;
            this.setVariable('toCurrencyVariable', res.creditCurrency);
            this.state.toCurrencyVariable = res.creditCurrency;
            this.setVariable('accountBalanceVariable', this.state.accountBalanceVar);
            this.setValue('paymentAmount', { amount: res?.paymentAmount, currencyCode: res?.paymentCurrency });
            this.setValue('scheduleHandler.paymentFrequency', res?.paymentFrequency);
            this.setValue('scheduleHandler.numberOfPayments', res?.numberOfPayments);
            this.setValue('rateApplied', res?.rateApplied);
            this.setValue('baseRateApplied', res?.baseRateApplied);
            this.setValue('chargesAmount', { amount: 5 });
            this.setAmountCurrencyList('paymentAmount',[{
              id:res?.paymentCurrency,
              text:res?.paymentCurrency
           }])
            // this.setAmountCurrencyList('chargesAmount', [{ id: this._appConfig.baseCurrency, text: this._appConfig.baseCurrency }]);
            this.setReadonly('chargesAmount', true);
            if(res?.debitCurrency!=res?.creditCurrency){
              this.setHidden('paymentSummary',false);
              this.state.paymentSummary.debitAmount = res?.debitAmount+ " "+ res?.debitCurrency;
              this.state.paymentSummary.creditAmount =res?.creditAmount+ " " +res?.creditCurrency;
              this.state.paymentSummary.exchangeRate = '1' + " " + res?.debitCurrency + " = " +  " " + this.getValue('rateApplied') + " "+res?.creditCurrency;
              }
            else{
              this.setHidden('paymentSummary',true);
            }
            this.setReadonly('sourceAccount',true);
            this.setReadonly('beneficiaryId',true);
            this.setReadonly('scheduleType',true);
          }
        });
      }
      else if (this.getRoutingParam('mode') == 'V') {
        // this.setDisabled('paymentId', true);

        this.setHidden('transferSummary', false);
        this.state.transferSummary.paymentId=this.getValue('paymentId');
        this.setValue('paymentAmount', { amount: this.getValue('paymentAmount'), currencyCode: this.getValue('paymentCurrency') });
        if(debitCurrencyVar!=creditCurrencyVar){
          this.setHidden('paymentSummary',false);
          this.state.paymentSummary.debitAmount = debitAmountVar+ " "+ debitCurrencyVar;
          this.state.paymentSummary.creditAmount =creditAmountVar+ " " +creditCurrencyVar;
          this.state.paymentSummary.exchangeRate = '1' + " " + debitCurrencyVar + " = " +  " " + this.getValue('rateApplied') + " "+creditCurrencyVar;
        }
        else{
          this.setHidden('paymentSummary',true);
        }
        this.setValue('chargesAmount', { amount: 5 });
        this.setAmountCurrencyList('chargesAmount', [{ id: this._appConfig.baseCurrency, text: this._appConfig.baseCurrency }]);

        if (this.getValue('scheduleType') == "2" || this.getValue('scheduleType') == "1") {
          this.setHidden('scheduleHandler', true);
        }
        else {
          let statusVar=this.getValue('paymentStatus')=='A'?'Active':'Active';
          this.state.transferSummary.paymentStatus=statusVar;
          if (paymentFrequencyVar == '8') {
            this.setHidden('scheduleHandler.paymentDaysInterval', false);
            this.setValue('scheduleHandler.paymentDaysInterval', paymentDaysIntervalVar);}

          this.setHidden('scheduleHandler', false);
          this.setHidden('scheduleHandler.numberOfPaymentsNote', true);
          this.setValue('scheduleHandler.paymentFrequency',paymentFrequencyVar);
          this.setValue('scheduleHandler.numberOfPayments', this.getValue('numberOfPayments'));
          this.setHidden('scheduleHandler.endDate', false);
          this.setValue('scheduleHandler.endDate', this.getValue('endDate'));
          this.setReadonly('scheduleHandler.paymentFrequency', true);
          this.setReadonly('scheduleHandler.numberOfPayments', true);
          this.setReadonly('scheduleHandler.endDate', true);
        }
        if(this.getValue('scheduleType') == "2" || this.getValue('scheduleType') == "3"){
          let statusVar = this.getRoutingParam('status');
          this.state.transferSummary.paymentStatus='Active';
        }
        else{
          let statusVar = this.getRoutingParam('status');
       this.state.transferSummary.paymentStatus=statusVar;	
        }
        this.setHidden('disclaimer-box',true); 
      }
    }
    else {
      if (this.getRoutingParam('inventoryNumber')) {
        this.setValue('beneficiaryId', this.getRoutingParam('inventoryNumber'));
        this.setReadonly('beneficiaryId',true);
      }
      this.setValue('scheduleType', "1");
      // this.setValue('transferType', "1");
      this.setHidden('paymentSummary', true);
      this.setValue('chargesAmount', { amount: 5.00 });
      this.setAmountCurrencyList('chargesAmount', [{ id: this._appConfig.baseCurrency, text: this._appConfig.baseCurrency }]);
      this.setReadonly('chargesAmount', true);
      this.formGroup.controls['paymentAmount'].setErrors({sourceAccNullError:false},{emitEvent:false});
      this.formGroup.controls['paymentAmount'].setErrors({beneNullError:false},{emitEvent:false});
      this.formGroup.controls['paymentAmount'].setErrors({required:false},{emitEvent:false});
      // this.setValue('chargesBorneBy', "1");
      this.setDisabled('creditAmount', true);
      this.setDisabled('creditCurrency', true);
      this.setDisabled('debitAmount', true);
      this.setDisabled('debitCurrency', true);
      this.setDisabled('paymentId', true);
      this.setDisabled('scheduleId', true);
      this.setDisabled('paidInstallments', true);

      // this.setValue('beneficiaryAdvice','N');
    }
  }

  public handleFormOnPresubmit(payload: any) {
    // WRITE CODE HERE TO HANDLE
    if(payload.paymentDaysInterval ==""|| payload.paymentDaysInterval == undefined || payload.paymentDaysInterval ==null)
      {
        delete payload.paymentDaysInterval;
      }
    if (this.formMode == 'ADD' && this.getRoutingParam('mode') == 'M') {
      payload.operationMode = "M";
      // payload.paymentId=this.getRoutingParam('paymentId');
      payload.paymentAmount = this.getValue('paymentAmount').amount;
      payload.paymentCurrency = this.getValue('paymentAmount').currencyCode;
      payload.chargesAmount = this.getValue('chargesAmount').amount;
      if(payload.paymentDaysInterval ==""|| payload.paymentDaysInterval == undefined || payload.paymentDaysInterval ==null)
        {
          delete payload.paymentDaysInterval;
        }else{
      payload.paymentDaysInterval = Number(this.getValue('paymentDaysInterval'));
        }

    }
    else if (this.formMode == 'ADD' && this.getRoutingParam('mode') == 'D') {
      this.setDataService(this.siccreqService);
      payload.operationMode = "D";
      payload.paymentAmount = this.getValue('paymentAmount').amount;
      payload.paymentCurrency = this.getValue('paymentAmount').currencyCode;
      payload.chargesAmount = this.getValue('chargesAmount').amount;
    }
    else {
      payload.paymentAmount = this.getValue('paymentAmount').amount;
      payload.paymentCurrency = this.getValue('paymentAmount').currencyCode;
      payload.chargesAmount = this.getValue('chargesAmount').amount;
      if (payload.scheduleType == "2" || payload.scheduleType == "3" || this.serviceCode.value == 'RETAILSCHCC') {

        payload.operationMode = "A";
      }
      if ((this._appConfig.getData('cutOffTypeErr'))  && payload.scheduleType == "1") {

        payload.operationMode = "A";
        payload.scheduleType = "2";
      }

    }
  }
  public handlePaymentAmountOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
  //   if (this.formGroup.controls["beneficiaryId"].value ==null || this.formGroup.controls["beneficiaryId"].value=="" || this.formGroup.controls["beneficiaryId"].value==undefined)  {
  //     this.setErrors("paymentAmount",'beneNullError');
  //     this.setHidden("paymentSummary", true);
  //  }
  //  if (this.formGroup.controls["sourceAccount"].value ==null || this.formGroup.controls["sourceAccount"].value=="" || this.formGroup.controls["sourceAccount"].value==undefined)  {
  //    this.setErrors("paymentAmount",'sourceAccNullError');
  //    this.setHidden("paymentSummary", true);
  // }


  }
  public handleScheduleTypeOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    let date: any = this.momentService.getInstance();
    let currentDate: any = date.format("YYYY-MM-DD");
    let futureDate: any = date.add(1, "day").format("YYYY-MM-DD");
    let futureMaxDate: any = date.add(1, "Year").format("YYYY-MM-DD");
    if (value == '1') {
      // this.setHidden('paymentFrequency',true);
      // this.setHidden('numberOfPayments',true);
      // this.state.paymentDate.minDate = currentDate; 
      this.setLabel("paymentDate", "RetailCCTransferForm.paymentDate.label");
        if ((this.state.modeVar == null || this.state.modeVar == "" || this.state.modeVar == undefined)) {
        this.reset('paymentAmount', {
          amount: 0
        });
		this.setHidden('paymentSummary', true);
      }
      this.setVariable('scheduleTypeVariable', value);
  
      this.setValue('paymentDate', currentDate);
      this.setReadonly('paymentDate', true);
      // this.reset('scheduleHandler',true);
      // this.reset('scheduleHandler.paymentFrequency',true);
      // this.reset('scheduleHandler.numberOfPayments',true);
      this.setHidden('scheduleHandler', true);
      this.setDisabled("paymentFrequency", true);
      this.setDisabled("numberOfPayments", true);
      this.setDisabled("endDate", true);
      this.setDataService(this.retailCCTransferFormService);
      this.setServiceCode("RETAILTRANCC");
      this._depHttpConfig.setCommonHeaderParams(this._depHttpConfig.serviceContextKey, "RETAILTRANCC");

      // this.setLabel("paymentDate", "Payment Date");
      this.setDisabled("paymentDaysInterval", true);
      if ((this._appConfig.getData('cutOffTypeErr'))) {
        this.setHidden('paymentDate', true);
        this.setDisabled('paymentDate', false);
        this.setValue('paymentDate', futureDate);
        this.setDataService(this.siccreqService);

      }
      // else if(this.state.holiday == 0){
      // this.setHidden()
      // }
      // this.cutOffTimeCheck();
      if((this._appConfig.getData('cutOffTypeErr'))){
      this.cutOffValidation();
    }

    }
    if (value == "2") {
      this.setLabel("paymentDate", "RetailCCTransferForm.executionDate.label");
      this._depHttpConfig.setCommonHeaderParams(this._depHttpConfig.serviceContextKey, "RETAILSCHCC");
        if ((this.state.modeVar == null || this.state.modeVar == "" || this.state.modeVar == undefined)) {
        this.reset('paymentAmount', {
          amount: 0
        });
		this.setHidden('paymentSummary', true);
      }
      this.setVariable('scheduleTypeVariable', value);
  
      this.reset('paymentDate', "");
      this.state.paymentDate.minDate = futureDate;
      this.setValue('paymentDate', futureDate);
      this.state.paymentDate.maxDate = futureMaxDate;
      this.setHidden('scheduleHandler', true);
      // this.reset('scheduleHandler',true);
      // this.reset('scheduleHandler.paymentFrequency',true);
      // this.reset('scheduleHandler.numberOfPayments',true);
      this.setDisabled("endDate", true);
      this.setDisabled("numberOfPayments", true);
      this.setDisabled("paymentFrequency", true);
      this.setReadonly('paymentDate', false);
      this.setServiceCode("RETAILSCHCC");
      // this.setLabel("paymentDate", "Payment Date");
      this.setDataService(this.siccreqService);
      this.setDisabled("paymentDaysInterval", true);
      this.setHidden('paymentDate', false);
      this.setDisabled('paymentDate', false);
      this.setValue('iscutOffExceed', 1);

    }
    if (value == "3") {
      this.setLabel("paymentDate", "RetailCCTransferForm.startDate.label");
        if ((this.state.modeVar == null || this.state.modeVar == "" || this.state.modeVar == undefined)) {
        this.reset('paymentAmount', {
          amount: 0
        });
		this.setHidden('paymentSummary', true);
      }
      this._depHttpConfig.setCommonHeaderParams(this._depHttpConfig.serviceContextKey, "RETAILSCHCC");
      this.setVariable('scheduleTypeVariable', value);
  
      // this.setLabel("paymentDate", "Start Date");
      this.state.paymentDate.minDate = futureDate;
      this.state.paymentDate.maxDate = futureMaxDate;
      this.setHidden('scheduleHandler', false);
      this.setValue('paymentDate', futureDate);
      this.setReadonly('paymentDate', false);
      this.setServiceCode("RETAILSCHCC");
      this.setDataService(this.siccreqService);
      this.setHidden('paymentDate', false);
      this.setDisabled('paymentDate', false);
      this.setValue('iscutOffExceed', 1);

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
    if(value && (this.getValue('scheduleType')==2 || this.getValue('scheduleType')==3)){
      this.cutOffTimeCheckSchTran();
    }
  }
  cutOffTimeCheckSchTran(){
    this._validatorService.validateSchTranChecklist({
      "serviceCode": "RETAILTRANCC",
      "paymentDate": this.getValue('paymentDate')
  }).subscribe({
      next: (res) => {
          
      },
      error: (reason) => {
        this.state.errorCode = reason.error.ErrorCode;
        this.state.nextPaymentDate = reason.error.nextPaymentDate;
          this._appConfig.setData("iserror", reason.error.ErrorCode);
          this._appConfig.setData("nextPaymentDate", reason.error.nextPaymentDate);
          let cutOffTimeErrVar=this._appConfig.getData('iserror');
          let nextPaymentDate = this._appConfig.getData('nextPaymentDate');
          if ((cutOffTimeErrVar == 'DEPERR900017')) {
            this.state.cutOffTimeVar=1;
            this._appConfig.setData('cutOffTypeErr', cutOffTimeErrVar);
            const fpxModal = new FpxModal();
            fpxModal.setComponent(DepConfirmationComponent);
            fpxModal.setDisableClose(false);
            fpxModal.setPanelClass('dep-alert-popup');
            fpxModal.setBackDropClass('dep-popup-back-drop');
            fpxModal.setData({
              title: "RetailSchedulePaymentTemplateComponent.delAlertTtl",
              message: "The Other Bank Credit Card system is unavailable due to a holiday.The transaction will be processed on the next business day ("+nextPaymentDate+").Are you sure you want to proceed?",
              okBtnLbl: "bene-advice-control.Y",
              cancelBtnLbl: "bene-advice-control.N"
            });
            fpxModal.setAfterClosed(this.validateCheckcontextmenuModelAfterCloseSch);
            this.openModal(fpxModal);
          }
          else{
            this.state.cutOffTimeVar=0;
          }
      }
  });
    }
  public handleBeneficiaryAdviceOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    // WRITE CODE HERE TO HANDLE 
    //tool generated code based on Orchestration Instructions
    if (value == "Y") {
      this.setHidden('beneficiaryEmail', false);
    }
    else {
      this.setHidden('beneficiaryEmail', true);
    }
  }

  public onExchangeRateDataReceived: BaseFpxControlEventHandler = (payload: any) => {

    if (payload.zeroValue) {
      this.setHidden('paymentSummary', true);
    }
    else if (this.state.fromCurrencyVariable == this.state.toCurrencyVariable) {
      this.setHidden('paymentSummary', true);
      this.setValue('rateApplied', payload.exchangeRate);
      this.setValue('baseRateApplied', payload.baseRate);
      this.setVariable('debitAmountVariable', payload.debitAmount);
    } else if(payload.creditAmount==null||payload.creditAmount==""||payload.creditAmount==undefined){
      this.setHidden("paymentSummary", true);
    } else if(payload.debitAmount==null||payload.debitAmount==""||payload.debitAmount==undefined){
      this.setHidden("paymentSummary", true);
    }
    else {
      this.setHidden('paymentSummary', false);
      this.setValue('rateApplied', payload.exchangeRate);
      this.setValue('baseRateApplied', payload.baseRate);
      this.state.paymentSummary.exchangeRate  = '1' + " " + this.state.fromCurrencyVariable + " = " +  " " + payload.exchangeRate + " "+this.state.toCurrencyVariable;
      this.state.paymentSummary.debitAmount = payload.debitAmount +" "+this.state.fromCurrencyVariable ;
      this.state.paymentSummary.creditAmount = payload.creditAmount +" "+ this.state.toCurrencyVariable;
      this.setVariable('debitAmountVariable', payload.debitAmount);
      


    }
  }

  public onSourceAccountDataReceived: BaseFpxControlEventHandler = (payload: any) => {
    // WRITE CODE HERE TO HANDLE 
    if (payload) {
      this.state.debitAccountData = payload;

        this.setVariable('fromCurrencyVariable', payload.accountCurrency);
        this.state.fromCurrencyVariable = payload.accountCurrency;

      // this.setVariable('fromCurrencyVariable', payload.accountCurrency);
      // this.state.fromCurrencyVariable = payload.accountCurrency;
      this.setVariable('accountBalanceVariable', payload.availableBalance);
      this.state.accountBalanceVar = payload.availableBalance;
      console.log(payload.accountCurrency)
      if ((this.state.modeVar == null || this.state.modeVar == "" || this.state.modeVar == undefined)) {
        if(!this.state.beneData){
          this.setAmountCurrencyList('paymentAmount',[{
            id:payload.accountCurrency,
            text:payload.accountCurrency
         }]);
        }
        //if available patch both currency
        else{
          let data=[];
          if(payload.accountCurrency == this.state.beneData.beneCurrency){
            this.setAmountCurrencyList('paymentAmount',[{
              id:payload.accountCurrency,
              text:payload.accountCurrency
           }]);
          }
          else{
          data.push({
            id:payload.accountCurrency,
            text:payload.accountCurrency
          });
          data.push({
            id:this.state.beneData.beneCurrency,
            text:this.state.beneData.beneCurrency
          });
          this.setAmountCurrencyList('paymentAmount',data);
        }
        }
        this.setValue('paymentAmount', {amount: 0,currencyCode: payload.accountCurrency});

        this.setHidden('paymentSummary', true);
        this.setVariable('fromCurrencyVariable', payload.accountCurrency);
        this.cutOffTimeCheck();

      }
      //this.updatePaymentCurrencyList();

    }
  }


  public onBeneficiaryIdDataReceived: BaseFpxControlEventHandler = (payload: any) => {
    // WRITE CODE HERE TO HANDLE 
    if (payload) {
      this.state.beneData = payload;
      this.setVariable('toCurrencyVariable', payload.beneCurrency);
      this.setVariable('beneficiaryIdVariable', payload.inventoryNumber);
      this.setVariable('toAccountVariable', payload.beneAccount);
      this.setValue('creditAccountNumber',payload.beneAccount)
      this.state.toCurrencyVariable = payload.beneCurrency;
      if ((this.state.modeVar == null || this.state.modeVar == "" || this.state.modeVar == undefined)) {
        let data=[];
        if(this.state.debitAccountData.accountCurrency == payload.beneCurrency ){
          this.setAmountCurrencyList('paymentAmount',[{
            id:this.state.debitAccountData.accountCurrency,
            text:this.state.debitAccountData.accountCurrency
            }]);          
        }
      else{
         data.push({
          id:this.state.debitAccountData.accountCurrency,
          text:this.state.debitAccountData.accountCurrency
          });
          data.push({
          id:payload.beneCurrency,
          text:payload.beneCurrency
           });
      this.setAmountCurrencyList('paymentAmount',data);

      }
      this.setHidden('paymentSummary', true);
      }

      //this.updatePaymentCurrencyList();
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

  public handleScheduleHandlerOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    // WRITE CODE HERE TO HANDLE 
    //tool generated code based on Orchestration Instructions
    if (this.state.modeVar == 'M') {
      this.setValue('numberOfPayments',value.numberOfPayments)
      this.setValue('endDate',value.endDate)
      if (this.getValue('scheduleType') == "3") {
        this.setDisabled("paymentFrequency", false);
        this.setValue("paymentFrequency", value.paymentFrequency);
        if (this.state.paidInstallments) {
          if (value.numberOfPayments == this.state.numberOfPaymentVar) {
            this.reset('numberOfPayments', true);
            // if (this.state.onLoadVar==2) {
            //   this.setErrors('scheduleHandler.numberOfPayments', 'installment_error', { numberOfPayment: this.state.numberOfPaymentVar });
            // }
          }
          else if (value.endDate && value.numberOfPayments <= this.state.paidInstallments) {
            this.setHidden('endDate', true);
            this.setDisabled("endDate", true);
            // this.setDisabled("numberOfPayments", true);
            this.reset('numberOfPayments', true);
            this.setErrors('scheduleHandler.numberOfPayments', 'installment_error', { numberOfPayment: this.state.paidInstallments });
            this.setValue("paymentDaysInterval", value.paymentDaysInterval);
            // this.state.onLoadVar=2
          }

          else {
            this.setDisabled("endDate", false);
            this.setDisabled("numberOfPayments", false);
            this.setValue("numberOfPayments", value.numberOfPayments);
            this.setValue("endDate", value.endDate);
            this.setDisabled("paymentDaysInterval", false);
            this.setValue("paymentDaysInterval", value.paymentDaysInterval);
          }
          this.setDisabled('scheduleHandler', true);
        }
      }
    }
    else {
      if (this.getValue('scheduleType') == "3") {
        this.setDisabled("paymentFrequency", false);
        this.setValue("paymentFrequency", value.paymentFrequency);
        if (value.endDate && (value.numberOfPayments == null || value.numberOfPayments == undefined || value.numberOfPayments == "")) {
          this.setDisabled("endDate", false);
        this.setDisabled("numberOfPayments", true);
          // this.setValue("numberOfPayments", 0);
          this.setValue("endDate", value.endDate);
          this.setDisabled("paymentDaysInterval", false);
          this.setValue("paymentDaysInterval", value.paymentDaysInterval);
        }

        else if (value.endDate) {
          this.setDisabled("endDate", false);
          this.setDisabled("numberOfPayments", false);
          this.setValue("numberOfPayments", value.numberOfPayments);
          this.setValue("endDate", value.endDate);
          this.setDisabled("paymentDaysInterval", false);
          this.setValue("paymentDaysInterval", value.paymentDaysInterval);
        }
        else {
          this.setDisabled("endDate", true);
          this.setDisabled("numberOfPayments", true);
        }
        this.setDisabled('scheduleHandler', true);
      }
      this.setValue('termsFlag',null)

    }

  }
  public handleBeneficiaryIdOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    // WRITE CODE HERE TO HANDLE 
    //tool generated code based on Orchestration Instructions
    // this.setHidden("purpose", false);
    this.setVariable('beneficiaryIdVariable', value);
  }
  public handleTransferTypeOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    // WRITE CODE HERE TO HANDLE 
    //tool generated code based on Orchestration Instructions
    this.setHidden("purpose", false);


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
  addNewBene() {
    let beneServicode='RETAILBENECC'
    let _serviceDetail:any
    _serviceDetail = this._serviceCodeDetails.getServiceDetails(beneServicode);
    this._router.navigate(_serviceDetail.servicePath);
  }			


  public override doPostInit(): void {
    this.addValueChangeHandler("paymentAmount", this.handlePaymentAmountOnvalueChange);
    this.addValueChangeHandler("scheduleType", this.handleScheduleTypeOnvalueChange);
    this.addControlEventHandler("exchangeRateReceived", this.onExchangeRateDataReceived);
    this.addValueChangeHandler("paymentDate", this.handlePaymentDateOnvalueChange);
    this.addValueChangeHandler("scheduleHandler", this.handleScheduleHandlerOnvalueChange);
    this.addValueChangeHandler("remarks", this.handleRemarksOnvalueChange);
    this.addValueChangeHandler("beneficiaryAdvice", this.handleBeneficiaryAdviceOnvalueChange);
    this.addControlEventHandler("sourceAccountDataReceived", this.onSourceAccountDataReceived);
    this.addControlEventHandler("beneficiaryIdDataReceived", this.onBeneficiaryIdDataReceived);
    this.addValueChangeHandler("termsFlag", this.handleTermsFlagOnvalueChange);
    this.handleFormOnLoad();
  }


  public override preSubmitInterceptor(payload: Cctransfer): any {
    // WRITE CODE HERE TO HANDLE 
    this.handleFormOnPresubmit(payload);
    return payload;
  }


  public override postDataFetchInterceptor(payload: Cctransfer) {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }


  public override postSubmitInterceptor(response: any): RoutingInfo {
    console.log(response);
    let routingInfo: RoutingInfo = new RoutingInfo();
    this.handleFormOnPostsubmit(response, routingInfo);
    return routingInfo;
  }


  public handleFormOnPostsubmit(response: any, routingInfo: any) {
    // WRITE CODE HERE TO HANDLE

    if (response.success) {
      let res = response.success?.body?.cctransfer || response.success?.body?.scheduleccreq;
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

  cutOffTimeCheck(){
    let cutOffTimeErrVar=this._appConfig.getData('iserror');
    let nextPaymentDate = this._appConfig.getData('nextPaymentDate');
    if ((cutOffTimeErrVar == 'DEPERR90002')) {
      this.state.cutOffTimeVar=1;
      this._appConfig.setData('cutOffTypeErr', cutOffTimeErrVar);
      const fpxModal = new FpxModal();
      fpxModal.setComponent(DepConfirmationComponent);
      fpxModal.setDisableClose(false);
      fpxModal.setPanelClass('dep-alert-popup');
      fpxModal.setBackDropClass('dep-popup-back-drop');
      fpxModal.setData({
        title: "RetailSchedulePaymentTemplateComponent.delAlertTtl",
        message: "Today,Other Bank Credit Card payment system is holiday.It will be processed on the next business day ("+nextPaymentDate+").Are you sure you want to proceed?",
        okBtnLbl: "bene-advice-control.Y",
        cancelBtnLbl: "bene-advice-control.N"
      });
      fpxModal.setAfterClosed(this.validateCheckcontextmenuModelAfterClose);
      this.openModal(fpxModal);
    }
    else if ((cutOffTimeErrVar == 'DEPERR90001')||(cutOffTimeErrVar == 'DEPERR900016') || (cutOffTimeErrVar == 'DEPERR90002') && this.state.holiday == 0) {
      this.state.cutOffTimeVar=1;
      this._appConfig.setData('cutOffTypeErr', cutOffTimeErrVar);
      const fpxModal = new FpxModal();
      fpxModal.setComponent(DepConfirmationComponent);
      fpxModal.setDisableClose(false);
      fpxModal.setPanelClass('dep-alert-popup');
      fpxModal.setBackDropClass('dep-popup-back-drop');
      fpxModal.setData({
        title: "RetailSchedulePaymentTemplateComponent.delAlertTtl",
        message: "RetailInternationalTransferForm.cutOffTime.text",
        okBtnLbl: "bene-advice-control.Y",
        cancelBtnLbl: "bene-advice-control.N"
      });
      fpxModal.setAfterClosed(this.validateCheckcontextmenuModelAfterClose);
      this.openModal(fpxModal);
    }
    else{
      this.state.cutOffTimeVar=0;
    }}
    validateCheckcontextmenuModelAfterCloseSch: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
      let Date: any = this.momentService.getInstance();
      let currentDate: any = Date.format("YYYY-MM-DD");
      let futureDate: any = Date.add(1, "day").format("YYYY-MM-DD");
      console.log("model closed...", payload);
      if (payload == 1) {
       this.cutOffValidation();
      }
      else {
        if (this.deviceService.isMobile()) {
          this._router.navigate(['transfers-space']);
        }
        else {
          this._router.navigate(['transfers-space', 'transfers']);
  
        }
      }
    }

    validateCheckcontextmenuModelAfterClose: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
      let Date: any = this.momentService.getInstance();
      let currentDate: any = Date.format("YYYY-MM-DD");
      let futureDate: any = Date.add(1, "day").format("YYYY-MM-DD");
      console.log("model closed...", payload);
      if (payload == 1) {
       this.cutOffValidation();
      }
      else {
        if (this.deviceService.isMobile()) {
          this._router.navigate(['transfers-space']);
        }
        else {
          this._router.navigate(['transfers-space', 'transfers']);
  
        }
      }
    }

    public handleRemarksOnvalueChange: BaseFpxChangeHandler = (
      name: string,
      status: FormControlStatus,
      value: any,
      formGroup: FormGroup
    ) => {
      // WRITE CODE HERE TO HANDLE 
      //tool generated code based on Orchestration Instructions
      if (value.includes('')) {
        this.setValue('remarks', value.trim());
      }
  
    }
    cutOffValidation(){
      let Date: any = this.momentService.getInstance();
      let currentDate: any = Date.format("YYYY-MM-DD");
      let futureDate: any = Date.add(1, "day").format("YYYY-MM-DD");
      let paymentdate:any = this._appConfig.getData('nextPaymentDate')
      let nextPaymentDate :any = moment(this._appConfig.getData('nextPaymentDate')).format("YYYY-MM-DD");
      if (this._appConfig.getData('cutOffTypeErr') == 'DEPERR900016') {
      this.setServiceCode('RETAILSCHCC');
      this.setHidden('paymentDate', true);
      this.setDisabled('paymentDate', false);
      this.setValue('paymentDate', futureDate);
      this.setValue('nextPaymentDate', futureDate);
      this.setDataService(this.siccreqService);
      this.setValue('iscutOffExceed', 1);
      this.setDisabled('operationMode',false);
      this.setValue('operationMode','A');
  
    }else if (this._appConfig.getData('cutOffTypeErr') == 'DEPERR90002'){
      this.setServiceCode('RETAILSCHCC');
      this.setHidden('paymentDate', true);
      this.setDisabled('paymentDate', false);
      this.setValue('paymentDate', nextPaymentDate);
      this.setValue('nextPaymentDate', nextPaymentDate);
      this.setDataService(this.siccreqService);
      this.setValue('iscutOffExceed', 1);
    }else if(this.state.errorCode == 'DEPERR900017'){
      this.setServiceCode('RETAILSCHCC');
      this.setHidden('paymentDate', false);
      this.setReadonly('paymentDate', false);
      this.setDisabled('paymentDate', false);
      this.setValue('paymentDate', nextPaymentDate);
      this.setValue('nextPaymentDate', nextPaymentDate);
      this.setDataService(this.siccreqService);
      this.setValue('iscutOffExceed', 1);
      this.setDisabled('operationMode',false);
      this.setValue('operationMode','A');
  
    }
    else {
      this.setServiceCode('RETAILSCHCC');
      this.setHidden('paymentDate', false);
      this.setDisabled('paymentDate', false);
      this.setValue('paymentDate', currentDate);
      this.setValue('nextPaymentDate', currentDate);
      this.setDataService(this.siccreqService);
      this.setValue('iscutOffExceed', 1);
    }}
  //$END_CUSTOMSCRIPT\n
}


