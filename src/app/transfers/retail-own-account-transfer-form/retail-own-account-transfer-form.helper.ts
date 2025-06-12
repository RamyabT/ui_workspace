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
  FpxModalAfterClosed
} from "@fpx/core";
import { BehaviorSubject, Observable, map, of } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { OwnaccounttransferService } from '../ownaccounttransfer-service/ownaccounttransfer.service';
import { Ownaccounttransfer } from '../ownaccounttransfer-service/ownaccounttransfer.model';
import { Pymts } from '../pymts-service/pymts.model';
import { DatePipe } from "@angular/common";
import { SiownService } from "../siown-service/siown.service";
import { SiownreqService } from "../siownreq-service/siownreq.service";
import { MomentService } from "src/app/foundation/validator-service/moment-service";
import { AppConfigService } from "@dep/services";
import { CasaaccountService } from "src/app/foundation/casaaccount-service/casaaccount.service";
import { ActiveSpaceInfoService } from "src/app/dep/core/class/active-space-info.service";
import { APPCONSTANTS } from "src/app/dep/constants/app-constant";
import moment from "moment";
import { Casaaccount } from "src/app/foundation/casaaccount-service/casaaccount.model";
import { CASAAccountsTransferListComponent } from "src/app/accounts/casa-accounts-transfer-list/casa-accounts-transfer-list.component";
import { DeviceDetectorService } from "@dep/core";
import { EligibleAccountListControlComponent } from "src/app/foundation/eligible-account-list-control/eligible-account-list-control.component";
import { Eligibletoaccount } from "src/app/foundation/eligibletoaccount-service/eligibletoaccount.model";
import { EligibletoaccountService } from "src/app/foundation/eligibletoaccount-service/eligibletoaccount.service";
import { DepAlertComponent } from "src/app/dep/core/component/dep-alert/dep-alert.component";
import { DepTooltipComponent } from "src/app/dep/core/component/dep-tooltip/dep-tooltip.component";
// import { FrequencyControlService } from "src/app/foundation/frequency-control/frequency-control.service";

import { CommonService } from "src/app/foundation/validator-service/common-service";
import { DepConfirmationComponent } from "src/app/dep/core/component/dep-confirmation/dep-confirmation.component";
import { FrequencyControlService } from "src/app/foundation/frequency-control/frequency-control.service";
// import { CustomDatePipe } from "src/app/common/pipe/custom-date/custom-date.pipe";

export class RetailOwnAccountTransferFormState extends BaseFpxComponentState {
  private _appConfig: AppConfigService = inject(AppConfigService);

  showSuggestion: boolean = false;
  paymentAmount: any = {
    isCurrEditable: false,
    CurrencyList: [{ id: APPCONSTANTS.baseCurrency, text: APPCONSTANTS.baseCurrency }],
    amountInWords: true,
    initCurrency: APPCONSTANTS.baseCurrency,
    defaultFetch: true,
  }
  paymentDate: any = {
    minDate: "",
    maxDate: "",
  }
  paymentSummary: any = {
    debitAmount: "",
    creditAmount: "",
    exchangeRate: "",
    chargesAmount: "",
    equivalentAmount: ""
  };
  termsFlag: any = {
    textPosition: "after",
    ckValues: { checked: "Y", unchecked: "N" }
  }
  fromCurrencyVariable: any;
  toCurrencyVariable: any;
  accountBalanceVar: any;
  modeVar: any;
  numberOfPaymentVar: any;
  transferSummary: any = {
    paymentId: "",
    paymentStatus: ""
  };
  onLoadVar: any;
  paidInstallments: any;
  scheduletype: any;
  currentDate: any;
  wholeEligibleAccountsList: any;
  eligibleTransferFromAccountsList: any;
  eligibleTransferToAccountsList: any;
  preferredTransferAccount: any;

  enableTransferTo: any
  sourceAccountDis: any
  productDesc: any
  creditAccountDis: any
  fromAccProductDesc: any
  fromAccNickname: any
  toProductDesc: any
  toAccNickname: any
  sourceAccountDisDesc: any;
  creditAccountDisDesc: any;
  scheduleTypeVar: any;
  paymentDateVar: any;
  paymentEndDateVar: any;
  paymentAmountVar: any;
  paymentCurrencyVar: any;
  futureDate: any;
  review: boolean = false;
  scheduleTypeValue: string = 'No';
  showLoanMessage: boolean = false;
  showRegisteredProductMessage: boolean = false;
  appliedCrossCurrency: boolean = false;
  crossCurrencyIcon: boolean = false;
  showScheduleTypeValue: boolean = false;
  frequencyVar: any;
  modifyScheduleTypeVar: any;
  scheduleToggleVar: boolean = false;
  showPaymentFrequency: boolean = false;
  showInsufficientBalanceError: boolean = false;
  minInstallmentError: boolean = false;
  endDate: any = {
    minDate: "",
    maxDate: "",
  }
  isNoOfPaymentChange: boolean = false;
  isEndDateChange: boolean = false;
  showErrorTemplate: boolean = false;
  changeEndDateBasedOnFrequency: boolean = false;
  changedFromEdit: boolean = false;
}


@Injectable()
export class RetailOwnAccountTransferFormHelper extends BaseFpxFormHelper<RetailOwnAccountTransferFormState> {
  selectedTransferFromAccount: any;
  selectedTransferToAccount: any;
  enableDelete: boolean = false;
  loanAccountTypes = ["RM", "PL"];
  casaAccountTypes = ["CA", "SA"];
  showInsufficientBalanceError: boolean = false;
  showMandatoryError: boolean = false;
  hideFromAccountChangeBtn: boolean = false;
  amountLength: boolean = false

  constructor(private retailOwnAccountTransferFormService: OwnaccounttransferService,
    private _httpProvider: HttpProviderService,
    private _router: Router,
    public datepipe: DatePipe,
    private siownService: SiownService,
    private siownreqService: SiownreqService,
    private momentService: MomentService,
    private _currencyFormatter: FpxCurrenyFormatterPipe,
    private _appConfig: AppConfigService,
    private casaAccountservice: CasaaccountService,
    public _device: DeviceDetectorService,
    private route: ActivatedRoute,
    private frequencyControlService: FrequencyControlService,
    private commonService: CommonService,
    // private customDatePipe: CustomDatePipe,
    private _activeSpaceInfoService: ActiveSpaceInfoService = inject(ActiveSpaceInfoService)) {
    super(new RetailOwnAccountTransferFormState());
    route.queryParams.subscribe((params: any) => {
      if (params && params.rid || params.operationMode) this.onParamChange();
    });
  }

  onParamChange() {
    this.state.modeVar = this.getRoutingParam('operationMode');
    if (this._device.isMobile()) {
      this.selectedTransferFromAccount = undefined;
      this.selectedTransferToAccount = undefined;
      this.enableDelete = false;
    }
  }

  override doPreInit(): void {


    let modulenumberOfPaymentsUpdatedRefresh$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    this._appConfig.setData('modulenumberOfPaymentsUpdatedRefresh$', {
      "observable": modulenumberOfPaymentsUpdatedRefresh$.asObservable(),
      "subject": modulenumberOfPaymentsUpdatedRefresh$
    });

    // this.setReadonly('endDate', true);
    let operationMode: any = this.getRoutingParam('operationMode');
    this.state.modeVar = this.getRoutingParam('operationMode');
    let paymentId: any = this.getRoutingParam('paymentId');
    let serviceCode: any = this.getRoutingParam('serviceCode');
    if (paymentId && operationMode && serviceCode == 'RETAILSCHOAT') {
      this.setServiceCode("RETAILSCHOAT");
      this.setDataService(this.siownreqService);
    }
    else {
      this.setServiceCode("RETAILTRANOAT");
      this.setDataService(this.retailOwnAccountTransferFormService);
    }
  }


  public override doPostInit(): void {
    setTimeout(() => {
      this.showSpinner();
    }, 100);
    this.state.wholeEligibleAccountsList = this._appConfig.getData('wholeEligibleAccountsList');
    this.handleFormOnLoad();
    this.addValueChangeHandler("paymentAmount", this.handlePaymentAmountOnvalueChange);
    this.addValueChangeHandler("paymentDate", this.handlePaymentDateOnvalueChange);
    this.addValueChangeHandler("paymentFrequency", this.handlePaymentFrequencyOnvalueChange);
    this.addValueChangeHandler("scheduleType", this.handleScheduleTypeOnvalueChange);
    this.addValueChangeHandler("numberOfPayments", this.handleNumberOfPaymentsOnvalueChange);
    this.addValueChangeHandler("endDate", this.handleEndDateOnvalueChange);
    this.addControlEventHandler("exchangeRateReceived", this.onExchangeRateDataReceived);
  }


  public handlePaymentAmountOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    console.log("handlePaymentAmountOnvalueChange", value)
    console.log(this.formGroup)

    setTimeout(() => {
      if (this.selectedTransferFromAccount.availableBalance < value?.amount && !(this.getValue('paymentAmount').amount.toString().length > 13)) {
        this.showInsufficientBalanceError = true;
        setTimeout(() => {
          window.scrollTo(0, 0);
        });
      } else {
        this.showInsufficientBalanceError = false;
      }
      if (this.getValue('paymentAmount').amount.toString().length > 13) {
        this.amountLength = true;
        this.showInsufficientBalanceError = false;
      } else {
        this.amountLength = false
      }


      if ((this.formGroup.controls['paymentAmount'].touched || this.formGroup.controls['paymentAmount'].dirty) && !(value?.amount)) {
        this.showMandatoryError = true
      } else {
        this.showMandatoryError = false
      }
    }, 0);



    if (this.getRoutingParam('operationMode') != 'M') {
      this.setDisabled("paymentFrequency", false);
      // this.setDisabled("numberOfPayments", true);
    }
    if (this.getRoutingParam('operationMode') == 'M') {
      if (this.state.scheduleTypeVar == '2') {
        this.hideTypeNumberOfPaymentsAndEndDate();
        let x = this.getValue('paymentDate');
        if (value.amount != this.state.paymentAmountVar || x != this.state.paymentDateVar) {
          this.setHidden('hiddenField', true);
        }
        else {
          this.setHidden('hiddenField', false);
        }
      }
      if (this.state.scheduleTypeVar == '3') {

        let x = this.getValue('numberOfPayments');
        if (value.amount != this.state.paymentAmountVar || this.getValue('numberOfPayments') != this.state.numberOfPaymentVar) {
          this.setHidden('hiddenField', true);
        }
        else {
          this.setHidden('hiddenField', false);
        }

        if (this.getValue('paymentAmount').amount && this.getValue('paymentDate') && this.getValue('paymentFrequency')) {
          this.setHidden('hiddenField', true);
        } else {
          this.setHidden('hiddenField', false);
        }
      }
    }

    this.checkForModification();
    this.updateValidity();
  }

  checkForModification() {
    if (this.getRoutingParam('operationMode') == 'M') {
      if (this.getValue('paymentFrequency') == '1') {
        this.checkModificationConditionsForPayLater();
      }
      else {
        this.checkModificationConditionsForRecurring(this.getValue('numberOfPayments'));
      }
    }
  }

  updateValidity() {
    this.formGroup.get('paymentAmount')?.updateValueAndValidity();
    this.formGroup.get('scheduleHandler')?.updateValueAndValidity();
    this.formGroup.get('paymentFrequency')?.updateValueAndValidity();
    this.formGroup.get('numberOfPayments')?.updateValueAndValidity();
    this.formGroup.get('endDate')?.updateValueAndValidity();
    this.formGroup.get('paymentDate')?.updateValueAndValidity();
  }


  checkModificationConditionsForPayLater() {
    if (this.getValue('paymentDate') != this.state.paymentDateVar || this.getValue('paymentAmount').amount != this.state.paymentAmountVar) {
      this.setHidden('hiddenField', true);
    }
    else {
      this.setHidden('hiddenField', false);
    }
  }


  checkModificationConditionsForRecurring(installment: any) {
    console.log("checkModificationConditionsForRecurring", installment)
    console.log(this.getValue('numberOfPayments'), this.state.numberOfPaymentVar, "numberOfPayments")
    console.log(this.getValue('paymentDate'), this.state.paymentDateVar, "paymentDate")
    console.log(this.getValue('paymentAmount').amount, this.state.paymentAmountVar, "paymentAmount")
    console.log(this.getValue('paymentFrequency'), this.state.frequencyVar, "paymentFrequency")
    console.log(this.getValue('scheduleType'), this.state.scheduleToggleVar, "scheduleType")
    console.log(this.getValue('endDate'), this.state.paymentEndDateVar, "endDate")

    if (installment < (this.state.numberOfPaymentVar - this.state.paidInstallments)) {
      this.setHidden('hiddenField', false);
      this.setErrors('numberOfPayments', 'minNoOfPaymentsErr');
    }
    else if (this.getValue('paymentDate') != this.state.paymentDateVar
      || this.getValue('paymentAmount').amount != this.state.paymentAmountVar
      || this.getValue('paymentFrequency') != this.state.frequencyVar
      || (this.state.scheduleToggleVar != this.getValue('scheduleType'))
      || this.getValue('numberOfPayments') != this.state.numberOfPaymentVar
      || this.getValue('endDate') != this.state.paymentEndDateVar) {
      this.setHidden('hiddenField', true);
    }
    else {
      this.setHidden('hiddenField', false);
    }
  }

  public handlePaymentDateOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    console.log(value)
    setTimeout(() => {
      this.state.endDate.minDate = value;
      console.log("this.state.endDate.minDate", this.state.endDate.minDate)
    }, 0);    // WRITE CODE HERE TO HANDLE 
    //tool generated code based on Orchestration Instructions
    if (this.state.scheduleTypeVar != '3' && this.state.scheduleTypeVar) {
      if (value != this.state.currentDate) {
        this.setServiceCode("RETAILSCHOAT");
        this.state.scheduleTypeVar = '2';
        this.setVariable('scheduleTypeVar', this.state.scheduleTypeVar);
        this.setDataService(this.siownreqService);
        this.showInsufficientBalanceError = false;
      }
      else {
        this.setServiceCode("RETAILTRANOAT");
        this.state.scheduleTypeVar = '1';
        this.setVariable('scheduleTypeVar', this.state.scheduleTypeVar);
        this.setDataService(this.retailOwnAccountTransferFormService);
        setTimeout(() => {
          console.log(this.getValue('paymentAmount'))
          if (this.getValue('paymentAmount').amount > 0 && !(this.getValue('paymentAmount').amount.toString().length > 13)) {
            if (this.selectedTransferFromAccount.availableBalance < this.getValue('paymentAmount').amount) {
              this.showInsufficientBalanceError = true;
              setTimeout(() => {
                window.scrollTo(0, 0);
              });
            } else {
              this.showInsufficientBalanceError = false;
            }
          }
        }, 0);


      }
    }
    if (this.getRoutingParam('operationMode') == 'M') {
      const baseDate = new Date(value);
      const nextDay = new Date(baseDate);
      nextDay.setDate(baseDate.getDate() + 1);
      this.state.endDate.minDate = nextDay;
      if (this.state.scheduleTypeVar == '2') {
        this.setHidden('hiddenField', true);
        this.setDisabled('hiddenField', true);
        this.hideTypeNumberOfPaymentsAndEndDate();
      } else {
        this.setInitialNumberOfPaymentsAndEndDate();
      }
    } else {
      if (this.getValue('paymentFrequency') !== '1') {
        this.setInitialNumberOfPaymentsAndEndDate();
      }
    }


    this.formGroup.get('paymentAmount')?.updateValueAndValidity();
    this.checkForModification();

  }

  public handlePaymentFrequencyOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    // WRITE CODE HERE TO HANDLE 
    //tool generated code based on Orchestration Instructions

    if (value == "1" || !value) {
      this.state.paymentDate.minDate = this.state.currentDate;
      if (this.getValue('paymentDate') > this.state.currentDate) {
        this.setServiceCode("RETAILSCHOAT");
        this.setDataService(this.siownreqService);
      } else {
        this.setServiceCode("RETAILTRANOAT");
        this.setDataService(this.retailOwnAccountTransferFormService);
      }

      if (this.getRoutingParam('operationMode') == 'M') {
        this.state.paymentDate.minDate = this.state.futureDate;
        this.setServiceCode("RETAILSCHOAT");
        this.setDataService(this.siownreqService);
      }
      this.hideTypeNumberOfPaymentsAndEndDate();
    }
    else if (value !== "1") {
      if (this.getRoutingParam('operationMode') !== 'M') {
        this.reset('numberOfPayments');
        this.reset('endDate');
      }
      this.state.paymentDate.minDate = this.state.futureDate;
      this.setServiceCode("RETAILSCHOAT");
      this.setDataService(this.siownreqService);
      this.setHidden('scheduleType', false);
      this.setHidden('scheduleTypeWrapper', false);
      setTimeout(() => {
        this.setReadonly('numberOfPayments', false);
        this.setDisabled('numberOfPayments', false);
      }, 50);

      if (this.getValue('scheduleType')) {
        this.hideNumberOfPaymentsAndEndDate();
        setTimeout(() => {
          this.setValue('scheduleType', false);
        }, 100);
      } else {
        this.showNumberOfPaymentsAndEndDate();
        this.setInitialNumberOfPaymentsAndEndDate();
      }

      if (this.formGroup.controls['paymentDate'].value == this.state.currentDate) {
        this.setValue("paymentDate", this.state.futureDate);
        this.state.paymentDate.minDate = this.state.futureDate;
      }
    }

    if (value !== '1') {
      this.state.showScheduleTypeValue = true;
    } else {
      this.state.showScheduleTypeValue = false;
    }
    this.checkForModification();
  }

  setInitialNumberOfPaymentsAndEndDate() {
    if (this.getRoutingParam('operationMode') !== 'M') {
      if (this.getValue('numberOfPayments') != 2) {
        this.setValue('numberOfPayments', 2); //setting default value to 2 when payment frequency is changed 
      } else if (this.getValue('numberOfPayments') <= 2) {
        this.setEndDate(this.formGroup); // setting end date when number of payments is changed to 2
      }
    } else {
      if (this.state.changeEndDateBasedOnFrequency) {
        this.setEndDate(this.formGroup); // setting end date when number of payments is changed to 2
      }
    }

    setTimeout(() => {
      this.setReadonly('numberOfPayments', false);
      this.setDisabled('numberOfPayments', false);
    }, 50);
  }

  public handleScheduleTypeOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {

    if (value == false) {
      this.showNumberOfPaymentsAndEndDate();
      if (this.getRoutingParam('operationMode') !== 'M') {
        this.setInitialNumberOfPaymentsAndEndDate();
      } else {
        this.state.changeEndDateBasedOnFrequency = true;
        if (this.state.scheduleToggleVar) {
          this.setNeverEndingValues();
        } else {
          this.setRecurringValues();
        }
      }
    } else {
      this.hideNumberOfPaymentsAndEndDate();
      if (this.getRoutingParam('operationMode') !== 'M') {
        this.reset('numberOfPayments');
      }
      let transferDate = this.formGroup.get('paymentDate')?.value;
      let endDate = moment(transferDate).add(50, 'years').format('YYYY-MM-DD');
      console.log(endDate, "endDate")
      console.log(moment(endDate).format('YYYY-MM-DD'), "moment")
      this.setValue('endDate', endDate);

      if (this.getValue('paymentAmount').amount && this.getValue('paymentDate') && this.getValue('paymentFrequency')) {
        this.setHidden('hiddenField', true);
      } else {
        this.setHidden('hiddenField', false);
      }
    }


    if (this.formGroup.controls['paymentFrequency'].value !== '1') {
      this.state.showScheduleTypeValue = true;
    } else {
      this.state.showScheduleTypeValue = false;
    }

    this.checkForModification();
  }


  setRecurringValues() {
    this.setValue('numberOfPayments', this.state.numberOfPaymentVar);
    this.setValue('endDate', this.state.paymentEndDateVar);
    this.state.minInstallmentError = false;
    this.checkForModification();
  }

  setNeverEndingValues() {
    this.setValue('numberOfPayments', this.state.numberOfPaymentVar);
    this.setValue('endDate', this.state.paymentEndDateVar);
    this.state.isEndDateChange = false;
    this.state.isNoOfPaymentChange = false;
    this.state.minInstallmentError = false;
    this.checkForModification();
  }

  public handleNumberOfPaymentsOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    console.log(value, "value")

    if (value <= 1) {
      this.setHidden('hiddenField', false);
      this.state.minInstallmentError = true;
      // Need to show error when number of payments is changed to 1
      this.reset('endDate');
    } else {
      this.setHidden('hiddenField', true);
      this.state.minInstallmentError = false;
    }

    if (this.getRoutingParam('operationMode') !== 'M' || !this.state.changedFromEdit) {
      if (this.state.isEndDateChange) {
        this.state.isEndDateChange = false;
      } else {
        console.log("DIRECT NUMBER OF PAYMENTS CHANGE")
        this.state.isNoOfPaymentChange = true;
        this.changedNumberOfPaymentsAndEndDate(value, formGroup);
      }
    } else {
      this.state.changedFromEdit = false;
    }

  }

  public handleEndDateOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    console.log(value, "value")


    if (this.getRoutingParam('operationMode') !== 'M' || !this.state.changedFromEdit) {
      if (this.state.isNoOfPaymentChange) {
        this.state.isNoOfPaymentChange = false;
      } else {
        console.log("DIRECT END DATE CHANGE")
        this.state.isEndDateChange = true;
        this.changedNumberOfPaymentsAndEndDate(value, formGroup);
      }
    } else {
      this.state.changedFromEdit = false;
      // this.setNumberOfPayments(value, formGroup);
    }

  }

  setNumberOfPayments(value: any, currentFormGroup: any) {
    let frequency = Number(this.getValue('paymentFrequency'));
    let transferStartDate = new Date(this.getValue('paymentDate'));
    let transferEndDate = new Date(value);
    let numberOfInstallments = this.calculateInstallments(transferStartDate, transferEndDate, frequency);
    console.log(numberOfInstallments, "numberOfInstallments")
    if (numberOfInstallments > 1) {
      this.state.minInstallmentError = false;
    }
    this._appConfig.getData('modulenumberOfPaymentsUpdatedRefresh$').subject.next({
      action: "REFRESH",
      data: numberOfInstallments,
    })

    this.setValue('numberOfPayments', numberOfInstallments);
  }



  changedNumberOfPaymentsAndEndDate(value: any, currentFormGroup: any) {

    console.log("changedNumberOfPaymentsFirst", this.state.isNoOfPaymentChange)
    console.log("changedEndDateFirst", this.state.isEndDateChange)

    if (this.state.isNoOfPaymentChange) {
      if (value <= 1) {
        this.setHidden('hiddenField', false);
        this.state.minInstallmentError = true;
        // Need to show error when number of payments is changed to 1
        this.setValue('endDate', null);
      } else if (value > 1) {
        this._appConfig.getData('modulenumberOfPaymentsUpdatedRefresh$').subject.next({
          action: "REFRESH",
          data: value,
        })
        this.state.minInstallmentError = false;
        this.setHidden('hiddenField', true);
        this.setDisabled('numberOfPayments', false);
        if (this.formGroup.get('paymentDate')?.value && this.formGroup.get('paymentFrequency')?.value) {
          setTimeout(() => {
            this.setEndDate(currentFormGroup); //setting end date when number of payments is changed
            this.checkForModification();
          }, 100);
        }
      }
      this.checkForModification();
    } else if (this.state.isEndDateChange) {
      if (value && value != null) {
        console.log(value, "value")
        let frequency = Number(this.getValue('paymentFrequency'));
        let transferStartDate = new Date(this.getValue('paymentDate'));
        let transferEndDate = new Date(value);
        let numberOfInstallments = this.calculateInstallments(transferStartDate, transferEndDate, frequency);
        this._appConfig.getData('modulenumberOfPaymentsUpdatedRefresh$').subject.next({
          action: "REFRESH",
          data: numberOfInstallments,
        })
        console.log(12121212)
        this.setValue('numberOfPayments', numberOfInstallments);
        this.checkForModification();
      }
    }

  }

  public onExchangeRateDataReceived: BaseFpxControlEventHandler = (payload: any) => {
    this.state.appliedCrossCurrency = false;
    this.state.crossCurrencyIcon = true;

    if (payload.zeroValue) {
      this.setHidden('paymentSummary', true);
    }
    else if (this.state.fromCurrencyVariable == this.state.toCurrencyVariable) {
      this.state.crossCurrencyIcon = false;
      this.setHidden('paymentSummary', true);
      this.setValue('rateApplied', payload.exchangeRate);
      this.setValue('baseRateApplied', payload.baseRate);
    } else if (payload.creditAmount == null || payload.creditAmount == "" || payload.creditAmount == undefined) {
      this.setHidden("paymentSummary", true);
    } else if (payload.debitAmount == null || payload.debitAmount == "" || payload.debitAmount == undefined) {
      this.setHidden("paymentSummary", true);
    }
    else {
      this.setHidden('paymentSummary', false);
      this.setValue('rateApplied', payload.exchangeRate);
      this.setValue('baseRateApplied', payload.baseRate);
      this.state.paymentSummary.debitAmount = this.state.fromCurrencyVariable + " " + this._currencyFormatter.transform(payload.debitAmount, this.state.fromCurrencyVariable);
      this.state.paymentSummary.creditAmount = this.state.toCurrencyVariable + " " + this._currencyFormatter.transform(payload.creditAmount, this.state.toCurrencyVariable);

      // this.state.paymentSummary.exchangeRate = this.state.fromCurrencyVariable + " 1 = " + this.state.toCurrencyVariable + " " + 1;
      this.state.paymentSummary.exchangeRate = "1.00 " + this.state.fromCurrencyVariable + " = " + payload.exchangeRate + " " + this.state.toCurrencyVariable;
      this.state.paymentSummary.equivalentAmount = "$" + payload.equivalentAmount + " " + this.state.toCurrencyVariable;
      if (this.formGroup.get('paymentDate')?.value === this.state.currentDate) {
        this.state.appliedCrossCurrency = true;
      } else {
        this.setHidden('paymentSummary', true);
      }
    }

  }


  setEndDate(currentFormGroup: any) {
    if (currentFormGroup.controls.paymentDate.value, currentFormGroup.controls.paymentFrequency.value, currentFormGroup.controls.numberOfPayments.value) {
      let paymentEndDateVar: any = this.commonService.transferEndDate(currentFormGroup.controls.paymentDate.value, currentFormGroup.controls.paymentFrequency.value, currentFormGroup.controls.numberOfPayments.value);
      if (paymentEndDateVar) {
        this.setValue('endDate', paymentEndDateVar);
      }
    }
  }


  hideTypeNumberOfPaymentsAndEndDate() {
    this.setHidden('scheduleType', true);
    this.setHidden('scheduleTypeWrapper', true);
    this.setHidden('scheduleHandler', true);
    this.setDisabled('numberOfPayments', true);
    this.setDisabled('endDate', true);
  }

  showTypeNumberOfPaymentsAndEndDate() {
    this.setHidden('scheduleType', false);
    this.setHidden('scheduleHandler', false);
    this.setHidden('scheduleTypeWrapper', false);
    setTimeout(() => {
      this.setDisabled('numberOfPayments', false);
      this.setDisabled('endDate', false);
    }, 100);
  }

  hideNumberOfPaymentsAndEndDate() {
    this.setHidden('scheduleHandler', true);
    console.log('Disable Number of Payments and End Date')
    // this.setDisabled('numberOfPayments', true);
    this.setDisabled('endDate', true);
  }

  showNumberOfPaymentsAndEndDate() {
    this.setHidden('scheduleHandler', false);
    setTimeout(() => {
      this.setDisabled('numberOfPayments', false);
      this.setDisabled('endDate', false);
    }, 100);
  }


  public handleFormOnLoad() {
    this.removeShellBtn('RESET');
    let date: any = this.momentService.getInstance();
    let currentDate: any = date.format("YYYY-MM-DD");
    let nextDate: any = date.add(1, "days").format("YYYY-MM-DD");
    this.state.paymentDate.minDate = currentDate;

    this.state.currentDate = currentDate;
    this.state.eligibleTransferFromAccountsList = this.state.wholeEligibleAccountsList?.filter((item: any) => item.transferOut === "1")
    this.hideFromAccountChangeBtn = this.state.eligibleTransferFromAccountsList?.length === 1 ? true : false;
    this.state.eligibleTransferToAccountsList = this.state.wholeEligibleAccountsList?.filter((item: any) => item.transferIn === "1")
    this.state.preferredTransferAccount = this.getPreferredAccount();


    if (this.getRoutingParam('operationMode') != 'M') {
      this.setValue('paymentDate', this.state.currentDate);
      this.selectedTransferFromAccount = this.setSelectedAccount();
      this.state.eligibleTransferToAccountsList = this.state.eligibleTransferToAccountsList.filter((item: any) => item.accountNumber !== this.selectedTransferFromAccount.accountNumber)
      this.setVariable('fromCurrencyVariable', this.selectedTransferFromAccount.accountCurrency);
      this.setVariable('accountBalanceVariable', this.selectedTransferFromAccount.availableBalance);
      this.state.fromCurrencyVariable = this.selectedTransferFromAccount.accountCurrency;
      this.setValue('paymentAmount', { currencyCode: this.state.fromCurrencyVariable });
      this.hideTypeNumberOfPaymentsAndEndDate();


      if (this.selectedTransferFromAccount.availableBalance || this.selectedTransferFromAccount?.availableBalance != undefined || this.selectedTransferFromAccount?.availableBalance != '') {
        this.state.accountBalanceVar = this.selectedTransferFromAccount.availableBalance;
      }
      else {
        this.state.accountBalanceVar = 0;
      }

      this.frequencyControlService.modifyFrequencyControlList = false;
      setTimeout(() => {
        this.state.showPaymentFrequency = true;
      }, 200);
      this.state.futureDate = nextDate;
      this.setHidden('hiddenField', true);
      this.setDisabled('paymentAmount', true);
      this.setDisabled('paymentDate', true);
      this.setReadonly('scheduleType', true);
      this.setDisabled("paymentFrequency", false);
      this.setValue('paymentFrequency', '1');
      this.setDisabled("endDate", true);
      this.setDisabled("paymentDaysInterval", true);
      this.setDataService(this.retailOwnAccountTransferFormService);
      this.setServiceCode("RETAILTRANOAT");
      this.setValue('scheduleType', false);
      this.state.scheduleTypeVar = '1';
      this.setVariable('scheduleTypeVar', this.state.scheduleTypeVar);
      this.setValue('sourceAccount', this.selectedTransferFromAccount.accountNumber);

      let key: any = {
        accountNumber: this.selectedTransferFromAccount.accountNumber
      }

      this.casaAccountservice.findByKey(key)().subscribe((res) => {
        if (res) {
          setTimeout(() => {
            this.hideSpinner();
          }, 100);
          this.setVariable('fromCurrencyVariable', res.accountCurrency);
          this.state.fromCurrencyVariable = res.accountCurrency;
          this.setValue('paymentAmount', { amount: 0, currencyCode: res?.accountCurrency });
          if (res.availableBalance || res?.availableBalance != undefined || res?.availableBalance != '') {
            this.state.accountBalanceVar = res.availableBalance;
          }
          else {
            this.state.accountBalanceVar = 0;
          }
          this.state.fromAccProductDesc = res.productDesc;
          this.state.fromAccNickname = res.accountNickname;
          this.setVariable('accountBalanceVariable', res.availableBalance);
        } else if (res == null || !res) {
          this.state.showErrorTemplate = true;
          setTimeout(() => {
            this.hideSpinner();
          }, 100);
        } else {
          setTimeout(() => {
            this.hideSpinner();
          }, 100);
        }
      })

      this.setDisabled('paidInstallments', true);
      this.setHidden('paymentSummary', true);
      this.setDisabled('creditAmount', true);
      this.setDisabled('creditCurrency', true);
      this.setDisabled('debitAmount', true);
      this.setDisabled('debitCurrency', true);
      this.setDisabled('paymentId', true);
      this.setDisabled('scheduleId', true);
    }
    else if (this.getRoutingParam('operationMode') == 'M') {
      let routingParam: any = this.getRoutingParam();


      this.addShellButton("Cancel Transfer", "CANCEL", "secondary", 'ENTRY', 'button');
      this.setShellBtnMethod('CANCEL', this.cancelScheduledTransfer.bind(this));

      this.siownService.findByKey(routingParam)().subscribe((res: any) => {
        if (res) {
          this.patchValue(res);
          this.setValue('sourceAccount', res?.sourceAccount);
          this.setValue('creditAccount', res?.creditAccountNumber);
          this.state.sourceAccountDis = res?.sourceAccount;
          this.state.creditAccountDis = res?.creditAccountNumber;
          this.state.frequencyVar = res?.paymentFrequency;
          this.state.futureDate = nextDate;
          this.state.paymentDate.minDate = this.state.futureDate;
          let accNum: any = {
            accountNumber: res?.sourceAccount
          }
          this.casaAccountservice.findByKey(accNum)().subscribe((res) => {
            if (res) {
              this.selectedTransferFromAccount = res;

              if (res?.accountNumber == this.state.preferredTransferAccount?.accountNumber) {
                this.selectedTransferFromAccount.preferredAccount = true;
              }

              if (res?.accountNickname) {
                this.state.sourceAccountDisDesc = res?.accountNickname;
              }
              else {
                this.state.sourceAccountDisDesc = res?.productDesc;
              }
            } else if (res == null || !res) {
              this.state.showErrorTemplate = true;
              setTimeout(() => {
                this.hideSpinner();
              }, 100);
            } else {
              setTimeout(() => {
                this.hideSpinner();
              }, 100);
            }
          });
          let key: any = {
            accountNumber: res?.creditAccountNumber
          }
          this.casaAccountservice.findByKey(key)().subscribe((res) => {
            if (res) {
              this.selectedTransferToAccount = res;
              setTimeout(() => {
                this.hideSpinner();
              }, 100);

              if (res?.accountNickname) {
                this.state.creditAccountDisDesc = res?.accountNickname;
              }
              else {
                this.state.creditAccountDisDesc = res?.productDesc;
              }
            } else if (res == null || !res) {
              this.state.showErrorTemplate = true;
              setTimeout(() => {
                this.hideSpinner();
              }, 100);
            } else {
              setTimeout(() => {
                this.hideSpinner();
              }, 100);
            }
          });
          this.state.paymentDateVar = res?.paymentDate;
          this.state.paymentEndDateVar = res?.endDate;
          this.state.modifyScheduleTypeVar = res?.scheduleType;
          this.state.paymentAmountVar = res?.paymentAmount;
          this.state.paymentCurrencyVar = res?.paymentCurrency;
          this.setValue('scheduleId', res.paymentId);
          this.setHidden('paymentSummary', false);
          this.setVariable('fromCurrencyVariable', res.paymentCurrency);
          this.state.fromCurrencyVariable = res.paymentCurrency;
          this.setVariable('toCurrencyVariable', res.creditCurrency);
          this.state.toCurrencyVariable = res.creditCurrency;
          this.setValue('paymentAmount', { amount: res?.paymentAmount, currencyCode: res?.paymentCurrency });
          this.setReadonly('paymentAmount', false);
          this.setReadonly('purpose', true);

          this.state.paymentSummary.debitAmount = res?.paymentCurrency + " " + this._currencyFormatter.transform(res?.debitAmount, res?.paymentCurrency);
          this.state.paymentSummary.creditAmount = res?.creditCurrency + " " + this._currencyFormatter.transform(res?.creditAmount, res?.creditCurrency);
          this.state.paymentSummary.exchangeRate = "1.00 " + res?.paymentCurrency + " = " + res?.rateApplied + " " + res?.paymentCurrency;

          if (res?.paymentCurrency !== res?.creditCurrency) {
            this.state.appliedCrossCurrency = true;
            this.state.crossCurrencyIcon = true;
          } else {
            this.state.appliedCrossCurrency = false;
            this.state.crossCurrencyIcon = false;
          }

          if (res?.scheduleType == "2") {
            this.frequencyControlService.modifyFrequencyControlList = false;

            setTimeout(() => {
              this.state.showPaymentFrequency = true;
            }, 200);
            
            this.state.paymentDate.minDate = nextDate;
            this.setValue('paymentDate', res?.nextPaymentDate);
            this.setReadonly('paymentDate', false);
            this.setValue('scheduleType', false);
            this.setReadonly('scheduleType', false);
            this.state.scheduleTypeVar = '2';
            this.setVariable('scheduleTypeVar', this.state.scheduleTypeVar);
            this.setValue('paymentFrequency', '1');
            this.setHidden("paymentFrequency", false);
            this.setReadonly("paymentFrequency", true);
            this.setDisabled("endDate", true);
            this.hideTypeNumberOfPaymentsAndEndDate();
            this.setDisabled("paymentDaysInterval", true);
            this.state.showScheduleTypeValue = false;
          }
          else if (res?.scheduleType == "3") {
            this.state.changedFromEdit = true;
            this.frequencyControlService.modifyFrequencyControlList = true;
            setTimeout(() => {
              this.state.showPaymentFrequency = true;
            }, 200);
            this.setValue('scheduleType', true);
            this.state.scheduleTypeVar = '3';
            this.setVariable('scheduleTypeVar', this.state.scheduleTypeVar);
            // this.state.scheduleToggleVar = res?.termsFlag == "Y" ? true : false;
            // this.setValue('scheduleType', this.state.scheduleToggleVar);

            let startDate = new Date(res?.paymentDate);
            let endDate = new Date(res?.endDate);

            if (startDate && endDate) {
              const formattedEndDate = moment(endDate).format('YYYY-MM-DD');
              const tenYearsFromTransferDate = moment(startDate).add(50, 'years').format('YYYY-MM-DD');

              if (moment(formattedEndDate).isSame(tenYearsFromTransferDate)) {
                this.state.scheduleToggleVar = true;
                this.setValue('scheduleType', true);
              } else {
                this.state.scheduleToggleVar = false;
                this.setValue('scheduleType', false);
              }
            }

            this.setReadonly('scheduleType', false);
            this.state.numberOfPaymentVar = res?.numberOfPayments;
            this.state.paidInstallments = res?.paidInstallments;
            this.setValue('paymentDate', res?.paymentDate);
            setTimeout(() => {
              if (!this.state.scheduleToggleVar) {
                this.setRecurringValues();
              } else {
                this.setNeverEndingValues();
              }
            }, 500);
          }

          if(!this.isAllowSIEdit(res)){
            this.hideShellActions();
            this.setReadonly('paymentAmount', true);
            this.setReadonly('paymentDate', true);

            if(res?.scheduleType == "3"){
              this.setReadonly('numberOfPayments', true);
              this.setReadonly('paymentFrequency', true);
              this.setReadonly('endDate', true);
              this.setReadonly('scheduleType', true);
            }
          }

        } else if (res == null || !res) {
          this.state.showErrorTemplate = true;
          setTimeout(() => {
            this.hideSpinner();
          }, 100);
        }
      });
    }
  }

  setSelectedAccount() {
    let selectedTransferFromAccount: any;
    if (this._appConfig.getData("selectedAccountFromSummary")) {
      selectedTransferFromAccount = this.state.wholeEligibleAccountsList.find((item: any) => item.accountNumber == this._appConfig.getData("selectedAccountFromSummary"));
    } else if (this.state.preferredTransferAccount) {
      selectedTransferFromAccount = this.state.preferredTransferAccount;
    } else {
      selectedTransferFromAccount = this._appConfig.getData("CASAAccounts")[0];
      selectedTransferFromAccount.preferredAccount = false;
    }
    this.setVariable('fromCurrencyVariable', selectedTransferFromAccount.accountCurrency);
    this.setVariable('accountBalanceVariable', selectedTransferFromAccount.availableBalance);

    return selectedTransferFromAccount;
  }

  getPreferredAccount() {
    let preferredAccount: any;
    this.state.eligibleTransferFromAccountsList.forEach((item: any) => {
      if (item.preferredAccount) {
        preferredAccount = item;
      }
    })
    return preferredAccount;
  }

  cancelScheduledTransfer() {
    const fpxModal = new FpxModal();
    fpxModal.setComponent(DepConfirmationComponent);
    fpxModal.setDisableClose(false);
    fpxModal.setPanelClass("dep-alert-popup");
    fpxModal.setBackDropClass(['dep-popup-back-drop', 'logout-backdrop', 'bottom-transparent-overlay', 'dep-cancel']);
    fpxModal.setData({
      // title: "RETAILSCHOAT.cancelMessage1",
      message: "RETAILSCHOAT.cancelMessage1",
      // description: "RETAILSCHOAT.cancelMessage2",
      okBtnLbl: "RETAILSCHOAT.okBtnLbl",
      cancelBtnLbl: "RETAILSCHOAT.cancelBtnLbl",
      confirmationIcon: "cancel-e-transfer"
    });
    fpxModal.setAfterClosed(this.cancelScheduledTransferAfterClose);
    this.openModal(fpxModal);
  }

  cancelScheduledTransferAfterClose: FpxModalAfterClosed = (payload: any) => {
    if (payload == 1) {
      this.setServiceCode("RETAILSCHOAT");
      this.setDataService(this.siownreqService);
      this.enableDelete = true;
      this.triggerSubmit();
    }
  }

  public handleFormOnPresubmit(payload: any) {
    // WRITE CODE HERE TO HANDLE
    if (this.getRoutingParam('operationMode') == 'M') {
      this.setServiceCode("RETAILSCHOAT");
      this.setDataService(this.siownreqService);
      payload.operationMode = "M";
      payload.paymentAmount = this.getValue('paymentAmount').amount;
      payload.paymentCurrency = this.getValue('paymentAmount').currencyCode;
      payload.sourceAccount = this.getValue('sourceAccount');
      if (this.getValue('paymentDate') >= this.state.currentDate && this.getValue('scheduleType') == false && (this.getValue('paymentFrequency') == 1 || !this.getValue('paymentFrequency'))) {
        payload.scheduleType = '2';
        if (payload.paymentFrequency) {
          delete payload.paymentFrequency;
        }

        payload.paymentDate = this.getValue('paymentDate');
        payload.endDate = this.getValue('paymentDate');
      }
      else if (this.getValue('paymentDate') >= this.state.currentDate && this.getValue('scheduleType') == false) {
        payload.scheduleType = '3';
        payload.numberOfPayments = this.getValue('numberOfPayments');
        payload.endDate = this.getValue('endDate');
        // payload.termsFlag = "N";
      }
      else if (this.getValue('paymentDate') >= this.state.currentDate && this.getValue('scheduleType') == true && (this.getValue('paymentFrequency') > 1)) {
        payload.scheduleType = '3';
        let transferDate = this.formGroup.get('paymentDate')?.value;
        let paymentFrequency = this.formGroup.get('paymentFrequency')?.value;
        let endDate = new Date(transferDate);
        if (this.getValue('scheduleType') == true) {
          endDate.setFullYear(endDate.getFullYear() + 50);
          payload.numberOfPayments = this.getNumberOfPayments(transferDate, paymentFrequency, endDate);
          payload.scheduleType = '3';
          const formattedDate = endDate.toISOString().split('T')[0];
          payload.endDate = formattedDate;
          // payload.termsFlag = "Y";
        } else {
          endDate = this.getValue('endDate');
          payload.endDate = this.getValue('endDate');
          // payload.termsFlag = "N";
        }
        if (this.getValue('paymentFrequency') == 5 || this.getValue('paymentFrequency') == 6) {
          payload.paymentInterval = this.getValue('paymentFrequency') == 5 ? 180 : 365;
        }
      }
      this.setHidden('hiddenField', true);
    }
    else {
      payload.paymentAmount = this.getValue('paymentAmount').amount;
      payload.paymentCurrency = this.state.fromCurrencyVariable;
      payload.sourceAccount = this.getValue('sourceAccount');
      payload.operationMode = "A";

      if (this.getValue('paymentDate') > this.state.currentDate && this.getValue('scheduleType') == false && this.getValue('paymentFrequency') == 1) {
        payload.scheduleType = '2';
        if (payload.paymentFrequency) {
          delete payload.paymentFrequency;
        }
      }
      else if (this.getValue('paymentDate') == this.state.currentDate && this.getValue('scheduleType') == false) {
        payload.scheduleType = '1';
        if (payload.endDate) {
          delete payload.endDate;
        }
      }
      else {
        payload.scheduleType = '3';

        let transferDate = this.formGroup.get('paymentDate')?.value;
        let paymentFrequency = this.formGroup.get('paymentFrequency')?.value;
        let endDate = new Date(transferDate);
        if (this.getValue('scheduleType') == true) {
          endDate.setFullYear(endDate.getFullYear() + 50);
          payload.numberOfPayments = this.getNumberOfPayments(transferDate, paymentFrequency, endDate);
          payload.scheduleType = '3';
          // payload.termsFlag = "Y";
          const formattedDate = endDate.toISOString().split('T')[0];
          payload.endDate = formattedDate;
        } else {
          payload.endDate = this.getValue('endDate');
          // payload.termsFlag = "N";
        }
        if (this.getValue('paymentFrequency') == 5 || this.getValue('paymentFrequency') == 6) {
          payload.paymentInterval = this.getValue('paymentFrequency') == 5 ? 180 : 365;
        }
      }
    }

    if (this.enableDelete) {
      payload.operationMode = "D";
      payload.paymentDate = this.getValue('paymentDate');
    }
    payload.accountType = this.selectedTransferToAccount?.accountType
    payload.productCode = this.selectedTransferFromAccount?.productCode
    payload.beneficiaryName = this.selectedTransferToAccount?.productDesc

    this.setValue('sourceAccount', this.selectedTransferFromAccount.accountNumber);
    payload.sourceAccount = this.selectedTransferFromAccount.accountNumber;
    this._appConfig.setData('transferData', payload);
  }


  getNumberOfPayments(transferDate: any, paymentFrequency: any, endDate: any) {
    let installments = 0;
    let frequency = Number(paymentFrequency);
    let transferStartDate = new Date(transferDate);
    let transferEndDate = new Date(endDate);
    let numberOfInstallments = this.calculateInstallments(transferStartDate, transferEndDate, frequency);
    return numberOfInstallments;
  }


  calculateInstallments(startDate: Date, endDate: Date, frequency: number): number {
    // Parse the start and end dates using moment
    const start = moment(startDate);
    const end = moment(endDate);

    // Ensure the start date is before the end date
    if (start.isAfter(end)) {
      throw new Error("Start date must be before end date.");
    }

    // Calculate the total number of installments based on the frequency
    let totalInstallments = 0;

    switch (frequency) {
      case 2:
        totalInstallments = end.diff(start, 'weeks');
        break;
      case 3:
        totalInstallments = end.diff(start, 'weeks') / 2;
        break;
      case 4:
        totalInstallments = end.diff(start, 'months');
        break;
      case 5:
        totalInstallments = end.diff(start, 'months') / 6;
        break;
      case 6:
        totalInstallments = end.diff(start, 'years');
        break;
    }

    console.log(totalInstallments + 1, "totalInstallments")
    return Math.floor(totalInstallments + 1); // Return the number of installments as a whole number
  }




  public override preSubmitInterceptor(payload: Ownaccounttransfer): any {
    // WRITE CODE HERE TO HANDLE 
    this.handleFormOnPresubmit(payload);
    return payload;
  }


  public override postDataFetchInterceptor(payload: Ownaccounttransfer) {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }


  public override postSubmitInterceptor(response: any): RoutingInfo {
    let routingInfo: RoutingInfo = new RoutingInfo();
    this.handleFormOnPostsubmit(response, routingInfo);
    return routingInfo;
  }

  public handleFormOnPostsubmit(response: any, routingInfo: any) {
    // WRITE CODE HERE TO HANDLE
    if (response.success) {
      let res = response.success?.body?.ownaccounttransfer || response.success?.body?.siownreq;
      routingInfo.setQueryParams({
        response: res
      });
    } else if (response.error) {

      let error = response.error.error;
      routingInfo.setQueryParams({
        response: error
      });
    }
    return response;
  }


  getAbsoluteValue(value: number | undefined): number {
    return value ? Math.abs(value) : 0;
  }

  checkNegativeValue(value: number | undefined): string {
    return value && value < 0 ? '-' : '';
  }


  openTransferFromAccountsList() {
    let modal = new FpxModal();
    modal.setComponent(CASAAccountsTransferListComponent);
    if (this._device.isMobile()) {
      modal.setPanelClass('full-view-popup');
    } else {
      modal.setPanelClass('dep-alert-popup');
    }
    modal.setBackDropClass(['dep-popup-back-drop', 'payment-accounts-list-popup-back-drop', 'from-transfer']);
    modal.setDisableClose(true);
    modal.setData({
      title: 'Transfer From',
      accountsList: this.state.eligibleTransferFromAccountsList,
      selectedAccount: this.selectedTransferFromAccount || undefined
    });
    modal.setAfterClosed(this.accountSelectedAfterClose);
    this.openModal(modal)
  }

  accountSelectedAfterClose: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
    if (payload.action === 1) {
      this._appConfig.setData("selectedAccountFromSummary", undefined);
      this.selectedTransferFromAccount = payload.data;
      this.selectedTransferToAccount = undefined;
      this.setValue('creditAccount', undefined);
      let eligibleToList = this.state.wholeEligibleAccountsList.filter((item: any) => item.transferIn === "1")
      this.state.eligibleTransferToAccountsList = eligibleToList.filter((item: any) => item.accountNumber !== payload.data.accountNumber)
      this.setVariable('fromCurrencyVariable', payload.data.accountCurrency);
      this.setVariable('accountBalanceVariable', payload.data.availableBalance);
      this.state.fromCurrencyVariable = payload.data.accountCurrency;
      this.setValue('sourceAccount', payload.data.accountNumber);
      this.setDisabled('sourceAccount', false);
      this.setFormStateToInitialAfterFromAccountSelected();


      setTimeout(() => {
        this.showMandatoryError = false;
      }, 50);
      this.setValue('paymentAmount', { currencyCode: this.state.fromCurrencyVariable });

      if (this.selectedTransferFromAccount.availableBalance || this.selectedTransferFromAccount?.availableBalance != undefined || this.selectedTransferFromAccount?.availableBalance != '') {
        this.state.accountBalanceVar = this.selectedTransferFromAccount.availableBalance;
      }
      else {
        this.state.accountBalanceVar = 0;
      }

      this.formGroup.get('paymentAmount')?.updateValueAndValidity();
    }
    this.selectedTransferFromAccount.fromAccProductDesc = this.state.fromAccProductDesc;
    this.selectedTransferFromAccount.fromAccNickname = this.state.fromAccNickname;
    this._appConfig.setData('transferFromAccountData', this.selectedTransferFromAccount);
  }

  setFormStateToInitialAfterFromAccountSelected() {
    this.setValue('paymentFrequency', '1');
    this.setDisabled('paymentAmount', true)
    this.reset('paymentAmount');
    this.setDisabled('paymentDate', true);
    this.setValue('paymentDate', this.state.currentDate);
    this.reset('numberOfPayments');
  }

  openTransferToAccountsList() {
    let modal = new FpxModal();
    modal.setComponent(CASAAccountsTransferListComponent);
    if (this._device.isMobile()) {
      modal.setPanelClass('full-view-popup');
    } else {
      modal.setPanelClass('dep-alert-popup');
    }
    modal.setBackDropClass(['dep-popup-back-drop', 'payment-accounts-list-popup-back-drop', 'from-transfer']);
    modal.setDisableClose(true);
    modal.setData({
      title: 'Transfer To',
      accountsList: this.state.eligibleTransferToAccountsList,
      selectedAccount: this.selectedTransferToAccount || undefined
    });
    modal.setAfterClosed(this.toAccountSelectedAfterClose);
    this.openModal(modal)
  }

  toAccountSelectedAfterClose: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
    if (payload.action === 1) {
      this.selectedTransferToAccount = payload.data;
      this.setVariable('toCurrencyVariable', payload.data.accountCurrency);
      this.setVariable('accountBalanceVariable', this.selectedTransferFromAccount.availableBalance);
      this.state.toCurrencyVariable = payload.data.accountCurrency;
      this.setValue('creditAccount', payload.data.accountNumber);
      this.setFormStateToInitialAfterFromAccountSelected();


      if (this.loanAccountTypes.includes(payload.data.accountType.toUpperCase())) {
        console.log("loan account")
        this.state.showLoanMessage = true;
        this.state.showRegisteredProductMessage = false;
        this.setReadonly('paymentDate', true);
        this.setHidden('paymentFrequency', true);
        this.setHidden('paymentFrequencyWrapper', true);
        this.setHidden('scheduleType', true);
        this.setHidden('scheduleTypeWrapper', true);
        this.setHidden('scheduleHandler', true);
        this.setReadonly('paymentFrequency', true);
        this.setHidden('hiddenField', true);
      }
      else if (!this.casaAccountTypes.includes(payload.data.accountType.toUpperCase()) && !this.loanAccountTypes.includes(payload.data.accountType.toUpperCase())) {
        console.log("registered product")
        this.state.showRegisteredProductMessage = true;
        this.state.showLoanMessage = false;
        this.setReadonly('paymentDate', false);
        this.setHidden('paymentFrequency', false);
        this.setHidden('paymentFrequencyWrapper', false);
        this.setReadonly('paymentFrequency', false);
        this.setValue('paymentFrequency', '1');
        this.setHidden('hiddenField', true);
      } else {
        console.log("other account")
        this.state.showLoanMessage = false;
        this.state.showRegisteredProductMessage = false;
        this.setReadonly('paymentDate', false);
        this.setHidden('paymentFrequency', false);
        this.setHidden('paymentFrequencyWrapper', false);
        this.setReadonly('paymentFrequency', false);
        this.setValue('paymentFrequency', '1');
        this.setHidden('hiddenField', true);
      }

      this.setDisabled('paymentAmount', false);
      this.setDisabled('paymentDate', false);
      this.setReadonly('scheduleType', false);
    }
    this.selectedTransferToAccount.toProductDesc = this.state.toProductDesc;
    this.selectedTransferToAccount.toAccNickname = this.state.toAccNickname;
    this._appConfig.setData('selectedTransferToAccount', this.selectedTransferToAccount);
  }


  override onReview(): void {
    this.state.review = true;
    if (this.formGroup.controls['scheduleType'].value) {
      this.state.scheduleTypeValue = 'Yes';
    }
    else {
      this.state.scheduleTypeValue = 'No';
    }
    setTimeout(() => {
      window.scrollTo(0, 0);
    });
  }

  override backToEntryMode(): void {
    this.state.review = false;
    console.log(this.formGroup.controls['paymentFrequency'].value)
    if (this.formGroup.controls['paymentFrequency'].value !== '1') {
      this.setHidden('scheduleType', false);
      this.setHidden('scheduleTypeWrapper', false);
    } else {
      this.setHidden('scheduleType', true);
      this.setHidden('scheduleTypeWrapper', true);
    }

    if (this.getRoutingParam('operationMode') == 'M') {
      if (this.formGroup.controls['paymentFrequency'].value == '1') {
        this.setHidden('scheduleType', true);
        this.setHidden('scheduleTypeWrapper', true);
      }
      else {
        this.setHidden('scheduleType', false);
        this.setHidden('scheduleTypeWrapper', false);
      }
    }

    if (this.state.showLoanMessage) {
      this.setHidden('scheduleType', true);
      this.setHidden('scheduleTypeWrapper', true);
    }
  }


  popupAmount() {
    if (this._device.isMobile()) {
      let modal = new FpxModal();
      modal.setComponent(DepTooltipComponent);
      modal.setPanelClass("dep-tooltip-popup");
      modal.setDisableClose(false);
      // modal.setAfterClosed(this.contextmenuModelAfterClose);
      modal.setData({
        title: "RetailOwnAccountTransferForm.popupAmount.label",
        message: "RetailOwnAccountTransferForm.popupAmount.message",

      });
      this.openModal(modal);
    }
    else {
      let modal = new FpxModal();
      modal.setComponent(DepAlertComponent);
      modal.setPanelClass("dep-alert-popup");
      modal.setBackDropClass(["etransfer-send-limits"]);
      modal.setDisableClose(false);
      // modal.setAfterClosed(this.contextmenuModelAfterClose);
      modal.setData({
        title: "RetailOwnAccountTransferForm.popupAmount.label",
        message: "RetailOwnAccountTransferForm.popupAmount.message",
        okBtnLbl: "Close"
      });
      this.openModal(modal);
    }
  }
  popupAmountTransferred() {
    if (this._device.isMobile()) {
      let modal = new FpxModal();
      modal.setComponent(DepTooltipComponent);
      modal.setPanelClass("dep-tooltip-popup");
      modal.setDisableClose(false);
      // modal.setAfterClosed(this.contextmenuModelAfterClose);
      modal.setData({
        title: "RetailOwnAccountTransferForm.popupAmountTransferred.label",
        message: "RetailOwnAccountTransferForm.popupAmountTransferred.message",

      });
      this.openModal(modal);
    }
    else {
      let modal = new FpxModal();
      modal.setComponent(DepAlertComponent);
      modal.setPanelClass("dep-alert-popup");
      modal.setBackDropClass(["etransfer-send-limits"]);
      modal.setDisableClose(false);
      // modal.setAfterClosed(this.contextmenuModelAfterClose);
      modal.setData({
        title: "RetailOwnAccountTransferForm.popupAmountTransferred.label",
        message: "RetailOwnAccountTransferForm.popupAmountTransferred.message",
        okBtnLbl: "Close"
      });
      this.openModal(modal);
    }
  }
  popupProcessing() {
    if (this._device.isMobile()) {
      let modal = new FpxModal();
      modal.setComponent(DepTooltipComponent);
      modal.setPanelClass("dep-tooltip-popup");
      modal.setDisableClose(false);
      // modal.setAfterClosed(this.contextmenuModelAfterClose);
      modal.setData({
        title: "RetailOwnAccountTransferForm.popupProcess.label",
        serviceCode: "RETAILTRANOAT",
        additionalInfo: "RetailOwnAccountTransferForm.popupProcess.additionalInfo",
        message: "RetailOwnAccountTransferForm.popupProcess.message"

      });
      this.openModal(modal);
    }
    else {
      let modal = new FpxModal();
      modal.setComponent(DepAlertComponent);
      modal.setPanelClass("dep-alert-popup");
      modal.setBackDropClass(["etransfer-send-limits"]);
      modal.setDisableClose(false);
      // modal.setAfterClosed(this.contextmenuModelAfterClose);
      modal.setData({
        title: "RetailOwnAccountTransferForm.popupProcess.label",
        message: "RetailOwnAccountTransferForm.popupProcess.message",
        okBtnLbl: "Close",
        serviceCode: "RETAILTRANOAT",
        additionalInfo: "RetailOwnAccountTransferForm.popupProcess.additionalInfo"

      });
      this.openModal(modal);
    }
  }

  isAllowSIEdit(payload: any): boolean {
    let dateToCheck:any = payload?.paymentDate;
    let allowEdit: boolean = true;
    const givenDate = moment(dateToCheck);
    const today = moment();
    let dateDiff = givenDate.diff(today.format("YYYY-MM-DD"), 'days');

    if(dateDiff == 1) {
      let hr:number = parseInt(today.format("HH"));
      if(hr >= 21){
        allowEdit = false;
      }
    } else {
      console.log("fine");
    }
    return allowEdit;
  }

}


//$START_CUSTOMSCRIPT\n
//$END_CUSTOMSCRIPT\


