import { inject, Injectable } from "@angular/core";
import { FormArray, FormControlStatus, FormGroup } from "@angular/forms";
import {
  BaseFpxComponentState,
  BaseFpxFormHelper,
  RoutingInfo,
  BaseFpxChangeHandler,
  BaseFpxControlEventHandler,
  FpxCurrenyFormatterPipe,
  CriteriaQuery
} from "@fpx/core";
import { FamilypaymentService } from '../familypayment-service/familypayment.service';
import { Familypayment } from '../familypayment-service/familypayment.model';
import { MomentService } from "src/app/foundation/validator-service/moment-service";
import { SchfamilypaymentreqService } from "../schfamilypaymentreq-service/schfamilypaymentreq.service";
import { AppConfigService } from "@dep/services";
import { CasaaccountService } from "src/app/foundation/casaaccount-service/casaaccount.service";
import { SchfamilypaymentService } from "../schfamilypayment-service/schfamilypayment.service";
import { ChildaccountService } from "../childaccount-service/childaccount.service";
export class RetailFamilyPaymentFormState extends BaseFpxComponentState {
  private _appConfig: AppConfigService = inject(AppConfigService);
 	showSuggestion : boolean = false;
  fromCurrencyVariable: any;
   toCurrencyVariable: any;
   paymentAmountVariable:any;
   beneName:any;
  paymentSummary: any = {
    debitAmount: "",
    creditAmount: "",
    exchangeRate: "",
    chargesAmount: "",
  };
  paymentDate: any = {
    minDate: "",
    maxDate: "",
  };
  endDate:any={
     minDate:"",
     maxDate:"",
  };
	paymentAmount:any={
	  isCurrEditable: true,
    CurrencyList: [{ id: this._appConfig.baseCurrency, text: this._appConfig.baseCurrency }],
	   amountInWords : true,
	   initCurrency : this._appConfig.baseCurrency,
	   defaultFetch : true,
	};
  availableBalance: any = {
    isCurrEditable: true,
    CurrencyList: [{ id: this._appConfig.baseCurrency, text: this._appConfig.baseCurrency }],
    amountInWords: false,
    initCurrency: this._appConfig.baseCurrency,
    defaultFetch: true,
  };
  chargesAmount: any = {
    isCurrEditable: true,
    CurrencyList: [{ id: this._appConfig.baseCurrency, text: this._appConfig.baseCurrency }],
    amountInWords: false,
    initCurrency: this._appConfig.baseCurrency,
    defaultFetch: true,
  };
  exchangeDetail: any = {
    text: " Sample Text",
  };
  termsFlag: any = {
    textPosition: "after",
    ckValues: { checked: "Y", unchecked: "N" }
  };
  creditCurrencyVar: any;
  accountBalanceVar: any;
  debitCurrVar: any;
  beneCurrencyVar: any;
  debitAccountVar: any;
  creditAccountVar: any;
  paymentAmountInfoVar: any;
  debitAccountData: any;
  beneData: any;
  modeVar: any;
  paymentDateLabel: String = "";
  currentDate = new Date();
  numberOfPaymentVar: any;
  transferSummary: any = {
    paymentId: "",
    paymentStatus: ""
  };	
  paidInstallments: any;
  scheduledCategory: any;
}


@Injectable()
export class RetailFamilyPaymentFormHelper extends BaseFpxFormHelper<RetailFamilyPaymentFormState>{
   constructor( private retailFamilyPaymentFormService: FamilypaymentService,private momentService: MomentService,private casaAccountservice: CasaaccountService,
    private schFamilyPaymentReqService: SchfamilypaymentreqService, private _appConfig: AppConfigService,   private _currencyFormatter: FpxCurrenyFormatterPipe,
    private _schfamilypaymentService:SchfamilypaymentService,
    private _childaccountService:ChildaccountService
   ) 
    {
        super(new RetailFamilyPaymentFormState());
    }
   
  override doPreInit(): void {
    let mode: any = this.getRoutingParam('mode');
    this.state.modeVar = this.getRoutingParam('mode');
    this.setHidden('transferSummary', true);
    let paymentId: any = this.getRoutingParam("paymentId");
    let serviceCode: any = this.getRoutingParam("serviceCode");
    this.setRepairableControls(["paymentAmount", "sourceAccount"]);
    this.addResetHandler('reset', this._onReset);
    if(paymentId && mode && serviceCode == "RETAILSCHFAMILYPAYMENTREQ"){
      this.setServiceCode("RETAILSCHFAMILYPAYMENTREQ");
      this.setDataService(this._schfamilypaymentService);
    } else {
      this.setServiceCode("RETAILFAMILYPAYMENT");
      this.setDataService(this.retailFamilyPaymentFormService);
    }
  
 }
    
  private _onReset = () => {
   if (this.state.modeVar == 'M' || "R") this.handleFormOnLoad();
   if (this.formMode == "ADD") {
    this.reset("sourceAccount");
    this.reset("childAccount");
    this.reset("paymentAmount");
    this.reset("paymentDate");
    this.reset("remarks");
    this.reset("purpose");
    this.reset("termsFlag");
    this.reset("scheduleType");
    this.reset("scheduleHandler.numberOfPayments");
    this.reset("scheduleHandler.paymentFrequency");
    this.reset("scheduleHandler.endDate");
    // if (this.getValue("scheduleType") == 3) {
    //   this.reset("scheduleHandler.paymentFrequency");
    //   this.setHidden("scheduleHandler", true);
    // }
  }
  }
  public override doPostInit(): void {
    this.handleFormOnLoad();
    this.addValueChangeHandler("scheduleType",this.handleScheduleTypeOnvalueChange);
    this.addControlEventHandler("sourceAccountDataReceived",this.onSourceAccountDataReceived);
    this.addControlEventHandler("exchangeRateReceived", this.onExchangeRateDataReceived);
    this.addValueChangeHandler("paymentAmount", this.handlePaymentAmountOnvalueChange);
    this.addValueChangeHandler("scheduleHandler",this.handleScheduleHandlerOnvalueChange);
    this.addControlEventHandler("childAccountDataReceived", this.onCreditAccountDataReceived);
  }
  public handlePaymentAmountOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {

    this.setVariable('paymentAmountVariable', value.amount);
    if(value.amount>this.state.accountBalanceVar){
      this.setErrors('paymentAmount','debitBalanceError');
    }
    if (this.formGroup.controls["childAccount"].value ==null || this.formGroup.controls["childAccount"].value=="" || this.formGroup.controls["childAccount"].value==undefined)  {
      this.setHidden("paymentSummary", true);
     }
    if (this.formGroup.controls["sourceAccount"].value ==null || this.formGroup.controls["sourceAccount"].value=="" || this.formGroup.controls["sourceAccount"].value==undefined)  {
      this.setHidden("paymentSummary", true);
    }
  }
  public onCreditAccountDataReceived: BaseFpxControlEventHandler = (payload: any) => {
    // WRITE CODE HERE TO HANDLE 
    if (payload) {
      this.setVariable('beneName',payload.accountName);
       //this.setVariable('beneName',payload.accounNickName);
      this.setVariable('toCurrencyVariable', payload.accountCurrency);
      this.state.toCurrencyVariable = payload.accountCurrency;
      if ((this.state.modeVar == null || this.state.modeVar == "" || this.state.modeVar == undefined ) && this.formMode != 'DECISION') {
        this.reset('paymentAmount', {
          amount: 0,
          currencyCode: this._appConfig.baseCurrency
        });
        this.setHidden('paymentSummary', true);
      }
      this.updatePaymentCurrencyList();
    }
  }
  

  public handleFormOnLoad() {
    // this.setHidden("scheduleHandler", true);
    // let Date: any = this.momentService.getInstance();
    // let currentDate: any = Date.format("YYYY-MM-DD");
    // this.setValue("paymentDate", currentDate);
    // this.setReadonly('paymentDate', true);
     if(this.state.modeVar == 'V'){
      this.removeShellBtn('BACK');
    }
       if (this.state.modeVar) {
          let debitAmountVar = this.getValue('paymentAmount');
          let debitCurrencyVar = this.getValue('debitCurrency');
          let creditAmountVar = this.getValue('creditAmount');
          let creditCurrencyVar = this.getValue('creditCurrency');
          let paymentId: any = this.getRoutingParam('paymentId');
          let routingParam: any = this.getRoutingParam();
          let paymentFrequencyVar = this.getValue('scheduleHandler').paymentFrequency;
    
          /*for Manage Schedule transfer Modify and Delete mode*/
          if (paymentId && this.state.modeVar == 'M' || this.state.modeVar == 'D') {
    
            this._schfamilypaymentService.findByKey(routingParam)().subscribe((res:any) => {
              console.log("Response", res);
              if (res) {
                res.childAccount = res.creditAccountNumber;
                if (this.state.modeVar == 'M') {
                  this.patchValue(res);
                  this.setDisabled('paymentId', true);
                  this.setValue('scheduleHandler.paymentFrequency',res?.paymentFrequency);
                  this.setValue('scheduleHandler.numberOfPayments', res?.numberOfPayments);
                  this.setReadonly('sourceAccount',true);
                  this.setReadonly('paymentAmount', true);
                  this.setReadonly('childAccount', true);
                  this.setReadonly('scheduleType', true);
                  this.setReadonly('purpose', false);
                  this.setValue('scheduleId', res.paymentId);
                  this.setValue('paymentId',res.paymentId);
                  this.setHidden('paymentSummary', false);
                  this.setVariable('fromCurrencyVariable', res.debitCurrency);
                  this.state.fromCurrencyVariable = res.debitCurrency;
                  this.setVariable('toCurrencyVariable', res.creditCurrency);
                  this.state.toCurrencyVariable = res.creditCurrency;
                  this.setValue('paymentAmount', { amount: res?.paymentAmount, currencyCode: res?.paymentCurrency });
                  this.setValue('rateApplied', res?.rateApplied);
                  this.setValue('termsFlag', "N");
                  this.setReadonly('scheduleHandler.paymentFrequency',true);
                  this.setValue('baseRateApplied', res?.baseRateApplied);
                  this.state.paymentSummary.debitAmount = res?.debitCurrency + " " + this._currencyFormatter.transform(debitAmountVar, res?.debitCurrency);
                  this.state.paymentSummary.creditAmount = res?.creditCurrency + " " + this._currencyFormatter.transform(creditAmountVar, res?.creditCurrency);
                  this.state.paymentSummary.exchangeRate = res?.rateApplied;
                  
                  if (this.getValue('scheduleType') == "2" ) {
                    // this.reset('scheduleHandler', true);
                    this.setHidden('scheduleHandler', true);
                    this.setReadonly('paymentDate', false);
                  }
                  else if(this.getValue('scheduleType') == "3"){
                    this.setHidden('scheduleHandler', false);
                    this.setReadonly('paymentDate', false);
                 }
                  else {
                    this.setReadonly('paymentDate', true);
                    if (res?.paymentFrequency == '8') {
                    }
                    this.setHidden('scheduleHandler', false);
                    this.setValue('scheduleHandler.paymentFrequency', res?.paymentFrequency);
                    this.setValue('scheduleHandler.numberOfPayments', res?.numberOfPayments);
                    this.state.numberOfPaymentVar = this.getValue('scheduleHandler').numberOfPayments;
                    this.state.paidInstallments=res?.paidInstallments
                    this.setHidden('scheduleHandler.endDate', false);
                    this.setValue('scheduleHandler.endDate', res?.endDate);
                    this.setReadonly('scheduleHandler.paymentFrequency', true);
                    this.setReadonly('scheduleHandler.endDate', true);
                    this.reset('remarks', true);
                    if(!res.numberOfPayments){
                      this.setHidden("scheduleHandler.endDate",true);
                    }
                  }
                }
                if (this.state.modeVar == 'D') {
                  this.patchValue(res);
                  this.setDisabled('paymentId', true);
                  this.setValue('scheduleId', res.paymentId);
                  this.setValue('paymentId', res.paymentId);
                  this.setVariable('fromCurrencyVariable', res.debitCurrency);
                  this.state.fromCurrencyVariable = res.debitCurrency;
                  this.setVariable('toCurrencyVariable', res.creditCurrency);
                  this.state.toCurrencyVariable = res.creditCurrency;
                  this.setValue('paymentAmount', { amount: res?.paymentAmount, currencyCode: res?.paymentCurrency });
                  this.setValue('scheduleHandler.paymentFrequency', res?.paymentFrequency);
                  this.setValue('scheduleHandler.numberOfPayments', res?.numberOfPayments);
                  this.setReadonly('sourceAccount', true);
                  this.setReadonly('childAccount', true);
                  this.setReadonly('paymentAmount', true);
                  this.setReadonly('scheduleType', true);
                  this.setReadonly('scheduleHandler.paymentFrequency', true);
                  this.setReadonly('scheduleHandler.numberOfPayments', true);
                  this.setReadonly('scheduleHandler.endDate', true);
                  this.setReadonly('paymentDate', true);
                  this.setReadonly('scheduleHandler.endDate', true);
                  this.setReadonly('purpose', true);
              
  
                  this.state.paymentSummary.debitAmount = res?.debitCurrency + " " + this._currencyFormatter.transform(debitAmountVar, debitCurrencyVar);
                  this.state.paymentSummary.creditAmount = res?.creditCurrency + " " + this._currencyFormatter.transform(creditAmountVar, creditCurrencyVar);
                  this.state.paymentSummary.exchangeRate = res?.rateApplied;
                  
    
                  if (this.getValue('scheduleType') == "2" || this.getValue('scheduleType') == "1") {
                    // this.reset('scheduleHandler', true);
                    this.setHidden('scheduleHandler', true);
                  }
                  else {
                    // if (res?.paymentFrequency == '8') {
                    //   this.setHidden('scheduleHandler.paymentDaysInterval', false);
                    //   this.setValue('scheduleHandler.paymentDaysInterval', res.paymentDaysInterval);
                    //   this.setReadonly('scheduleHandler.paymentDaysInterval', true);
                    // }
                    this.setHidden('scheduleHandler', false);
                    this.setValue('scheduleHandler.paymentFrequency', paymentFrequencyVar);
                    this.setValue('scheduleHandler.numberOfPayments', this.getValue('numberOfPayments'));
                    this.setHidden('scheduleHandler.endDate', false);
                    this.setValue('scheduleHandler.endDate', this.getValue('endDate'));
                    this.setReadonly('scheduleHandler.paymentFrequency', true);
                    this.setReadonly('scheduleHandler.numberOfPayments', true);
                    this.setReadonly('scheduleHandler.endDate', true);
                  }
                }
    
              }
            });
          }
          else if (this.getRoutingParam('mode') == 'R') {
            this.retailFamilyPaymentFormService.findByKey(routingParam)().subscribe((res) => {
              if (res) {
                this.patchValue(res);
                let Date: any = this.momentService.getInstance();
                let currentDate: any = Date.format("YYYY-MM-DD");
                this.setValue('paymentDate', currentDate);
                this.setReadonly('paymentDate', true);
                this.setValue('scheduleType', res?.scheduleType);
                this.setHidden('paymentSummary', false);
                this.setDisabled('paymentId', true);
                this.setVariable('fromCurrencyVariable', res.debitCurrency);
                this.state.fromCurrencyVariable = res.debitCurrency;
                this.setVariable('toCurrencyVariable', res.creditCurrency);
                this.setVariable('accountBalanceVariable', this.state.accountBalanceVar);
                this.state.toCurrencyVariable = res.creditCurrency;
                this.setValue('paymentAmount', { amount: res?.paymentAmount, currencyCode: res?.paymentCurrency });
                this.setValue('scheduleHandler.paymentFrequency', res?.paymentFrequency);
                this.setValue('scheduleHandler.numberOfPayments', res?.numberOfPayments);
                this.setValue('rateApplied', res?.rateApplied);
                this.setValue('baseRateApplied', res?.baseRateApplied);
                this.setAmountCurrencyList('chargesAmount', [{ id: 'this._appConfig.baseCurrency', text: 'this._appConfig.baseCurrency' }]);
                this.state.paymentSummary.debitAmount = res?.debitCurrency + " " + this._currencyFormatter.transform(debitAmountVar, res?.debitCurrency);
                this.state.paymentSummary.creditAmount = res?.creditCurrency + " " + this._currencyFormatter.transform(creditAmountVar, res?.creditCurrency);
                this.state.paymentSummary.exchangeRate = res?.rateApplied;
                this.setReadonly('sourceAccount',true);
                this.setReadonly('childAccount',true);
                this.setReadonly('scheduleType',true);
                // 
              }
            });
          }
          else if (this.getRoutingParam('mode') == 'V') {
            this.setHidden('transferSummary', false);
            this.state.transferSummary.paymentId = this.getValue('paymentId');
    
            let statusVar = this.getRoutingParam('status');
            this.state.transferSummary.paymentStatus = statusVar;
            this.setValue('paymentAmount', { amount: this.getValue('paymentAmount').amount, currencyCode: this.getValue('paymentCurrency') });
            if (debitCurrencyVar != creditCurrencyVar) {
              this.setHidden('paymentSummary',false);
              this.state.paymentSummary.debitAmount = debitCurrencyVar + " " + this._currencyFormatter.transform(debitAmountVar, debitCurrencyVar);
              this.state.paymentSummary.creditAmount = creditCurrencyVar + " " + this._currencyFormatter.transform(creditAmountVar, creditCurrencyVar);
              this.state.paymentSummary.exchangeRate = this.getValue('rateApplied');
            }
            else {
              this.setHidden('paymentSummary', true);
            }
    
            if (this.getValue('scheduleType') == "2" || this.getValue('scheduleType') == "1") {
              this.setHidden('scheduleHandler', true);
            }
            else {
              let statusVar = this.getValue('paymentStatus') == 'A' ? 'Active' : 'Active'
              this.state.transferSummary.paymentStatus = statusVar;
              if (paymentFrequencyVar == '8') {
                this.setHidden('scheduleHandler.paymentDaysInterval', false);
                this.setReadonly('scheduleHandler.paymentDaysInterval', true);
              }
              this.setHidden('scheduleHandler.numberOfPaymentsNote', true);
              this.setHidden('scheduleHandler', false);
              this.setValue('scheduleHandler.paymentFrequency', paymentFrequencyVar);
              this.setValue('scheduleHandler.numberOfPayments', this.getValue('numberOfPayments'));
              this.setHidden('scheduleHandler.endDate', false);
              this.setValue('scheduleHandler.endDate', this.getValue('endDate'));
              this.setReadonly('scheduleHandler.paymentFrequency', true);
              this.setReadonly('scheduleHandler.numberOfPayments', true);
              this.setReadonly('scheduleHandler.endDate', true);
            }
            if (this.getValue('scheduleType') == "2" || this.getValue('scheduleType') == "3") {
              this.state.transferSummary.paymentStatus = 'Active';
            }
            else {
              let statusVar = this.getRoutingParam('status');
              this.state.transferSummary.paymentStatus = statusVar;
            }
            // this.setHidden('disclaimer-box',true);
          }
        }
        else {
    
          let criteriaQuery = new CriteriaQuery()
          this.casaAccountservice.lookup(criteriaQuery)().subscribe((res:any) => {
            console.log("Response", res);
            if (res) {
              if (res?.length == 1) {
                this.setValue('sourceAccount', res[0].id)
                this.setReadonly('sourceAccount', true);
                this.setReadonly('childAccount', true);
                this.setErrors('sourceAccount', 'singleAccountError');
              }
            }
            this.setValue('scheduleType', "1");
            this.setHidden('paymentSummary', true);
            this.reset('scheduleHandler');
            // this.setDisabled('creditAmount', true);
            // this.setDisabled('creditCurrency', true);
            // this.setDisabled('debitAmount', true);
            // this.setDisabled('debitCurrency', true);
            // this.setDisabled('paymentId', true);
            // this.setDisabled('scheduleId', true);
          });
        }
  //     else {
  //     this.setValue("scheduleType", "1");
  //     this.setHidden("paymentSummary", true);
  // }

}
  public onExchangeRateDataReceived: BaseFpxControlEventHandler = (
    payload: any
  ) => {
    if (payload.zeroValue) {
      this.setHidden("paymentSummary", true);
    } else if (
      this.state.fromCurrencyVariable == this.state.toCurrencyVariable
    ) {
      this.setHidden("paymentSummary", true);
      this.setValue("rateApplied", payload.exchangeRate);
      this.setValue("baseRateApplied", payload.baseRate);
    } else if(payload.creditAmount==null||payload.creditAmount==""||payload.creditAmount==undefined){
      this.setHidden("paymentSummary", true);
    } else if(payload.debitAmount==null||payload.debitAmount==""||payload.debitAmount==undefined){
      this.setHidden("paymentSummary", true);
    }
    else {
      this.setHidden("paymentSummary", false);
      this.setValue("rateApplied", payload.exchangeRate);
      this.setValue("baseRateApplied", payload.baseRate);
      this.state.paymentSummary.debitAmount =
        this.state.fromCurrencyVariable +
        " " +
        this._currencyFormatter.transform(
          payload.debitAmount,
          this.state.fromCurrencyVariable
        );
      this.state.paymentSummary.creditAmount =
        this.state.toCurrencyVariable +
        " " +
        this._currencyFormatter.transform(
          payload.creditAmount,
          this.state.toCurrencyVariable
        );
      this.state.paymentSummary.exchangeRate = payload.exchangeRate;
    }
  };

  public handleScheduleTypeOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    let Date: any = this.momentService.getInstance();
    let currentDate: any = Date.format("YYYY-MM-DD");
    let futureDate: any = Date.add(1, "day").format("YYYY-MM-DD");
    let futureMaxDate: any = Date.add(1, "Year").format("YYYY-MM-DD");
    if (value == "1") {
        if ((this.state.modeVar == null || this.state.modeVar == "" || this.state.modeVar == undefined)) {
        this.reset('paymentAmount', {
          amount: 0
        });
        this.setHidden('paymentSummary', true);
      }
      this.setVariable('scheduleTypeVariable', value);
      this.setValue("paymentDate", currentDate);
      this.setReadonly("paymentDate", true);
      this.reset("scheduleHandler",true);
      this.setHidden("scheduleHandler", true);
      this.setDisabled("scheduleHandler.endDate", true);
      this.setDisabled("scheduleHandler.paymentFrequency", true);
      this.setDisabled("scheduleHandler.numberOfPayments", true);
      this.setDataService(this.retailFamilyPaymentFormService);
      this.setServiceCode("RETAILFAMILYPAYMENT");
      this.setLabel("paymentDate", "RetailFamilyPaymentForm.paymentDate");
    }
    if (value == "2") {
        if ((this.state.modeVar == null || this.state.modeVar == "" || this.state.modeVar == undefined)) {
        this.reset('paymentAmount', {
          amount: 0
        });
		  this.setHidden('paymentSummary', true);
      }
      this.setVariable('scheduleTypeVariable', value);
        this.state.paymentDate.minDate = futureDate;
      this.state.paymentDate.maxDate = futureMaxDate;
      this.setValue("paymentDate", futureDate);
      this.reset("scheduleHandler",true);
      this.setHidden("scheduleHandler", true);
      this.setDisabled("scheduleHandler.endDate", true);
      this.setDisabled("scheduleHandler.numberOfPayments", true);
      this.setDisabled("scheduleHandler.paymentFrequency", true);
      this.setReadonly("paymentDate", false);
      this.setServiceCode("RETAILSCHFAMILYPAYMENTREQ");
      this.setDataService(this.schFamilyPaymentReqService);
      this.setLabel("paymentDate", "RetailFamilyPaymentForm.executionDate");
    }
    if (value == "3") {
        if ((this.state.modeVar == null || this.state.modeVar == "" || this.state.modeVar == undefined)) {
        this.reset('paymentAmount', {
          amount: 0
        });
		  this.setHidden('paymentSummary', true);
      }
      this.setVariable('scheduleTypeVariable', value);
      this.state.paymentDate.minDate = futureDate;
      this.state.paymentDate.maxDate = futureMaxDate;
      this.reset("scheduleHandler",true);
      this.setHidden("scheduleHandler", false);
      this.setValue("paymentDate", futureDate);
      this.setReadonly("paymentDate", false);
      this.setDisabled("scheduleHandler.endDate", false);
      this.setDisabled("scheduleHandler.numberOfPayments", false);
      this.setServiceCode("RETAILSCHFAMILYPAYMENTREQ");
      this.setDataService(this.schFamilyPaymentReqService);
      this.setLabel("paymentDate", "RetailFamilyPaymentForm.startDate");
    }
  };
  
  public onSourceAccountDataReceived: BaseFpxControlEventHandler = (
    payload: any
  ) => {
    if (payload) {
      this.state.debitAccountData = payload;
        this.setVariable('fromCurrencyVariable', payload.accountCurrency);
        this.state.fromCurrencyVariable = payload.accountCurrency;
      this.setVariable("accountBalanceVariable", payload.availableBalance);
      this.state.accountBalanceVar = payload.availableBalance;
      if (
        this.state.modeVar == null ||
        this.state.modeVar == "" ||
        this.state.modeVar == undefined
      ) {
        this.reset('paymentAmount', {
          amount: 0,
          currencyCode: this._appConfig.baseCurrency
        });
        this.setHidden("paymentSummary", true);
      }

      this.updatePaymentCurrencyList();
    }
  };
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

  }
  public override preSubmitInterceptor(payload: Familypayment):any {
    this.state.scheduledCategory = '4';
    payload.paymentAmount = this.getValue("paymentAmount").amount;
    payload.accountCurrency = this.getValue("paymentAmount").currencyCode;
    payload.scheduledCategory = this.state.scheduledCategory;
    payload.creditAmount =  this.state.paymentAmountVariable;
    payload.creditCurrency = this.state.toCurrencyVariable;
    payload.beneficiaryName = this.state.beneName;
    payload.numberOfPayments = this.getValue('scheduleHandler').numberOfPayments;
    payload.paymentFrequency = this.getValue('scheduleHandler').paymentFrequency;
    payload.endDate = this.getValue('scheduleHandler').endDate;
    payload.termsFlag = this.getValue('termsFlag');
    this.handleFormOnPresubmit(payload);
    return payload;
  }
  public handleFormOnPresubmit(payload: any) {
    // WRITE CODE HERE TO HANDLE
      // payload.paymentAmount = this.getValue("paymentAmount").amount;
      // payload.accountCurrency = this.getValue("paymentAmount").currencyCode;
      payload.chargesAmount = 0;
      payload.paymentId = payload.scheduleId;
      if (this.formMode == 'ADD' && this.getRoutingParam('mode') == 'M') {
        payload.operationMode = "M";
        payload.paymentAmount = this.getValue('paymentAmount').amount;
        payload.debitCurrency = this.getValue('paymentAmount').currencyCode;
        payload.creditAmount =  this.state.paymentAmountVariable;
        payload.creditCurrency = this.state.toCurrencyVariable;
        payload.paymentFrequency = this.getValue('scheduleHandler').paymentFrequency;
        payload.serviceCode =  this.setServiceCode("RETAILSCHFAMILYPAYMENTREQ");
  
      }
      else if (this.formMode == 'ADD' && this.getRoutingParam('mode') == 'D') {
        payload.operationMode = "D";
        payload.paymentAmount = this.getValue('paymentAmount').amount;
        payload.debitCurrency = this.getValue('paymentAmount').currencyCode;
        payload.creditAmount =  this.state.paymentAmountVariable;
        payload.creditCurrency = this.state.toCurrencyVariable;
        payload.paymentFrequency = this.getValue('scheduleHandler').paymentFrequency;
        payload.serviceCode =  this.setServiceCode("RETAILSCHFAMILYPAYMENTREQ");
      }
      else {
        payload.paymentAmount = this.getValue('paymentAmount').amount;
        payload.debitCurrency = this.getValue('paymentAmount').currencyCode;
        payload.creditAmount =  this.state.paymentAmountVariable;
        payload.creditCurrency = this.state.toCurrencyVariable;
        payload.paymentFrequency = this.getValue('scheduleHandler').paymentFrequency;
        if (payload.scheduleType == "2" || payload.scheduleType == "3") {
          payload.operationMode = "A";
        }
      }
  }

  public handleScheduleHandlerOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    // WRITE CODE HERE TO HANDLE
    //tool generated code based on Orchestration Instructions
    if (this.state.modeVar == 'M' ) {
      if (this.getValue('scheduleType') == "3") {
        this.setDisabled("scheduleHandler.paymentFrequency", false);
        this.setValue("scheduleHandler.paymentFrequency", value.paymentFrequency);
        if (this.state.paidInstallments) {
          if (value.numberOfPayments == this.state.numberOfPaymentVar) {
            this.reset('scheduleHandler.numberOfPayments', true);          
          }
          else
           if (value.endDate && value.numberOfPayments <= this.state.paidInstallments) {
            this.setHidden('scheduleHandler.endDate', true);
            this.setDisabled("scheduleHandler.endDate", true);
            this.reset('numberOfPayments', true);
            this.setErrors('scheduleHandler.numberOfPayments', 'installment_error', { numberOfPayment: this.state.paidInstallments });
          }

          else {
            this.setDisabled("scheduleHandler.endDate", false);
            this.setDisabled("scheduleHandler.numberOfPayments", false);
            this.setValue("scheduleHandler.numberOfPayments", value.numberOfPayments);
            this.setValue("scheduleHandler.endDate", value.endDate);
          }
          this.setDisabled('scheduleHandler', true);
        }
    }
  }
    else{
      if (this.getValue('scheduleType') == "3") {
        this.setDisabled("scheduleHandler.paymentFrequency", false);
        this.setValue("scheduleHandler.paymentFrequency", value.paymentFrequency);
        if (value.endDate && (value.numberOfPayments == null || value.numberOfPayments == undefined || value.numberOfPayments == "")) {
          this.setDisabled("scheduleHandler.endDate", false);
          this.setDisabled("scheduleHandler.numberOfPayments", true);
          this.setValue("scheduleHandler.endDate", value.endDate);
        }
        else if (value.endDate) {
          this.setDisabled("scheduleHandler.endDate", false);
          this.setDisabled("scheduleHandler.numberOfPayments", false);
          this.setValue("scheduleHandler.numberOfPayments", value.numberOfPayments);
          this.setValue("scheduleHandler.endDate", value.endDate);
        }
        else {
          this.setDisabled("scheduleHandler.endDate", true);
          this.setDisabled("scheduleHandler.numberOfPayments", true);
        }
        this.setDisabled('scheduleHandler', true);
      }
    }
  };
  
 public override postDataFetchInterceptor(payload: Familypayment){
   // WRITE CODE HERE TO HANDLE
   if(payload.scheduleType == '1' || payload.scheduleType == '2'){
     this.setHidden('scheduleHandler', true);
   }
   if(!payload.remarks){
     this.setHidden('remarks', true);
   } 
  return payload;
}
  

  public override postSubmitInterceptor(response:any): RoutingInfo {
    console.log(response);
    let routingInfo: RoutingInfo = new RoutingInfo();
    this.handleFormOnPostsubmit(response, routingInfo);
    return routingInfo;
  }

  public handleFormOnPostsubmit(response: any, routingInfo: any) {
    if (response.success) {
      let res =
        response.success?.body?.familypayment ||
        response.success?.body?.schfamilypaymentreq;
      routingInfo.setQueryParams({
        response: res,
      });
    } 
    else if (response.error) {
      let error = response.error.error;
      routingInfo.setQueryParams({
        response: error,
        serviceCode: this.serviceCode.value
      });
    }
    return response;
  }
  
}


