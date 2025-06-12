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
  FpxModalAfterClosed,
} from "@fpx/core";
import { BehaviorSubject, Observable, map, of } from "rxjs";
import { Router } from "@angular/router";
import { WithinbanktransferService } from "../withinbanktransfer-service/withinbanktransfer.service";
import { Withinbanktransfer } from "../withinbanktransfer-service/withinbanktransfer.model";
import { AppConfigService } from "@dep/services";
import { mode } from "d3";
import { CommonService } from "src/app/foundation/validator-service/common-service";
import { MomentService } from "src/app/foundation/validator-service/moment-service";
import { SiintbtService } from "../siintbt-service/siintbt.service";
import { SiintbtreqService } from "../siintbtreq-service/siintbtreq.service";
import { ActiveSpaceInfoService, DeviceDetectorService } from "@dep/core";
import { CasaaccountService } from "src/app/foundation/casaaccount-service/casaaccount.service";
import { ManageBeneTransferListComponent } from "../manage-bene-transfer-list/manage-bene-transfer-list.component";
import { Casaaccount } from "src/app/foundation/casaaccount-service/casaaccount.model";
import { Beneinternal } from "../beneinternal-service/beneinternal.model";
import moment from "moment";
import { BeneintbtreqService } from "../beneintbtreq-service/beneintbtreq.service";
import { APPCONSTANTS } from "@dep/constants";
import { AccountsSpaceManager } from "src/app/accounts-space/accounts-space.manager";
import { BeneinternalService } from "../beneinternal-service/beneinternal.service";
import { CASAAccountsTransferListComponent } from "src/app/accounts/casa-accounts-transfer-list/casa-accounts-transfer-list.component";
import { DepAlertComponent } from "src/app/dep/core/component/dep-alert/dep-alert.component";
import { DepTooltipComponent } from "src/app/dep/core/component/dep-tooltip/dep-tooltip.component";
import { DepConfirmationComponent } from "src/app/dep/core/component/dep-confirmation/dep-confirmation.component";
import { FrequencyControlService } from "src/app/foundation/frequency-control/frequency-control.service";
export class RetailWithinBankTransferFormState extends BaseFpxComponentState {
  private _appConfig: AppConfigService = inject(AppConfigService);

  showSuggestion: boolean = false;
  fromCurrencyVariable: any;
  reviewMode: boolean = false;
  toCurrencyVariable: any;
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
  endDate: any = {
    minDate: "",
    maxDate: "",
  };
  termsFlag: any = {
    textPosition: "after",
    ckValues: { checked: "Y", unchecked: "N" },
  };
  beneficiaryAdvice: any = {
    textPosition: "after",
    ckValues: { checked: "Y", unchecked: "N" },
  };
  paymentAmount: any = {
    isCurrEditable: false,
    CurrencyList: [{ id: this._appConfig.baseCurrency, text: this._appConfig.baseCurrency }],
    amountInWords: true,
    initCurrency: this._appConfig.baseCurrency,
    defaultFetch: true,
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
  currentDate: any;
  numberOfPaymentVar: any;
  transferSummary: any = {
    paymentId: "",
    paymentStatus: ""
  };
  paidInstallments: any;
  fromAccProductDesc: any
  fromAccNickname: any
  toAccNickname: any
  beneAccountNickname: any
  enableTransferTo: boolean = true;
  creditAccountDis: any
  sourceAccountDis: any
  sourceAccountDisDesc: any;
  creditAccountDisDesc: any;
  scheduleTypeVar: any;
  paymentDateVar: any;
  paymentEndDateVar: any;
  paymentAmountVar: any
  paymentCurrencyVar: any;
  futureDate: any;
  modifyTransferDetails: any;
  review: boolean = false;
  // casaAccountsList: Casaaccount[] = [];
  // casaAccountsFilteredList: Casaaccount[] = [];
  wholeEligibleAccountsList: any;
  eligibleTransferFromAccountsList: any;
  eligibleTransferToAccountsList: any;
  preferredTransferAccount: any;
  scheduleTypeValue: string = 'No';
  showScheduleTypeValue: boolean = false;
  frequencyVar: any;
  scheduleToggleVar: boolean = false;
  showPaymentFrequency: boolean = false;
  modifyScheduleTypeVar: any;
  crossCurrencyIcon: boolean = false;
  minInstallmentError: boolean = false;
  isNoOfPaymentChange: boolean = false;
  isEndDateChange: boolean = false;
  showErrorTemplate: boolean = false;
  changeEndDateBasedOnFrequency: boolean = false;
  changedFromEdit: boolean = false;
}

@Injectable()
export class RetailWithinBankTransferFormHelper extends BaseFpxFormHelper<RetailWithinBankTransferFormState> {
  shellType: any;
  accordionOpen: boolean = true;
  transferData: any;
  selectedTransferFromAccount: any;
  selectedTransferToAccount: any;
  enableDelete: boolean = false;
  showInsufficientBalanceError: boolean = false;
  showMandatoryError: boolean = false;
  hideFromAccountChangeBtn: boolean = false;
  amountLength:boolean = false;


  private _serviceCodeDetails: FpxAppConfig = inject(FpxAppConfig);
  enableAddContact: boolean = false;
  constructor(
    private retailWithinBankTransferFormService: WithinbanktransferService,
    private _httpProvider: HttpProviderService,
    private _router: Router,
    private commonService: CommonService,
    private siintService: SiintbtService,
    public siintbtreqService: SiintbtreqService,
    private momentService: MomentService,
    private _currencyFormatter: FpxCurrenyFormatterPipe,
    private _appConfig: AppConfigService,
    private casaAccountservice: CasaaccountService,
    public _device: DeviceDetectorService,
    private _activeSpaceInfoService: ActiveSpaceInfoService = inject(ActiveSpaceInfoService),
    private _beneintbtreqService: BeneintbtreqService,
    private beneInternalServices: BeneinternalService,
    private _accountSpaceMgr: AccountsSpaceManager,
    private frequencyControlService: FrequencyControlService
  ) {
    super(new RetailWithinBankTransferFormState());
  }

  override doPreInit(): void {

    let modulenumberOfPaymentsUpdatedRefresh$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    this._appConfig.setData('modulenumberOfPaymentsUpdatedRefresh$', {
      "observable": modulenumberOfPaymentsUpdatedRefresh$.asObservable(),
      "subject": modulenumberOfPaymentsUpdatedRefresh$
    });

    let operationMode: any = this.getRoutingParam('operationMode');
    this.state.modeVar = this.getRoutingParam('operationMode');
    let paymentId: any = this.getRoutingParam('paymentId');
    let serviceCode: any = this.getRoutingParam('serviceCode');
    // this.addResetHandler('reset', this._onReset);

    if (paymentId && operationMode && serviceCode == "RETAILSCHINTBT") {
      this.setServiceCode("RETAILSCHINTBT");
      this.setDataService(this.siintService);
    } else {
      this.setServiceCode("RETAILTRANINTBT");
      this.setDataService(this.retailWithinBankTransferFormService);
    }
  }


  contextmenuModelAfterClose: FpxModalAfterClosed = (payload: any, addtionalData: any) => {

  }


  popupAmount() {
    if (this._device.isMobile()) {
      let modal = new FpxModal();
      modal.setComponent(DepTooltipComponent);
      modal.setPanelClass("dep-tooltip-popup");
      modal.setDisableClose(false);
      modal.setAfterClosed(this.contextmenuModelAfterClose);
      modal.setData({
        title: "RetailWithinBankTransferForm.popupAmount.label",
        message: "RetailWithinBankTransferForm.popupAmount.message",

      });
      this.openModal(modal);
    }
    else {
      let modal = new FpxModal();
      modal.setComponent(DepAlertComponent);
      modal.setPanelClass("dep-alert-popup");
      modal.setBackDropClass(["etransfer-send-limits"]);
      modal.setDisableClose(false);
      modal.setAfterClosed(this.contextmenuModelAfterClose);
      modal.setData({
        title: "RetailWithinBankTransferForm.popupAmount.label",
        message: "RetailWithinBankTransferForm.popupAmount.message",
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
      modal.setAfterClosed(this.contextmenuModelAfterClose);
      modal.setData({
        title: "RetailOwnAccountTransferForm.popupProcess.label",
        serviceCode: "RETAILTRANINTBT",
        message: "RetailOwnAccountTransferForm.popupProcess.message",
        additionalInfo: "RetailOwnAccountTransferForm.popupProcess.additionalInfo",

      });
      this.openModal(modal);
    }
    else {
      let modal = new FpxModal();
      modal.setComponent(DepAlertComponent);
      modal.setPanelClass("dep-alert-popup");
      modal.setBackDropClass(["etransfer-send-limits"]);
      modal.setDisableClose(false);
      modal.setAfterClosed(this.contextmenuModelAfterClose);
      modal.setData({
        title: "RetailOwnAccountTransferForm.popupProcess.label",
        message: "RetailOwnAccountTransferForm.popupProcess.message",
        okBtnLbl: "Close",
        serviceCode: "RETAILTRANINTBT",
        additionalInfo: "RetailOwnAccountTransferForm.popupProcess.additionalInfo"

      });
      this.openModal(modal);
    }
  }

  public handleFormOnLoad() {
    this.removeShellBtn('RESET');
    this.state.paymentDate.minDate = new Date();
    this.state.currentDate = moment(this.state.paymentDate.minDate).format('YYYY-MM-DD');
    this.state.eligibleTransferFromAccountsList = this.state.wholeEligibleAccountsList.filter((item: any) => item.transferOut === "1")
    this.hideFromAccountChangeBtn = this.state.eligibleTransferFromAccountsList.length === 1 ? true : false;
    this.state.eligibleTransferToAccountsList = this.state.wholeEligibleAccountsList.filter((item: any) => item.transferIn === "1")
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
      this.state.futureDate = moment(new Date(new Date().setDate(new Date().getDate() + 1))).format('YYYY-MM-DD');
      this.setHidden('hiddenField', true);
      this.setDisabled('paymentAmount', true);
      this.setDisabled('paymentDate', true)
      this.setReadonly('scheduleType', true);
      this.setDisabled("paymentFrequency", true);
      this.setValue('paymentFrequency', '1');
      this.setDisabled("endDate", true);
      this.setDisabled("paymentDaysInterval", true);
      this.setDataService(this.retailWithinBankTransferFormService);
      this.setServiceCode("RETAILTRANINTBT");
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
      this.setHidden('creditAccountDisplay', true);
      this.setHidden('sourceAccountDisplay', true);
      this.state.enableTransferTo = true;
      this.setHidden('confirmAccountNumber', true);
      this.setHidden('beneficiaryName', true);
      this.setHidden('cancel', true);
      // this.setDisabled('sourceAccountTemplate',true)
      this.setHidden('newButton', false);
    }
    else if (this.getRoutingParam('operationMode') == 'M') {
      let routingParam: any = this.getRoutingParam();

      this.addShellButton("Cancel Transfer", "CANCEL", "secondary", 'ENTRY', 'button');
      this.setShellBtnMethod('CANCEL', this.cancelScheduledTransfer.bind(this));
      this.setReadonly('sourceAccount', true);
      this.setReadonly('accountNumber', true);
      this.setReadonly('beneficiaryName', true);
      this.setHidden('recipientName', true);

      this.siintService.findByKey(routingParam)().subscribe((res: any) => {
        console.log("Response", res);
        if (res) {
          this.patchValue(res);
          this.setHidden('paymentId', true);
          this.setHidden('confirmAccountNumber', true);
          this.setValue('sourceAccount', res?.sourceAccount);
          this.setHidden('sourceAccount', true);
          this.setValue('creditAccount', res?.creditAccountNumber);
          this.setValue('accountNumber', res?.creditAccountNumber.slice(2));
          this.setReadonly('accountNumber', true);
          this.setValue('beneficiaryName', res?.beneficiaryName);
          this.setValue('recipientName', res?.beneficiaryName);
          this.setReadonly('recipientName', true);
          this.setValue('paymentDate', res?.paymentDate);
          this.setValue('remarks', res?.remarks);
          this.state.futureDate = moment(new Date(new Date().setDate(new Date().getDate() + 1))).format('YYYY-MM-DD');
          this.state.paymentDate.minDate = this.state.futureDate;
          console.log("this.state.paymentDate.minDate", this.state.paymentDate.minDate)
          console.log(this.formGroup)
          if (res?.beneficiaryId) {
            this.setValue('beneficiaryId', res?.beneficiaryId);
          }
          else {
            this.setHidden('beneficiaryId', true);
          }
          this.state.enableTransferTo = false;
          this.setHidden('creditAccountDisplay', false);
          this.setHidden('sourceAccountDisplay', false);
          this.state.sourceAccountDis = res?.sourceAccount;
          this.state.creditAccountDis = res?.creditAccountNumber;
          this.state.creditAccountDisDesc = res?.beneficiaryName;
          let accNum: any = {
            accountNumber: res?.sourceAccount
          }
          this.casaAccountservice.findByKey(accNum)().subscribe((res) => {
            if (res) {
              this.selectedTransferFromAccount = res;
              setTimeout(() => {
                this.hideSpinner();
              }, 100);

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
          this.state.paymentDateVar = res?.paymentDate;
          this.state.paymentEndDateVar = res?.endDate;
          this.state.frequencyVar = res?.paymentFrequency;
          this.state.modifyScheduleTypeVar = res?.scheduleType;
          this.state.paymentAmountVar = res?.paymentAmount;
          this.state.paymentCurrencyVar = res?.paymentCurrency;
          this.setValue('scheduleId', res?.paymentId);
          this.setHidden('paymentSummary', false);
          this.setVariable('fromCurrencyVariable', res?.debitCurrency);
          this.state.fromCurrencyVariable = res?.debitCurrency;
          this.setVariable('toCurrencyVariable', res.debitCurrency);
          this.state.toCurrencyVariable = res.debitCurrency;
          this.setValue('paymentAmount', { amount: res?.paymentAmount, currencyCode: res?.debitCurrency });
          this.setReadonly('paymentAmount', false);
          this.setReadonly('purpose', true);



          this.state.paymentSummary.debitAmount = res?.debitCurrency + " " + this._currencyFormatter.transform(res?.debitAmount, res?.debitCurrency);
          this.state.paymentSummary.creditAmount = res?.debitCurrency + " " + this._currencyFormatter.transform(res?.creditAmount, res?.debitCurrency);
          // this.state.paymentSummary.exchangeRate = res?.paymentCurrency + " 1 = " + res?.debitCurrency + " " + res?.rateApplied;
          this.state.paymentSummary.exchangeRate = "1 " + res?.paymentCurrency + " = " + res?.rateApplied + " " + res?.debitCurrency;

          if (res?.paymentCurrency !== res?.creditCurrency) {
            this.state.crossCurrencyIcon = true;
          } else {
            this.state.crossCurrencyIcon = false;
          }


          if (res?.scheduleType == "2") {
            this.frequencyControlService.modifyFrequencyControlList = false;
            setTimeout(() => {
              this.state.showPaymentFrequency = true;
            }, 200);
            let newDate = new Date();
            let date = newDate.getDate();
            let dateReset: any = new Date(newDate.setDate(newDate.getDate() + 1));
            this.state.paymentDate.minDate = moment(dateReset).format('YYYY-MM-DD');
            this.setValue('paymentDate', res?.nextPaymentDate);
            this.setReadonly('paymentDate', false);
            this.setReadonly('accountNumber', true);
            this.setReadonly("recipientName", false);
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

  cancelScheduledTransfer() {
    // this.setDisabled('paymentAmount', true);
    // this.setDisabled('paymentDate', true);
    // this.setDisabled('scheduleType', true);
    // this.setDisabled('paymentFrequency', true);
    // this.setDisabled('numberOfPayments', true);
    // this.setDisabled('endDate', true);
    // this.setDisabled('paymentDaysInterval', true);
    // this.setDisabled('hiddenField', true);

    const fpxModal = new FpxModal();
    fpxModal.setComponent(DepConfirmationComponent);
    fpxModal.setDisableClose(false);
    fpxModal.setPanelClass("dep-alert-popup");
    fpxModal.setBackDropClass(['dep-popup-back-drop', 'logout-backdrop', 'bottom-transparent-overlay','dep-cancel']);
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
      this.setServiceCode("RETAILSCHINTBT");
      this.setDataService(this.siintbtreqService);
      this.enableDelete = true;
      this.triggerSubmit();
    }
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

  onChangeAccountDropdown() {
    let key: any = {
      accountNumber: this._activeSpaceInfoService.getAccountNumber()
    }
    this.casaAccountservice.findByKey(key)().subscribe((res) => {
      console.log("Response", res);
      if (res) {
        this.setVariable('fromCurrencyVariable', res.accountCurrency);
        this.state.fromCurrencyVariable = res.accountCurrency;
        this.setValue('paymentAmount', { amount: 0, currencyCode: this.state.fromCurrencyVariable });
        if (res.availableBalance || res?.availableBalance != undefined || res?.availableBalance != '') {
          this.state.accountBalanceVar = res.availableBalance;
        }
        else {
          this.state.accountBalanceVar = 0;
        }
        this.state.fromAccProductDesc = res.productDesc;
        this.state.fromAccNickname = res.accountNickname;
        this.setVariable('accountBalanceVariable', res.availableBalance);
      }
    })
  }

  public handleFormOnPresubmit(payload: any) {
    // WRITE CODE HERE TO HANDLE
    if (this.getRoutingParam('operationMode') == 'M') {
      this.setServiceCode("RETAILSCHINTBT");
      this.setDataService(this.siintbtreqService);
      payload.operationMode = "M";
      payload.paymentAmount = this.getValue('paymentAmount').amount;
      payload.paymentCurrency = this.getValue('paymentAmount').currencyCode;
      payload.sourceAccount = this.getValue('sourceAccount');
      payload.creditAccountNumber = "10" + String(this.getValue('confirmAccountNumber'));

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
        payload.termsFlag = "N";
        payload.numberOfPayments = this.getValue('numberOfPayments');
        payload.endDate = this.getValue('endDate');
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
          payload.termsFlag = "Y";
        } else {
          endDate = this.getValue('endDate');
          payload.endDate = this.getValue('endDate');
          payload.termsFlag = "N";
        }

        if (this.getValue('paymentFrequency') == 5 || this.getValue('paymentFrequency') == 6) {
          payload.paymentInterval = this.getValue('paymentFrequency') == 5 ? 180 : 365;
        }
      }
      this.setHidden('hiddenField', true);
      payload.isNewRequired = "0"
    }
    else {
      payload.paymentAmount = this.getValue('paymentAmount').amount;
      payload.operationMode = "A";
      payload.sourceAccount = this.getValue('sourceAccount');
      payload.accountNumber = "10" + String(this.getValue('accountNumber'));
      payload.confirmAccountNumber = "10" + String(this.getValue('confirmAccountNumber'));
      payload.creditAccountNumber = "10" + String(this.getValue('confirmAccountNumber'));
      payload.beneficiaryName = this.getValue('recipientName');
      payload.accountCurrency = APPCONSTANTS.baseCurrency;
      payload.paymentCurrency = this.state.fromCurrencyVariable;
      // payload.paymentCurrency = this.getValue('paymentAmount').currencyCode;
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
          const formattedDate = endDate.toISOString().split('T')[0];
          payload.endDate = formattedDate;
          payload.termsFlag = "Y";
        } else {
          payload.endDate = this.getValue('endDate');
          payload.termsFlag = "N";
        }
        if (this.getValue('paymentFrequency') == 5 || this.getValue('paymentFrequency') == 6) {
          payload.paymentDaysInterval = this.getValue('paymentFrequency') == 5 ? 180 : 365;
        }
      }
    }
    payload.fromAccProductDesc = this.state.fromAccProductDesc;
    payload.fromAccNickname = this.state.fromAccNickname;
    payload.creditAccNickName = this.getValue('recipientName');

    if (this.state.beneAccountNickname != null) {
      payload.accountNickname = this.state.beneAccountNickname;
    }
    else {
      payload.accountNickname = payload.beneficiaryName;
    }
    this._appConfig.setData('transferFromAccountData', payload);
    this._appConfig.setData('transferData', payload);
    if (!payload?.purpose) {
      delete payload.purpose
    }

    if (!payload.paymentDaysInterval) {
      delete payload.paymentDaysInterval;
    }

    if (this.enableDelete) {
      payload.operationMode = "D";
      payload.paymentDate = this.getValue('paymentDate');
    }

    payload.paymentCurrency = this.state.fromCurrencyVariable;
    payload.termsFlag = 'Y'

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

  public handlePaymentAmountOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    console.log(formGroup)

    setTimeout(() => {
      if (this.selectedTransferFromAccount.availableBalance < value?.amount && !(this.getValue('paymentAmount').amount.toString().length > 13)) {
        this.showInsufficientBalanceError = true;
        setTimeout(() => {
          window.scrollTo(0, 0);
        });
      } else {
        this.showInsufficientBalanceError = false;
      }
      if(this.getValue('paymentAmount').amount.toString().length > 13){
        this.amountLength = true;
        this.showInsufficientBalanceError = false;
      }else{
        this.amountLength = false
      }

      console.log(this.formGroup.controls['paymentAmount'], "paymentamount")
      if ((this.formGroup.controls['paymentAmount'].touched || this.formGroup.controls['paymentAmount'].invalid) && !(value?.amount)) {
        this.showMandatoryError = true
      } else {
        this.showMandatoryError = false
      }
    }, 0);


    this.formGroup.get('beneficiaryId')?.removeValidators(Validators.required);
    this.formGroup.get('beneficiaryId')?.updateValueAndValidity();
    this.formGroup.updateValueAndValidity();

    // WRITE CODE HERE TO HANDLE
    //tool generated code based on Orchestration Instructions
    if (this.getRoutingParam('operationMode') != 'M') {
      this.setDisabled("paymentFrequency", false);
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
  };

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
      
      // let endDate = new Date(transferDate);
      // endDate.setFullYear(endDate.getFullYear() + 50)
      // console.log(endDate, "endDate")
      // console.log(moment(endDate).format('YYYY-MM-DD'), "moment")
      // this.setValue('endDate', moment(endDate).format('YYYY-MM-DD'));

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
  };

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

  hideTypeNumberOfPaymentsAndEndDate() {
    this.setHidden('scheduleType', true);
    this.setHidden('scheduleTypeWrapper', true);
    this.setHidden('scheduleHandler', true);
    this.setDisabled('numberOfPayments', true);
    this.setDisabled('endDate', true);
  }

  showTypeNumberOfPaymentsAndEndDate() {
    this.setHidden('scheduleType', false);
    this.setHidden('scheduleTypeWrapper', false);
    this.setHidden('scheduleHandler', false);
    setTimeout(() => {
      this.setDisabled('numberOfPayments', false);
      this.setDisabled('endDate', false);
    }, 100);
  }

  hideNumberOfPaymentsAndEndDate() {
    this.setHidden('scheduleHandler', true);
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

  public handlePaymentDateOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    setTimeout(() => {
      this.state.endDate.minDate = value;
    }, 0);
    // WRITE CODE HERE TO HANDLE
    //tool generated code based on Orchestration Instructions
    if (this.state.scheduleTypeVar != '3' && this.state.scheduleTypeVar) {
      if (value != this.state.currentDate) {
        this.setServiceCode("RETAILSCHINTBT");
        this.state.scheduleTypeVar = '2';
        this.setVariable('scheduleTypeVar', this.state.scheduleTypeVar);
        this.setDataService(this.siintbtreqService);
        this.showInsufficientBalanceError = false;
      }
      else {
        this.setServiceCode("RETAILTRANINTBT");
        this.state.scheduleTypeVar = '1';
        this.setVariable('scheduleTypeVar', this.state.scheduleTypeVar);
        this.setDataService(this.retailWithinBankTransferFormService);
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
  };

  public onExchangeRateDataReceived: BaseFpxControlEventHandler = (payload: any) => {
    this.state.crossCurrencyIcon = true;
    console.log("onExchangeRateDataReceived", payload)
    console.log("payload", payload)

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
      //this.state.paymentSummary.exchangeRate = payload.exchangeRate;
      this.state.paymentSummary.exchangeRate = "1 " + this.state.fromCurrencyVariable + " = " + payload.exchangeRate + " " + this.state.toCurrencyVariable;
    }
  };



  public handleAccountNumberOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    console.log("accountNumber", value);
    console.log("formGroup", formGroup);

    if (value == null || !value) {
      this.setValidator('accountNumber', [Validators.required]);
      this.formGroup.get('accountNumber')?.updateValueAndValidity();
    }

    let sourceAccount = this.getValue('sourceAccount');
    let trimmedSourceAccount = sourceAccount;

    if (String(sourceAccount).length >= 14) {
      trimmedSourceAccount = sourceAccount.slice(2);
      this.doCheckSameAccountValidation(trimmedSourceAccount, String(value));
    } else {
      trimmedSourceAccount = sourceAccount;
      this.doCheckSameAccountValidation(trimmedSourceAccount, String(value));
    }


    if (String(value).length < 12 && value) {
      this.setErrors('accountNumber', 'accountNumberErr')
    }

    this.setVariable('serviceCode', 'RETAILTRANINTBT');
    this.setValue('isNewRequired', '1');
    this.setValue('confirmAccountNumber', value);


    if (String(value).length == 12) {
      this.setDisabled('paymentAmount', false);
      this.setDisabled('paymentDate', false);
      this.setVariable('toCurrencyVariable', "CAD");
      this.state.toCurrencyVariable = "CAD";
    } else {
      this.setDisabled('paymentAmount', true);
      this.setDisabled('paymentDate', true);
    }

    this.setReadonly('scheduleType', false);
  }


  doCheckSameAccountValidation(trimmedSourceAccount: string, value: string) {
    if (trimmedSourceAccount === value) {
      this.setErrors('accountNumber', 'sameAccountErr')
    } else {
      this.setFormStateToInitialAfterToAccountSelected();
    }
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
    }  else {
      this.state.changedFromEdit = false;
      // this.setNumberOfPayments(value, formGroup);
    }

  }

  setNumberOfPayments(value: any, currentFormGroup: any) {
    let frequency = Number(this.getValue('paymentFrequency'));
    let transferStartDate = new Date(this.getValue('paymentDate'));
    let transferEndDate = new Date(value);
    let numberOfInstallments = this.calculateInstallments(transferStartDate, transferEndDate, frequency);
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



  setEndDate(currentFormGroup: any) {
    console.log("currentFormGroup", currentFormGroup);
    if (currentFormGroup.controls.paymentDate.value, currentFormGroup.controls.paymentFrequency.value, currentFormGroup.controls.numberOfPayments.value) {
      let paymentEndDateVar: any = this.commonService.transferEndDate(currentFormGroup.controls.paymentDate.value, currentFormGroup.controls.paymentFrequency.value, currentFormGroup.controls.numberOfPayments.value);
      console.log("paymentEndDateVar", paymentEndDateVar);
      if (paymentEndDateVar) {
        this.setValue('endDate', paymentEndDateVar);
      }
    }
  }



  public handlePaymentFrequencyOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    console.log("handlePaymentFrequencyOnvalueChange", value)
    // WRITE CODE HERE TO HANDLE 
    //tool generated code based on Orchestration Instructions

    if (value == "1" || !value) {
      this.state.paymentDate.minDate = this.state.currentDate;
      if (this.getValue('paymentDate') > this.state.currentDate) {
        this.setServiceCode("RETAILSCHINTBT");
        this.setDataService(this.siintbtreqService);
      } else {
        this.setServiceCode("RETAILTRANINTBT");
        this.setDataService(this.retailWithinBankTransferFormService);
      }

      if (this.getRoutingParam('operationMode') == 'M') {
        this.state.paymentDate.minDate = this.state.futureDate;
        this.setServiceCode("RETAILSCHINTBT");
        this.setDataService(this.siintbtreqService);
      }
      this.hideTypeNumberOfPaymentsAndEndDate();
    }
    else if (value !== "1") {
      if (this.getRoutingParam('operationMode') !== 'M') {
        this.reset('numberOfPayments');
        this.reset('endDate');
      }
      this.state.paymentDate.minDate = this.state.futureDate;
      this.setServiceCode("RETAILSCHINTBT");
      this.setDataService(this.siintbtreqService);
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

  public override doPostInit(): void {

    setTimeout(() => {
      this.showSpinner();
    }, 100);

    if (this.getRoutingParam('operationMode') != 'M') {
      setTimeout(() => {
        this.setValue('accountNumber', null);
      }, 1000);
    }

    this.state.wholeEligibleAccountsList = this._appConfig.getData('wholeEligibleAccountsList');
    this.handleFormOnLoad();
    this.addValueChangeHandler("paymentAmount", this.handlePaymentAmountOnvalueChange);
    this.addValueChangeHandler("paymentDate", this.handlePaymentDateOnvalueChange);
    this.addValueChangeHandler("paymentFrequency", this.handlePaymentFrequencyOnvalueChange);
    this.addValueChangeHandler("scheduleType", this.handleScheduleTypeOnvalueChange);
    this.addValueChangeHandler("numberOfPayments", this.handleNumberOfPaymentsOnvalueChange);
    this.addValueChangeHandler("endDate", this.handleEndDateOnvalueChange);
    this.addValueChangeHandler("accountNumber", this.handleAccountNumberOnvalueChange);
    this.addControlEventHandler("exchangeRateReceived", this.onExchangeRateDataReceived);
  }

  addNewBene() {
    this.setHidden('confirmAccountNumber', false);
    this.setValue('confirmAccountNumber', 1000);
    this.setHidden('beneficiaryName', false);
    this.setHidden('termsFlag', false);
    this.setHidden('newButton', true);
    this.setHidden('hiddenField', true);
    this.setHidden('cancel', false);
    // this.setReadonly('sourceAccountTemplate',true)
    this.reset('sourceAccountTemplate')
    this.setDisabled('paymentAmount', false);
    this.setDisabled('paymentDate', false);
    this.setValue('paymentDate', this.state.currentDate);
    this.setVariable('toCurrencyVariable', 'CAD');
    this.setValue('isNewRequired', '1');

    this.reset("paymentAmount");
    this.setValue('paymentAmount', { currencyCode: this.state.fromCurrencyVariable });
    this.reset("paymentFrequency");
    this.reset("scheduleHandler.numberOfPayments");
    this.setHidden("scheduleHandler.numberOfPaymentsNote", true);
    this.setHidden('scheduleHandler', true);
    this.reset("remarks");
    this.setValue('scheduleType', false);

    this.reset("remarks");
    // this.transferFromAccount = "";
    this.reset("beneficiaryId");
    // this.reset("confirmAccountNumber");
    this.reset("beneficiaryName");
    this.formGroup.get('beneficiaryId')?.removeValidators(Validators.required);
    this.formGroup.get('beneficiaryId')?.updateValueAndValidity();
    this.formGroup.updateValueAndValidity();
    this.enableAddContact = true;
  }

  cancel() {
    this.setHidden('newButton', false);
    this.setHidden('cancel', true);
    this.setHidden('confirmAccountNumber', true);
    this.setHidden('beneficiaryName', true);
    this.setHidden('termsFlag', true);
    // this.setReadonly('sourceAccountTemplate',false)
    this.setDisabled('paymentAmount', true);
    this.setDisabled('paymentDate', true);
    this.reset('paymentDate');

    this.reset("paymentFrequency");
    this.reset("scheduleHandler.numberOfPayments");
    this.setHidden("scheduleHandler.numberOfPaymentsNote", true);
    this.setHidden('scheduleHandler', true);
    this.setValue('scheduleType', false);

    this.reset('paymentAmount');
    this.formGroup.get('paymentAmount')?.setErrors(null);
    this.setHidden('paymentSummary', true)
    this.setValue('isNewRequired', '0');
    this.reset("remarks");
    this.reset("confirmAccountNumber");
    this.reset("beneficiaryName");
    // this.transferFromAccount = "";
    this.reset("beneficiaryId");
    this.formGroup.get('beneficiaryId')?.setValidators([Validators.required]);
    this.enableAddContact = false;
    this.formGroup.get('beneficiaryId')?.updateValueAndValidity();
    this.formGroup.updateValueAndValidity();
  }
  public override preSubmitInterceptor(payload: Withinbanktransfer): any {
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

  getBeneficiaryAccountsDetails() {

    this.beneInternalServices.findAll()().subscribe({
      next: (value: any) => {
        console.log("Bene", value)
        this._appConfig.setData('BENEACCOUNTSLIST', value.data)
        this._accountSpaceMgr.setBeneficiaryList(value.data);
      },
      error: (err: any) => {

      },
    });
  }
  //$START_CUSTOMSCRIPT\n
  //$END_CUSTOMSCRIPT\n
  public handleFormOnPostsubmit(response: any, routingInfo: any) {
    // WRITE CODE HERE TO HANDLE
    if (response.success) {
      console.log("response.success", response.success)
      if (this.getRoutingParam('operationMode') != 'M') {
        let payload: any = {
          "nickName": this.getValue("recipientName"),
          "accountNumber": "10" + String(this.getValue("accountNumber")),
          "confirmAccountNumber": "10" + String(this.getValue("accountNumber")),
          "beneficiaryName": this.getValue("recipientName"),
          "accountCurrency": APPCONSTANTS.baseCurrency,
          // "termsFlag": this.getValue("termsFlag"),
          "isFavourite": "0",
          "operationMode": "A"
        }
        console.log("payload", payload)
        this._beneintbtreqService.create(payload)().subscribe({
          next: () => {
            this.getBeneficiaryAccountsDetails();
          },
          error: () => {

          }
        });
      }


      let res =
        response.success?.body?.withinbanktransfer || response.success?.body?.siintbtreq;
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



  resetOnAccountSelect() {
    this.reset("paymentAmount");
    this.reset("paymentFrequency");
    this.reset("scheduleHandler.numberOfPayments");
    this.setHidden("scheduleHandler.numberOfPaymentsNote", true);
    this.setHidden('scheduleHandler', true);
    this.reset("remarks");
    this.setValue('scheduleType', false);
    this.enableAddContact = false;
  }
  override onReview(): void {
    this.state.review = true;
    this.state.reviewMode = true;
    if (!this.getValue('remarks')) {
      this.setHidden('remarks', true);
    }


    if (this.formGroup.controls['scheduleType'].value) {
      this.state.scheduleTypeValue = 'Yes';
    }
    else {
      this.state.scheduleTypeValue = 'No';
    }
    this.setHidden('newButton', true);
    this.setHidden('cancel', true);

    setTimeout(() => {
      window.scrollTo(0, 0);
    });
  }

  override backToEntryMode(): void {
    this.state.review = false;
    this.setHidden('remarks', false);


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

    if (!this.getValue('confirmAccountNumber')) {
      this.setHidden('newButton', false);
      this.setHidden('cancel', true);
    }
    else {
      this.setHidden('newButton', true);
      this.setHidden('cancel', false);
    }
  }



  openTransferFromAccountsList() {
    console.log("preferredTransferAccount", this.state.preferredTransferAccount)
    let modal = new FpxModal();
    console.log("selectedTransferFromAccount", this.selectedTransferFromAccount)
    // this.selectedTransferFromAccount = undefined;
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
    console.log("payload", payload)
    if (payload.action === 1) {
      this._appConfig.setData("selectedAccountFromSummary", undefined);
      this.selectedTransferFromAccount = payload.data;
      this.selectedTransferToAccount = undefined;
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
    console.log(this.selectedTransferFromAccount)
  }

  setFormStateToInitialAfterFromAccountSelected() {
    this.setValue('paymentFrequency', '1');
    this.reset('accountNumber');
    this.reset('recipientName');
    this.reset('paymentAmount');
    this.setDisabled('paymentAmount', true)
    this.setDisabled('paymentDate', true);
    this.setValue('paymentDate', this.state.currentDate);
    this.setValue('remarks', '');
    this.reset('numberOfPayments');
    setTimeout(() => {
      this.showMandatoryError = false;
    }, 0);
  }

  setFormStateToInitialAfterToAccountSelected() {
    if (this.getRoutingParam('operationMode') !== 'M') {
      this.setValue('paymentFrequency', '1');
      this.setValue('remarks', '');
      this.reset('recipientName');
      this.reset('paymentAmount');
      this.setDisabled('paymentAmount', true)
      this.setDisabled('paymentDate', true);
      this.setValue('paymentDate', this.state.currentDate);
      this.reset('numberOfPayments');
      this.reset('endDate');
      this.setHidden('hiddenField', true);
      setTimeout(() => {
        this.showMandatoryError = false;
      }, 0);
    }
  }

  getAbsoluteValue(value: number | undefined): number {
    return value ? Math.abs(value) : 0;
  }

  checkNegativeValue(value: number | undefined): string {
    return value && value < 0 ? '-' : '';
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
