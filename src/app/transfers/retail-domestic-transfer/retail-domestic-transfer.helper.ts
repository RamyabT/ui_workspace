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
  FpxAppConfig,
  FpxModalAfterClosed
} from "@fpx/core";
import { Observable, map, of } from "rxjs";
import { Router } from "@angular/router";
import { DomestictransferService } from '../domestictransfer-service/domestictransfer.service';
import { Domestictransfer } from '../domestictransfer-service/domestictransfer.model';
import { MomentService } from "src/app/foundation/validator-service/moment-service";
import { SidomreqService } from "../sidomreq-service/sidomreq.service";
import { SidomService } from "../sidom-service/sidom.service";
import { Completedpymnts } from "../completedpymnts-service/completedpymnts.model";
import { CompletedpymntsService } from "../completedpymnts-service/completedpymnts.service";
import { PymtsService } from "../pymts-service/pymts.service";
import { TranslateModule } from "@ngx-translate/core";
import { AppConfigService, CommonValidatorService, DepHttpConfig } from "@dep/services";
import { DepAlertComponent } from "src/app/dep/core/component/dep-alert/dep-alert.component";
import moment from "moment";
import { DepConfirmationComponent } from "src/app/dep/core/component/dep-confirmation/dep-confirmation.component";
import { DeviceDetectorService } from "@dep/core";
export class RetailDomesticTransferFormState extends BaseFpxComponentState {
  private _appConfig: AppConfigService = inject(AppConfigService);
  showSuggestion: boolean = false;
  paymentAmount: any = {
    isCurrEditable: true,
    CurrencyList: [],
    amountInWords: true,
    initCurrency: this._appConfig.baseCurrency,
    defaultFetch: true,
  };

  chargesAmount: any = {
    isCurrEditable: true,
    CurrencyList: [],
    amountInWords: false,
    initCurrency: this._appConfig.baseCurrency,
    defaultFetch: true,
  }
  paymentDate: any = {
    minDate: "",
    maxDate: "",
  }
  termsFlag: any = {
    textPosition: "after",
    ckValues: { checked: "Y", unchecked: "N" }
  }
  fromCurrencyVariable: any;
  toCurrencyVariable: any;
  paymentSummary: any = {
    debitAmount: "",
    creditAmount: "",
    exchangeRate: "",
    chargesAmount: ""
  };
  debitAccountData: any;
  accountBalanceVar: any;
  beneData: any;
  modeVar: any;
  numberOfPaymentVar: any;
  transferSummary: any = {
    paymentId: "",
    paymentStatus: "",
    statusCode: ""
  };
  errorCode :any = "";
  nextPaymentDate : any;
  balanceVar: any;
  ipiAllowed: any;
  ftsAllowed: any;
  ippAllowed: any;
  paidInstallments: any;
  globalHolidayVar = 0;
  chargesBorneData: any;
  cutOffTimeVar=0;
}


@Injectable()
export class RetailDomesticTransferFormHelper extends BaseFpxFormHelper<RetailDomesticTransferFormState>{
  private _serviceCodeDetails: FpxAppConfig = inject(FpxAppConfig);
  private _depHttpConfig: DepHttpConfig = inject(DepHttpConfig);

  constructor(private retailDomesticTransferFormService: DomestictransferService,
    private _httpProvider: HttpProviderService,
    private _router: Router,
    private momentService: MomentService,
    private sidomreqService: SidomreqService,
    private sidomService: SidomService,
    private completedPaymentService: PymtsService,
    private _currencyFormatter: FpxCurrenyFormatterPipe,
    private _loader: TranslateModule,
    private _validatorService :CommonValidatorService,
    private _appConfig: AppConfigService,
    public deviceService: DeviceDetectorService) {
    super(new RetailDomesticTransferFormState());
  }

  override doPreInit(): void {
    let mode: any = this.getRoutingParam('mode');
    this.state.modeVar = this.getRoutingParam('mode');
    let paymentId: any = this.getRoutingParam('paymentId');
    let serviceCode: any = this.getRoutingParam('serviceCode');
    let inventoryNumber = this.getRoutingParam('inventoryNumber');
    this.setHidden('transferSummary', true);
    let data: any = [];
    data.push({ id: '0', text: 'Please select'});
    data.push({ id: '1', text: 'Applicant (OUR)' });
    data.push({ id: '2', text: 'Both (SHA)' });
    data.push({ id: '3', text: 'Beneficiary (BEN)' });
    this.state.chargesBorneData = data;


    if (paymentId && mode && serviceCode == 'RETAILSCHDOM') {
      this.setShellBtnMethod('reset', this.handleFormOnLoad);
      this.setServiceCode("RETAILSCHDOM");
      this.setDataService(this.sidomService)


    }
    else if (paymentId && mode && serviceCode == 'RETAILSCHFTS') {
      this.setShellBtnMethod('reset', this.handleFormOnLoad);
      this.setServiceCode("RETAILSCHFTS");
      this.setDataService(this.sidomService)


    }
    else {
      this.setShellBtnMethod('reset', this.handleFormOnLoad);
      this.setServiceCode("RETAILTRANDOMESTIC");
      this.setDataService(this.retailDomesticTransferFormService);
    }
    // this.setRepairableControls(['paymentAmount', 'sourceAccount']);
    this.addControlEventHandler("sourceAccountDataReceived", this.onSourceAccountDataReceived);
    this.addControlEventHandler("beneficiaryIdDataReceived", this.onBeneficiaryIdDataReceived);


  }

  private _onReset = () => {
    if (this.state.modeVar == 'M' || this.state.modeVar == "R" || this.state.modeVar=='D'){
    this.handleFormOnLoad();
    }
    else{
      this.reset('sourceAccount');
      this.setAmountCurrencyList('paymentAmount',[{id:this._appConfig.baseCurrency,text:this._appConfig.baseCurrency}]);
      this.setValue('paymentAmount',{amount:0.00})
      this.formGroup.controls['paymentAmount'].setErrors({required:false},{emitEvent:false});
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
      this.reset('transferType');
      this.reset('purpose');
      this.reset('remarks');
      this.reset('chargesAmount');
      this.setHidden('scheduleHandler',true);
      this.setHidden('paymentSummary',true);
      // this.setValue('chargesAmount',{amount:5.00})
    }
  }

  public handleFormOnLoad() {
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
      let purposeVar = this.getValue('purpose');
      let chargesAmountVar=this.getValue('chargesAmount');

      if (paymentId && mode == 'M' || mode == 'D') {
        this.setStaticDropdown('chargesBorneBy', this.state.chargesBorneData);
        this.sidomService.findByKey(routingParam)().subscribe((res) => {
          console.log("Response", res);
          if (res) {
            if (mode == 'M') {
              this.patchValue(res);
              this.setReadonly('sourceAccount', true);
              this.setValue('chargesBorneBy', this.getValue('chargesBorneBy'));
              this.setValue('transferType', this.getValue('transferType'))
              this.setValue('remarks', this.getValue('remarks'))
              this.setHidden('refNo', true);
              this.setErrors('paymentAmount', '');
              this.setDisabled('paymentId', true);
              this.setValue('termsFlag', "N");
              this.setValue('scheduleId', res.paymentId);
              this.setHidden('paymentSummary', false);
              this.setVariable('debitAmountVariable', res.debitAmount);
              this.setVariable('fromCurrencyVariable', res.debitCurrency);
              this.state.fromCurrencyVariable = res.debitCurrency;
              this.setVariable('toCurrencyVariable', res.creditCurrency);
              this.state.toCurrencyVariable = res.creditCurrency;
              this.setVariable("fromAccountVariable", res?.sourceAccount);
              this.setVariable("fromCurrencyVariable", res?.debitCurrency);
              this.setVariable("serviceCodeVariable", res?.serviceCode);
              this.setVariable("paymentAmountVariable", res?.paymentAmount);
              this.setVariable("toAccountVariable", res?.creditAccountNumber);
              this.setVariable("beneficiaryIdVariable", res?.beneficiaryId);
              this.setVariable("scheduleTypeVariable", res?.scheduleType);
              this.setValue('paymentAmount', { amount: res?.paymentAmount, currencyCode: res?.paymentCurrency });
              this.setReadonly('paymentAmount', true);
              this.setReadonly('beneficiaryId', true);
              this.setReadonly('scheduleType', true);
              this.setReadonly('chargesBorneBy', true);
              this.setReadonly('paymentDate', true);
              this.setReadonly('purpose', true);
              this.setReadonly('transferType', true);
              this.setReadonly('scheduleHandler.paymentFrequency', true);
              this.setValue('rateApplied', res?.rateApplied);
              this.setValue('baseRateApplied', res?.baseRateApplied);
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
              else if (this.getValue('scheduleType') == "1") {
                this.setHidden('scheduleHandler', true);
                this.setReadonly('paymentDate', true);
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
                this.state.paidInstallments = res?.paidInstallments;
                this.setHidden('scheduleHandler.endDate', false);
                this.setValue('scheduleHandler.endDate', res?.endDate);
                this.setReadonly('scheduleHandler.paymentFrequency', true);
                this.setReadonly('scheduleHandler.endDate', true);
                // this.reset('remarks', true);
                if (!res.numberOfPayments) {
                  this.setHidden("scheduleHandler.endDate", true);
                }
              }
              this.setVariable("fromAccountVariable", res?.sourceAccount);
              this.setVariable("fromCurrencyVariable", res?.debitCurrency);
              this.setVariable("serviceCodeVariable", res?.serviceCode);
              this.setVariable("paymentAmountVariable", res?.paymentAmount);
              this.setVariable("toAccountVariable", res?.creditAccountNumber);
              this.setValue('purpose', res?.purpose);
              this.setValue('chargesBorneBy', res?.chargesBorneBy);
              // console.log("set value chargesborn by ==. >>>");

              this.setValue('chargesAmount', { amount: res?.chargesAmount, currencyCode: this._appConfig.baseCurrency });
              this.setValue('transferType', res?.transferType);
              this.setReadonly('transferType', true);
              this.setReadonly('transferInformation',true);
              // this.setValue('purpose', purposeVar);
              // this.setValue('chargesBorneBy', res?.chargesBorneBy);
              // // console.log("set value chargesborn by ==. >>>");

              // this.setValue('chargesAmount', { amount: res?.chargesAmount, currencyCode: this._appConfig.baseCurrency });
            }
            if (mode == 'D') {
              this.setStaticDropdown('chargesBorneBy', this.state.chargesBorneData);
              this.patchValue(res);
              this.setValue('termsFlag','N');
              this.setHidden('refNo', true);
              this.setDisabled('paymentId', true);
              this.setValue('scheduleId', res.paymentId);
              this.setHidden('paymentSummary', false);
              this.setVariable('debitAmountVariable', res.debitAmount);
              this.setVariable('fromCurrencyVariable', res.debitCurrency);
              this.state.fromCurrencyVariable = res.debitCurrency;
              this.setVariable('toCurrencyVariable', res.creditCurrency);
              this.state.toCurrencyVariable = res.creditCurrency;
              this.setVariable('paymentAmountVariable', res?.paymentAmount);
              this.setVariable("scheduleTypeVariable", res?.scheduleType);
              this.setVariable("fromAccountVariable", res?.sourceAccount);
              this.setVariable("fromCurrencyVariable", res?.debitCurrency);
              this.setVariable("serviceCodeVariable", res?.serviceCode);
              this.setVariable("paymentAmountVariable", res?.paymentAmount);
              this.setVariable("toAccountVariable", res?.creditAccountNumber);
              this.setVariable("beneficiaryIdVariable", res?.beneficiaryId);
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
              this.setReadonly('beneficiaryAdvice', true);
              this.setReadonly('beneficiaryEmail', true);
              this.setValue('chargesAmount', { amount: res?.chargesAmount });
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
              // this.setValue('purpose', res?.purpose);
              this.setValue('chargesBorneBy', res?.chargesBorneBy);

              if (res?.paymentFrequency == '8') {
                this.setHidden('scheduleHandler.paymentDaysInterval', false);
                this.setValue('scheduleHandler.paymentDaysInterval', res.paymentDaysInterval);
                this.setReadonly('scheduleHandler.paymentDaysInterval', true);
              }
              this.setValue('transferType', res?.transferType);
              this.setReadonly('transferType', true);
              this.setValue('chargesAmount', res?.chargesAmount);
            }
            this.setReadonly('transferInformation',true);


          }
        });
      }
      else if (this.getRoutingParam('mode') == 'R') {
        this.setStaticDropdown('chargesBorneBy', this.state.chargesBorneData);

        this.retailDomesticTransferFormService.findByKey(routingParam)().subscribe((res) => {
          if (res) {
            this.patchValue(res);
            this.reset('paymentAmount', {
              amount: 0,
              currencyCode: this._appConfig.baseCurrency
            });
            this.setVariable('debitAmountVariable', this.getValue('debitAmount'));
            this.setVariable("fromAccountVariable", res?.sourceAccount);
            this.setVariable("fromCurrencyVariable", res?.debitCurrency);
            this.setVariable("serviceCodeVariable", res?.serviceCode);
            this.setVariable("paymentAmountVariable", res?.paymentAmount);
            this.setVariable("toAccountVariable", res?.creditAccountNumber);
            this.setVariable('toCurrencyVariable', res.creditCurrency);
            this.setVariable("scheduleTypeVariable", res?.scheduleType);
            this.setVariable('accountBalanceVariable', this.state.accountBalanceVar);
            this.setValue('paymentAmount', { amount: res?.paymentAmount, currencyCode: res?.paymentCurrency });
            this.setAmountCurrencyList('paymentAmount',[{
              id:res?.paymentCurrency,
              text:res?.paymentCurrency
           }])
            let Date: any = this.momentService.getInstance();
            let currentDate: any = Date.format("YYYY-MM-DD");
            this.setValue('paymentDate', currentDate);
            this.setReadonly('paymentDate', true);
            this.setReadonly('beneficiaryId', true);
            this.setDisabled('paymentId', true);
            this.state.fromCurrencyVariable = res.debitCurrency;
            this.state.toCurrencyVariable = res.creditCurrency;
            this.setValue('scheduleHandler.paymentFrequency', res?.paymentFrequency);
            this.setValue('scheduleHandler.numberOfPayments', res?.numberOfPayments);
            this.setValue('rateApplied', res?.rateApplied);
            this.setValue('baseRateApplied', res?.baseRateApplied);
            // this.setValue('chargesAmount', res.chargesAmount);
            this.setValue('chargesAmount', { amount: res?.chargesAmount, currencyCode: this._appConfig.baseCurrency });
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
          }
          this.setValue('termsFlag', "N");
          this.setValue('chargesBorneBy', res?.chargesBorneBy);
          this.setReadonly('chargesBorneBy',true);
          // this.setValue('chargesAmount', { amount: res?.chargesAmount, currencyCode: this._appConfig.baseCurrency });
          this.setReadonly('sourceAccount', true);
          this.setReadonly('beneficiaryId', true);
          this.setReadonly('scheduleType', true);
          this.setValue('transferType', res?.transferType);
          this.setReadonly('transferType', true);
          // this.setValue('chargesAmount', res?.chargesAmount);
          this.setValue('purpose', res?.purpose);
          this.setReadonly('purpose',true);
        });
      }
      else if (this.getRoutingParam('mode') == 'V') {
        this.setHidden('disclaimer-box',true);
        this.setStaticDropdown('chargesBorneBy', this.state.chargesBorneData);
        this.setValue('paymentAmount', { amount: this.getValue('paymentAmount'), currencyCode: this.getValue('paymentCurrency') });
        this.setValue('transferType',this.getValue('transferType'));
        this.setValue('chargesAmount',{amount:this.getValue('chargesAmount'),currencyCode: this._appConfig.baseCurrency});
        this.setVariable('debitAmountVariable', this.getValue('debitAmount'));
        this.setVariable("fromAccountVariable", this.getValue('sourceAccount'));
        this.setVariable('debitAmountVariable', this.getValue('debitAmount'));
        this.setVariable("fromCurrencyVariable", this.getValue('debitCurrency'));
        this.setVariable("serviceCodeVariable", this.getValue('serviceCode'));
        this.setVariable("paymentAmountVariable", this.getValue('paymentAmount'));
        this.setVariable("toAccountVariable", this.getValue('creditAccountNumber'));
        this.setVariable("scheduleTypeVariable", this.getValue('scheduleType'));
        this.setHidden('transferSummary', false);
        this.state.transferSummary.paymentId = this.getValue('paymentId');
        if(debitCurrencyVar!=creditCurrencyVar){
          this.setHidden('paymentSummary',false);
          this.state.paymentSummary.debitAmount = debitAmountVar+ " "+ debitCurrencyVar;
          this.state.paymentSummary.creditAmount =creditAmountVar+ " " +creditCurrencyVar;
          this.state.paymentSummary.exchangeRate = '1' + " " + debitCurrencyVar + " = " +  " " + this.getValue('rateApplied') + " "+creditCurrencyVar;
        }
        else{
          this.setHidden('paymentSummary',true);
        }
        // this.setValue('chargesAmount', { amount: 100 });
        // this.setAmountCurrencyList('chargesAmount', [{ id: this._appConfig.baseCurrency, text: this._appConfig.baseCurrency }]);


        if (this.getValue('scheduleType') == "2" || this.getValue('scheduleType') == "1") {
          this.setHidden('scheduleHandler', true);
        }
        else {
          if (paymentFrequencyVar == '8') {
            this.setHidden('scheduleHandler.paymentDaysInterval', false);
            this.setValue('scheduleHandler.paymentDaysInterval', paymentDaysIntervalVar);
            this.setReadonly('scheduleHandler.paymentDaysInterval', true);
          }
          this.setReadonly('scheduleHandler.paymentDaysInterval', true);
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
        this.setValue('chargesBorneBy', this.getValue('chargesBorneBy'));
        // console.log("set value chargesborn by ==. >>>");

        // this.setValue('chargesAmount', { amount: chargesAmountVar, currencyCode: this._appConfig.baseCurrency });
        this.setHidden('disclaimer-box', true);
        this.setValue('purpose',purposeVar);
      }
    }

    else {
      // this.setValue('transferType', "1");
      // this.setValue('chargesBorneBy', "1");
      if (this.getRoutingParam('inventoryNumber')) {
        this.setValue('beneficiaryId', this.getRoutingParam('inventoryNumber'));
        this.setReadonly('beneficiaryId', true);
      }
      this.setHidden('paymentSummary', true);
      this.setValue('termsFlag',null)
      this.setValue('chargesAmount', { amount: 0 });
      // this.setAmountCurrencyList('chargesAmount', [{ id: this._appConfig.baseCurrency, text: this._appConfig.baseCurrency }]);
      this.setReadonly('chargesAmount', true);
      // this.setValue('purpose', "001");
      this.setDisabled('creditAmount', true);
      this.setDisabled('creditCurrency', true);
      this.setDisabled('debitAmount', true);
      this.setDisabled('debitCurrency', true);
      this.setDisabled('paymentId', true);
      this.setDisabled('scheduleId', true);
      this.setDisabled('paidInstallments', true);
      this.setReadonly('chargesAmount', true);
      this.setValue('scheduleType', "1");
      this.setValue('iscutOffExceed', 0);
      this.setVariable('toCurrencyVariable', this._appConfig.baseCurrency);
      this.setVariable('toAccCurr', this._appConfig.baseCurrency);
      this.setDisabled('serviceCode', true);
      this.setDisabled('creditAccountNumber', true);
      this.setStaticDropdown('chargesBorneBy', this.state.chargesBorneData);
    }
  }

  public handleFormOnPresubmit(payload: any) {
    // WRITE CODE HERE TO HANDLE
    payload.decision ='A';
    payload.chargesAmount = Number(this.getValue('chargesAmount').amount);
    payload.creditAccountNumber =this.state.beneData.creditAccountNumber;
    payload.chargesCurrency = this.getValue('chargesAmount').currencyCode;
    if (this.formMode == 'ADD' && this.getRoutingParam('mode') == 'M') {
      payload.operationMode = "M";
      // payload.paymentId=this.getRoutingParam('paymentId');
      payload.paymentAmount = this.getValue('paymentAmount').amount;
      payload.paymentCurrency = this.getValue('paymentAmount').currencyCode;

    }
    else if (this.formMode == 'ADD' && this.getRoutingParam('mode') == 'D') {
      payload.operationMode = "D";
      payload.paymentAmount = this.getValue('paymentAmount').amount;
      payload.paymentCurrency = this.getValue('paymentAmount').currencyCode;
    }
    else {
      payload.paymentAmount = this.getValue('paymentAmount').amount;
      payload.paymentCurrency = this.getValue('paymentAmount').currencyCode;
      if (this.getValue('iscutOffExceed') == 1) {
        payload.operationMode = "A";
        payload.scheduleType = '2';
      }

      if (payload.scheduleType == "2" || payload.scheduleType == "3") {
        payload.serviceCode ='RETAILSCHFTS'
        payload.operationMode = "A";
      }
    }
  }
  public handleFormOnPostsubmit(response: any, routingInfo: any) {
    if (response.success) {
      let res = response.success?.body?.domestictransfer || response.success?.body?.sidomreq;
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
  public handlePaymentAmountOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if ((this.state.modeVar == null || this.state.modeVar == "" || this.state.modeVar == undefined)) {
      this.formGroup.controls['paymentAmount'].setErrors({required:false},{emitEvent:false});
      
      this.setVariable('paymentAmountVariable', value.amount);
      this.reset('chargesBorneBy')
      // this.setValue('chargesAmount', {amount:5.00});
      this.reset('purpose');
      this.reset('transferType');
      this.reset('iscutOffExceed');
      this.state.ipiAllowed = "";
      this.state.ippAllowed = "";
      this.state.ftsAllowed = "";
      this.setStaticDropdown('chargesBorneBy', this.state.chargesBorneData);
    }
    // this.setHidden('hiddenField',false)
    // if (this.formGroup.controls["beneficiaryId"].value == null || this.formGroup.controls["beneficiaryId"].value == "" || this.formGroup.controls["beneficiaryId"].value == undefined) {
    //   this.setErrors("paymentAmount", 'beneNullError');
    //   this.setHidden("paymentSummary", true);
    // }
    // if (this.formGroup.controls["sourceAccount"].value == null || this.formGroup.controls["sourceAccount"].value == "" || this.formGroup.controls["sourceAccount"].value == undefined) {
    //   this.setErrors("paymentAmount", 'sourceAccNullError');
    //   this.setHidden("paymentSummary", true);
    // }

  }
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
    this.setStaticDropdown('chargesBorneBy', this.state.chargesBorneData);
    if (value == '1') {
      // this.setHidden('paymentFrequency',true);
      // this.setHidden('numberOfPayments',true);
      // this.state.paymentDate.minDate = currentDate; 
      if ((this.state.modeVar == null || this.state.modeVar == "" || this.state.modeVar == undefined)) {
        this.setValue('paymentAmount', {
          amount: 0
        });
        this.setHidden('paymentSummary', true);
      }
      this.setLabel("paymentDate", "RetailDomesticTransferForm.paymentDate.label");
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
      this.setDisabled("paymentDaysInterval", true);
      this.setDataService(this.retailDomesticTransferFormService);
      this.setServiceCode("RETAILTRANDOMESTIC");
      this.setVariable('serviceCodeVariable', 'RETAILTRANDOMESTIC');
      this._depHttpConfig.setCommonHeaderParams(this._depHttpConfig.serviceContextKey, "RETAILTRANDOMESTIC");
      // this.setLabel("paymentDate", "Payment Date");
    }
    if (value == "2") {
      this.setLabel("paymentDate", "RetailDomesticTransferForm.executionDate.label");
      if ((this.state.modeVar == null || this.state.modeVar == "" || this.state.modeVar == undefined)) {
        this.setValue('paymentAmount', {
          amount: 0
        });
        this.setHidden('paymentSummary', true);
      }
      this.setVariable('scheduleTypeVariable', value);
      this.setHidden("paymentDate", false);
      this.reset('paymentDate', "");
      this.state.paymentDate.minDate = futureDate;
      this.state.paymentDate.maxDate = futureMaxDate;
      this.setValue('paymentDate', futureDate);
      this.setHidden('scheduleHandler', true);


      // this.reset('scheduleHandler',true);
      // this.reset('scheduleHandler.paymentFrequency',true);
      // this.reset('scheduleHandler.numberOfPayments',true);
      this.setDisabled("endDate", true);
      this.setDisabled("numberOfPayments", true);
      this.setDisabled("paymentFrequency", true);
      this.setReadonly('paymentDate', false);
      this.setHidden('paymentDate', false);
      this.setDisabled('paymentDate', false);
      this.setValue('iscutOffExceed', 1);
      this.setDisabled("paymentDaysInterval", true);
      // this.setLabel("paymentDate", "Payment Date");
      this.setServiceCode("RETAILSCHDOM");
      this._depHttpConfig.setCommonHeaderParams(this._depHttpConfig.serviceContextKey, "RETAILSCHDOM");
      this.setVariable('serviceCodeVariable', 'RETAILSCHDOM');
      this.setDataService(this.sidomreqService);
    }
    if (value == "3") {
      this.setLabel("paymentDate", "RetailDomesticTransferForm.startDate.label");
      if ((this.state.modeVar == null || this.state.modeVar == "" || this.state.modeVar == undefined)) {
        this.setValue('paymentAmount', {
          amount: 0
        });
        this.setHidden('paymentSummary', true);
      }
      this.setVariable('scheduleTypeVariable', value);
      // this.setLabel("paymentDate", "Start Date");
      this.setHidden("paymentDate", false);
      this.state.paymentDate.minDate = futureDate;
      this.state.paymentDate.maxDate = futureMaxDate;
      this.setHidden('scheduleHandler', false);
      this.setValue('paymentDate', futureDate);
      this.setReadonly('paymentDate', false);
      this.setHidden('paymentDate', false);
      this.setDisabled('paymentDate', false);
      this.setValue('iscutOffExceed', 1);
      this.setServiceCode("RETAILSCHDOM");
      this._depHttpConfig.setCommonHeaderParams(this._depHttpConfig.serviceContextKey, "RETAILSCHDOM");
      this.setDataService(this.sidomreqService);
      this.setVariable('serviceCodeVariable', 'RETAILSCHDOM');
    }
    this.setStaticDropdown('chargesBorneBy', this.state.chargesBorneData);
  }
  public handlePaymentDateOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    // WRITE CODE HERE TO HANDLE 
    //tool generated code based on Orchestration Instructions
    if(value && (this.getValue('scheduleType')==2 || this.getValue('scheduleType')==3) && this.getValue('transferType')==2 && this.state.ftsAllowed == 1){
      this.cutOffTimeCheckSchTran();
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

    } else if (payload.creditAmount == null || payload.creditAmount == "" || payload.creditAmount == undefined) {
      this.setHidden("paymentSummary", true);
    } else if (payload.debitAmount == null || payload.debitAmount == "" || payload.debitAmount == undefined) {
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
    this.setStaticDropdown('chargesBorneBy', this.state.chargesBorneData);

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
  }

  public onSourceAccountDataReceived: BaseFpxControlEventHandler = (payload: any) => {
    // WRITE CODE HERE TO HANDLE 
    if (payload && this.state.modeVar !="V") {
      this.state.debitAccountData = payload;

      this.state.fromCurrencyVariable = payload.accountCurrency;

      this.state.balanceVar = payload.availableBalance
      this.setVariable('accountBalanceVariable', this.state.balanceVar);
      this.setVariable('fromAccountVariable', payload.accountNumber);

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
          if(payload.accountCurrency == this.state.beneData.accountCurrency){
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
            id:this.state.beneData.accountCurrency,
            text:this.state.beneData.accountCurrency
          });
          this.setAmountCurrencyList('paymentAmount',data);
      this.formGroup.controls['paymentAmount'].setErrors({required:false},{emitEvent:false});

        }
        }
        this.setValue('paymentAmount', {amount: 0,currencyCode: payload.accountCurrency});
        this.setHidden('paymentSummary', true);
        this.setStaticDropdown('chargesBorneBy', this.state.chargesBorneData);
        this.setVariable('fromCurrencyVariable', payload.accountCurrency);
      }

      //this.updatePaymentCurrencyList();

      if (this.state.modeVar == 'M' || this.state.modeVar == 'R' || this.state.modeVar == 'D') {
        this.setValue('chargesBorneBy', this.getValue('chargesBorneBy'));
      }

    }
  }
  cutOffTimeCheckSchTran(){
    this._validatorService.validateSchTranChecklist({
      "serviceCode": "RETAILTRANFTS",
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
              message: "The FTS payment system is unavailable due to a holiday.The transaction will be processed on the next business day ("+nextPaymentDate+").Are you sure you want to proceed?",
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

  public onBeneficiaryIdDataReceived: BaseFpxControlEventHandler = (payload: any) => {
    // WRITE CODE HERE TO HANDLE 
    if (payload) {
      this.state.beneData = payload;
      // this.setVariable('toCurrencyVariable', payload.accountCurrency);
      // this.setVariable('toAccCurr', payload.accountCurrency);
      this.setVariable('beneficiaryIdVariable', payload.inventoryNumber);
      this.setVariable('toAccountVariable', payload.beneAccount);
      this.setValue('creditAccountNumber',payload.beneAccount)
      // this.state.toCurrencyVariable = payload.accountCurrency;
      if ((this.state.modeVar == null || this.state.modeVar == "" || this.state.modeVar == undefined)) {
        let data=[];
        if(this.state.debitAccountData.accountCurrency == payload.accountCurrency && !this.state.debitAccountData.accountCurrency){
          this.setAmountCurrencyList('paymentAmount',[{
            id:this.state.debitAccountData.accountCurrency,
            text:this.state.debitAccountData.accountCurrency
            }]);          
        }
      
      else{
        if(payload.accountCurrency == this.state.debitAccountData.accountCurrency){
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
          id:this.state.debitAccountData.accountCurrency,
          text:this.state.debitAccountData.accountCurrency
        });
      this.setAmountCurrencyList('paymentAmount',data);
      }
      }
      this.formGroup.controls['paymentAmount'].setErrors({required:false},{emitEvent:false});

    }
        
        this.setHidden('paymentSummary', true);
        this.setStaticDropdown('chargesBorneBy', this.state.chargesBorneData);
      }

      //this.updatePaymentCurrencyList();
    
  }

  public handleScheduleHandlerOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    // WRITE CODE HERE TO HANDLE 
    //tool generated code based on Orchestration Instructions
    console.log(value);
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
      // this.setStaticDropdown('chargesBorneBy', this.state.chargesBorneData);
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
          this.setDisabled("paymentDaysInterval", false);
          this.setValue("numberOfPayments", value.numberOfPayments);
          this.setValue("endDate", value.endDate);
          this.setValue("paymentDaysInterval", value.paymentDaysInterval);
        }
        else {
          this.setDisabled("endDate", true);
          this.setDisabled("numberOfPayments", true);
        }
        this.setDisabled('scheduleHandler', true);
      }
    }

  }

  public handleTransferTypeOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    // WRITE CODE HERE TO HANDLE 
    //tool generated code based on Orchestration Instructions
    // this.setHidden("purpose", false);
    if (value != "" && value != null && this.state.ipiAllowed != undefined && this.state.ftsAllowed != undefined && this.state.ippAllowed != undefined) {
      let Date: any = this.momentService.getInstance();
      let currentDate: any = Date.format("YYYY-MM-DD");
      let futureDate: any = Date.add(1, "day").format("YYYY-MM-DD");
      if (this.getValue('scheduleType') == 1) {
        if (this.state.ftsAllowed == '1' && value == 2) {
          // this.cutOffTimeCheckSchTran();

          let payload = {
            'serviceCode': 'RETAILTRANFTS'
          }
          this._validatorService.validateChecklist(payload).subscribe({
            next: (res) => {
            },
            error: (reason) => {
              let error = reason.error;
              let nextPaymentDate = reason.error.nextPaymentDate;
              this.state.nextPaymentDate = reason.error.nextPaymentDate;
              if (reason.error.ErrorCode == 'DEPERR90002') {
                this.state.globalHolidayVar = 1;
                const fpxModal = new FpxModal();
                fpxModal.setComponent(DepConfirmationComponent);
                fpxModal.setDisableClose(false);
                fpxModal.setPanelClass('dep-alert-popup');
                fpxModal.setBackDropClass('dep-popup-back-drop');
                fpxModal.setData({
                  title: "RetailSchedulePaymentTemplateComponent.delAlertTtl",
                  message: "Today, our FTS payment system is observing a holiday.It will be processed on the next business day ("+nextPaymentDate+").Are you sure you want to proceed?",
                  okBtnLbl: "Yes",
                  cancelBtnLbl: "No"
                });
                fpxModal.setAfterClosed(this.validateCheckcontextmenuModelAfterClose);
                this.openModal(fpxModal);
              }
              else if (reason.error.ErrorCode == 'DEPERR90001') {
                const fpxModal = new FpxModal();
                fpxModal.setComponent(DepConfirmationComponent);
                fpxModal.setDisableClose(false);
                fpxModal.setPanelClass('dep-alert-popup');
                fpxModal.setBackDropClass('dep-popup-back-drop');
                fpxModal.setData({
                  title: "RetailSchedulePaymentTemplateComponent.delAlertTtl",
                  message: "Cut off time exceeded.Your payment will be processed on the next business day.Are you sure you want to proceed?",
                  okBtnLbl: "Yes",
                  cancelBtnLbl: "No"
                });
                fpxModal.setAfterClosed(this.validateCheckcontextmenuModelAfterClose);
                this.openModal(fpxModal);

              }

              else if (reason.error.ErrorCode == 'DEPERR900016') {
                this._appConfig.setData('cutOffErrType', reason.error.ErrorCode);
                const fpxModal = new FpxModal();
                fpxModal.setComponent(DepConfirmationComponent);
                fpxModal.setDisableClose(false);
                fpxModal.setPanelClass('dep-alert-popup');
                fpxModal.setBackDropClass('dep-popup-back-drop');
                fpxModal.setData({
                  title: "RetailSchedulePaymentTemplateComponent.delAlertTtl",
                  message: "Cut off time exceeded.Your payment will be processed on the next business day.Are you sure you want to proceed?",
                  okBtnLbl: "Yes",
                  cancelBtnLbl: "No"
                });
                fpxModal.setAfterClosed(this.validateCheckcontextmenuModelAfterClose);
                this.openModal(fpxModal);

              }
            }
          });
        }
        else {
          this.setHidden('paymentDate', false);
          this.setValue('paymentDate', currentDate);
          this.setValue('iscutOffExceed', 0);
          this.setServiceCode('RETAILTRANDOMESTIC');
          this.setDataService(this.retailDomesticTransferFormService)
        }
      }else{
      if (this.state.ftsAllowed == '1' && value == 2) {
        this.cutOffTimeCheckSchTran();
              this.setValue('paymentDate', futureDate);
              }
      }

      if (this.state.ippAllowed == '1' && value == 3) {
        if ((this.state.fromCurrencyVariable != this._appConfig.baseCurrency)) {
          this.setErrors('transferType', 'transferTypeErr');
          const fpxModal = new FpxModal();
          fpxModal.setComponent(DepAlertComponent);
          fpxModal.setDisableClose(false);
          fpxModal.setPanelClass('dep-alert-popup');
          fpxModal.setBackDropClass('dep-popup-back-drop');
          fpxModal.setData({
            title: "RetailSchedulePaymentTemplateComponent.delAlertTtl",
            message: "Selected From Account/IBAN is not applicable for IPP transaction",
            okBtnLbl: "Okay"
          });
          // fpxModal.setAfterClosed(this.onModelAfterClose);
          this.openModal(fpxModal);
        }

        else if (this.state.fromCurrencyVariable != this._appConfig.baseCurrency) {
          this.setErrors('transferType', 'transferTypeErr');
          const fpxModal = new FpxModal();
          fpxModal.setComponent(DepAlertComponent);
          fpxModal.setDisableClose(false);
          fpxModal.setPanelClass('dep-alert-popup');
          fpxModal.setBackDropClass('dep-popup-back-drop');
          fpxModal.setData({
            title: "RetailSchedulePaymentTemplateComponent.delAlertTtl",
            message: "Selected Beneficiary Account IBAN is not applicable for IPP transaction",
            okBtnLbl: "Okay"
          });
          // fpxModal.setAfterClosed(this.onModelAfterClose);
          this.openModal(fpxModal);
        }

        else {
          this.setValue('iscutOffExceed', 0);
          if (this.getValue('scheduleType') == '1') {
            this.setHidden('paymentDate', false);
            this.setValue('paymentDate', currentDate);
            this.setServiceCode('RETAILTRANDOMESTIC');
            this.setDataService(this.retailDomesticTransferFormService);
          }
          else if (this.getValue('scheduleType') == '2') {
            this.setHidden('paymentDate', false);
            this.setValue('paymentDate', futureDate);
            this.setServiceCode('RETAILSCHDOM');
            this.setDataService(this.sidomreqService);
          }
        }
      }

      if (this.state.ipiAllowed != undefined && this.state.ipiAllowed != "" && this.state.ipiAllowed != null && this.state.ipiAllowed != 1 && value == 1) {
        this.setErrors('transferType', 'transferTypeErr');
        const fpxModal = new FpxModal();
        fpxModal.setComponent(DepAlertComponent);
        fpxModal.setDisableClose(false);
        fpxModal.setPanelClass('dep-alert-popup');
        fpxModal.setBackDropClass('dep-popup-back-drop');
        fpxModal.setData({
          title: "RetailSchedulePaymentTemplateComponent.delAlertTtl",
          message: "IPI Transfer is not applicable for this transaction",
          okBtnLbl: "Okay"
        });
        fpxModal.setAfterClosed(this.contextmenuModelAfterClose);
        this.openModal(fpxModal);
      }
      else if (this.state.ftsAllowed != undefined && this.state.ftsAllowed != "" && this.state.ftsAllowed != null && this.state.ftsAllowed != 1 && value == 2) {
        this.setErrors('transferType', 'transferTypeErr');
        const fpxModal = new FpxModal();
        fpxModal.setComponent(DepAlertComponent);
        fpxModal.setDisableClose(false);
        fpxModal.setPanelClass('dep-alert-popup');
        fpxModal.setBackDropClass('dep-popup-back-drop');
        fpxModal.setData({
          title: "RetailSchedulePaymentTemplateComponent.delAlertTtl",
          message: "FTS Transfer is not applicable for this transaction",
          okBtnLbl: "Okay"
        });
        fpxModal.setAfterClosed(this.contextmenuModelAfterClose);
        this.openModal(fpxModal);
      }
      else if (this.state.ippAllowed != undefined && this.state.ippAllowed != "" && this.state.ippAllowed != null && this.state.ippAllowed != 1 && value == 3) {
        this.setErrors('transferType', 'transferTypeErr');
        const fpxModal = new FpxModal();
        fpxModal.setComponent(DepAlertComponent);
        fpxModal.setDisableClose(false);
        fpxModal.setPanelClass('dep-alert-popup');
        fpxModal.setBackDropClass('dep-popup-back-drop');
        fpxModal.setData({
          title: "RetailSchedulePaymentTemplateComponent.delAlertTtl",
          message: "IPP Transfer is not applicable for this transaction",
          okBtnLbl: "Okay"
        });
        fpxModal.setAfterClosed(this.contextmenuModelAfterClose);
        this.openModal(fpxModal);
      }
    }
    else{
      this.setValue('transferType', this.getValue('transferType'));
    }


  }
  contextmenuModelAfterClose: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
    console.log("model closed...", payload);
    // let paymentId = this.selectedData.paymentId;
    // if (payload == 1) {
    //   this._transferunfavService.unMarkFavouritePayments(paymentId)
    //     .subscribe((res: any) => {
    //       console.log("Response", res);
    //     });
    // }
    // if (this._device.isMobile()) this.doReverseAction();
  }

  validateCheckcontextmenuModelAfterClose: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
    let Date: any = this.momentService.getInstance();
    let currentDate: any = Date.format("YYYY-MM-DD");
    let futureDate: any = Date.add(1, "day").format("YYYY-MM-DD");
    let nextPaymentDate :any = moment(this._appConfig.getData('nextPaymentDate')).format("YYYY-MM-DD");
    console.log("model closed...", payload);
    if (payload == 1) {
      if (this._appConfig.getData('cutOffErrType')) {
        this.setServiceCode('RETAILSCHFTS');
        this.setHidden('paymentDate', true);
        this.setDisabled('paymentDate', false);
        this.setValue('paymentDate', futureDate);
        this.setValue('nextPaymentDate', futureDate); //27-07
        this.setDataService(this.sidomreqService);
        this.setValue('iscutOffExceed', 1);
      }else if (this.state.globalHolidayVar == 1){
        this.setServiceCode('RETAILSCHFTS');
        this.setHidden('paymentDate', false);
        this.setDisabled('paymentDate', false);
        this.setValue('paymentDate', nextPaymentDate);
        // this.setValue('nextPaymentDate', futureDate); //27-07
        this.setDataService(this.sidomreqService);
        this.setValue('iscutOffExceed', 1);
      }
      else {
        this.setServiceCode('RETAILSCHFTS');
        this.setHidden('paymentDate', false);
        this.setDisabled('paymentDate', false);
        this.setValue('paymentDate', currentDate);
        // this.setValue('nextPaymentDate', currentDate);//27-07
        this.setDataService(this.sidomreqService);
        this.setValue('iscutOffExceed', 1);
      }
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
    let nextPaymentDate :any = moment(this.state.nextPaymentDate).format("YYYY-MM-DD");
    console.log("model closed...", payload);
    if (payload == 1) {
      if (this._appConfig.getData('cutOffErrType') || this.state.globalHolidayVar == 1) {
        this.setServiceCode('RETAILSCHFTS');
        this.setHidden('paymentDate', false);
        this.setDisabled('paymentDate', false);
        this.setValue('paymentDate', nextPaymentDate);
        // this.setValue('nextPaymentDate', futureDate); //27-07
        this.setDataService(this.sidomreqService);
        this.setValue('iscutOffExceed', 1);
      }else if(this.state.errorCode == 'DEPERR900017'){
        this.setServiceCode('RETAILSCHFTS');
        this.setValue('paymentDate', nextPaymentDate);
        this.setHidden('paymentDate', false);
        this.setReadonly('paymentDate', false);
        this.setDisabled('paymentDate', false);
        this.setValue('paymentDate', nextPaymentDate);
        this.setValue('nextPaymentDate', nextPaymentDate);
        this.setDataService(this.sidomreqService);
        this.setValue('iscutOffExceed', 1);
      }
      else {
        this.setServiceCode('RETAILSCHFTS');
        this.setValue('paymentDate', currentDate);
        this.setHidden('paymentDate', false);
        this.setDisabled('paymentDate', false);
        // this.setValue('nextPaymentDate', currentDate);//27-07
        this.setDataService(this.sidomreqService);
        this.setValue('iscutOffExceed', 1);
      }
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
    let beneServicode = 'RETAILBENEDOMESTIC'
    let _serviceDetail: any
    _serviceDetail = this._serviceCodeDetails.getServiceDetails(beneServicode);
    this._router.navigate(_serviceDetail.servicePath);
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

  public handleChargesBorneByOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if (value == '0'){
      this.setErrors('chargesBorneBy','required');
    }
    // WRITE CODE HERE TO HANDLE 
    //tool generated code based on Orchestration Instructions
    // this.setHidden("purpose", false);
    // this.setVariable('chargesBorneByVariable', value);
    // this.setValue('chargesAmount', { amount: 100 });
    // this.setAmountCurrencyList('chargesAmount', [{ id: 'AED', text: 'AED' }]);
  }
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
          message: "Your total transaction amount with charges " + payload.totalAmount + " is greater than Available Balance",
          okBtnLbl: "Okay"
        });
        // fpxModal.setAfterClosed(this.contextmenuModelAfterClose);
        if(payload.totalChargeAmnBaseCurr){
        this.setValue('chargesAmount', { amount: payload.totalChargeAmnBaseCurr, currencyCode: payload.baseCurrency });
        }
        this.openModal(fpxModal);

      }

      else {
        if(payload.totalChargeAmnBaseCurr){
        this.setValue('chargesAmount', { amount: payload.totalChargeAmnBaseCurr, currencyCode: payload.baseCurrency });
        }
        else{
        this.setValue('chargesAmount', { amount: 0, currencyCode: this._appConfig.baseCurrency });
        }

        if (this.formGroup.controls['chargesBorneBy'].value == '0'){
          this.setErrors('chargesBorneBy','required');
        }
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
  public onTransferTypeReceivedDataReceived: BaseFpxControlEventHandler = (payload: any) => {
    if ((this.state.modeVar == "" || this.state.modeVar == undefined || this.state.modeVar == 'R')) {

      if (payload && this.state.modeVar !='R') {

        this.state.ftsAllowed = payload.ftsAllowed;
        this.state.ippAllowed = payload.ippAllowed;
        this.state.ipiAllowed = payload.ipiAllowed;
        this.setValue('transferType', payload.defaultChannel);
        this._appConfig.setData('defaultChannel', payload.defaultChannel);

      }
    }
  }
  public override doPostInit(): void {
    this.addValueChangeHandler("paymentAmount", this.handlePaymentAmountOnvalueChange);
    this.addValueChangeHandler("scheduleType", this.handleScheduleTypeOnvalueChange);
    this.addControlEventHandler("exchangeRateReceived", this.onExchangeRateDataReceived);
    this.addValueChangeHandler("paymentDate", this.handlePaymentDateOnvalueChange);
    this.addValueChangeHandler("termsFlag", this.handleTermsFlagOnvalueChange);
    this.addValueChangeHandler("remarks", this.handleRemarksOnvalueChange);

    this.addValueChangeHandler("transferType", this.handleTransferTypeOnvalueChange);
    // 
    this.addValueChangeHandler("chargesBorneBy", this.handleChargesBorneByOnvalueChange);

    this.addControlEventHandler("chargesRateReceived", this.onChargesRateDataReceived);
    this.addControlEventHandler("transferTypeReceived", this.onTransferTypeReceivedDataReceived);
    this.addValueChangeHandler("scheduleHandler", this.handleScheduleHandlerOnvalueChange);
    this.handleFormOnLoad();
    this.addResetHandler('reset', this._onReset);

  }


  public override preSubmitInterceptor(payload: Domestictransfer): any {
    // WRITE CODE HERE TO HANDLE 
    this.handleFormOnPresubmit(payload);
    return payload;
  }


  public override postDataFetchInterceptor(payload: Domestictransfer) {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }


  public override postSubmitInterceptor(response: any): RoutingInfo {
    console.log(response);
    let routingInfo: RoutingInfo = new RoutingInfo();
    this.handleFormOnPostsubmit(response, routingInfo);
    return routingInfo;
  }


  //$END_CUSTOMSCRIPT\n
}


