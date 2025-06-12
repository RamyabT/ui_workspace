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
  FpxAppConfig,
  FpxModalAfterClosed
} from "@fpx/core";
import { Observable, map, of } from "rxjs";
import { Router } from "@angular/router";
import { InternationalTransferService } from "../internationalTransfer-service/internationalTransfer.service";
import { InternationalTransfer } from "../internationalTransfer-service/internationalTransfer.model";
import { AppConfigService, CommonValidatorService, DepHttpConfig } from "@dep/services";
import { CommonService } from "src/app/foundation/validator-service/common-service";
import { MomentService } from "src/app/foundation/validator-service/moment-service";
import { ScheduleIntlReqService } from "../scheduleIntlReq-service/scheduleIntlReq.service";
import { IntlScheduleService } from "../intlSchedule-service/intlSchedule.service";
import { DepAlertComponent } from "src/app/dep/core/component/dep-alert/dep-alert.component";
import { DepConfirmationComponent } from "src/app/dep/core/component/dep-confirmation/dep-confirmation.component";
import { DeviceDetectorService, PaymentsFormComponent } from "@dep/core";
import { tickStep } from "d3";
import moment from "moment";
export class RetailInternationalTransferFormState extends BaseFpxComponentState {
  private _appConfig: AppConfigService = inject(AppConfigService);

  showSuggestion: boolean = false;

  fromCurrencyVariable: any;
  toCurrencyVariable: any;
  
  paymentSummary: any = {
    debitAmount: "",
    creditAmount: "",
    exchangeRate: "",
    chargesAmount: "",
  };
  rateApplied:any;
  chargesAmount: any = {
    isCurrEditable: true,
    CurrencyList: [],
    amountInWords: false,
    initCurrency: this._appConfig.baseCurrency,
    defaultFetch: false,
  };
  errorCode: any = "";
  nextPaymentDate: any;
  paymentAmount: any = {
    isCurrEditable: true,
    CurrencyList: [],
    amountInWords: true,
    initCurrency: this._appConfig.baseCurrency,
    defaultFetch: true,
  };
  amount:any;
  paymentDate: any = {
    minDate: new Date("01-07-2023"),
    maxDate: new Date("31-07-2023"),
  };

  termsFlag: any = {
    textPosition: "after",
    ckValues: { checked: "Y", unchecked: "N" },
  };
  debitAmount: any = {
    isCurrEditable: true,
    CurrencyList: [],
    amountInWords: false,
    initCurrency: this._appConfig.baseCurrency,
    defaultFetch: true,
  };
  creditAmount: any = {
    isCurrEditable: true,
    CurrencyList: [],
    amountInWords: true,
    initCurrency: this._appConfig.baseCurrency,
    defaultFetch: true,
  };
  exchangeDetail: any = {
    text: " Sample Text",
  };
  debitAccountData: any;
  beneAccountData: any;
  accountBalanceVar: any;
  beneData: any;
  modeVar: any;
  numberOfPaymentVar: any;
  transferSummary: any = {
    paymentId: "",
    paymentStatus: ""
  };
  paidInstallments: any;
  holiday = 0
  cutOffTimeVar = 0;
  AmountDetails:any={
    CreditAmount:"",
    DebitAmount:""

  };
}

@Injectable()
export class RetailInternationalTransferFormHelper extends BaseFpxFormHelper<RetailInternationalTransferFormState> {
  scheduleHandler: FormGroup<any> | undefined;
  shellType: any;
  accordionOpen: boolean = true;
  private _serviceCodeDetails: FpxAppConfig = inject(FpxAppConfig);
  private _depHttpConfig: DepHttpConfig = inject(DepHttpConfig);

  constructor(
    private retailInternationalTransferFormService: InternationalTransferService,
    private _httpProvider: HttpProviderService,
    private _router: Router,

    private _schduleIntlReq: ScheduleIntlReqService,
    private _scheuleIntl: IntlScheduleService,
    private commonService: CommonService,
    private momentService: MomentService,
    private _currencyFormatter: FpxCurrenyFormatterPipe,
    private _appConfig: AppConfigService,
    protected _validatorService: CommonValidatorService,
    public deviceService: DeviceDetectorService
  ) {
    super(new RetailInternationalTransferFormState());
  }

  override doPreInit(): void {
    let mode: any = this.getRoutingParam("mode");
    this.setHidden('transferSummary', true);
    this.state.modeVar = this.getRoutingParam('mode');
    let paymentId: any = this.getRoutingParam("paymentId");
    let serviceCode: any = this.getRoutingParam("serviceCode");
    let inventoryNumber = this.getRoutingParam('inventoryNumber');
    // this.setRepairableControls(["paymentAmount", "sourceAccount"]);
    // this.addControlEventHandler(
    //   "sourceAccountDataReceived",
    //   this.onSourceAccountDataReceived
    // );
    // this.addControlEventHandler(
    //   "beneficiaryIdDataReceived",
    //   this.onBeneficiaryIdDataReceived
    // );

    if (paymentId && mode && serviceCode == 'RETAILSCHSWIFT') {
      this.setServiceCode("RETAILSCHSWIFT");
      this.setDataService(this._scheuleIntl);
      this.addResetHandler('reset', this._onReset);
    } else {
      this.setServiceCode("RETAILTRANSWIFT");
      this.setDataService(this.retailInternationalTransferFormService);
    }
    this.addControlEventHandler(
      "sourceAccountDataReceived",
      this.onSourceAccountDataReceived
    );
    this.addControlEventHandler(
      "beneficiaryIdDataReceived",
      this.onBeneficiaryIdDataReceived
    );
    this.addValueChangeHandler(
      "scheduleType",
      this.handleScheduleTypeOnvalueChange
    );




  }

  private _onReset = () => {
    if (this.state.modeVar == 'M' || this.state.modeVar == "R" || this.state.modeVar == 'D') {
      this.reset('remarks');
      this.handleFormOnLoad();
    }
    else {
      this.reset('sourceAccount');
      this.reset('paymentAmount', { amount: 0 });
      this.setHidden('paymentSummary', true);
      if (this.getRoutingParam('inventoryNumber')) {
        this.setValue('beneficiaryId', this.getRoutingParam('inventoryNumber'));
        this.setReadonly('beneficiaryId', true);
      }
      else {
        this.reset('beneficiaryId')
      }
      this.reset('scheduleType');
      this.reset('paymentDate');
      this.reset('termsFlag');
      this.reset('transferType');
      this.reset('purpose');
      this.reset('remarks');
      this.reset('chargesAmount');
      this.setHidden('scheduleHandler', true);
      this.setHidden('paymentSummary', true);
      // this.setValue('chargesAmount',{amount:5.00})
    }
  }

  public handleFormOnLoad() {
    // WRITE CODE HERE TO HANDLE

    let mode: any = this.getRoutingParam('mode');

    if (mode == 'V') {
      this.removeShellBtn('BACK');
    }

    /*for Manage Schedule transfer Modify and Delete mode*/
    if (mode) {
      this.addResetHandler('reset', this._onReset);
      let debitAmountVar = this.getValue('debitAmount');
      let debitCurrencyVar = this.getValue('debitCurrency');
      let creditAmountVar = this.getValue('creditAmount');
      let creditCurrencyVar = this.getValue('creditCurrency');
      let paymentId: any = this.getRoutingParam('paymentId');
      let serviceCode: any = this.getRoutingParam('serviceCode');
      let routingParam: any = this.getRoutingParam();
      let paymentFrequencyVar = this.getValue('paymentFrequency');
      let paymentDaysIntervalVar = this.getValue('paymentDaysInterval');
      /*for Manage Schedule transfer Modify and Delet mode*/
      if ((paymentId && mode == "M") || mode == "D") {
        this._scheuleIntl
          .findByKey(routingParam)()
          .subscribe((res) => {
            console.log("Response", res);
            if (res) {
              if (mode == "M") {
                this.patchValue(res);
                this.setReadonly('sourceAccount', true);
                this.setValue('termsFlag', "N");
                this.setDisabled("paymentId", true);
                this.setValue("scheduleId", res.paymentId);
                this.setHidden("paymentSummary", false);
                this.setVariable('debitAmountVariable', res.debitAmount);
                this.setVariable("fromCurrencyVariable", res.debitCurrency);
                this.state.fromCurrencyVariable = res.debitCurrency;
                this.setVariable("toCurrencyVariable", res.creditCurrency);
                this.state.toCurrencyVariable = res.creditCurrency;
                this.setVariable("fromAccountVariable", res?.sourceAccount);
                this.setVariable("serviceCodeVariable", res?.serviceCode);
                this.setVariable("paymentAmountVariable", res?.paymentAmount);
                this.setVariable("toAccountVariable", res?.creditAccountNumber);
                this.setVariable("beneficiaryIdVariable", res?.beneficiaryId);
                this.setVariable("scheduleTypeVariable", res?.scheduleType);
                this.setValue('sourceAccount', res?.sourceAccount);
                this.setValue("paymentAmount", {
                  amount: res?.paymentAmount,
                  currencyCode: res?.paymentCurrency,
                });
                this.setReadonly('paymentAmount', true);
                this.setReadonly("beneficiaryId", true);
                this.setReadonly("scheduleType", true);
                this.setReadonly("chargesBorneBy", true);
                this.setReadonly("paymentDate", true);
                this.setReadonly("purpose", true);
                this.setValue("rateApplied", res?.rateApplied);
                this.setValue("rateApplied", res?.baseRateApplied);
                this.setValue('chargesAmount', { amount: res?.chargesAmount, currencyCode: this._appConfig.baseCurrency });
                this.setReadonly('chargesAmount', true);
                if (res?.debitCurrency != res?.creditCurrency) {
                  this.setHidden('paymentSummary', false);
                  this.state.paymentSummary.debitAmount = res?.debitAmount + " " + res?.debitCurrency;
                  this.state.paymentSummary.creditAmount = res?.creditAmount + " " + res?.creditCurrency;
                  this.state.paymentSummary.exchangeRate = '1' + " " + res?.debitCurrency + " = " + " " + this.getValue('rateApplied') + " " + res?.creditCurrency;
                }
                else {
                  this.setHidden('paymentSummary', true);
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
                  this.state.paidInstallments = res?.paidInstallments
                  this.setHidden('scheduleHandler.endDate', false);
                  this.setValue('scheduleHandler.endDate', res?.endDate);
                  this.setReadonly('scheduleHandler.paymentFrequency', true);
                  this.setReadonly('scheduleHandler.endDate', true);
                  this.setValue('remarks', this.getValue('remarks'))
                  // this.reset('remarks', true);
                  if (!res.numberOfPayments) {
                    this.setHidden("scheduleHandler.endDate", true);
                  }
                  this.setValue('purpose', res.purpose);
                  this.setReadonly('purpose', true);
                  this.setReadonly('transferInformation', true);
                }
                this.setValue('chargesBorneBy', res?.chargesBorneBy);
                // this.setValue('chargesAmount', { amount: res?.chargesAmount, currencyCode: this._appConfig.baseCurrency });
                this.setReadonly('chargesAmount', true);
              }
              if (mode == "D") {
                this.patchValue(res);
                this.setValue('termsFlag', "N");
                this.setDisabled("paymentId", true);
                this.setValue("scheduleId", res.paymentId);
                this.setVariable('debitAmountVariable', res.debitAmount);
                this.setVariable("fromCurrencyVariable", res.debitCurrency);
                this.state.fromCurrencyVariable = res.debitCurrency;
                this.setVariable("toCurrencyVariable", res.creditCurrency);
                this.state.toCurrencyVariable = res.creditCurrency;
                this.setVariable("fromAccountVariable", res?.sourceAccount);
                this.setVariable("serviceCodeVariable", res?.serviceCode);
                this.setVariable("paymentAmountVariable", res?.paymentAmount);
                this.setVariable("toAccountVariable", res?.creditAccountNumber);
                this.setVariable("beneficiaryIdVariable", res?.beneficiaryId);
                this.setVariable("scheduleTypeVariable", res?.scheduleType);
                this.setValue('chargesBorneBy', res?.chargesBorneBy);
                this.setValue('paymentAmount', { amount: res?.paymentAmount, currencyCode: res?.paymentCurrency });
                this.setValue(
                  "scheduleHandler.paymentFrequency",
                  res?.paymentFrequency
                );
                this.setValue(
                  "scheduleHandler.numberOfPayments",
                  res?.numberOfPayments
                );
                this.setReadonly("sourceAccount", true);
                this.setReadonly("beneficiaryId", true);
                this.setReadonly("paymentAmount", true);
                this.setReadonly("scheduleType", true);
                this.setReadonly("scheduleHandler.paymentFrequency", true);
                this.setReadonly("scheduleHandler.numberOfPayments", true);
                this.setReadonly("scheduleHandler.endDate", true);
                this.setReadonly("paymentDate", true);
                this.setReadonly("scheduleHandler.endDate", true);
                this.setReadonly("chargesBorneBy", true);
                this.setReadonly("purpose", true);

                this.setAmountCurrencyList('chargesAmount', [{ id: this._appConfig.baseCurrency, text: this._appConfig.baseCurrency }]);
                this.setReadonly('chargesAmount', true);
                this.setValue('chargesAmount', { amount: res?.chargesAmount, currencyCode: this._appConfig.baseCurrency });
                this.setReadonly('chargesAmount', true);
                if (res?.debitCurrency != res?.creditCurrency) {
                  this.setHidden('paymentSummary', false);
                  this.state.paymentSummary.debitAmount = res?.debitAmount + " " + res?.debitCurrency;
                  this.state.paymentSummary.creditAmount = res?.creditAmount + " " + res?.creditCurrency;
                  this.state.paymentSummary.exchangeRate = '1' + " " + res?.debitCurrency + " = " + " " + this.getValue('rateApplied') + " " + res?.creditCurrency;
                } else {
                  this.setHidden('paymentSummary', true);
                }

                if (res?.paymentFrequency == '8') {
                  this.setHidden('scheduleHandler.paymentDaysInterval', false);
                  this.setValue('scheduleHandler.paymentDaysInterval', res?.paymentDaysInterval);
                  this.setReadonly('scheduleHandler.paymentDaysInterval', true);
                }
                this.setValue('purpose', res.purpose);
                this.setReadonly('purpose', true);
                this.setReadonly('transferInformation', true);
                this.setHidden('scheduleHandler', false);
                this.setHidden('scheduleHandler.numberOfPaymentsNote', true);
                this.setReadonly('scheduleHandler.paymentFrequency', true);
                this.setReadonly('scheduleHandler.numberOfPayments', true);
                this.setReadonly('scheduleHandler.endDate', true);
                this.setReadonly('paymentDaysInterval',true)
                // this.setValue('scheduleHandler.paymentFrequency', this.getValue('paymentFrequnecy'));
                this.setValue('scheduleHandler.paymentFrequency', paymentFrequencyVar);
                this.setValue('scheduleHandler.numberOfPayments', this.getValue('numberOfPayments'));


              }
            }
          });
      }
      else if (this.getRoutingParam('mode') == 'R') {

        this.retailInternationalTransferFormService.findByKey(routingParam)().subscribe((res) => {
          if (res) {
            this.patchValue(res);
            let Date: any = this.momentService.getInstance();
            let currentDate: any = Date.format("YYYY-MM-DD");
            this.setVariable('debitAmountVariable', this.getValue('debitAmount'));
            this.setVariable("fromAccountVariable", res?.sourceAccount);
            this.setVariable("fromCurrencyVariable", res?.debitCurrency);
            this.setVariable("serviceCodeVariable", res?.serviceCode);
            this.setVariable("paymentAmountVariable", res?.paymentAmount);
            this.setVariable("toAccountVariable", res?.creditAccountNumber);
            this.setVariable('toCurrencyVariable', res.creditCurrency);
            this.setVariable("scheduleTypeVariable", res?.scheduleType);
            this.setValue('paymentDate', currentDate);
            this.setReadonly('paymentDate', true);
            this.setValue('scheduleType', res?.scheduleType);
            this.setReadonly('beneficiaryId', true);
            this.setHidden('paymentSummary', false);
            this.setDisabled('paymentId', true);
            this.setDisabled("scheduleId", true);
            this.setVariable('accountBalanceVariable', this.state.accountBalanceVar);
            this.setVariable('fromCurrencyVariable', res.debitCurrency);
            this.state.fromCurrencyVariable = res.debitCurrency;
            this.setVariable('toCurrencyVariable', res.creditCurrency);
            this.state.toCurrencyVariable = res.creditCurrency;
            this.setValue('paymentAmount', { amount: res?.paymentAmount, currencyCode: res?.paymentCurrency });
            this.setAmountCurrencyList('paymentAmount',[{
              id:res?.paymentCurrency,
              text:res?.paymentCurrency
           }])
            this.setValue('scheduleHandler.paymentFrequency', res?.paymentFrequency);
            this.setValue('scheduleHandler.numberOfPayments', res?.numberOfPayments);
            this.setValue('rateApplied', res?.rateApplied);
            this.state.rateApplied = res?.rateApplied;
            this.setValue('baseRateApplied', res?.baseRateApplied);
            this.setValue('chargesBorneBy', res?.chargesBorneBy);
            this.setReadonly('chargesBorneBy', true);
            this.setValue('chargesAmount', { amount: res?.chargesAmount, currencyCode: this._appConfig.baseCurrency });
            // this.setAmountCurrencyList('chargesAmount', [{ id: this._appConfig.baseCurrency, text: this._appConfig.baseCurrency }]);
            this.setReadonly('chargesAmount', true);
            if (res?.debitCurrency != res?.creditCurrency) {
              this.setHidden('paymentSummary', false);
              this.state.paymentSummary.debitAmount = res?.debitAmount + " " + res?.debitCurrency;
              this.state.paymentSummary.creditAmount = res?.creditAmount + " " + res?.creditCurrency;
              this.state.paymentSummary.exchangeRate = '1' + " " + res?.debitCurrency + " = " + " " + this.getValue('rateApplied') + " " + res?.creditCurrency;
            }
            else {
              this.setHidden('paymentSummary', true);
            }
            this.setValue('termsFlag', "N");

            this.setReadonly('sourceAccount', true);
            this.setReadonly('beneficiaryId', true);
            this.setReadonly('scheduleType', true);
            this.setValue('purpose', res.purpose);
            this.setReadonly('purpose', true);
            this.setReadonly('transferInformation', true);

          }
        });
      }
      else if (this.getRoutingParam('mode') == 'V') {

        // this.setDisabled('paymentId', true);
        this.setDisabled('purpose', true);
        this.setHidden('disclaimer-box', true);
        this.setValue('paymentAmount', { amount: this.getValue('paymentAmount'), currencyCode: this.getValue('paymentCurrency') });
        this.setVariable("fromAccountVariable", this.getValue('sourceAccount'));
        this.setVariable("fromCurrencyVariable", this.getValue('debitCurrency'));
        this.setVariable("serviceCodeVariable", this.getValue('serviceCode'));
        this.setVariable("paymentAmountVariable", this.getValue('paymentAmount'));
        this.setVariable("debitAmountVariable", this.getValue('debitAmount'));
        this.setVariable("toAccountVariable", this.getValue('creditAccountNumber'));
        this.setVariable("scheduleTypeVariable", this.getValue('scheduleType'));
        this.setHidden('transferSummary', false);
        this.state.fromCurrencyVariable = this.getValue('debitCurrency');
        this.state.toCurrencyVariable = this.getValue('creditCurrency');
        this.state.rateApplied = this.getValue('rateApplied');
        // this.setAmountCurrencyList('paymentAmount',[{id:this.getValue('paymentCurrency'),text:this.getValue('paymentCurrency')}]);
        this.state.transferSummary.paymentId = this.getValue('paymentId');
        if (debitCurrencyVar != creditCurrencyVar) {
          this.setHidden('paymentSummary', false);
          this.state.paymentSummary.debitAmount = debitAmountVar + " " + debitCurrencyVar;
          this.state.paymentSummary.creditAmount = creditAmountVar + " " + creditCurrencyVar;
          this.state.paymentSummary.exchangeRate = '1' + " " + debitCurrencyVar + " = " + " " + this.getValue('rateApplied') + " " + creditCurrencyVar;
        }
        else {
          this.setHidden('paymentSummary', true);
        }
        if (this.getValue('scheduleType') == "2" || this.getValue('scheduleType') == "3") {
          this.state.transferSummary.paymentStatus = 'Active';
        }
        else {
          let statusVar = this.getRoutingParam('status');
          this.state.transferSummary.paymentStatus = statusVar;
        }
        if (this.getValue('scheduleType') == "2" || this.getValue('scheduleType') == "1") {
          this.setHidden('scheduleHandler', true);
        }
        else {

          if (paymentFrequencyVar == '8') {
            this.setHidden('scheduleHandler.paymentDaysInterval', false);
            this.setValue('scheduleHandler.paymentDaysInterval', paymentDaysIntervalVar);
          }
          this.setReadonly('scheduleHandler.paymentDaysInterval',true)

          this.setHidden('scheduleHandler', false);
          this.setHidden('scheduleHandler.numberOfPaymentsNote', true);
          this.setReadonly('scheduleHandler.paymentFrequency', true);
          this.setReadonly('scheduleHandler.numberOfPayments', true);
          this.setReadonly('scheduleHandler.endDate', true);
          this.setReadonly('paymentDaysInterval',true)
          // this.setValue('scheduleHandler.paymentFrequency', this.getValue('paymentFrequnecy'));
          this.setValue('scheduleHandler.paymentFrequency', paymentFrequencyVar);
          this.setValue('scheduleHandler.numberOfPayments', this.getValue('numberOfPayments'));
          this.setHidden('scheduleHandler.endDate', false);
          this.setValue('scheduleHandler.endDate', this.getValue('endDate'));
         
        }
        // console.log("set value chargesborn by ==. >>>");

        this.setValue('chargesAmount', { amount: this.getValue('chargesAmount'), currencyCode: this._appConfig.baseCurrency });
        // this.setHidden('disclaimer-box', true);
        this.setDisabled('purpose', false);
        this.setReadonly('purpose', false);
        this.setValue('purpose', this.getValue('purpose'));
        this.setReadonly('purpose', true);
      }

    }
    else {
      if (this.getRoutingParam('inventoryNumber')) {
        this.setValue('beneficiaryId', this.getRoutingParam('inventoryNumber'));
        this.setReadonly('beneficiaryId', true);
      }
      this.setValue('termsFlag', null)
      this.setValue("scheduleType", "1");
      // this.reset('sourceAccount');
      // this.reset('beneficiaryId');
      this.setValue('paymentAmount', { amount: 0, currencyCode: this._appConfig.baseCurrency });
      this.setHidden("paymentSummary", true);
      this.setValue('chargesAmount', { amount: 0, currencyCode: this._appConfig.baseCurrency });
      this.setHidden('scheduleHandler', true)

      // this.setValue('purpose', '001');
      this.setDisabled("creditAmount", true);
      this.setDisabled("creditCurrency", true);
      this.setDisabled("debitAmount", true);
      this.setDisabled("debitCurrency", true);
      this.setDisabled("paymentId", true);
      this.setDisabled("scheduleId", true);
      this.setDisabled("serviceCode", true);
      this.setReadonly('chargesAmount', true);
      this.setDisabled('paidInstallments', true);
      this.state.holiday = 0;
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
    if (value == "N" || value == "" || value == undefined || value == null) {
      this.setValue('termsFlag', null)
    }
  }
  public handleFormOnPresubmit(payload: any) {
    // WRITE CODE HERE TO HANDLE
    payload.chargesAmount = Number(this.getValue('chargesAmount').amount);
    payload.chargesCurrency = this.getValue('chargesAmount').currencyCode;
    if(payload.paymentDaysInterval ==""|| payload.paymentDaysInterval == undefined || payload.paymentDaysInterval ==null)
      {
        delete payload.paymentDaysInterval;
      }
    if (this.formMode == "ADD" && this.getRoutingParam("mode") == "M") {
      payload.operationMode = "M";
      payload.paymentAmount = this.getValue('paymentAmount').amount;
      payload.paymentCurrency = this.getValue("paymentAmount").currencyCode;
      payload.chargesAmount = this.getValue('chargesAmount').amount;
    } else if (this.formMode == "ADD" && this.getRoutingParam("mode") == "D") {
      payload.operationMode = "D";
      payload.paymentAmount = this.getValue('paymentAmount').amount;
      payload.paymentCurrency = this.getValue('paymentAmount').currencyCode;
      payload.chargesAmount = this.getValue('chargesAmount').amount;

    } else {
      payload.paymentAmount = this.getValue('paymentAmount').amount;
      payload.paymentCurrency = this.getValue("paymentAmount").currencyCode;
      // if (payload.scheduleType == "2" || payload.scheduleType == "3") {
      //   payload.operationMode = "A";
      // }
      if ((this.state.holiday == 1 || this.state.cutOffTimeVar == 1) && payload.scheduleType == '1') {

        payload.operationMode = "A";
        payload.scheduleType = '2';

      }
      payload.operationMode = "A";
      payload.chargesAmount = this.getValue('chargesAmount').amount;
    }
  }
  public onSourceAccountDataReceived: BaseFpxControlEventHandler = (
    payload: any
  ) => {
    // WRITE CODE HERE TO HANDLE
    if (payload) {
      this.state.debitAccountData = payload;

      this.setVariable('fromCurrencyVariable', payload.accountCurrency);
      this.state.fromCurrencyVariable = payload.accountCurrency;

      // this.setVariable("fromCurrencyVariable", payload.accountCurrency);
      // this.state.fromCurrencyVariable = payload.accountCurrency;
      this.setVariable("accountBalanceVariable", payload.availableBalance);
      this.state.accountBalanceVar = payload.availableBalance;
      this.setVariable('fromAccountVariable', payload.accountNumber);
      console.log(payload.accountCurrency);
      if ((this.state.modeVar == null || this.state.modeVar == "" || this.state.modeVar == undefined)) {
        if (!this.state.beneData) {
          this.setAmountCurrencyList('paymentAmount', [{
            id: payload.accountCurrency,
            text: payload.accountCurrency
          }]);
        }
        //if available patch both currency
        else {
          let data = [];
          if (payload.accountCurrency == this.state.beneData.currency) {
            this.setAmountCurrencyList('paymentAmount', [{
              id: payload.accountCurrency,
              text: payload.accountCurrency
            }]);
          }
          else {
            data.push({
              id: payload.accountCurrency,
              text: payload.accountCurrency
            });
            data.push({
              id: this.state.beneData.currency,
              text: this.state.beneData.currency
            });
            this.setAmountCurrencyList('paymentAmount', data);
          }
        }
        // this.setValue('paymentAmount', {amount: 0,currencyCode: payload.accountCurrency});
        this.setHidden('paymentSummary', true);
        this.cutOffTimeCheck();
      }
      // this.setValue('paymentAmount', payload.accountCurrency)

      //this.updatePaymentCurrencyList();
    }
  };

  public onBeneficiaryIdDataReceived: BaseFpxControlEventHandler = (
    payload: any
  ) => {
    // WRITE CODE HERE TO HANDLE
    if (payload) {
      let Date: any = this.momentService.getInstance();
      let currentDate: any = Date.format("YYYY-MM-DD");
      this.state.beneData = payload;
      this.setVariable("toCurrencyVariable", payload.currency);
      this.setVariable('beneficiaryIdVariable', payload.inventoryNumber);
      this.setVariable('toAccountVariable', payload.beneAccount);
      this.state.toCurrencyVariable = payload.currency;
      if ((this.state.modeVar == null || this.state.modeVar == "" || this.state.modeVar == undefined)) {
        this.setValue('paymentAmount', {
          amount: 0
        });
        let data = [];
        if (this.state.debitAccountData.accountCurrency == payload.currency && !this.state.debitAccountData.accountCurrency) {
          this.setAmountCurrencyList('paymentAmount', [{
            id: payload.currency,
            text: payload.currency
          }]);
        }

        else {
          if (payload.currency == this.state.debitAccountData.accountCurrency) {
            this.setAmountCurrencyList('paymentAmount', [{
              id: payload.currency,
              text: payload.currency
            }]);
          }
          else {
            data.push({
              id: payload.currency,
              text: payload.currency
            });
            data.push({
              id: this.state.debitAccountData.accountCurrency,
              text: this.state.debitAccountData.accountCurrency
            });
            this.setAmountCurrencyList('paymentAmount', data);
          }
        }


        this.setHidden('paymentSummary', true);
        if (this.getValue('scheduleType') == 1 || this.state.cutOffTimeVar == 1) {
          this.currencyHoliday();
          this.state.holiday = 1;
        }
        else {
          this.state.holiday = 0;
        }
        //this.updatePaymentCurrencyList();
      }
    }
  };

  contextmenuModelAfterClose: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
    let Date: any = this.momentService.getInstance();
    let currentDate: any = Date.format("YYYY-MM-DD");
    let futureDate: any = Date.add(1, "day").format("YYYY-MM-DD");

    if (payload == 1) {

      if (this.getValue('scheduleType') == 1) {
        this.setServiceCode('RETAILSCHSWIFT');
        this.setHidden('paymentDate', true);
        this.setDisabled('paymentDate', false);
        this.setValue('paymentDate', futureDate);
        this.setValue('nextPaymentDate', futureDate);
        this.setDataService(this._schduleIntlReq);
      }
    } else {
      if (this.deviceService.isMobile()) {
        this._router.navigate(['transfers-space']);
      }
      else {
        this._router.navigate(['transfers-space', 'transfers']);

      }
    }
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
          id: this.state.toCurrencyVariable,
          text: this.state.toCurrencyVariable,
        });
        selectCurrency = this.state.toCurrencyVariable;
      }
    }
    else if (this.state?.fromCurrencyVariable) {
      currencyList.push({
        id: this.state.fromCurrencyVariable,
        text: this.state.fromCurrencyVariable,
      });
      selectCurrency = this.state.fromCurrencyVariable;
    }

    this.setAmountCurrencyList("paymentAmount", currencyList);

    // setTimeout(()=>{
    //   this.setValue('paymentAmount', {
    //     currencyCode: selectCurrency
    //   });
    // });
  }

  public handlePaymentAmountOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    // WRITE CODE HERE TO HANDLE
    //tool generated code based on Orchestration Instructions

    this.setVariable('paymentAmountVariable', value.amount);
    if ((this.state.modeVar == null || this.state.modeVar == "" || this.state.modeVar == undefined)) {
      this.reset('chargesBorneBy', true)
      this.reset('chargesAmount', true);
    }
    // if (this.formGroup.controls["beneficiaryId"].value == null || this.formGroup.controls["beneficiaryId"].value == "" || this.formGroup.controls["beneficiaryId"].value == undefined) {
    //   this.setErrors("paymentAmount", 'beneNullError');
    //   this.setHidden("paymentSummary", true);
    // }
    // if (this.formGroup.controls["sourceAccount"].value == null || this.formGroup.controls["sourceAccount"].value == "" || this.formGroup.controls["sourceAccount"].value == undefined) {
    //   this.setErrors("paymentAmount", 'sourceAccNullError');
    //   this.setHidden("paymentSummary", true);
    // }
  };
  public handleScheduleTypeOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    // WRITE CODE HERE TO HANDLE
    //tool generated code based on Orchestration Instructions

    let Date: any = this.momentService.getInstance();
    let currentDate: any = Date.format("YYYY-MM-DD");
    let futureDate: any = Date.add(1, "day").format("YYYY-MM-DD");
    let futureMaxDate: any = Date.add(1, "Year").format("YYYY-MM-DD");
    if (value == "1") {
      // this.setHidden('paymentFrequency',true);
      // this.setHidden('numberOfPayments',true);
      // this.state.paymentDate.minDate = currentDate;


      if ((this.state.modeVar == null || this.state.modeVar == "" || this.state.modeVar == undefined)) {
        this.setValue('paymentAmount', {
          amount: 0
        });
        this.setHidden('paymentSummary', true);
        this.currencyHoliday();
      }
      this.setVariable('scheduleTypeVariable', value);
      this.setDisabled("endDate", true);
      this.setValue("paymentDate", currentDate);
      this.setReadonly("paymentDate", true);
      this.setHidden("scheduleHandler", true);
      this.setDisabled("paymentFrequency", true);
      this.setDisabled("numberOfPayments", true);
      this.setDataService(this.retailInternationalTransferFormService);
      this.setServiceCode("RETAILTRANSWIFT");
      this.setLabel("paymentDate", "RetailInternationalTransferForm.paymentDate.label");
      this.setDisabled("paymentDaysInterval", true);
      this.setVariable('serviceCodeVariable', 'RETAILTRANSWIFT');
      this._depHttpConfig.setCommonHeaderParams(this._depHttpConfig.serviceContextKey, "RETAILTRANSWIFT");
      if ((this.state.modeVar == null || this.state.modeVar == "" || this.state.modeVar == undefined)) {

        if (this.state.holiday == 1) {
          this.setHidden('paymentDate', true);
          this.setDisabled('paymentDate', false);
          this.setValue('paymentDate', futureDate);
          this.setDataService(this._schduleIntlReq);

        }
        // else if(this.state.holiday == 0){
        // this.setHidden()
        // }
        // this.cutOffTimeCheck();
        if (this.state.cutOffTimeVar == 1) {
          this.cutOffValidation();
        }
      }


    }
    if (value == "2") {
      if ((this.state.modeVar == null || this.state.modeVar == "" || this.state.modeVar == undefined)) {
        this.setValue('paymentAmount', {
          amount: 0
        });
        this.setHidden('paymentSummary', true);
        this.currencyHoliday();
      }
      if ((this.state.modeVar == null || this.state.modeVar == "" || this.state.modeVar == undefined)) {

        if (this.state.holiday == 1) {
          this.setHidden('paymentDate', true);
          this.setDisabled('paymentDate', false);
          this.setValue('paymentDate', futureDate);
          this.setDataService(this._schduleIntlReq);

        }
      }
      this.setVariable('scheduleTypeVariable', value);
      this.setHidden("paymentDate", false);
      this.reset("paymentDate", "");
      this.state.paymentDate.minDate = futureDate;
      this.state.paymentDate.maxDate = futureMaxDate;
      this.setValue("paymentDate", futureDate);
      this.setHidden('paymentDate', false);
      this.setDisabled('paymentDate', false);
      this.setValue('iscutOffExceed', 1);
      this.setHidden("scheduleHandler", true);
      this.setDisabled("endDate", true);
      this.setDisabled("numberOfPayments", true);
      this.setDisabled("paymentFrequency", true);
      this.setReadonly("paymentDate", false);
      this.setServiceCode("RETAILSCHSWIFT");
      this._depHttpConfig.setCommonHeaderParams(this._depHttpConfig.serviceContextKey, "RETAILSCHSWIFT");

      this.setDataService(this._schduleIntlReq);
      // this.setLabel("paymentDate", "Payment Date");
      this.setLabel("paymentDate", "RetailInternationalTransferForm.executionDate.label");
      this.setDisabled("paymentDaysInterval", true);
      this.setVariable('serviceCodeVariable', 'RETAILSCHSWIFT');
    }
    if (value == "3") {
      if ((this.state.modeVar == null || this.state.modeVar == "" || this.state.modeVar == undefined)) {
        this.setValue('paymentAmount', {
          amount: 0
        });
        this.setHidden('paymentSummary', true);
      }
      this.setHidden("paymentDate", false);
      this.setVariable('scheduleTypeVariable', value);
      // this.setLabel("paymentDate", "Start Date");
      this.setLabel("paymentDate", "RetailInternationalTransferForm.startDate.label");
      this.state.paymentDate.minDate = futureDate;
      this.state.paymentDate.maxDate = futureMaxDate;
      this.setHidden("scheduleHandler", false);
      this.setValue("paymentDate", futureDate);
      this.setReadonly("paymentDate", false);
      this.setHidden('paymentDate', false);
      this.setDisabled('paymentDate', false);
      this.setValue('iscutOffExceed', 1);
      // this.setDisabled("endDate", false);
      this.setServiceCode("RETAILSCHSWIFT");
      this._depHttpConfig.setCommonHeaderParams(this._depHttpConfig.serviceContextKey, "RETAILSCHSWIFT");

      // this.setHidden("scheduleHandler", false);
      this.setDataService(this._schduleIntlReq);
      this.setVariable('serviceCodeVariable', 'RETAILSCHSWIFT');
    }
  };
  public handlePaymentDateOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    // WRITE CODE HERE TO HANDLE
    //tool generated code based on Orchestration Instructions

    let paymentFrequencyVar: any = this.getValue("paymentFrequency");
    let numberOfPaymentsVar: any = this.getValue("numberOfPayments");

    let installment: any = this.getValue("numberOfPayments");
    if (
      value &&
      status == "VALID" &&
      installment != null &&
      installment != ""
    ) {

    } if (value && (this.getValue('scheduleType') == 2 || this.getValue('scheduleType') == 3)) {
      this.cutOffTimeCheckSchTran();
    }
  };
  public handlePurposeOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    // WRITE CODE HERE TO HANDLE
    //tool generated code based on Orchestration Instructions
  };


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
    }
  };
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
  public onExchangeRateDataReceived: BaseFpxControlEventHandler = (
    payload: any
  ) => {
    if (payload.zeroValue) {
      this.setHidden('paymentSummary', true);
    }
    else if (this.state.fromCurrencyVariable == this.state.toCurrencyVariable) {
      this.setHidden('paymentSummary', true);
    this.setVariable('paymentAmountVariable', payload.debitAmount);
      this.setValue('rateApplied', payload.exchangeRate);
      this.setValue('baseRateApplied', payload.baseRate);
      this.setVariable('debitAmountVariable', payload.debitAmount);
      // this.state.amount = payload.debitAmount;
    } else if (payload.creditAmount == null || payload.creditAmount == "" || payload.creditAmount == undefined) {
      this.setHidden("paymentSummary", true);
    } else if (payload.debitAmount == null || payload.debitAmount == "" || payload.debitAmount == undefined) {
      this.setHidden("paymentSummary", true);
    }
    else {
      this.setVariable('debitAmountVariable', payload.debitAmount);
    this.setVariable('paymentAmountVariable', payload.debitAmount);
      // this.state.amount = payload.debitAmount;
      this.setHidden('paymentSummary', false);
      this.setValue('rateApplied', payload.exchangeRate);
      this.setValue('baseRateApplied', payload.baseRate);
      this.state.paymentSummary.exchangeRate = '1' + " " + this.state.fromCurrencyVariable + " = " + " " + payload.exchangeRate + " " + this.state.toCurrencyVariable;
      this.state.paymentSummary.debitAmount = payload.debitAmount + " " + this.state.fromCurrencyVariable;
      this.state.paymentSummary.creditAmount = payload.creditAmount + " " + this.state.toCurrencyVariable;
    }
    if(this.getRoutingParam('mode') =='R' || this.getRoutingParam('mode') =='V'){
     if(this.state.fromCurrencyVariable != this.state.toCurrencyVariable){
      this.setHidden('paymentSummary', false);
      this.state.paymentSummary.exchangeRate = '1' + " " + this.state.fromCurrencyVariable + " = " + " " + this.state.rateApplied + " " + this.state.toCurrencyVariable;
      this.state.paymentSummary.debitAmount = payload.debitAmount + " " + this.state.fromCurrencyVariable;
      this.state.paymentSummary.creditAmount = this.getValue('creditAmount') + " " + this.state.toCurrencyVariable;
     }
    }
  };

  public onChargesRateDataReceived: BaseFpxControlEventHandler = (payload: any) => {
    if ((this.state.modeVar == 'M' || this.state.modeVar == "" || this.state.modeVar == undefined || this.state.modeVar == 'R')) {
      if (payload.insufficientBalance) {
        const fpxModal = new FpxModal();
        fpxModal.setComponent(DepAlertComponent);
        fpxModal.setDisableClose(false);
        fpxModal.setPanelClass('dep-alert-popup');
        fpxModal.setBackDropClass('dep-popup-back-drop');
        fpxModal.setData({
          title: "RetailSchedulePaymentTemplateComponent.delAlertTtl",
          message: "Your total transaction amount with charges " + payload.totalAmount + " " + this._appConfig.baseCurrency + " is greater than Available Balance",
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
  }

  public override doPostInit(): void {
    this.scheduleHandler = this.formGroup.get("scheduleHandler") as FormGroup;
    this.addValueChangeHandler(
      "paymentAmount",
      this.handlePaymentAmountOnvalueChange
    );
    this.addValueChangeHandler(
      "paymentDate",
      this.handlePaymentDateOnvalueChange
    );
    this.addValueChangeHandler("purpose", this.handlePurposeOnvalueChange);

    this.addValueChangeHandler(
      "scheduleType",
      this.handleScheduleTypeOnvalueChange
    );
    this.addValueChangeHandler(
      "scheduleHandler",
      this.handleScheduleHandlerOnvalueChange
    );
    this.addControlEventHandler(
      "exchangeRateReceived",
      this.onExchangeRateDataReceived
    );
    this.addControlEventHandler("chargesRateReceived", this.onChargesRateDataReceived);
    this.addValueChangeHandler("remarks", this.handleRemarksOnvalueChange);
    this.addValueChangeHandler("termsFlag", this.handleTermsFlagOnvalueChange);
    this.handleFormOnLoad();
    this.addResetHandler('reset', this._onReset);


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
  addNewBene() {
    let beneServicode = 'RETAILBENEINTL'
    let _serviceDetail: any
    _serviceDetail = this._serviceCodeDetails.getServiceDetails(beneServicode);
    this._router.navigate(_serviceDetail.servicePath);
  }

  public override preSubmitInterceptor(payload: InternationalTransfer): any {
    // WRITE CODE HERE TO HANDLE
    this.handleFormOnPresubmit(payload);
    return payload;
  }

  public override postDataFetchInterceptor(payload: InternationalTransfer) {
    // WRITE CODE HERE TO HANDLE
    // console.log("post datafetch interceptor", payload);

    return payload;
  }


  public override postSubmitInterceptor(response: any): RoutingInfo {
    // let routingInfo: RoutingInfo = new RoutingInfo();
    // console.log(response);
    let routingInfo: RoutingInfo = new RoutingInfo();
    this.handleFormOnPostsubmit(response, routingInfo);
    // this._appConfig.clearData();
    return routingInfo;
  }
  //$START_CUSTOMSCRIPT\n
  //$END_CUSTOMSCRIPT\n
  public handleFormOnPostsubmit(response: any, routingInfo: any) {
    // WRITE CODE HERE TO HANDLE

    if (response.success) {
      let res = response.success?.body?.internationalTransfer || response.success?.body?.scheduleIntlReq;
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



  currencyHoliday() {
    let Date: any = this.momentService.getInstance();
    let currentDate: any = Date.format("YYYY-MM-DD");
    let futureDate: any = Date.add(1, "day").format("YYYY-MM-DD");
    if (this.state.toCurrencyVariable) {
      this._validatorService.currencyHolidayCheck(this.state.toCurrencyVariable).subscribe({
        next: (res) => {
          if (this.getValue('scheduleType') == 1 && this.state.cutOffTimeVar == 0)
            this.setHidden('paymentDate', false);
          // this.setValue('paymentDate', currentDate);
          this.state.holiday = 0;
          // this.setValue("scheduleType", "1");
        },
        error: (reason) => {
          let error = reason.error;
          const fpxModal = new FpxModal();
          fpxModal.setComponent(DepConfirmationComponent);
          fpxModal.setDisableClose(false);
          fpxModal.setPanelClass('dep-alert-popup');
          fpxModal.setBackDropClass('dep-popup-back-drop');
          fpxModal.setData({
            title: "Confirm",
            message: "RetailInternationalTransferForm.currencyHoliday.text",
            okBtnLbl: "Yes",
            cancelBtnLbl: "No"
          });
          fpxModal.setAfterClosed(this.contextmenuModelAfterClose);
          this.openModal(fpxModal);

        }
      });
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

  cutOffTimeCheckSchTran() {
    this._validatorService.validateSchTranChecklist({
      "serviceCode": "RETAILTRANSWIFT",
      "paymentDate": this.getValue('paymentDate')
    }).subscribe({
      next: (res) => {

      },
      error: (reason) => {
        this.state.errorCode = reason.error.ErrorCode;
        this.state.nextPaymentDate = reason.error.nextPaymentDate;
        this._appConfig.setData("iserror", reason.error.ErrorCode);
        this._appConfig.setData("nextPaymentDate", reason.error.nextPaymentDate);
        let cutOffTimeErrVar = this._appConfig.getData('iserror');
        let nextPaymentDate = this._appConfig.getData('nextPaymentDate');
        if ((cutOffTimeErrVar == 'DEPERR900017')) {
          this.state.cutOffTimeVar = 1;
          this._appConfig.setData('cutOffTypeErr', cutOffTimeErrVar);
          const fpxModal = new FpxModal();
          fpxModal.setComponent(DepConfirmationComponent);
          fpxModal.setDisableClose(false);
          fpxModal.setPanelClass('dep-alert-popup');
          fpxModal.setBackDropClass('dep-popup-back-drop');
          fpxModal.setData({
            title: "RetailSchedulePaymentTemplateComponent.delAlertTtl",
            message: "The International payment system is unavailable due to a holiday.It will be processed on the next business day (" + nextPaymentDate + ").Are you sure you want to proceed?",
            okBtnLbl: "bene-advice-control.Y",
            cancelBtnLbl: "bene-advice-control.N"
          });
          fpxModal.setAfterClosed(this.validateCheckcontextmenuModelAfterCloseSch);
          this.openModal(fpxModal);
        }
        else {
          this.state.cutOffTimeVar = 0;
        }
      }
    });
  }
  cutOffTimeCheck() {
    let cutOffTimeErrVar = this._appConfig.getData('iserror');
    let nextPaymentDate = this._appConfig.getData('nextPaymentDate');
    if ((cutOffTimeErrVar == 'DEPERR90002')) {
      this.state.cutOffTimeVar = 1;
      this._appConfig.setData('cutOffTypeErr', cutOffTimeErrVar);
      const fpxModal = new FpxModal();
      fpxModal.setComponent(DepConfirmationComponent);
      fpxModal.setDisableClose(false);
      fpxModal.setPanelClass('dep-alert-popup');
      fpxModal.setBackDropClass('dep-popup-back-drop');
      fpxModal.setData({
        title: "RetailSchedulePaymentTemplateComponent.delAlertTtl",
        message: "Today,International payment system is holiday.It will be processed on the next business day (" + nextPaymentDate + ").Are you sure you want to proceed?",
        okBtnLbl: "bene-advice-control.Y",
        cancelBtnLbl: "bene-advice-control.N"
      });
      fpxModal.setAfterClosed(this.validateCheckcontextmenuModelAfterClose);
      this.openModal(fpxModal);
    }
    else if ((cutOffTimeErrVar == 'DEPERR90001') || (cutOffTimeErrVar == 'DEPERR900016') || (cutOffTimeErrVar == 'DEPERR90002') && this.state.holiday == 0) {
      this.state.cutOffTimeVar = 1;
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
    else {
      this.state.cutOffTimeVar = 0;
    }
  }
  cutOffValidation() {
    let Date: any = this.momentService.getInstance();
    let currentDate: any = Date.format("YYYY-MM-DD");
    let futureDate: any = Date.add(1, "day").format("YYYY-MM-DD");
    let nextPaymentDate: any = moment(this._appConfig.getData('nextPaymentDate')).format("YYYY-MM-DD");
    if (this._appConfig.getData('cutOffTypeErr') == 'DEPERR900016') {
      this.setServiceCode('RETAILSCHSWIFT');
      this.setHidden('paymentDate', true);
      this.setDisabled('paymentDate', false);
      this.setValue('paymentDate', futureDate);
      this.setValue('nextPaymentDate', nextPaymentDate);
      this.setDataService(this._schduleIntlReq);
      this.setValue('iscutOffExceed', 1);
    } else if (this._appConfig.getData('cutOffTypeErr') == 'DEPERR90002') {
      this.setServiceCode('RETAILSCHSWIFT');
      this.setHidden('paymentDate', true);
      this.setDisabled('paymentDate', false);
      this.setValue('paymentDate', nextPaymentDate);
      this.setValue('nextPaymentDate', nextPaymentDate);
      this.setDataService(this._schduleIntlReq);
      this.setValue('iscutOffExceed', 1);
    } else if (this.state.errorCode == 'DEPERR900017') {
      this.setServiceCode('RETAILSCHSWIFT');
      this.setHidden('paymentDate', false);
      this.setReadonly('paymentDate', false);
      this.setDisabled('paymentDate', false);
      this.setValue('paymentDate', nextPaymentDate);
      this.setValue('nextPaymentDate', nextPaymentDate);
      this.setDataService(this._schduleIntlReq);
      this.setValue('iscutOffExceed', 1);
    }
    else {
      this.setServiceCode('RETAILSCHSWIFT');
      this.setHidden('paymentDate', false);
      this.setDisabled('paymentDate', false);
      this.setValue('paymentDate', currentDate);
      this.setValue('nextPaymentDate', currentDate);
      this.setDataService(this._schduleIntlReq);
      this.setValue('iscutOffExceed', 1);
    }
  }
}
