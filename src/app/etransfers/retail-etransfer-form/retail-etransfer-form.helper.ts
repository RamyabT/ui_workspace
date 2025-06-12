import { ChangeDetectorRef, Inject, inject, Injectable } from "@angular/core";
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
import { Observable, map, of } from "rxjs";
import { Router } from "@angular/router";
import { EtransferService } from '../etransfer-service/etransfer.service';
import { Etransfer } from '../etransfer-service/etransfer.model';
import { MomentService } from "src/app/foundation/validator-service/moment-service";
import { AppConfigService } from "@dep/services";
import { EtransfercontactService } from "../etransfercontact-service/etransfercontact.service";
import { EtransfercustomerService } from "src/app/etransfers-space/etransfercustomer-service/etransfercustomer.service";
import { CasaAccountsEtransferListComponent } from "../casa-accounts-etransfer-list/casa-accounts-etransfer-list.component";
import { DeviceDetectorService } from "@dep/core";
import { Casaaccount } from "src/app/foundation/casaaccount-service/casaaccount.model";
import { CasaaccountService } from "src/app/foundation/casaaccount-service/casaaccount.service";
import { DepTooltipComponent } from "src/app/dep/core/component/dep-tooltip/dep-tooltip.component";
import { DepAlertComponent } from "src/app/dep/core/component/dep-alert/dep-alert.component";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { DepConfirmationComponent } from "src/app/dep/core/component/dep-confirmation/dep-confirmation.component";
import { APPCONSTANTS } from "@dep/constants";
import { CASAAccountsListComponent } from "src/app/accounts/casa-accounts-list/casa-accounts-list.component";
import moment from "moment";
import { ScheduleetransferService } from "../scheduleetransfer-service/scheduleetransfer.service";
import { ETransferConfirmationReceiptFormComponent } from "../etransfer-confirmation-receipt-form/etransfer-confirmation-receipt-form.component";
import { CustomDatePipe } from "src/app/common/pipe/custom-date/custom-date.pipe";
export class RetailEtransferState extends BaseFpxComponentState {
  private _appConfig: AppConfigService = inject(AppConfigService);
  showSuggestion: boolean = false;
  createContact: any = {
    textPosition: "after",
    ckValues: { checked: "Y", unchecked: "N" }
  }
  paymentAmount: any = {
    isCurrEditable: false,
    CurrencyList: [],
    amountInWords: false,
    initCurrency: this._appConfig.baseCurrency,
    defaultFetch: true,
  }
  paymentDate: any = {
    minDate: "",
    maxDate: "",
  }
  isPreferred: any = {
    textPosition: "after",
    ckValues: { checked: "Y", unchecked: "N" }
  }
  paymentSummary: any = {
    debitAmount: "",
    creditAmount: "",
    exchangeRate: "",
    chargesAmount: ""
  };
  fromCurrencyVariable: any;
  toCurrencyVariable: any;
  accountBalanceVariable: any;
  defaultAccNum: any;
  accountNumber: any;
  serviceCode: any;
  contact: any
  securityAnswer: any = {
    visibilityChange: false,
    autoComplete: false
  }
  eTransferCustomerData: any;
  modeVar: any;
  accountBalanceVar: any;
  casaAccounts: Casaaccount[] = [];
  accType: any;
  nickname: any;
  sourceAccount: any;
  EtransferSendMoneyData: any;
  tranCat: any;
  endDate: any = {
    minDate: "",
    maxDate: "",
  }
  futureMaxDate: any;
  futureDate: any;
  currentDate: any;
  Date: any;
  Amount:string="0.90";
  currency: string = APPCONSTANTS.baseCurrency;
  autoDepositEnabledMsg: boolean=false;
  prefferedAcc: any;
  casaAccountList: any;
  selectedAccount: any;
  tempCasaAccount: any;
  sendLimits: any;
  sendMoneyDetails: any
  review: boolean = false;
  frequency: any;
  paymentDate1: any;
  numberOfPayments: any;
  endDateVar: any;
  paymentFrequencyFlag: any;
  scheduleType: any;
  dateTime: any;
  operationMode: any;
  numOfPayments: any;
  productCode: string = '';
  directDepositReferenceNumber: any;
  showNumberOfPayments: boolean = false;
}


@Injectable()
export class RetailEtransferHelper extends BaseFpxFormHelper<RetailEtransferState> {
  isPreferred!: any;
  transactionDetails: any = {};
  isDisabled: boolean=true;
  isPreffered: boolean = false;
  findByKeyDataReceived: boolean = true;

  constructor(private retailEtransferService: EtransferService,
    private etransfercustomerService: EtransfercustomerService,
    private _httpProvider: HttpProviderService,
    private _router: Router,
    private momentService: MomentService,
    private _currencyFormatter: FpxCurrenyFormatterPipe,
    public _appConfig: AppConfigService,
    private EtransfercontactService: EtransfercontactService,
    public _device: DeviceDetectorService,
    private casaAccountService: CasaaccountService,
    private changeDetectorRef:ChangeDetectorRef,
    private scheduleetransferService: ScheduleetransferService,
    private _dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) private _dialogData: any,
    private customDatePipe: CustomDatePipe
  ) {
    super(new RetailEtransferState());
  }

  override doPreInit(): void {
    if(this.formMode == 'VIEW') {
      this.findByKeyDataReceived = false;
      setTimeout(() => {
        this.setFormTitle("");
      });
    }
    this._appConfig.removeData('requestURLInfo');
    this.setServiceCode("ETRANSFERSENDMONEY");
    this.removeShellBtn('RESET');
    this.state.modeVar = this.getRoutingParam('mode');
    this.state.tranCat = this.getRoutingParam('tranCat');
    let data = this._appConfig.getData('eTransferCustomerData');
    if (data) {
      this.state.eTransferCustomerData = data;
    }
    this.addResetHandler('reset', this._onReset);
  }
  deleteContact() {
    let modal = new FpxModal();
    modal.setComponent(DepConfirmationComponent);
    modal.setPanelClass('dep-alert-popup');
    modal.setBackDropClass(["dep-popup-back-drop", "delete-bill-backdrop", "bottom-transparent-overlay"]);
    modal.setDisableClose(true);
    if(this.state.EtransferSendMoneyData.scheduleType=='2'){
      modal.setData({
        title: "Delete scheduled transfer?",
        message: "Are you sure you want to delete the scheduled transfer?",
        okBtnLbl: "Yes, delete",
        cancelBtnLbl: "No",
        confirmationIcon: "close"
      });
    }
    else{
      modal.setData({
        title: "Delete recurring transfer?",
        message: "Are you sure you want to delete the recurring transfer?",
        okBtnLbl: "Yes, delete",
        cancelBtnLbl: "No",
        confirmationIcon: "close"
      });
    }

    modal.setAfterClosed(this.DelBillModelAfterClose);
    this.openModal(modal);
  }
  DelBillModelAfterClose: FpxModalAfterClosed = (payload) => {
    if (payload == 0) {
    }
    else {
      this.state.operationMode='D';
      this.setDisabled('paymentFrequency',true);
      this.setDisabled('numberOfPayments',true);
      this.setDisabled('endDate',true);
        this.setServiceCode("RETAILSCHETRANSFER");
        this.setDataService(this.scheduleetransferService);
        this.triggerSubmit();
    
    }

  }
  public onsecurityAnswerValueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if (value) {
      this.reset('confirmSecurityAnswer');
    }
  }
  public onconfirmSecurityAnswerValueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if (value) {
      if (!(this.getValue('securityAnswer'))) {
        this.setErrors('confirmSecurityAnswer', "securityAnsReq")
      }
      else {
        if (value != this.getValue('securityAnswer')) {
          this.setErrors('confirmSecurityAnswer', "notMatchErr");
        }
      }
    }
  }
  public onnotificationPreferenceValueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    this.state.autoDepositEnabledMsg = false;
    this.setHidden('autoDepositEnabledMsg', true);
    if (value) {
      if (value == 'E') {
        this.setHidden('contactEmailId', false);
        this.setHidden('contactPhoneNumber', true);
        if (!this.state.EtransferSendMoneyData?.phoneNumber || this.state.tranCat == 'O') {
          this.reset('contactPhoneNumber');
        }

      }
      else {
        if (!this.state.EtransferSendMoneyData?.emailId || this.state.tranCat == 'O') {
          this.reset('contactEmailId');
        }
        this.setHidden('contactEmailId', true);
        this.setHidden('contactPhoneNumber', false);
      }
    }
    // let body: any = {
      let validateetransferautodeposit:any = {
        ntfnType: value
      }
    // };
    if(value == 'P'){
      validateetransferautodeposit.phoneNumber = this.getValue('contactPhoneNumber');
    }
    else {
      validateetransferautodeposit.emailId = this.getValue('contactEmailId');
    }
    this.etransfercustomerService.checkIsAutoDeposit({validateetransferautodeposit}).subscribe({
      next: (res) => {
        if(res.body.directDepositReferenceNumber){
          this.state.directDepositReferenceNumber = res.body.directDepositReferenceNumber;
        }
        if (Number(res.body.count) == 0) {
          this.setHidden('securityAnswer', false);
          this.setHidden('securityQuestion', false);
          this.setHidden('confirmSecurityAnswer', false);
          this.setValue('autoDepositEnabled', '0');
          this.setHidden('autoDepositEnabledMsg', true);
          this.state.autoDepositEnabledMsg=false;
        }
        else {
          this.setHidden('autoDepositEnabledMsg', false);
          this.setValue('autoDepositEnabled', '1');
          this.reset('confirmSecurityAnswer');
          this.reset('securityAnswer');
          this.reset('securityQuestion');
          this.setHidden('securityAnswer', true);
          this.setHidden('securityQuestion', true);
          this.setHidden('confirmSecurityAnswer', true);
          this.state.autoDepositEnabledMsg=true;
        }
      }
    })
  }
  public onpaymentDateValueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if (value) {
      this.state.paymentDate1=value;
      this.state.endDateVar = this.caculateEndDate(this.state.paymentDate1, this.state.frequency, this.state.numberOfPayments);
      if (this.state.endDateVar) {
        this.setValue('endDate', this.state.endDateVar);
        this.setReadonly('endDate', true);

      }
      if (value == this.state.currentDate) {
        this.setHidden('paymentFrequency', true);
        this.setHidden('paymentFrequencyFlag', true);
        this.setHidden('numberOfPayments', true);
        this.state.showNumberOfPayments = false;
        this.setHidden('endDate', true);
        this.setValue('paymentFrequency', '1');
        this.state.scheduleType = '1';
        this.setServiceCode("ETRANSFERSENDMONEY");
        this.setDataService(this.retailEtransferService);
      }
      else{
        if(this.state.modeVar=='M'){
          if(this.state.scheduleType=='2'){
            this.setHidden('paymentFrequencyFlag', true);
            this.setHidden('numberOfPayments', true);
            this.state.showNumberOfPayments = false;
            this.setHidden('endDate', true);
            this.setValue('paymentFrequency', '1');
            this.setReadonly('paymentFrequency',true);
            this.setReadonly('securityAnswer',true);
            this.setReadonly('securityQuestion',true);

            this.state.scheduleType='2';
            this.setServiceCode("RETAILSCHETRANSFER");
            this.setDataService(this.scheduleetransferService);
            this.setHidden('paymentFrequency',false);
          }
        }
        else{
          this.state.scheduleType='2';
          this.setServiceCode("RETAILSCHETRANSFER");
          this.setDataService(this.scheduleetransferService);
          this.setHidden('paymentFrequency',false);
        }
      }
    }
  }
  public onpaymentFrequencyValueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if (value) {
      if(value=='1'){
        this.setHidden('paymentFrequencyFlag',true);
        this.setHidden('numberOfPayments',true);
        this.setHidden('endDate',true);
        this.state.showNumberOfPayments = false;
      }
      else{
        this.state.frequency= value;
        this.state.scheduleType='3';
        this.setServiceCode("RETAILSCHETRANSFER");
        this.setDataService(this.scheduleetransferService);
        this.state.endDateVar = this.caculateEndDate(this.state.paymentDate1, this.state.frequency, this.state.numberOfPayments);
        if (this.state.endDateVar) {
          this.setValue('endDate', this.state.endDateVar);
          this.setReadonly('endDate', true);
  
        }
        this.setHidden('paymentFrequencyFlag',false);
        if(!this.state.paymentFrequencyFlag){
          this.setValue('paymentFrequencyFlag',false);
          this.state.paymentFrequencyFlag=1;
        }
        if(!this.getValue('numberOfPayments')){
          this.setValue('numberOfPayments',2);
        }
        if(this.state.paymentFrequencyFlag==2){
          this.setHidden('numberOfPayments',true);
          this.setHidden('endDate',true);
          this.state.showNumberOfPayments = false;
        }
        else{
          this.setHidden('numberOfPayments',false);
          this.setHidden('endDate',false);
          this.state.showNumberOfPayments = true;
        }
      }
    }
  }
  public onpaymentFrequencyFlagValueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
      if(value == true){
        this.setHidden('numberOfPayments',true);
        this.setHidden('endDate',true);
        this.state.showNumberOfPayments = false;
        this.state.paymentFrequencyFlag=2;
      }
      else if(value == false){
        this.state.paymentFrequencyFlag=1;
        this.setHidden('numberOfPayments',false);
        this.setHidden('endDate',false);
        this.state.showNumberOfPayments = true;
        if(this.state.numOfPayments){
          this.setValue('numberOfPayments',this.state.numOfPayments);
        }
      }
  }
  public onnumberOfPaymentsValueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
      if(value){
        this.state.numberOfPayments=value;
        this.state.endDateVar = this.caculateEndDate(this.state.paymentDate1, this.state.frequency, this.state.numberOfPayments); 
        if (this.state.endDateVar) {
          this.setHidden('endDate', false);
          this.setValue('endDate', this.state.endDateVar);
          this.setReadonly('endDate', true);
  
        }
        else {
          this.setHidden('endDate', true);
        }

      }
  }
  caculateEndDate(startDate: any, frequency: any, noOfInstallment: any,paymentDaysInterval:any = undefined) {
    let endDate
    if (frequency == '2') {
      endDate = moment(startDate).add(Number((noOfInstallment - 1) * 7), 'd').format('YYYY-MM-DD')
    }
    else if (frequency == '3') {
      endDate = moment(startDate).add(Number((noOfInstallment - 1) * 14), 'd').format('YYYY-MM-DD')
    }
    else if (frequency == '4') {
      endDate = moment(startDate).add(Number(noOfInstallment - 1), 'M').format('YYYY-MM-DD')
    }
    else if (frequency == '5') {
      endDate = moment(startDate).add(Number((noOfInstallment - 1) * 6), 'M').format('YYYY-MM-DD')
    }
    return endDate

  }
  public oncontactEmailIdValueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if(this.state.tranCat!='C'){
      if (value && this.formGroup.controls['contactEmailId'].status!='INVALID') {
        const criteriaQuery: CriteriaQuery = new CriteriaQuery();
        criteriaQuery.addFilterCritertia('emailId', 'String', 'equals', {
          searchText: value
        });
        criteriaQuery.addFilterCritertia('status', 'String', 'notEqual', { searchText: 'D' })
        this.EtransfercontactService.findAll(criteriaQuery)().subscribe({
          next: (res) => {
            if (res) {
              if (res?.data[0]?.emailId == value) {
                this.setErrors('contactEmailId', 'duplicate');
              }
              else {
                let body = {
                  validateetransferautodeposit: {
                    emailId: value,
                    ntfnType: this.getValue('notificationPreference')
                  },
                };
        
                this.etransfercustomerService.checkIsAutoDeposit(body).subscribe({
                  next: (res) => {
                    if(res.body.directDepositReferenceNumber){
                      this.state.directDepositReferenceNumber = res.body.directDepositReferenceNumber;
                    }
                    if (Number(res.body.count) == 0) {
                      this.setHidden('securityAnswer', false);
                      this.setHidden('securityQuestion', false);
                      this.setHidden('confirmSecurityAnswer', false);
                      this.setValue('autoDepositEnabled', '0');
                      this.setHidden('autoDepositEnabledMsg', true);
                      this.state.autoDepositEnabledMsg=false;
                    }
                    else {
                      this.setHidden('autoDepositEnabledMsg', false);
                      this.setValue('autoDepositEnabled', '1');
                      this.reset('confirmSecurityAnswer');
                      this.reset('securityAnswer');
                      this.reset('securityQuestion');
                      this.setHidden('securityAnswer', true);
                      this.setHidden('securityQuestion', true);
                      this.setHidden('confirmSecurityAnswer', true);
                      this.state.autoDepositEnabledMsg=true;
                    }
                  }
                })
              }
            }
          }
        })
      }
    }
  }
  public oncontactPhoneNumberValueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if(this.state.tranCat!='C'){
      if (value && this.formGroup.controls['contactPhoneNumber'].status!='INVALID') {
        const criteriaQuery: CriteriaQuery = new CriteriaQuery();
        criteriaQuery.addFilterCritertia('phoneNumber', 'String', 'equals', {
          searchText: value
        });
        criteriaQuery.addFilterCritertia('status', 'String', 'notEqual', { searchText: 'D' })
        this.EtransfercontactService.findAll(criteriaQuery)().subscribe({
          next: (res) => {
            if (res) {
              if (res?.data[0]?.phoneNumber == value) {
                this.setErrors('contactPhoneNumber', 'duplicate');
              }
              else{
                let body = {
                  validateetransferautodeposit: {
                    phoneNumber:value,
                    ntfnType: this.getValue('notificationPreference')
                  },
                };
        
                this.etransfercustomerService.checkIsAutoDeposit(body).subscribe({
                  next: (res) => {
                    if(res.body.directDepositReferenceNumber){
                      this.state.directDepositReferenceNumber = res.body.directDepositReferenceNumber;
                    }
                    if (Number(res.body.count) == 0) {
                      this.setHidden('securityAnswer', false);
                      this.setHidden('securityQuestion', false);
                      this.setHidden('confirmSecurityAnswer', false);
                      this.setValue('autoDepositEnabled', '0');
                      this.setHidden('autoDepositEnabledMsg', true);
                      this.state.autoDepositEnabledMsg=false;
                    }
                    else {
                      this.setHidden('autoDepositEnabledMsg', false);
                      this.setValue('autoDepositEnabled', '1');
                      this.reset('confirmSecurityAnswer');
                      this.reset('securityAnswer');
                      this.reset('securityQuestion');
                      this.setHidden('securityAnswer', true);
                      this.setHidden('securityQuestion', true);
                      this.setHidden('confirmSecurityAnswer', true);
                      this.state.autoDepositEnabledMsg=true;
                    }
                  }
                })
              }
            }
          }
        })
      }
      
    }
  }
  public oncontactNameValueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if (value) {
      const criteriaQuery: CriteriaQuery = new CriteriaQuery();
      criteriaQuery.addFilterCritertia('firstName', 'String', 'equals', {
        searchText: value
      });
      criteriaQuery.addFilterCritertia('status', 'String', 'notEqual', { searchText: 'D' })
      this.EtransfercontactService.findAll(criteriaQuery)().subscribe({
        next: (res) => {
          if (res) {
            if (res?.data[0].firstName == value) {
              this.setErrors('contactName', 'duplicate');
            }
          }
        }
      })
    }
  }
  public oncontactIdDataReceived: BaseFpxControlEventHandler = (payload: any) => {
    // WRITE CODE HERE TO HANDLE 
    if (payload) {
    }
  }
  public onSourceAccountDataReceived: BaseFpxControlEventHandler = (payload: any) => {
    // WRITE CODE HERE TO HANDLE 
    if (payload) {
      this.reset('isPreferred');
      this.state.accountBalanceVar = payload.availableBalance;
      this.state.accountNumber = payload?.accountNumber
      if (payload?.accountCurrency) {
        this.setVariable('fromCurrencyVariable', payload.accountCurrency);
        this.state.fromCurrencyVariable = payload.accountCurrency;
      }
      else {
        this.setVariable('fromCurrencyVariable', this._appConfig.baseCurrency);
        this.state.fromCurrencyVariable = this._appConfig.baseCurrency;
      }
      if (!this.state.modeVar) {
        this.reset('paymentAmount');
        this.setValue('paymentAmount', { amount: 0, currencyCode: this._appConfig.baseCurrency });
      }
      if (payload?.availableBalance) {
        this.setVariable('accountBalanceVariable', payload.availableBalance);
      }
      else {
        this.setVariable('accountBalanceVariable', 0);
      }
      this.setVariable('fromAccountVariable', payload?.accountNumber);
    }
  }
  public onExchangeRateDataReceived: BaseFpxControlEventHandler = (payload: any) => {
    if (payload.zeroValue) {
      this.setHidden('paymentSummary', false);
    }
    else if (this.state.fromCurrencyVariable == this.state.toCurrencyVariable) {
      this.setHidden('paymentSummary', false);
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
      this.state.paymentSummary.exchangeRate = payload.exchangeRate;
    }

  }
  public handleFormOnLoad() {
    
    this.state.EtransferSendMoneyData = this._appConfig.getData('EtransferSendMoneyData');
    if(this.state.modeVar=='M'){
      this.addShellButton('Delete', 'DELETE', 'secondary', 'ENTRY', 'button');
      this.setShellBtnMethod('DELETE', this.deleteContact.bind(this));
    }
    this.setHidden('contactDetails', true);
    this.setHidden('autoDepositEnabledMsg', true);
    this.setReadonly('paymentDate',false);
    this.state.Date = this.momentService.getInstance();
     this.state.currentDate = this.state.Date.format("YYYY-MM-DD"); // this.customDatePipe.transform(moment(), 'YYYY-MM-DD'); 
    this.state.futureDate = this.state.Date.add(1, "day").format("YYYY-MM-DD"); // this.customDatePipe.transform(moment().add(1, "day"), 'YYYY-MM-DD'); 
    this.state.futureMaxDate= this.state.Date.add(1, "Year").format("YYYY-MM-DD"); // this.customDatePipe.transform(moment().add(1, "year"), 'YYYY-MM-DD'); 
    this.state.paymentDate.minDate = this.state.currentDate;
    this.state.paymentDate.maxDate = this.state.futureMaxDate;
    this.etransfercustomerService.fetchEtransferSendLimits().subscribe((res)=>{
      if(res){
        this.state.sendLimits=res;
      }
    })

    if (this.state.modeVar) {
      let routingParam: any = this.getRoutingParam();
      if (this.getRoutingParam('mode') == 'R') {
        this.retailEtransferService.findByKey(routingParam)().subscribe((res) => {
          if (res) {
            this.state.tranCat=res?.contactCategory;
            this.setReadonly('notificationPreference',true);
            this.patchValue(res);
            this.setValue('contactId', res?.contactId?.beneId);
            this.setReadonly('contactCategory', true);
            this.setHidden('contactName', true);
            this.setHidden('preferredLanguage', true);
            this.setHidden('oneOffContactTitle', true);
            this.state.sendMoneyDetails = res;
            this.state.contact = res?.contactId;
            if (this.state.contact?.notificationPreference) {
              this.setValue('notificationPreference', this.state.contact?.notificationPreference);
              if (this.state.contact?.emailId && this.state.contact?.phoneNumber) {
                this.setValue('contactEmailId', this.state.contact?.emailId);
                this.setValue('contactPhoneNumber', this.state.contact?.phoneNumber);
                this.setReadonly('contactEmailId', true);
                this.setReadonly('contactPhoneNumber', true);
              }
              else if (!this.state.contact?.emailId && this.state.contact?.phoneNumber) {
                this.setReadonly('contactEmailId', true);
                this.setValue('contactPhoneNumber', this.state.contact?.phoneNumber);
                this.setReadonly('contactPhoneNumber', true);
                this.setReadonly('notificationPreference', true);
    
              }
              else {
                this.setValue('contactEmailId', this.state.contact?.emailId);
                this.setReadonly('contactEmailId', true);
                this.setReadonly('contactPhoneNumber', true);
                this.setReadonly('notificationPreference', true);
              }
            }
            this.setValue('securityQuestion', this.state.contact?.securityQuestion);
            this.setValue('securityAnswer', this.state.contact?.securityAnswer);
            // let body = {
            let validateetransferautodeposit:any = {
              ntfnType: this.state.sendMoneyDetails.notificationPreference
            }
            // };
            if(this.state.sendMoneyDetails.notificationPreference == 'E'){
              validateetransferautodeposit.emailId = this.state.sendMoneyDetails.contactEmailId;
            }
            else{
              validateetransferautodeposit.phoneNumber = this.state.sendMoneyDetails.contactPhoneNumber;
            }
    
            this.etransfercustomerService.checkIsAutoDeposit({validateetransferautodeposit}).subscribe({
              next: (res) => {
                if(res.body.directDepositReferenceNumber){
                  this.state.directDepositReferenceNumber = res.body.directDepositReferenceNumber;
                }
                if (Number(res.body.count) == 0) {
                  this.setHidden('securityAnswer', false);
                  this.setHidden('securityQuestion', false);
                  this.setHidden('confirmSecurityAnswer', false);
                  this.setValue('autoDepositEnabled', '0');
                  this.setHidden('autoDepositEnabledMsg', true);
                  this.state.autoDepositEnabledMsg=false;
                }
                else {
                  this.setHidden('autoDepositEnabledMsg', false);
                  this.setValue('autoDepositEnabled', '1');
                  this.reset('confirmSecurityAnswer');
                  this.reset('securityAnswer');
                  this.reset('securityQuestion');
                  this.setHidden('securityAnswer', true);
                  this.setHidden('securityQuestion', true);
                  this.setHidden('confirmSecurityAnswer', true);
                  this.state.autoDepositEnabledMsg=true;
                }
              }
            })
            let Date: any = this.momentService.getInstance();
            let currentDate: any = Date.format("YYYY-MM-DD"); // this.customDatePipe.transform(moment(), 'YYYY-MM-DD');
            this.setValue('paymentDate', currentDate);
            this.setReadonly('paymentDate', false);
            this.setValue('scheduleType', res?.scheduleType);
            this.setDisabled('paymentId', true);
            this.setVariable('fromCurrencyVariable', res.debitCurrency);
            this.state.fromCurrencyVariable = res.debitCurrency;
            this.setVariable('toCurrencyVariable', this._appConfig.baseCurrency);
            this.setVariable('accountBalanceVariable', this.state.accountBalanceVar);
            this.state.toCurrencyVariable = this._appConfig.baseCurrency;
            this.setValue('paymentAmount', { amount: res?.paymentAmount, currencyCode: res?.paymentCurrency });
            this.setHidden('scheduleType',true);
            this.setHidden('paymentFrequency',true);
            this.etransfercustomerService.fetchPreferredAccount().subscribe({
              next: (res) => {
                res.forEach((item: any) => {
                  if (item.serviceCode == "INTERAC" && item.isPreferred == "1") {
                    this.state.defaultAccNum = item.accountNumber;
                  this.setValue('sourceAccount', item.accountNumber);
                    this.state.prefferedAcc = item.accountNumber;
                    if (this.state.prefferedAcc) {
                      this.isPreffered = true;
                    }
                    else {
                      this.isPreffered = false;
                    }
                  }
                });
              }
            })
      
            this.casaAccountService.fetchCasaAccounts(true).subscribe({
              next: (res) => {
                this.state.casaAccountList = res;
                this.state.tempCasaAccount = this.state.casaAccountList.filter((item: any) => item.accountCurrency == 'CAD');
                this.state.casaAccounts=[];
                this.state.tempCasaAccount.forEach((item: any)=>{
                  if(this.state?.prefferedAcc == item.accountNumber) {
                    item.preferredAccount = true;
                    this.state.casaAccounts.push({ ...item, preferredAccount:item?.preferredAccount});
                  }
               
                  else{
                    item.preferredAccount = false;
                    this.state.casaAccounts.push({ ...item, preferredAccount:item?.preferredAccount});
                  }
                })

                if (this.state.sendMoneyDetails.sourceAccount) {
                  this.state.casaAccounts.forEach((item: any) => {
                    if (this.state.sendMoneyDetails.sourceAccount == item.accountNumber) {
                      this.state.selectedAccount = item;
                      this.state.sourceAccount = item.accountNumber;
                      this.state.productCode = item.productCode;
                      if(item.accountNickname){
                        this.state.nickname = item.accountNickname;
                      }
                      else{
                        this.state.nickname = item.productDesc;
                      }
                      this.state.fromCurrencyVariable = item.accountCurrency;
                      this.state.accountBalanceVariable = item.availableBalance;
                      this.state.accType = item.accountTypeDesc;
                      this.setVariable('fromCurrencyVariable', this.state.fromCurrencyVariable);
                      this.setVariable('accountBalanceVariable',  this.state.accountBalanceVariable );
                      this.setValue('sourceAccount',item.accountNumber);
                    }
                  })
                }
              },
              error: (error) => {
                console.log("Casa accounts fetch error");
              }
            });
            this.setReadonly('sourceAccount',true);
            this.setFocus('paymentAmount');
          }
        });
      }
      else if (this.getRoutingParam('mode') == 'V') {
        this.setFormTitle("");
        this.setValue('paymentAmount', { amount: this.getValue('paymentAmount'), currencyCode: this.getValue('paymentCurrency') });
        this.setHidden('scheduleHandler', true);
        if (this.getValue('contactCategory') == 'C') {
          // this.setHidden('contactName', true);
          // this.setHidden('contactEmailId', true);
          this.setHidden('contactPhoneNumber', true);
          this.setHidden('notificationPreference', true);
          this.setHidden('createContact', true);
          this.setHidden('confirmSecurityAnswer', true);
          this.setHidden('paymentFrequency', true);
          this.setHidden('paymentFrequencyFlag', true);
          this.setHidden('numberOfPayments', true);
          this.state.showNumberOfPayments = false;
          this.setHidden('endDate', true);
          this.setHidden('preferredLanguage', true);
          this.setHidden('scheduleType', true);
          this.setHidden('paymentDate', true);
          this.setHidden('securityQuestion', true);
          this.setHidden('securityAnswer', true);
          if (this.getValue('notificationPreference') == 'E') {
            this.setHidden('contactEmailId', false);
            this.setHidden('contactPhoneNumber', true);
            if (!this.state.EtransferSendMoneyData?.phoneNumber || this.state.tranCat == 'O') {
              this.reset('contactPhoneNumber');
            }
          }
          else {
            if (!this.state.EtransferSendMoneyData?.emailId || this.state.tranCat == 'O') {
              this.reset('contactEmailId');
            }
            this.setHidden('contactEmailId', true);
            this.setHidden('contactPhoneNumber', false);
          }
          this.casaAccountService.fetchCasaAccounts(true).subscribe({
            next: (res) => {
              let index = 0;
              if(this.getValue('sourceAccount')){
                index = res.findIndex(x=>x.accountNumber == this.getValue('sourceAccount'));
              } 
              this.state.casaAccounts = res;
              this.state.sourceAccount = res[index].accountNumber;
              this.state.productCode = res[index].productCode;
              this.state.nickname = res[index].productDesc;
                this.state.fromCurrencyVariable = res[index].accountCurrency;
                this.state.accountBalanceVariable = res[index].baseCurrencyAvlBal;
                if (res[index].accountType == "CAA") {
                  this.state.accType = "Chequing";
                }
                else {
                  this.state.accType = "Savings";
                }
                this.setValue('sourceAccount', res[index].accountNumber);
            },
            error: (error) => {
              console.log("Casa accounts fetch error");
            }
          });
          if(!this.getValue('remarks')) {
            this.setHidden('remarks', true);
          }
          this.setValue('paymentAmount', { amount: this.transactionDetails.paymentAmount, currencyCode: this.transactionDetails.paymentCurrency });

          this.setLabel("contactName", "RetailEtransfer.sentTo.label");
          this.setLabel("contactEmailId", "RetailEtransfer.notificationPreference.label");
          this.setLabel("contactPhoneNumber", "RetailEtransfer.notificationPreference.notifiedBy");
          if(!this.transactionDetails.serviceFee){
            this.state.Amount = '';
          }
        }
        else{
          this.setHidden('contactPhoneNumber', true);
          this.setHidden('notificationPreference', true);
          this.setHidden('createContact', true);
          this.setHidden('confirmSecurityAnswer', true);
          this.setHidden('paymentFrequency', true);
          this.setHidden('paymentFrequencyFlag', true);
          this.setHidden('numberOfPayments', true);
          this.state.showNumberOfPayments = false;
          this.setHidden('endDate', true);
          this.setHidden('preferredLanguage', true);
          this.setHidden('scheduleType', true);
          this.setHidden('paymentDate', true);
          this.setHidden('securityQuestion', true);
          this.setHidden('securityAnswer', true);
          if (this.getValue('notificationPreference') == 'E') {
            this.setHidden('contactEmailId', false);
            this.setHidden('contactPhoneNumber', true);
            if (!this.state.EtransferSendMoneyData?.phoneNumber || this.state.tranCat == 'O') {
              this.reset('contactPhoneNumber');
            }
          }
          else {
            if (!this.state.EtransferSendMoneyData?.emailId || this.state.tranCat == 'O') {
              this.reset('contactEmailId');
            }
            this.setHidden('contactEmailId', true);
            this.setHidden('contactPhoneNumber', false);
          }
          this.casaAccountService.fetchCasaAccounts(true).subscribe({
            next: (res) => {
              let index = res.findIndex(x=>x.accountNumber == this.getValue('sourceAccount'));
              this.state.casaAccounts = res;
                this.state.sourceAccount = res[index].accountNumber;
                this.state.productCode = res[index].productCode;
                this.state.nickname = res[index].accountName;
                this.state.fromCurrencyVariable = res[index].accountCurrency;
                this.state.accountBalanceVariable = res[index].baseCurrencyAvlBal;
                if (res[index].accountType == "CAA") {
                  this.state.accType = "Chequing";
                }
                else {
                  this.state.accType = "Savings";
                }
                this.setValue('sourceAccount', res[index].accountNumber);
            },
            error: (error) => {
              console.log("Casa accounts fetch error");
            }
          });
          if(!this.getValue('remarks')) {
            this.setHidden('remarks', true);
          }
          this.setValue('paymentAmount', { amount: this.transactionDetails.paymentAmount, currencyCode: this.transactionDetails.paymentCurrency });

          this.setLabel("contactName", "RetailEtransfer.sentTo.label");
          this.setLabel("contactEmailId", "RetailEtransfer.notificationPreference.label");
        }
      }
      else if (this.getRoutingParam('mode') == 'M'){
        this.scheduleetransferService.findByKey(routingParam)().subscribe((res) => {
          if (res) {
            this.state.tranCat=res?.contactCategory;
            this.state.scheduleType=res?.scheduleType;
            this.setReadonly('notificationPreference',true);
            this.patchValue(res);
            this.setValue('contactId', res?.contactId?.beneId);
            this.setReadonly('contactCategory', true);
            this.setHidden('contactName', true);
            this.setHidden('preferredLanguage', true);
            this.setHidden('oneOffContactTitle', true);
            this.state.sendMoneyDetails = res;
            this.state.contact = res?.contactId;
            if (this.state.contact?.notificationPreference) {
              this.setValue('notificationPreference', this.state.contact?.notificationPreference);
              if (this.state.contact?.emailId && this.state.contact?.phoneNumber) {
                this.setValue('contactEmailId', this.state.contact?.emailId);
                this.setValue('contactPhoneNumber', this.state.contact?.phoneNumber);
                this.setReadonly('contactEmailId', true);
                this.setReadonly('contactPhoneNumber', true);
              }
              else if (!this.state.contact?.emailId && this.state.contact?.phoneNumber) {
                this.setReadonly('contactEmailId', true);
                this.setValue('contactPhoneNumber', this.state.contact?.phoneNumber);
                this.setReadonly('contactPhoneNumber', true);
                this.setReadonly('notificationPreference', true);
    
              }
              else {
                this.setValue('contactEmailId', this.state.contact?.emailId);
                this.setReadonly('contactEmailId', true);
                this.setReadonly('contactPhoneNumber', true);
                this.setReadonly('notificationPreference', true);
              }
            }
            this.setValue('securityQuestion', this.state.contact?.securityQuestion);
            this.setValue('securityAnswer', this.state.contact?.securityAnswer);
            // let body = {
              let validateetransferautodeposit:any = {
                ntfnType: this.state.sendMoneyDetails.notificationPreference
              }
              // };
              if(this.state.sendMoneyDetails.notificationPreference == 'E'){
                validateetransferautodeposit.emailId = this.state.sendMoneyDetails.contactEmailId;
              }
              else{
                validateetransferautodeposit.phoneNumber = this.state.sendMoneyDetails.contactPhoneNumber;
              }
    
            this.etransfercustomerService.checkIsAutoDeposit({validateetransferautodeposit}).subscribe({
              next: (res) => {
                if(res.body.directDepositReferenceNumber){
                  this.state.directDepositReferenceNumber = res.body.directDepositReferenceNumber;
                }
                if (Number(res.body.count) == 0) {
                  this.setHidden('securityAnswer', false);
                  this.setHidden('securityQuestion', false);
                  this.setHidden('confirmSecurityAnswer', false);
                  this.setValue('autoDepositEnabled', '0');
                  this.setHidden('autoDepositEnabledMsg', true);
                  this.state.autoDepositEnabledMsg=false;
                }
                else {
                  this.setHidden('autoDepositEnabledMsg', false);
                  this.setValue('autoDepositEnabled', '1');
                  this.reset('confirmSecurityAnswer');
                  this.reset('securityAnswer');
                  this.reset('securityQuestion');
                  this.setHidden('securityAnswer', true);
                  this.setHidden('securityQuestion', true);
                  this.setHidden('confirmSecurityAnswer', true);
                  this.state.autoDepositEnabledMsg=true;
                }
              }
            })
            let Date: any = this.momentService.getInstance();
            let currentDate: any = Date.format("YYYY-MM-DD");
            this.setValue('scheduleType', res?.scheduleType);
            this.setValue('paymentDate', res?.paymentDate);
            this.setReadonly('paymentDate', false);
            this.setDisabled('paymentId', true);
            this.setVariable('fromCurrencyVariable', res.debitCurrency);
            this.state.fromCurrencyVariable = res.debitCurrency;
            this.setVariable('toCurrencyVariable', this._appConfig.baseCurrency);
            this.setVariable('accountBalanceVariable', this.state.accountBalanceVar);
            this.state.toCurrencyVariable = this._appConfig.baseCurrency;
            this.setValue('paymentAmount', { amount: res?.paymentAmount, currencyCode: res?.paymentCurrency });
            this.setHidden('scheduleType',true);
            if(res?.numberOfPayments){
              this.state.numOfPayments=res?.numberOfPayments;
            }
            this.setHidden('paymentFrequency',false);
            this.etransfercustomerService.fetchPreferredAccount().subscribe({
              next: (res) => {
                res.forEach((item: any) => {
                  if (item.serviceCode == "INTERAC" && item.isPreferred == "1") {
                    this.state.defaultAccNum = item.accountNumber;
                  this.setValue('sourceAccount', item.accountNumber);
                    this.state.prefferedAcc = item.accountNumber;
                    if (this.state.prefferedAcc) {
                      this.isPreffered = true;
                    }
                    else {
                      this.isPreffered = false;
                    }
                  }
                });
              }
            })
      
            this.casaAccountService.fetchCasaAccounts(true).subscribe({
              next: (res) => {
                this.state.casaAccountList = res;
                this.state.tempCasaAccount = this.state.casaAccountList.filter((item: any) => item.accountCurrency == 'CAD');
                this.state.casaAccounts=[];
                this.state.tempCasaAccount.forEach((item: any)=>{
                  if(this.state?.prefferedAcc == item.accountNumber) {
                    item.preferredAccount = true;
                    this.state.casaAccounts.push({ ...item, preferredAccount:item?.preferredAccount});
                  }
               
                  else{
                    item.preferredAccount = false;
                    this.state.casaAccounts.push({ ...item, preferredAccount:item?.preferredAccount});
                  }
                })

                if (this.state.sendMoneyDetails.sourceAccount) {
                  this.state.casaAccounts.forEach((item: any) => {
                    if (this.state.sendMoneyDetails.sourceAccount == item.accountNumber) {
                      this.state.selectedAccount = item;
                      this.state.sourceAccount = item.accountNumber;
                      if(item.accountNickname){
                        this.state.nickname = item.accountNickname;
                      }
                      else{
                        this.state.nickname = item.productDesc;
                      }
                      this.state.fromCurrencyVariable = item.accountCurrency;
                      this.state.accountBalanceVariable = item.availableBalance;
                      this.state.accType = item.accountTypeDesc;
                      this.setVariable('fromCurrencyVariable', this.state.fromCurrencyVariable);
                      this.setVariable('accountBalanceVariable',  this.state.accountBalanceVariable );
                      this.setValue('sourceAccount',item.accountNumber);
                    }
                  })
                }
              },
              error: (error) => {
                console.log("Casa accounts fetch error");
              }
            });
            this.setReadonly('sourceAccount',true);
            this.setFocus('paymentAmount');
            this.setReadonly('securityAnswer',true);
            this.setReadonly('securityQuestion',true);
          }
        });
      }
    }
    else {
      if (this.state.tranCat == 'C') {
        this.setValue('contactCategory', 'C');
        this.state.contact = this.state.EtransferSendMoneyData;
        this.setHidden('contactDetails', false);
        this.setValue('contactId', this.state.EtransferSendMoneyData?.beneId);
        this.setHidden('contactName', true);
        this.setHidden('preferredLanguage', true);
        this.setHidden('oneOffContactTitle',true);
        if (this.state.contact?.notificationPreference) {
          this.setValue('notificationPreference', this.state.contact?.notificationPreference);
          if (this.state.contact?.emailId && this.state.contact?.phoneNumber) {
            this.setValue('contactEmailId', this.state.contact?.emailId);
            this.setValue('contactPhoneNumber', this.state.contact?.phoneNumber);
            this.setReadonly('contactEmailId', true);
            this.setReadonly('contactPhoneNumber', true);
            this.setLabel('contactPhoneNumber', 'RetailEtransfer.contactPhoneNumber.phoneLabel');
            this.setLabel('contactEmailId', 'RetailEtransfer.contactEmailId.emailLabel');
          }
          else if (!this.state.contact?.emailId && this.state.contact?.phoneNumber) {
            this.setReadonly('contactEmailId', true);
            this.setValue('contactPhoneNumber', this.state.contact?.phoneNumber);
            this.setReadonly('contactPhoneNumber', true);
            this.setReadonly('notificationPreference', true);
            this.setLabel('contactPhoneNumber', 'RetailEtransfer.contactPhoneNumber.phoneLabel');
          }
          else {
            this.setValue('contactEmailId', this.state.contact?.emailId);
            this.setReadonly('contactEmailId', true);
            this.setReadonly('contactPhoneNumber', true);
            this.setReadonly('notificationPreference', true);
            this.setLabel('contactEmailId', 'RetailEtransfer.contactEmailId.emailLabel');
          }
        }
        this.setValue('securityQuestion', this.state.contact?.securityQuestion);
        this.setValue('securityAnswer', this.state.contact?.securityAnswer);
        // let body = {
        //   validateetransferautodeposit: {
        //     emailId: this.state?.contact?.emailId,
        //     phoneNumber:this.state?.contact?.phoneNumber,
        //     ntfnType: this.state?.contact?.notificationPreference
        //   },
        // };

        // let body = {
          let validateetransferautodeposit:any = {
            ntfnType: this.state?.contact?.notificationPreference
          }
          // };
          if(this.state?.contact?.notificationPreference == 'E'){
            validateetransferautodeposit.emailId = this.state?.contact?.emailId;
          }
          else{
            validateetransferautodeposit.phoneNumber = this.state?.contact?.phoneNumber;
          }

        this.etransfercustomerService.checkIsAutoDeposit({validateetransferautodeposit}).subscribe({
          next: (res) => {
            if(res.body.directDepositReferenceNumber){
              this.state.directDepositReferenceNumber = res.body.directDepositReferenceNumber;
            }
            if (Number(res.body.count) == 0) {
              this.setHidden('securityAnswer', false);
              this.setHidden('securityQuestion', false);
              this.setHidden('confirmSecurityAnswer', false);
              this.setValue('autoDepositEnabled', '0');
              this.setHidden('autoDepositEnabledMsg', true);
              this.state.autoDepositEnabledMsg=false;
            }
            else {
              this.setHidden('autoDepositEnabledMsg', false);
              this.setValue('autoDepositEnabled', '1');
              this.reset('confirmSecurityAnswer');
              this.reset('securityAnswer');
              this.reset('securityQuestion');
              this.setHidden('securityAnswer', true);
              this.setHidden('securityQuestion', true);
              this.setHidden('confirmSecurityAnswer', true);
              this.state.autoDepositEnabledMsg=true;
            }
          }
        })
      }
      if (this.state.tranCat == 'O') {
        this.setValue('contactCategory', 'O');
        this.setHidden('contactId', true);
        this.setValue('preferredLanguage', '1');
        this.setValue('notificationPreference', 'E');
        this.setHidden('oneOffContactTitle',false);
      }
      this.setValue('scheduleType', '1');
      this.state.scheduleType='1';
      this.setServiceCode("ETRANSFERSENDMONEY");
      this.setDataService(this.retailEtransferService);
      this.setHidden('scheduleType',true);
      this.setValue('paymentAmount', { amount: 0, currencyCode: this._appConfig.baseCurrency });
      this.state.toCurrencyVariable = this._appConfig.baseCurrency
      this.setVariable('toCurrencyVariable', this.state.toCurrencyVariable);
      this.setDisabled('paymentId', true);

      this.etransfercustomerService.fetchPreferredAccount().subscribe({
        next: (res) => {
          res.forEach((item: any) => {
            if (item.serviceCode == "INTERAC" && item.isPreferred == "1") {
              this.state.defaultAccNum = item.accountNumber;
            this.setValue('sourceAccount', item.accountNumber);
              this.state.prefferedAcc = item.accountNumber;
              if (this.state.prefferedAcc) {
                this.isPreffered = true;
              }
              else {
                this.isPreffered = false;
              }
            }
          });
        }
      })

      this.casaAccountService.fetchCasaAccounts(true).subscribe({
        next: (res) => {
          this.state.casaAccountList = res;
          this.state.tempCasaAccount = this.state.casaAccountList.filter((item: any) => item.accountCurrency == 'CAD');
          this.state.casaAccounts=[];
          this.state.tempCasaAccount.forEach((item: any)=>{
            if(this.state?.prefferedAcc == item.accountNumber) {
              item.preferredAccount = true;
              this.state.casaAccounts.push({ ...item, preferredAccount:item?.preferredAccount});
            }
         
            else{
              item.preferredAccount = false;
              this.state.casaAccounts.push({ ...item, preferredAccount:item?.preferredAccount});
            }
          })

          if (!this.state.prefferedAcc) {
            this.state.selectedAccount = this.state.casaAccounts[0];
            this.state.sourceAccount = this.state.casaAccounts[0].accountNumber;
            this.state.productCode = this.state.casaAccounts[0].productCode;
            if(this.state.casaAccounts[0].accountNickname){
              this.state.nickname = this.state.casaAccounts[0].accountNickname;
            }
            else{
              this.state.nickname = this.state.casaAccounts[0].productDesc;
            }
            this.state.fromCurrencyVariable = this.state.casaAccounts[0].accountCurrency;
            this.state.accType = this.state.casaAccounts[0].accountTypeDesc;
            this.setVariable('fromCurrencyVariable', this.state.fromCurrencyVariable);
            this.state.accountBalanceVariable = this.state.casaAccounts[0].availableBalance;
            this.setVariable('accountBalanceVariable',  this.state.accountBalanceVariable );
            this.setValue('sourceAccount', this.state.casaAccounts[0].accountNumber);
          }
          else {
            this.state.casaAccounts.forEach((item: any) => {
              if (this.state.prefferedAcc == item.accountNumber) {
                this.state.selectedAccount = item;
                this.state.sourceAccount = item.accountNumber;
                this.state.productCode = item.productCode;
                if(item.accountNickname){
                  this.state.nickname = item.accountNickname;
                }
                else{
                  this.state.nickname = item.productDesc;
                }
                this.state.fromCurrencyVariable = item.accountCurrency;
                this.state.accountBalanceVariable = item.availableBalance;
                this.state.accType = item.accountTypeDesc;
                this.setVariable('fromCurrencyVariable', this.state.fromCurrencyVariable);
                this.setVariable('accountBalanceVariable',  this.state.accountBalanceVariable );
                this.setValue('sourceAccount',item.accountNumber);
              }
            })
          }
        },
        error: (error) => {
          console.log("Casa accounts fetch error");
        }
      });
      this.changeDetectorRef.markForCheck(); 
    }

    this._appConfig.removeData('requestURLInfo');
  }
  private _onReset = () => {
    this.reset('paymentAmount');
    this.reset('securityQuestion');
    this.reset('securityAnswer');
    this.reset('confirmSecurityAnswer');
    this.reset('remarks')
    this.reset('contactId')

    this.handleFormOnLoad();
  }

  public handlePaymentAmountOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if (value) {
      if (value.amount) {
        if (!this.getValue('sourceAccount')) {
          this.setErrors('paymentAmount', 'sourceAccNullError');
        }
        else if(value.amount > 3000){
          this.setErrors('paymentAmount', 'amountLimitError');
        }
        else{
          // this.setErrors('paymentAmount', null);
          // this.formGroup.get('paymentAmount')?.setErrors(null);
        }
      }
    }
  }
  public handlesIsPreferredOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if (value) {
      if (this.getValue('sourceAccount') != '' && this.getValue('sourceAccount') != undefined) {
        if (value == 'Y') {
          let preferredaccount = {
            "preferredaccount": {
              "accountNumber": this.state.accountNumber,
              "isPreferred": "1"
            }
          };
          this.etransfercustomerService.postPreferredAccount(preferredaccount).subscribe({
            next: (res) => {
              // this.hideSpinner();
              let message = this.state.accountNumber ? "Account set as default" : "Default account removed";
              // this._fpxToastService.showSuccessAlert("Success", message, { duration: 1000});
            }
          })
        }
        if (value == 'N') {
          let preferredaccount = {
            "preferredaccount": {
              "accountNumber": this.state.accountNumber,
              "isPreferred": "0"
            }
          };
          this.etransfercustomerService.postPreferredAccount(preferredaccount).subscribe({
            next: (res) => {
              // this.hideSpinner();
              let message = this.state.defaultAccNum ? "Account set as default" : "Default account removed";
              // this._fpxToastService.showSuccessAlert("Success", message, { duration: 1000});
            }
          })
        }
      }
      else {
        this.setErrors('isPreferred', 'sourceAccNullError');
      }
    }
  }
  openCasaAccountsLists() {
    if(this.formMode == 'VIEW' && this.transactionDetails) {
      return;
    }
    let modal = new FpxModal();
    modal.setComponent(CASAAccountsListComponent);
    if (this._device.isMobile()) {
      modal.setPanelClass('full-view-popup');
    } else {
      modal.setPanelClass('dep-alert-popup');
    }
    modal.setBackDropClass(['dep-popup-back-drop', 'payment-accounts-list-popup-back-drop']);

    modal.setDisableClose(true);
    modal.setData({
      title: 'Select an account',
      accountsList: this.state.casaAccounts,
      selectedAccount: this.state.selectedAccount,
      serviceCode: "INTERAC"
    });
    modal.setAfterClosed(this.accountSelectedAfterClose);
    this.openModal(modal)
  }
  accountSelectedAfterClose: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
    if (payload.action === 1) {
      this.setValue('sourceAccount', payload?.data?.accountNumber);
      this.state.sourceAccount = payload?.data?.accountNumber;
      this.state.productCode = payload?.data?.productCode;
      this.state.selectedAccount = payload.data;
      if (payload?.data?.accountNickname) {
        this.state.nickname = payload?.data?.accountNickname;
      }
      else {
        this.state.nickname = payload?.data?.productDesc
      }

      this.state.fromCurrencyVariable = payload?.data?.accountCurrency;
      this.state.accountBalanceVariable = payload?.data?.availableBalance;
      this.setVariable('accountBalanceVariable',  this.state.accountBalanceVariable );
      this.setVariable('fromCurrencyVariable', this.state.fromCurrencyVariable);
      this.state.accType = payload?.data?.accountTypeDesc;
      this.formGroup.get('paymentAmount')?.updateValueAndValidity();
    }
    // else{
    //   this.setValue('sourceAccount',)
    // }
  }


  public override doPostInit(): void {
    this.setVariable('serviceCode', 'ETRANSFERSENDMONEY');
    // this.addValueChangeHandler("contactCategory", this.handlecontactCategoryOnvalueChange);
    this.addValueChangeHandler("scheduleType", this.handleScheduleTypeOnvalueChange);
    this.addControlEventHandler("sourceAccountDataReceived", this.onSourceAccountDataReceived);
    this.addValueChangeHandler("isPreferred", this.handlesIsPreferredOnvalueChange);
    this.addValueChangeHandler("contactName", this.oncontactNameValueChange);
    this.addValueChangeHandler("contactPhoneNumber", this.oncontactPhoneNumberValueChange);
    this.addValueChangeHandler("contactEmailId", this.oncontactEmailIdValueChange);
    this.addValueChangeHandler("securityAnswer", this.onsecurityAnswerValueChange);
    this.addValueChangeHandler("confirmSecurityAnswer", this.onconfirmSecurityAnswerValueChange);
    this.addValueChangeHandler("paymentAmount", this.handlePaymentAmountOnvalueChange);
    this.addControlEventHandler("exchangeRateReceived", this.onExchangeRateDataReceived);
    this.addValueChangeHandler("notificationPreference", this.onnotificationPreferenceValueChange);
    this.addValueChangeHandler("paymentDate", this.onpaymentDateValueChange);
    this.addValueChangeHandler("paymentFrequency", this.onpaymentFrequencyValueChange);
    this.addValueChangeHandler("paymentFrequencyFlag", this.onpaymentFrequencyFlagValueChange);
    this.addValueChangeHandler("numberOfPayments", this.onnumberOfPaymentsValueChange);
    this.handleFormOnLoad();

  }
  public handleScheduleTypeOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    this.setVariable('scheduleTypeVariable', value);
    if (value == '1') {
      this.setVariable('scheduleTypeVariable', value);
      this.setValue('paymentDate', this.state.currentDate);
      this.setReadonly('paymentDate', false);
    }
    if (value == "2") {
      this.setVariable('scheduleTypeVariable', value);

      this.reset('paymentDate', "");
      this.state.paymentDate.minDate = this.state.futureDate;
      this.state.paymentDate.maxDate = this.state.futureMaxDate;
      this.setValue('paymentDate', this.state.futureDate);
      this.setReadonly('paymentDate', false);
      this.setLabel("paymentDate", "RetailEtransfer.executionDate.label");
    }
    if (value == "3") {
      this.setVariable('scheduleTypeVariable', value);
      this.setLabel("paymentDate", "RetailEtransfer.startDate.label");
      this.state.paymentDate.minDate = this.state.futureDate;
      this.state.paymentDate.maxDate = this.state.futureMaxDate;
      this.setValue('paymentDate', this.state.futureDate);
      this.setReadonly('paymentDate', false);
    }
  }
  public handlecontactCategoryOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if (value == 'C') {
      // this.setHidden('contactId', true);
      this.reset('contactName');
      this.reset('contactEmailId');
      this.reset('contactPhoneNumber');
      // this.reset('notificationPreference');
      // this.setValue('notificationPreference', this.state.contact?.notificationPreference);
      this.reset('createContact');
      this.setHidden('contactName', true);
      this.setHidden('contactEmailId', true);
      this.setHidden('contactPhoneNumber', true);
      this.setHidden('notificationPreference', false);
      this.setHidden('createContact', true);
      this.reset('preferredLanguage');
      this.setHidden('preferredLanguage', true);
    }
    else {
      this.setReadonly('contactEmailId', false);
      this.setReadonly('contactPhoneNumber', false);
      this.reset('contactId');
      this.reset('contactEmailId');
      this.reset('contactPhoneNumber');
      this.setHidden('contactId', true);
      this.setHidden('contactName', false);
      this.setHidden('contactEmailId', false);
      this.setHidden('contactPhoneNumber', false);
      this.reset('notificationPreference');
      this.setHidden('notificationPreference', false);
      this.setValue('notificationPreference', 'E')
      this.setHidden('createContact', false);
      this.setHidden('securityAnswer', false);
      this.setHidden('securityQuestion', false);
      this.setHidden('confirmSecurityAnswer', false)
      this.setHidden('preferredLanguage', false);
    }

  }


  public override preSubmitInterceptor(payload: Etransfer): any {
    // WRITE CODE HERE TO HANDLE 
    payload.paymentAmount = this.getValue('paymentAmount').amount;
    payload.paymentCurrency = this.getValue('paymentAmount').currencyCode;
    payload.transferMode = 'S';
    if (this.getValue('contactId') != '' && this.getValue('contactId') != undefined) {
      payload.contactId = this.state.contact?.contactId;
    }
    if (this.getValue('contactCategory') == 'C') {
      payload.contactName = this.state.contact?.firstName;
      payload.contactEmailId = this.state.contact?.emailId;
      payload.contactPhoneNumber = this.state.contact?.phoneNumber;
      // payload.notificationPreference = this.state.contact?.notificationPreference;
      this._appConfig.setData("SendMoneyCat",this.state?.tranCat);
      payload.beneId=this.state.contact?.beneId;
    }
    else {
      delete payload.autoDepositEnabled;
    }
    if (!(this.getValue('createContact')) && this.getValue('contactCategory') == 'O') {
      payload.createContact = '0';
    }
    else if (this.getValue('createContact')) {
      payload.createContact = '1';
    }
    delete payload.confirmSecurityAnswer;
    delete payload.isPreferred;
    delete payload.createContact;
    if(this.state.modeVar!='M'){
      payload.scheduleType=this.getValue('paymentFrequency');
    }
    if(payload.scheduleType=='1'){
      delete payload.paymentFrequency;
    }
    if(this.state.scheduleType=='2'){
      payload.scheduleType='2';
      payload.operationMode='A';
      delete payload.paymentFrequency;
    }
    if(this.state.scheduleType=='3'){
      payload.scheduleType='3';
      payload.operationMode='A';
    }
    if(this.state.modeVar=='M'){
      payload.scheduleId=this.state.EtransferSendMoneyData.paymentId;
      payload.scheduleType=this.state.EtransferSendMoneyData.scheduleType;
      if(this.state.operationMode=='D'){
        payload.operationMode='D';
      }
      else{
        if(this.state.EtransferSendMoneyData.scheduleType=='2'){
          delete payload.paymentFrequency;
        }
        payload.operationMode='M';
      }
    }
    let currentDate = this.momentService.getInstance().format("YYYY-MM-DD");
    if(this.getValue('paymentDate') > currentDate && this.state.directDepositReferenceNumber){
      payload.directDepositReferenceNumber = this.state.directDepositReferenceNumber;
    }
    return payload;
  }


  public override postDataFetchInterceptor(payload: Etransfer) {
    // WRITE CODE HERE TO HANDLE 
    payload.contactId = payload.contactId.beneId;
    this.transactionDetails = payload;
    this.findByKeyDataReceived = true;
    return payload;
  }

  decodeTransferMode(transferMode: string){
    if(transferMode == 'S'){
      return 'Sent';
    }
    else if(transferMode == 'R'){
      return 'Requested';
    }
    return 'Received';
    
  }

  decodePaymentStatus(paymentStatus: string): string {
    const scheduleMap: { [key: string]: string } = {
      'I': 'Initiated',
      'P': 'Pending',
      'S': 'Completed',
      'C': 'Cancelled',
      'D': 'Declined',
      'F': 'Failed',
      'E': 'Expired',
      'A': 'Accepted',
    };
    return scheduleMap[paymentStatus];
  }

  onCancelETransfer() {
    let modal = new FpxModal();
    modal.setComponent(DepConfirmationComponent);
    modal.setPanelClass('dep-alert-popup');
    modal.setBackDropClass(['dep-popup-back-drop','dep-confirmation-backdrop-2', 'logout-backdrop', 'bottom-transparent-overlay']);
    modal.setDisableClose(true);
    modal.setData({
      title: 'CancelETransferPopup.title',
      message: 'CancelETransferPopup.message',
      confirmationIcon: 'cancel-e-transfer',
      okBtnLbl: 'CancelETransferPopup.okBtnLbl',
      cancelBtnLbl: 'CancelETransferPopup.cancelBtnLbl'
    });
    modal.setAfterClosed(this.cancelETransferModelAfterClose);
    this.openModal(modal)
  }

  cancelETransferModelAfterClose: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
    if (payload === 1) {
      let payload={
        "paymentId":this.getRoutingParam('paymentId'),
        "transferMode": "S",
        "amount" : this.transactionDetails.paymentAmount,
        "currency" : this.transactionDetails.paymentCurrency
      }
      this.showSpinner();
      this.etransfercustomerService.cancelETransfer(payload)().subscribe({
        next: (res: any) => {
          this.hideSpinner();
          this._angularRouter.navigate(['etransfers-space','entry-shell','etransfers','etransfer-confirmation-receipt'],
            {
              queryParams: {
                serviceCode: "ETRANSFERCANCELPAYMENT"
              }
            }
          );
          this.state.dateTime = this.momentService.getInstance().format("YYYY-MM-DD HH:mm:ss"); // this.customDatePipe.transform(moment(), 'YYYY-MM-DD HH:mm:ss'); 
          let modal = new FpxModal();
          modal.setComponent(ETransferConfirmationReceiptFormComponent);
          modal.setPanelClass("dep-alert-popup");
          modal.setDisableClose(true);
          modal.setBackDropClass(['dep-popup-back-drop', 'success-popup','etransfer-cancel-confirmation']);
          modal.setAfterClosed(this.cancelETransferConfirmationModelAfterClose);
          modal.setData({
            _requestServiceCode:"ETRANSFERCANCELPAYMENT",
            _requestStatus: "SuccessEnd",
            payId: res?.etrfcancelpayment.processId,
            currentDate: this.state.dateTime

          });
          this.openModal(modal);
        },
        error: (err: any) => {
          this.hideSpinner();
        }
      })
    } else {

    }
  }

  contextmenuModelAfterClose: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
    this._angularRouter.navigate(['etransfers-space']);
  }

  cancelETransferConfirmationModelAfterClose: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
    
  }

  sendReminder() {
    let payload={
      paymentId:this.getRoutingParam('paymentId'),
      transferMode:this.transactionDetails.transferMode,
    }
    this.showSpinner();
    this.etransfercustomerService.sendRemainder(payload)().subscribe({
      next: (res: any) => {
        this.hideSpinner();
        let modal = new FpxModal();
        modal.setComponent(DepTooltipComponent);
        modal.setPanelClass("dep-tooltip-popup");
        modal.setDisableClose(true);
        modal.setAfterClosed(this.contextmenuModelAfterClose);
        modal.setData({
          title: "Success!",
          message: "Reminder was sent to the recipient.",
        });
        this.openModal(modal);
      },
      error: (err: any) => {
        this.hideSpinner();
        // let modal = new FpxModal();
        // modal.setComponent(DepConfirmationComponent);
        // modal.setPanelClass("dep-confirmation-popup");
        // modal.setDisableClose(true);
        // modal.setAfterClosed(this.contextmenuModelAfterClose);
        // modal.setData({
        //   message: "DeleteNicknamePopup.message",
        //   okBtnLbl: "DeleteNicknamePopup.okBtnLbl",
        //   cancelBtnLbl: "DeleteNicknamePopup.cancelBtnLbl",
        //   confirmationIcon: "delete"
        // });
        // this.openModal(modal);
      }
    })
  }

  sendAnotherETransfer() {
    // let serviceCode = this.transactionDetails.serviceCode;
    // let queryParam: any = {
    //   "paymentId": this.getRoutingParam('paymentId'),
    //   "serviceCode": this.transactionDetails.serviceCode,
    //   "mode": 'R'
    // }
    // let service = this._appConfig.getServiceDetails(serviceCode);
    // this._router.navigate(service.servicePath, {
    //   queryParams: {
    //     paymentId: queryParam.paymentId,
    //     serviceCode: queryParam.serviceCode,
    //     mode: queryParam.mode,
    //   }
    // });
    this._router.navigate(['etransfers-space','entry-shell','etransfers','retail-etransfer-form'],
      {
        queryParams: {
          paymentId:this.getRoutingParam('paymentId'),
          serviceCode: 'ETRANSFERSENDMONEY',
          mode:'R'
        }
      }
    );
  }

  amountTooltip() {
    if (this._device.isMobile()) {
      let modal = new FpxModal();
      modal.setComponent(DepTooltipComponent);
      modal.setPanelClass("dep-tooltip-popup");
      modal.setDisableClose(true);
      modal.setAfterClosed(this.amountTooltipModelAfterClose);
      modal.setData({
        title: "RetailEtransfer.amountTooltip.title",
        message: 'RetailEtransfer.amountTooltip.message',
         okBtnLbl: "RetailEtransfer.amountTooltip.okBtnLbl",
        additionalInfo: this.state.sendLimits
      });
      this.openModal(modal);
    }
    else {
      let modal = new FpxModal();
      modal.setComponent(DepAlertComponent);
      modal.setPanelClass("dep-alert-popup");
      modal.setBackDropClass(["etransfer-send-limits"]);
      modal.setDisableClose(true);
      modal.setAfterClosed(this.amountTooltipModelAfterClose);
      modal.setData({
        title: "RetailEtransfer.amountTooltip.title",
        message: 'RetailEtransfer.amountTooltip.message',
        okBtnLbl: "RetailEtransfer.amountTooltip.okBtnLbl",
        additionalInfo: this.state.sendLimits
      });
      this.openModal(modal);
    }
  }

  amountTooltipModelAfterClose: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
    this._dialogRef.close(0);
  }
  
  override onReview(): void {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    this.isDisabled=false;
    this.state.review = true;
    if(this.state.autoDepositEnabledMsg){
      this.setHidden('autoDepositEnabledMsg',true);
    }
    if(this.getValue('remarks')){
      this.setHidden('remarks',false);
    }
    else{
      this.setHidden('remarks',true);
    }
  }

  override backToEntryMode(): void {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    this.isDisabled=true;
    this.state.review = false;
    if(this.state.autoDepositEnabledMsg){
      this.setHidden('autoDepositEnabledMsg',false);
    }
      this.setHidden('remarks',false);
   
  }

  public handleFormOnPostsubmit(response: any, routingInfo: any) {
    if (response.success) {
      let res = response.success?.body?.etransfer || response.success?.body?.scheduleetransfer;
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


