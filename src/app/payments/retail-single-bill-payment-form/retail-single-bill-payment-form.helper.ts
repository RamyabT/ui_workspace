import { Injectable, inject } from "@angular/core";
import { FormArray, FormBuilder, FormControlStatus, FormGroup, Validators } from "@angular/forms";
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
  FpxToastService,
  FpxModalAfterClosed,
  BaseFpxGridChangeHandler
} from "@fpx/core";
import moment from "moment";
import { Observable, map, of } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { BillRequestService } from '../billRequest-service/billRequest.service';
import { BillRequest } from '../billRequest-service/billRequest.model';
import { CurrencyPipe, DatePipe } from "@angular/common";
import { AppConfigService } from "@dep/services";
import { DeviceDetectorService } from "@dep/core";
import { FileOpenerService } from "@dep/native";
import { MomentService } from "src/app/foundation/validator-service/moment-service";
import { TranslateService } from "@ngx-translate/core";
import { CASAAccountsListComponent } from "src/app/accounts/casa-accounts-list/casa-accounts-list.component";
import { CommonService } from "src/app/foundation/validator-service/common-service";

export class RetailSingleBillPaymentFormState extends BaseFpxComponentState {
  private _appConfig: AppConfigService = inject(AppConfigService);

  tranRef: any;
  availableLimit: any = {
    isCurrEditable: false,
    CurrencyList: [{ id: this._appConfig.baseCurrency, text: this._appConfig.baseCurrency }],
    amountInWords: true,
    initCurrency: this._appConfig.baseCurrency,
    defaultFetch: true,
  }

  paymentAmount: any = {
    isCurrEditable: false,
    CurrencyList: [{ id: this._appConfig.baseCurrency, text: this._appConfig.baseCurrency }],
    amountInWords: true,
    initCurrency: this._appConfig.baseCurrency,
    defaultFetch: true,
  }
  termsFlag: any = {
    textPosition: "after",
    ckValues: { checked: "Y", unchecked: "N" }
  }
  paymentDate: any = {
    minDate: "",
    maxDate: "",
  }

  paymentEndDate: any = {
    minDate: "",
    maxDate: "",
  }

  dueDate: any = {
    minDate: "",
    maxDate: "",
  }

  chargesAmount: any = {
    isCurrEditable: true,
    CurrencyList: [],
    amountInWords: false,
    initCurrency: this._appConfig.baseCurrency,
    defaultFetch: true,
  }

  billerDetails: { billerDetailTotalData: any } = { billerDetailTotalData: null };
  exchangeRateSummary: any = { apiDebitAmount: "0.00", debitAmount: "0.00", creditAmount: "0.00", exchangeRate: "0", baseRate: "0" };
  fromCurrencyVariable: any;
  toCurrencyVariable: any;
  upcomingBillDetail: any;
  action: any;
  intialLoadedData: any = { debitAccount: undefined };
  exchangeRateLables: any = { exchangeRateDebitAmount: "", exchangeRateCreditAmount: "", exchangeRate: "" }
  paymentSummaryDetail: { tranRef: any; status: string; } = { tranRef: '', status: '' };
  minOrMaxError: any;
  debitAccountData: any;
  disclaimer: string | undefined;
  balance!: string;
  casaAccountList: any[] = [];
  selectedAccount: any;
  casaWithoutUSDAccount: any[] = [];
  selectedBillerAccount: any;
  reviewMode: boolean = false;
  availableBalanceVariable: any;
  wholeEligibleAccountsList: any;
  eligibleTransferFromAccountsList: any;
  preferredTransferAccount: any;
  reviewPaymentDate: any;

}

@Injectable()
export class RetailSingleBillPaymentFormHelper extends BaseFpxFormHelper<RetailSingleBillPaymentFormState> {

  disclaimerText: string = '';
  COBDisclaimerText: string = '';
  hideCOBDisclaimer: boolean = false;
  showInsufficientBalanceError: boolean = false;
  showMandatoryError:boolean = false;
  hideFromAccountChangeBtn: boolean = false;


  constructor(private bPBillRequestFormService: BillRequestService, private _httpProvider: HttpProviderService, private _router: Router, private _currencyFormatter: FpxCurrenyFormatterPipe,
    public appConfig: AppConfigService,
    private commonService: CommonService,
    public deviceDetectorService: DeviceDetectorService,
    public fileOpenerService: FileOpenerService,
    private momentService: MomentService,
    private _fpxToastService: FpxToastService,
    private _translateService: TranslateService,
    private route: ActivatedRoute,
    private _currencyPipe: CurrencyPipe,
    formBuilder: FormBuilder,
    public _datePipe: DatePipe) {
    super(new RetailSingleBillPaymentFormState(),);

    this.route?.queryParams?.subscribe(params => {
      if (this?.formGroup) {
        this?.formGroup?.reset();
        this.handleFormOnLoad();
      }
    });
  }

  override doPreInit(): void {

    this.disclaimerText = 'RetailSingleBillPaymentForm.disclaimer.disclaimerText';
    this.COBDisclaimerText = 'RetailSingleBillPaymentForm.disclaimer.cobDisclaimerText';
    this.hideCOBDisclaimer = this.appConfig.betweenThreeAndTwentyOnePM(new Date()) ? false : true;
    console.log(this.hideCOBDisclaimer)


    console.log(this.disclaimerText)
    // this.state.casaAccountList = this.appConfig.getCasaAccountList();
    this.state.wholeEligibleAccountsList = this.appConfig.getData('wholeEligibleAccountsList');
    console.log(this.state.wholeEligibleAccountsList)
    this.state.casaAccountList = this.state.wholeEligibleAccountsList.filter((item: any) => item.transferOut === "1")
    console.log(this.state.casaAccountList)

    this.removeShellBtn('RESET')
    console.log(this.appConfig.getData('RETAILBILLPAYEEACCOUNTS'))

    this.state.selectedBillerAccount = this.appConfig.getData('RETAILBILLPAYEEACCOUNTS').find((item: any) => item.billerBeneficiaryId === this.getRoutingParam('billerBeneficiaryId'));

    this.setVariable('toAccountVariable', this.state.selectedBillerAccount?.billerCreditAccount);
    this.setVariable('toCurrencyVariable', "CAD")

    console.log(this.state.selectedBillerAccount)

    console.log(this.appConfig.getCasaAccountList())
    this.state.casaWithoutUSDAccount = this.state.casaAccountList.filter((item: any) => item.accountCurrency !== 'USD');
    this.hideFromAccountChangeBtn = this.state.casaWithoutUSDAccount.length === 1 ? true : false;
    console.log(this.hideFromAccountChangeBtn, "hideFromAccountChangeBtn")

    this.state.preferredTransferAccount = this.getPreferredAccount();

    this.state.selectedAccount = this.setSelectedAccount();




    // if (!this.state.selectedAccount) {
    //   this.state.selectedAccount = this.state.casaWithoutUSDAccount[0];
    // }

    this.formGroup.get('debitAccount')?.setValue(this.state.selectedAccount.accountNumber);

    console.log(this.state.selectedAccount)
    this.addControlEventHandler("billerBeneficiaryIdDataReceived", this.onBillerAccReceived);
    this.addControlEventHandler("debitAccountDataReceived", this.ondebitAccountDataReceived);
    this.addValueChangeHandler("debitAccount", this.onDebitAccountOnValueChange);
    this.addValueChangeHandler("accountType", this.onAccountTypeOnValueChange);
    this.addValueChangeHandler("paymentAmount", this.handlePaymentAmountOnvalueChange);
    this.addValueChangeHandler("paymentDate", this.handlePaymentDateOnvalueChange);
    this.addValueChangeHandler("action", this.handleFrequencyOnvalueChange);
    this.addValueChangeHandler("paymentDate", this.handlePaymentDateOnvalueChange);
    this.addValueChangeHandler("scheduleType", this.handleScheduleTypeOnvalueChange);
    this.addValueChangeHandler("paymentFrequency", this.handlePaymentFrequencyOnvalueChange);
    this.addValueChangeHandler("numberOfPayments", this.handleNumberOfPaymentsOnvalueChange);
    this.setHidden('paymentFrequency', true)
    this.setHidden('numberOfPayments', true)
    this.setHidden('paymentEndDate', true)
    this.setHidden('action', true)
    this.setServiceCode("RETAILMULTIBILLPAYMENT");
    this.addResetHandler('reset', this._onReset);
    this.state.action = this.getRoutingParam('action');
    if (this.state.action === 'VIEW') {
      this.removeShellBtn('RetailSingleBillPaymentForm.back')
      this.addShellButton(this._translateService.instant('RetailSingleBillPaymentForm.downloadBtn'), 'DOWNLOAD', 'primary', 'DISPLAY', 'button');
      // this.setShellBtnMethod('DOWNLOAD', this.download.bind(this));
    }
  }

  getPreferredAccount() {
    let preferredAccount: any;
    this.state.casaWithoutUSDAccount.forEach((item: any) => {
      if (item.preferredAccount) {
        preferredAccount = item;
      }
    })
    return preferredAccount;
  }

  setSelectedAccount() {
    let selectedTransferFromAccount: any;
    if (this.appConfig.getData("selectedAccountFromSummary")) {
      selectedTransferFromAccount = this.state.wholeEligibleAccountsList.find((item: any) => item.accountNumber == this.appConfig.getData("selectedAccountFromSummary"));
      console.log("this.selectedTransferFromAccount", selectedTransferFromAccount)
    } else if (this.state.preferredTransferAccount) {
      selectedTransferFromAccount = this.state.preferredTransferAccount;
      console.log("this.selectedTransferFromAccount", selectedTransferFromAccount)
    } else {
      selectedTransferFromAccount = this.state.casaWithoutUSDAccount[0];;
      selectedTransferFromAccount.preferredAccount = false;
    }

    this.setVariable('fromCurrencyVariable', selectedTransferFromAccount.accountCurrency);
    console.log(2)

    this.setVariable('accountBalanceVariable', selectedTransferFromAccount.availableBalance);

    console.log("selectedTransferFromAccount", selectedTransferFromAccount)
    return selectedTransferFromAccount;
  }

  public onBillerAccReceived: BaseFpxControlEventHandler = (res: any) => {
    console.log(res)
    if (res && !this.state.action) {
      this.getBillerDetails(res);
    }
  }

  override onReview(): void {
    this.state.reviewMode = true;
    setTimeout(() => {
      window.scrollTo(0, 0);
    });
    
  }
  override backToEntryMode(): void {
    this.state.reviewMode = false
  }

  public override doPostInit(): void {
    this.state.paymentDate.minDate = moment().format('YYYY-MM-DD');
    this.formGroup.updateValueAndValidity();
    this.setValue('paymentDate', moment().format('YYYY-MM-DD'));
    this.setReadonly('paymentDate', true)
    this.handleFormOnLoad();
  }

  public handleFormOnLoad() {
    this.setVariable('serviceCodeVariable', 'RETAILSINGLEPAYMENT');

    // this.hideSpinner();
    this.state.exchangeRateLables = { exchangeRateDebitAmount: this._translateService.instant('RetailSingleBillPaymentForm.exchangeRateDebitAmount'), exchangeRateCreditAmount: this._translateService.instant('RetailSingleBillPaymentForm.exchangeRateCreditAmount'), exchangeRate: this._translateService.instant('RetailSingleBillPaymentForm.exchangeRate') }
    this.setHidden('tranRef', true);
    this.state.availableBalanceVariable = this.state.selectedAccount.availableBalance;
    this.state.fromCurrencyVariable = this.state.selectedAccount.accountCurrency;
    this.setVariable('availableBalanceVariable', this.state.availableBalanceVariable);
    this.setVariable('fromCurrencyVariable', this.state.fromCurrencyVariable);
    this.setVariable('toCurrencyVariable', "CAD")
  }

  public override postDataFetchInterceptor(payload: BillRequest) {
    console.log(payload)
    // WRITE CODE HERE TO HANDLE
    payload.paymentAmount = { amount: payload?.paymentAmount, currencyCode: payload?.currencyCode };
    this.state.exchangeRateSummary.creditAmount = payload?.currencyCode + " " + this._currencyFormatter.transform(payload?.paymentAmount?.amount, payload?.currencyCode);
    this.state.exchangeRateSummary.exchangeRate = payload.rateApplied;
    this.state.exchangeRateSummary.debitAmount = payload.equiAmount;
    this.state.toCurrencyVariable = payload?.currencyCode;
    this.setVariable('toCurrencyVariable', this.state.toCurrencyVariable);
    this.setVariable('paymentAmountVariable', payload?.paymentAmount?.amount);
    this.setUpPaymentSummaryDetail()
    this.getBillerDetails(payload.billerIdDetail);
    if (payload.accountType == '2') {
      payload.creditCradDebitAccount = payload.debitAccount
    }

    if (!payload.balance) {
      this.setHidden('balance', true)
    } else {
      this.setLabel('paymentAmount', this._translateService.instant('RetailSingleBillPaymentForm.paymentAmount.label'));
      payload.balance = this._currencyPipe.transform(payload.balance, payload?.currencyCode + ' ');
    }



    if (!payload?.dueDate || payload.dueDate == ' ') {
      this.setHidden('dueDate', true)
    }

    this.setHidden('termsFlag', true);
    return payload;
  }

  // THIS METHOD USED ONLY FOR VIEW MODE
  setUpPaymentSummaryDetail() {
    let status = this.getRoutingParam('status');
    if (status == 'APPROVED' || status == 'EXECUTED') {
      status = 'COMPLETED'
    } else {
      status = 'FAILED'
    }
    this.state.paymentSummaryDetail = { tranRef: this.getRoutingParam('tranRef'), status: status }
  }

  dueDateAnaDueAmountSetup(payload: any): string {
    if (payload?.smartPayAllowed === '0' && payload.invoiceAllowed === '0') {
      this.setHidden('refreshBtn', true);
      this.setHidden('paymentAmount', false);
      this.setReadonly('paymentAmount', false);
      this.setHidden('dueDate', true);
      return "NOEMALFLOW"
    } else if ((payload.smartPayAllowed === '1' && payload.invoiceAllowed === '0')) {
      this.setLabel('paymentAmount', this._translateService.instant('RetailSingleBillPaymentForm.dueAmount'));
      if (this.getRoutingParam('routeFrom') !== "UPCOMINGGRID" && !this.state.action) {
        this.setHidden('dueDate', true);
        this.setHidden('paymentAmount', true);
        this.setHidden('refreshBtn', false);
        this.formGroup.get('requestReference')?.setErrors({ noBillsAvailable: true }, { emitEvent: true })
      } else {
        this.setHidden('paymentAmount', false);
        this.setHidden('dueDate', false);
        this.setHidden('refreshBtn', true);
      }
      this.setReadonly('paymentAmount', true);
      return "REFRESHALLOWED"
    }
    return '';
  }

  public onAccountTypeOnValueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if (value) {
      this.setValue('availableLimit', { currencyCode: this.appConfig.getBaseCurrency(), amount: '' });
      if (value === "2") {
        this.setHidden('creditCradDebitAccount', false);
        this.setHidden('availableLimit', false);
        this.setHidden('debitAccount', true);
      } else {
        this.setHidden('creditCradDebitAccount', true);
        this.setHidden('availableLimit', true);
        this.setHidden('debitAccount', false);
      }
      this.setDisabled('availableLimit', true);
    }
  }

  public onDebitAccountOnValueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
  }

  public handlePaymentAmountOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    this.setVariable('paymentAmountVariable', value?.amount);


    setTimeout(() => {
      console.log(this.formGroup)
      console.log(this.formGroup.controls['paymentAmount'].errors)
      console.log(this.formGroup.get('paymentAmount')?.errors)
      console.log(this.state.selectedAccount.availableBalance)
      if (this.state.selectedAccount.availableBalance < value?.amount) {
        this.showInsufficientBalanceError = true;
        console.log(this.showInsufficientBalanceError)
      } else {
        this.showInsufficientBalanceError = false;
      }
    }, 0);

    if ((this.formGroup.controls['paymentAmount'].touched || this.formGroup.controls['paymentAmount'].dirty) && !(value?.amount)) {
      // this.setErrors('paymentAmount', 'required');
      // console.log(this.setErrors('paymentAmount', 'required'))
      this.showMandatoryError = true
    }else{
      this.showMandatoryError = false
    }
      
    
    console.log(this.formGroup)
  }
  
  
  public handlePaymentDateOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    console.log(this.formGroup)
    console.log(value)

    let currentDate = moment().format('YYYY-MM-DD');

    if (value > currentDate) {
      this.setVariable('scheduleTypeVar', '2');
    } else {
      this.setVariable('scheduleTypeVar', '1');
    }

    if (value) {
      if (this.formGroup.get('numberOfPayments')?.value && this.formGroup.get('paymentFrequency')?.value) {
        this.setEndDate(formGroup);
      }
    }

    this.formGroup.get('paymentAmount')?.updateValueAndValidity();
  }

  public handleScheduleTypeOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    let currentFormGroup: any = FormGroup;
    if (value) {
      currentFormGroup.controls.paymentFrequency?.setValidators([Validators.required]);
      currentFormGroup.controls.numberOfPayments?.setValidators([Validators.required]);
      currentFormGroup.controls.paymentEndDate?.setValidators([Validators.required]);
      currentFormGroup.controls.paymentDate.reset();
      this.state.paymentDate.minDate = moment().add(1, 'days').format('YYYY-MM-DD');
    }
    else {
      currentFormGroup.controls.paymentFrequency?.removeValidators([Validators.required]);
      currentFormGroup.controls.numberOfPayments?.removeValidators([Validators.required]);
      currentFormGroup.controls.paymentEndDate?.removeValidators([Validators.required]);
      this.state.paymentDate.minDate = moment().format('YYYY-MM-DD');
    }
    currentFormGroup.controls.paymentFrequency.updateValueAndValidity();
    currentFormGroup.controls.numberOfPayments.updateValueAndValidity();
    currentFormGroup.controls.paymentEndDate.updateValueAndValidity();
    this.formGroup.updateValueAndValidity();
  }

  public handlePaymentFrequencyOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    console.log(value)
    this.setReadonly('numberOfPayments', false)
    let currentFormGroup: any = formGroup;
    if (value) {
      this.setEndDate(formGroup);
    }
  }

  setEndDate(currentFormGroup: any) {
    console.log(currentFormGroup.controls.value)
    if (currentFormGroup.controls.paymentDate.value, currentFormGroup.controls.paymentFrequency.value, currentFormGroup.controls.numberOfPayments.value) {
      let paymentEndDateVar: any = this.commonService.caculateEndDate(currentFormGroup.controls.paymentDate.value, currentFormGroup.controls.paymentFrequency.value, currentFormGroup.controls.numberOfPayments.value);
      if (paymentEndDateVar) {
        currentFormGroup.controls.paymentEndDate.patchValue(paymentEndDateVar);
      }
    }

  }

  public handleNumberOfPaymentsOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup) => {
    // WRITE CODE HERE TO HANDLE 
    //tool generated code based on Orchestration Instructions
    let currentFormGroup: any = formGroup
    // this.setMandatoryFields(currentFormGroup);
    if (value) {
      console.log(this.formGroup.get('paymentDate')?.value)
      console.log(this.formGroup.get('paymentFrequency')?.value)

      if (this.formGroup.get('paymentDate')?.value && this.formGroup.get('paymentFrequency')?.value) {
        this.setEndDate(currentFormGroup);
      }

    }
  }


  public handleFrequencyOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {

    this.setReadonly('paymentEndDate', true)
    this.setReadonly('numberOfPayments', true)

    if (value) {
      if (this.formGroup.get('paymentDate')?.value === moment().format('YYYY-MM-DD')) {
        this.setValue('paymentDate', moment().add(1, 'days').format('YYYY-MM-DD'));
      }


      this.setHidden('paymentFrequency', false)
      this.setHidden('numberOfPayments', false)
      this.setHidden('paymentEndDate', false)

      this.setValidator('paymentFrequency', [Validators.required])
      this.setValidator('numberOfPayments', [Validators.required])
      this.setValidator('paymentEndDate', [Validators.required])
      this.formGroup.get('paymentFrequency')?.updateValueAndValidity()
      this.formGroup.get('numberOfPayments')?.updateValueAndValidity()
      this.formGroup.get('paymentEndDate')?.updateValueAndValidity()
    } else {
      this.setHidden('paymentFrequency', true)
      this.setHidden('numberOfPayments', true)
      this.setHidden('paymentEndDate', true)
    }
    console.log(this.formGroup)
  }


  public ondebitAccountDataReceived: BaseFpxControlEventHandler = (payload: any) => {
    console.log(payload)
    this.state.debitAccountData = payload
  }




  getUpcomingBills(isRefreshClicked?: boolean) {
    console.log(this.state)

    const httpRequest = new HttpRequest();
    httpRequest.setMethod('GET');
    httpRequest.setContextPath('BillPayments');
    httpRequest.setResource('/upcomingbilldetails');
    httpRequest.addHeaderParamter('serviceCode', 'CORPBILLINQUIRYDETAILS')
    httpRequest.addQueryParameter('billerId', 'BILLER10001');
    httpRequest.addQueryParameter('billerBeneficiaryId', '20250211120150010458');
    this.showSpinner();
    this._httpProvider
      .invokeRestApi(httpRequest)
      .pipe(
        map((res: IHttpSuccessPayload<any>) =>
          res.body?.upcomingbilldetails ?? null
        )
      ).subscribe(res => {
        this.hideSpinner();
        console.log(res)
      }, error => {
        this.hideSpinner();
        this._fpxToastService.showFailAlert(this._translateService.instant('RetailSingleBillPaymentForm.failAlert'), this._translateService.instant('RetailSingleBillPaymentForm.failMsg'));
      })


  }


  getBillerDetails(res: any) {
    if (res) {
      this.state.billerDetails.billerDetailTotalData = res;


      this.state.toCurrencyVariable = res?.billerId?.currency?.currencyCode;
      this.setVariable('toAccountVariable', res.billerCreditAccount);
      this.setVariable('toCurrencyVariable', this.state.toCurrencyVariable);
      this.setVariable('billerId', res.billerId.billerId)
      this.dueDateAnaDueAmountSetup(res?.billerId);
      if (this.getRoutingParam('routeFrom') != "UPCOMINGGRID" && !this.state.action) {
        this.setValue('paymentAmount', { amount: this.getValue('paymentAmount')?.amount, currencyCode: res.currencyCode.currencyCode })
      }
      this.setVariable('billerBeneIdVar', res.billerBeneficiaryId);

    }
  }



  public override preSubmitInterceptor(payload: any): any {
    console.log(payload)
    console.log(this.formGroup)
    let scheduleType = '';
    let constructedPayload: any;
    if (payload.action) {
      scheduleType = '3';
      constructedPayload = this.constructPayload(payload, scheduleType)
    } else {
      if (payload.paymentDate > moment().format('YYYY-MM-DD')) {
        scheduleType = '2';
      } else {
        scheduleType = '1';
      }
      constructedPayload = this.constructPayload(payload, scheduleType)
    }

    console.log(constructedPayload)
    console.log(scheduleType)
    this.appConfig.setData('paidBillDetails', constructedPayload);
    return constructedPayload;
  }

  constructPayload(payload: any, scheduleType: any) {
    let newPayload: any;

    if (scheduleType === '3') {
      newPayload = {
        "totalBillAmount": this.getValue('paymentAmount')?.amount,
        "debitAccount": this.getValue('debitAccount'),
        "initiatedDate": moment().format('YYYY-MM-DD'),
        "multibillrequestdetail": [
          {
            "orderSl": 1,
            "billerBeneficiaryId": this.convertNumber(this.state.selectedBillerAccount.billerBeneficiaryId),
            "currency": "CAD",
            "paymentAmount": this.getValue('paymentAmount')?.amount,
            "scheduleType": scheduleType,
            "paymentFrequency": this.getValue('paymentFrequency'),
            "numberOfPayments": this.getValue('numberOfPayments'),
            "paymentDaysInterval": +this.getValue('paymentFrequency'),
            "paymentDate": this.getValue('paymentDate'),
            "paymentEndDate": this.getValue('paymentEndDate'),
            "beneficiaryName": this.state.selectedBillerAccount.nickName || this.state.selectedBillerAccount.billerId.name,
            "billerCreditAccount": this.state.selectedBillerAccount.billerCreditAccount,
            "defaultPaymentAccount": this.state.selectedAccount.preferredAccount ? "1" : "0",
            "billReference": this.state.selectedBillerAccount.id,
          }
        ]
      }
    } else {
      newPayload = {
        "totalBillAmount": this.getValue('paymentAmount')?.amount,
        "debitAccount": this.getValue('debitAccount'),
        "initiatedDate": moment().format('YYYY-MM-DD'),
        "multibillrequestdetail": [
          {
            "orderSl": 1,
            "billerBeneficiaryId": this.convertNumber(this.state.selectedBillerAccount.billerBeneficiaryId),
            "currency": "CAD",
            "paymentAmount": this.getValue('paymentAmount')?.amount,
            "scheduleType": scheduleType,
            "paymentDate": this.getValue('paymentDate'),
            "beneficiaryName": this.state.selectedBillerAccount.nickName || this.state.selectedBillerAccount.billerId.name,
            "billerCreditAccount": this.state.selectedBillerAccount.billerCreditAccount,
            "defaultPaymentAccount": this.state.selectedAccount.preferredAccount ? "1" : "0",
            "billReference": this.state.selectedBillerAccount.id,
          }
        ]
      }
    }
    return newPayload;
  }


  convertNumber(number: string): string {
    return number.split('_')[0];
  }

  public override postSubmitInterceptor(response: any): RoutingInfo {
    console.log(response);
    let routingInfo: RoutingInfo = new RoutingInfo();
    this.handleFormOnPostsubmit(response, routingInfo);
    return routingInfo;
  }

  public handleFormOnPostsubmit(response: any, routingInfo: any) {
    console.log(response)
    console.log(routingInfo)

    // WRITE CODE HERE TO HANDLE
    if (response.success) {
      let res = response.success?.body?.multibillrequest;
      routingInfo.setQueryParams({
        response: res
      });
    } else if (response.error) {
      let error = response?.error?.error;
      routingInfo.setQueryParams({
        response: error,
        serviceCode: this.serviceCode?.value
      });
    }
    return response;
  }



  backToPayments(payload: any) {
    let service = this.appConfig.getServiceDetails('PAYMENTSSPACE');
    this._angularRouter.navigate(service?.servicePath, {
      queryParams: {
        serviceCode: 'PAYMENTSSPACE'
      }
    });
  }
  private _onReset = () => {
    this.formGroup.reset();
    this.setValue('debitAccount', this.state.intialLoadedData.debitAccount)
    this.handleFormOnLoad();
  }

  openAccountModal() {
    let modal = new FpxModal();
    modal.setComponent(CASAAccountsListComponent);
    if (this.deviceDetectorService.isMobile()) {
      modal.setPanelClass('full-view-popup');
    } else {
      modal.setPanelClass('dep-alert-popup');
    }
    modal.setBackDropClass(['dep-popup-back-drop', 'payment-accounts-list-popup-back-drop']);
    modal.setDisableClose(true);
    modal.setData({
      title: 'Pay from',
      accountsList: this.state.casaWithoutUSDAccount,
      selectedAccount: this.state.selectedAccount,
      fromPaymentsModule: true
    });
    modal.setAfterClosed(this.accountSelectedAfterClose);
    this.openModal(modal)
    console.log("openAccountModal")
  }

  accountSelectedAfterClose: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
    console.log(payload)
    console.log(addtionalData)
    if (payload.action === 1) {
      this.state.selectedAccount = payload.data;
      this.state.casaWithoutUSDAccount = payload.accountsList;
      console.log(this.state.casaWithoutUSDAccount)
      this.formGroup.get('debitAccount')?.setValue(payload.data.accountNumber);
      this.state.availableBalanceVariable = this.state.selectedAccount.availableBalance;
      this.state.fromCurrencyVariable = this.state.selectedAccount.accountCurrency;
      this.setVariable('availableBalanceVariable', this.state.availableBalanceVariable);
      this.setVariable('fromCurrencyVariable', this.state.fromCurrencyVariable);
      this.formGroup.get('paymentAmount')?.updateValueAndValidity();

      setTimeout(() => {
        console.log(this.formGroup.controls['paymentAmount'].errors)
        console.log(this.formGroup.get('paymentAmount')?.errors)
        console.log(this.state.selectedAccount.availableBalance)
        if (this.state.selectedAccount.availableBalance < this.getValue('paymentAmount')?.amount) {
          this.showInsufficientBalanceError = true;
          console.log(this.showInsufficientBalanceError)
        } else {
          this.showInsufficientBalanceError = false;
        }
      }, 0);
    }

  }

  getAbsoluteValue(value: number | undefined): number {
    return value ? Math.abs(value) : 0;
  }

  checkNegativeValue(value: number | undefined): string {
    return value && value < 0 ? '-' : '';
  }
}