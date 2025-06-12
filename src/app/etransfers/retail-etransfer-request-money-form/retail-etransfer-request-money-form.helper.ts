import {Inject, inject, Injectable } from "@angular/core";
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
import { Pymts } from '../../transfers/pymts-service/pymts.model';
import { MomentService } from "src/app/foundation/validator-service/moment-service";
import { AppConfigService } from "@dep/services";
import { EtransfercontactService } from "../etransfercontact-service/etransfercontact.service";
 import moment from "moment";
import { EtransfercustomerService } from "src/app/etransfers-space/etransfercustomer-service/etransfercustomer.service";
import { CasaAccountsEtransferListComponent } from "../casa-accounts-etransfer-list/casa-accounts-etransfer-list.component";
import { DeviceDetectorService } from "@dep/core";
import { Casaaccount } from "src/app/foundation/casaaccount-service/casaaccount.model";
import { CasaaccountService } from "src/app/foundation/casaaccount-service/casaaccount.service";
import { DepTooltipComponent } from "src/app/dep/core/component/dep-tooltip/dep-tooltip.component";
import { DepAlertComponent } from "src/app/dep/core/component/dep-alert/dep-alert.component";
import { MatDialogRef } from "@angular/material/dialog";
import { DepConfirmationComponent } from "src/app/dep/core/component/dep-confirmation/dep-confirmation.component";
import { APPCONSTANTS } from "@dep/constants";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { CASAAccountsListComponent } from "src/app/accounts/casa-accounts-list/casa-accounts-list.component";
import { ETransferConfirmationReceiptFormComponent } from "../etransfer-confirmation-receipt-form/etransfer-confirmation-receipt-form.component";

export class RetailEtransferRequestMoneyFormState extends BaseFpxComponentState {
  private _appConfig: AppConfigService = inject(AppConfigService);
  showSuggestion: boolean = false;
  termsFlag:any={
    textPosition:"after",
    ckValues:{checked:"Y",unchecked:""}
 }
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
  contact: any;
  securityAnswer:any={
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
  EtransferRequestMoneyData: any;
  tranCat: any;
  Amount:string="0.90";
  currency: string = APPCONSTANTS.baseCurrency;
  prefferedAcc: any;
  casaAccountList: any;
  selectedAccount: any;
  tempCasaAccount: any;
  isAmountEnable: boolean= true;
  review: boolean = false;
  dateTime: any;
  requestMoneyDetails: any;
  productCode: any;

}


@Injectable()
export class RetailEtransferRequestMoneyFormHelper extends BaseFpxFormHelper<RetailEtransferRequestMoneyFormState> {
  isPreferred!: any;
  isPreffered: boolean = false;

  transactionDetails: any = {};
  invoiceNumber: any = {
    isHidden: false
  };
  findByKeyDataReceived: boolean = true;

  constructor(private retailEtransferRequestMoneyFormService: EtransferService,
    private  etransfercustomerService: EtransfercustomerService,
    private _httpProvider: HttpProviderService,
    private _router: Router,
    private momentService: MomentService,
    private _currencyFormatter: FpxCurrenyFormatterPipe,
    private _dialogRef: MatDialogRef<any>,
    private _appConfig: AppConfigService,
    private EtransfercontactService: EtransfercontactService,
    public _device: DeviceDetectorService,
    private casaAccountService: CasaaccountService,
    @Inject(MAT_DIALOG_DATA) private _dialogData: any,
  ) {
    super(new RetailEtransferRequestMoneyFormState());
  }

  override doPreInit(): void {
    if(this.formMode == 'VIEW') {
      this.findByKeyDataReceived = false;
      setTimeout(() => {
        this.setFormTitle("");
      });
    }
    this.setServiceCode("ETRANSFERREQUESTMONEY");
    this.removeShellBtn('RESET');
    this.state.modeVar = this.getRoutingParam('mode');
    this.state.tranCat = this.getRoutingParam('tranCat');
    let data=this._appConfig.getData('eTransferCustomerData');
    if(data){
      this.state.eTransferCustomerData=data;
    }
    this.setHidden('scheduleType',true);
    this.setHidden('paymentDate',true);
    this.addResetHandler('reset', this._onReset);

  }

  public override doPostInit(): void {
    //this.isPreferred = this.formGroup.get("isPreferred") as FormGroup;
    this.setVariable('serviceCode',"ETRANSFERREQUESTMONEY");
   // this.addValueChangeHandler("contactCategory", this.handlecontactCategoryOnvalueChange);
    this.addValueChangeHandler("scheduleType", this.handleScheduleTypeOnvalueChange);
    this.addControlEventHandler("sourceAccountDataReceived", this.onSourceAccountDataReceived);
    this.addValueChangeHandler("isPreferred", this.handlesIsPreferredOnvalueChange);
    //this.addControlEventHandler("contactIdDataReceived", this.oncontactIdDataReceived);
    this.addValueChangeHandler("contactName", this.oncontactNameValueChange);
    // this.addValueChangeHandler("contactPhoneNumber", this.oncontactPhoneNumberValueChange);
    // this.addValueChangeHandler("contactEmailId", this.oncontactEmailIdValueChange);
    this.addValueChangeHandler("securityAnswer", this.onsecurityAnswerValueChange);
    this.addValueChangeHandler("confirmSecurityAnswer", this.onconfirmSecurityAnswerValueChange);
    this.addValueChangeHandler("paymentAmount", this.handlePaymentAmountOnvalueChange);
    this.addControlEventHandler("exchangeRateReceived", this.onExchangeRateDataReceived);
    this.addValueChangeHandler("notificationPreference", this.onnotificationPreferenceValueChange);
    this.handleFormOnLoad();

  }
  override onReview(): void {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    this.state.review = true;
    //this.setHidden('contactTitle', true);
    // if (!this.getValue('contactEmailId')) {
    //   this.setHidden('contactEmailId', true);
    // }
    // if (!this.getValue('contactPhoneNumber')) {
    //   this.setHidden('contactPhoneNumber', true);
    // }
   
    if (!this.getValue('invoiceNumber')) {
      this.setHidden('invoiceNumber', true);
    }
    else{
      this.setHidden('invoiceNumber', false);
    }


    if (!this.getValue('remarks')) {
      this.setHidden('remarks', true);
    }
    else{
      this.setHidden('remarks', false);
    }

    this.setHidden('termsFlag',true);
    this.state.isAmountEnable=false;

  }
  
  override backToEntryMode(): void {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    this.state.review = false;
    //this.setHidden('contactTitle', false);
   // this.setHidden('contactEmailId', false);
   // this.setHidden('contactPhoneNumber', false);
    this.setHidden('invoiceNumber', false);
    this.setHidden('remarks', false);
    this.setHidden('termsFlag',false);
    this.state.isAmountEnable=true;
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
      if(!(this.getValue('securityAnswer'))){
        this.setErrors('confirmSecurityAnswer',"securityAnsReq")
      }
      else{
        if(value!=this.getValue('securityAnswer')){
          this.setErrors('confirmSecurityAnswer',"notMatchErr");
        }
      }
    }
  }
  public oncontactEmailIdValueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if (value) {
      const criteriaQuery: CriteriaQuery = new CriteriaQuery();
      criteriaQuery.addFilterCritertia('emailId', 'String', 'equals', {
        searchText: value
      });
      this.EtransfercontactService.findAll(criteriaQuery)().subscribe({
        next: (res) => {
          if (res) {
            if (res?.data[0].emailId == value) {
              this.setErrors('contactEmailId', 'duplicate');
            }
          }
        }
      })
    }
  }
  public oncontactPhoneNumberValueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if (value) {
      const criteriaQuery: CriteriaQuery = new CriteriaQuery();
      criteriaQuery.addFilterCritertia('phoneNumber', 'String', 'equals', {
        searchText: value
      });
      this.EtransfercontactService.findAll(criteriaQuery)().subscribe({
        next: (res) => {
          if (res) {
            if (res?.data[0].phoneNumber == value) {
              this.setErrors('contactPhoneNumber', 'duplicate');
            }
          }
        }
      })
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
      this.EtransfercontactService.findAll(criteriaQuery)().subscribe({
        next: (res)=>{
          if(res){
            if(res?.data[0].firstName==value){
              this.setErrors('contactName','duplicate');
            }
          }
        }
      })
    }
  }

  public onnotificationPreferenceValueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if (value) {
      if (value == 'E') {
        this.setHidden('contactEmailId', false);
        this.setHidden('contactPhoneNumber', true);
        if (!this.state.EtransferRequestMoneyData?.phoneNumber ||this.state.tranCat=='O') {
          this.reset('contactPhoneNumber');
          //this.setReadonly('contactPhoneNumber',true);
        }
      
      }
      else {
        if (!this.state.EtransferRequestMoneyData?.emailId ||this.state.tranCat=='O') {
          this.reset('contactEmailId');
        }
        this.setHidden('contactEmailId', true);
        this.setHidden('contactPhoneNumber', false);
      }
    }
  }

  public oncontactIdDataReceived: BaseFpxControlEventHandler = (payload: any) => {
    // WRITE CODE HERE TO HANDLE 
    if (payload) {
      // this.state.contact=payload;
    }
  }
  public handleScheduleTypeOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    this.setVariable('scheduleTypeVariable', value);
    let Date: any = this.momentService.getInstance();
    let currentDate: any = Date.format("YYYY-MM-DD");
    let futureDate: any = Date.add(1, "day").format("YYYY-MM-DD");
    let futureMaxDate: any = Date.add(1, "Year").format("YYYY-MM-DD");
    if (value == '1') {
      this.setVariable('scheduleTypeVariable', value);
      this.setValue('paymentDate', currentDate);
      this.setReadonly('paymentDate', true);
      this.setHidden('scheduleHandler', true);
      this.setLabel("paymentDate", "RetailEtransfer.paymentDate.label");
    }
    if (value == "2") {
      this.setVariable('scheduleTypeVariable', value);

      this.reset('paymentDate', "");
      this.state.paymentDate.minDate = futureDate;
      this.state.paymentDate.maxDate = futureMaxDate;
      this.setValue('paymentDate', futureDate);
      this.setHidden('scheduleHandler', true);
      this.setReadonly('paymentDate', false);
      this.setLabel("paymentDate", "RetailEtransfer.executionDate.label");
    }
    if (value == "3") {
      this.setVariable('scheduleTypeVariable', value);
      this.setLabel("paymentDate", "RetailEtransfer.startDate.label");
      this.state.paymentDate.minDate = futureDate;
      this.state.paymentDate.maxDate = futureMaxDate;
      this.setHidden('scheduleHandler', false);
      this.setValue('paymentDate', futureDate);
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
      this.reset('contactName');
      this.reset('contactEmailId');
      this.reset('contactPhoneNumber');
      this.reset('notificationPreference');
      this.setValue('notificationPreference', this.state.contact?.notificationPreference);
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
      else{
        this.setVariable('fromCurrencyVariable', this._appConfig.baseCurrency);
        this.state.fromCurrencyVariable = this._appConfig.baseCurrency;
      }
      if(!this.state.modeVar){
        this.reset('paymentAmount');
        this.setValue('paymentAmount', { amount: 0, currencyCode: this._appConfig.baseCurrency });
      }
      if(payload?.availableBalance){
        this.setVariable('accountBalanceVariable', payload.availableBalance);
      }
      else{
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
    this.state.EtransferRequestMoneyData = this._appConfig.getData('EtransferRequestMoneyData');
    if (this.state.modeVar) {
      let routingParam: any = this.getRoutingParam();
      if (this.getRoutingParam('mode') == 'R') {
        this.retailEtransferRequestMoneyFormService.findByKey(routingParam)().subscribe((res) => {
          if (res) {
            this.state.tranCat=res?.contactCategory;
            this.setReadonly('notificationPreference',true);
            this.patchValue(res);
            this.setValue('contactCategory', this.state.tranCat);
            this.state.contact = res?.contactId;
            this.setHidden('contactDetails', false);
            this.setValue('contactId', this.state.EtransferRequestMoneyData?.beneId);
            this.setHidden('contactName', true);
            this.setHidden('preferredLanguage', true);
            this.state.requestMoneyDetails = res;

            if (this.state.contact?.notificationPreference) {
              this.setValue('notificationPreference', this.state.contact?.notificationPreference);
              if (this.state.contact?.emailId && this.state.contact?.phoneNumber) {
                this.setValue('contactEmailId', this.state.contact?.emailId);
                this.setValue('contactPhoneNumber', this.state.contact?.phoneNumber);
                this.setReadonly('contactEmailId', true);
                this.setReadonly('contactPhoneNumber', true);
              }
              else if (!this.state.contact?.emailId && this.state.contact?.phoneNumber) {
                this.setReadonly('contactEmailId', false);
                this.setValue('contactPhoneNumber', this.state.contact?.phoneNumber);
                this.setReadonly('contactPhoneNumber', true);
                this.setReadonly('notificationPreference', true);
                this.setHidden('contactEmailId', true);


              }
              else {
                this.setReadonly('contactPhoneNumber', false);
                this.setValue('contactEmailId', this.state.contact?.emailId);
                this.setReadonly('contactEmailId', true);
                this.setReadonly('notificationPreference', true);
                this.setHidden('contactPhoneNumber', true);
              }
            }
            this.setValue('securityQuestion', this.state.contact?.securityQuestion);
            this.setValue('securityAnswer', this.state.contact?.securityAnswer);

            this.setValue('scheduleType', '1');
            this.setValue('paymentAmount', { amount: res?.paymentAmount, currencyCode: res?.paymentCurrency});
            this.state.toCurrencyVariable = this._appConfig.baseCurrency
            this.setVariable('toCurrencyVariable', this.state.toCurrencyVariable);
            this.setDisabled('paymentId', true);

            this.etransfercustomerService.fetchPreferredAccount().subscribe({
              next: (res) => {
                res.forEach((item: any) => {
                  if (item.serviceCode == "INTERAC" && item.isPreferred == "1") {
                    this.state.defaultAccNum = item.accountNumber;
                    this.setValue('sourceAccount', item.accountNumber);
                    this.state.productCode = item.productCode;
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
                this.state.casaAccounts = [];
                this.state.tempCasaAccount.forEach((item: any) => {
                  if (this.state?.prefferedAcc == item.accountNumber) {
                    item.preferredAccount = true;
                    this.state.casaAccounts.push({ ...item, preferredAccount: item?.preferredAccount });
                  }

                  else {
                    item.preferredAccount = false;
                    this.state.casaAccounts.push({ ...item, preferredAccount: item?.preferredAccount });
                  }
                })
                if (this.state.requestMoneyDetails.sourceAccount) {
                  this.state.casaAccounts.forEach((item: any) => {
                    if (this.state.requestMoneyDetails.sourceAccount == item.accountNumber) {
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
          }
        });
      }
      else if (this.getRoutingParam('mode') == 'V') {
        this.setFormTitle("");
        this.setValue('paymentAmount', { amount: this.getValue('paymentAmount'), currencyCode: this.getValue('paymentCurrency') });
        this.setHidden('scheduleHandler',true);
        if(this.getValue('contactCategory')=='C'){
          // this.setHidden('contactName', true);
          // this.setHidden('contactEmailId', true);
          // this.setHidden('contactPhoneNumber', true);
          this.setHidden('notificationPreference', true);
          this.setHidden('createContact', true);
          this.setHidden('confirmSecurityAnswer', true);
          this.setHidden('termsFlag', true);
          this.setHidden('preferredLanguage', true);

          if (this.getValue('notificationPreference') == 'E') {
            this.setHidden('contactEmailId', false);
            this.setHidden('contactPhoneNumber', true);
            if (!this.state.EtransferRequestMoneyData?.phoneNumber || this.state.tranCat == 'O') {
              this.reset('contactPhoneNumber');
            }
          }
          else {
            if (!this.state.EtransferRequestMoneyData?.emailId || this.state.tranCat == 'O') {
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
          if(!this.getValue('invoiceNumber')) {
            this.setHidden('invoiceNumber', true);
            this.invoiceNumber.isHidden = true;
          }
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
           // this.setHidden('contactName', true);
          // this.setHidden('contactEmailId', true);
          // this.setHidden('contactPhoneNumber', true);
          this.setHidden('notificationPreference', true);
          this.setHidden('createContact', true);
          this.setHidden('confirmSecurityAnswer', true);
          this.setHidden('termsFlag', true);
          this.setHidden('preferredLanguage', true);

          if (this.getValue('notificationPreference') == 'E') {
            this.setHidden('contactEmailId', false);
            this.setHidden('contactPhoneNumber', true);
            if (!this.state.EtransferRequestMoneyData?.phoneNumber || this.state.tranCat == 'O') {
              this.reset('contactPhoneNumber');
            }
          }
          else {
            if (!this.state.EtransferRequestMoneyData?.emailId || this.state.tranCat == 'O') {
              this.reset('contactEmailId');
            }
            this.setHidden('contactEmailId', true);
            this.setHidden('contactPhoneNumber', false);
          }
          this.casaAccountService.fetchCasaAccounts(true).subscribe({
            next: (res) => {
              let index = 0;
              if (this.getValue('sourceAccount')) {
                index = res.findIndex(x => x.accountNumber == this.getValue('sourceAccount'));
              }
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
          if (!this.getValue('invoiceNumber')) {
            this.setHidden('invoiceNumber', true);
            this.invoiceNumber.isHidden = true;
          }
          if (!this.getValue('remarks')) {
            this.setHidden('remarks', true);
          }
          this.setValue('paymentAmount', { amount: this.transactionDetails.paymentAmount, currencyCode: this.transactionDetails.paymentCurrency });

          this.setLabel("contactName", "RetailEtransfer.sentTo.label");
          this.setLabel("contactEmailId", "RetailEtransfer.notificationPreference.label");
        }
      }
    }
    else{
     if (this.state.tranCat == 'C') {
      this.setValue('contactCategory', 'C');
      this.state.contact = this.state.EtransferRequestMoneyData;
      this.setHidden('contactDetails',false);
      this.setValue('contactId', this.state.EtransferRequestMoneyData?.beneId);
      this.setHidden('contactName',true);
      this.setHidden('preferredLanguage',true);
      //this.setValue('paymentAmount', { amount: 0, currencyCode: this._appConfig.baseCurrency });
     
      if (this.state.contact?.notificationPreference) {
        this.setValue('notificationPreference', this.state.contact?.notificationPreference);
        //this.setReadonly('notificationPreference', true);
        if (this.state.contact?.emailId && this.state.contact?.phoneNumber) {
          this.setValue('contactEmailId', this.state.contact?.emailId);
          this.setValue('contactPhoneNumber', this.state.contact?.phoneNumber);
          this.setReadonly('contactEmailId', true);
          this.setReadonly('contactPhoneNumber', true);
        }
        else if (!this.state.contact?.emailId && this.state.contact?.phoneNumber) {
          this.setReadonly('contactEmailId', false);
            this.setValue('contactPhoneNumber', this.state.contact?.phoneNumber);
            this.setReadonly('contactPhoneNumber', true);
            this.setReadonly('notificationPreference', true);
            this.setHidden('contactEmailId',true);


        }
        else {
          this.setReadonly('contactPhoneNumber', false);
          this.setValue('contactEmailId', this.state.contact?.emailId);
            this.setReadonly('contactEmailId', true);
            this.setReadonly('notificationPreference', true);
            this.setHidden('contactPhoneNumber',true);
        }
      }
      //this.setValue('scheduleType', '1');
      //this.setValue('paymentAmount', { amount: 0, currencyCode: this._appConfig.baseCurrency });
      this.setValue('securityQuestion', this.state.contact?.securityQuestion);
      this.setValue('securityAnswer', this.state.contact?.securityAnswer);
      // this.setHidden('paymentSummary',true);
      // this.state.toCurrencyVariable = this._appConfig.baseCurrency
      // this.setVariable('toCurrencyVariable', this.state.toCurrencyVariable);
      // this.setDisabled('paymentId', true);
    }

      // if(this.state.tranCat=='O'){
      //   this.setValue('contactCategory','O');
      //   this.setHidden('contactId',true);
      //   this.setValue('preferredLanguage', '1');
      //   this.setValue('notificationPreference','E');
      // }

      this.setValue('scheduleType', '1');
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
            this.state.productCode = item.productCode;
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
                if(item.accountNickname ){
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
    this.reset('termsFlag')
    this.handleFormOnLoad();
  }

  public handlePaymentAmountOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if(value){
      if(value.amount){
        if(!this.getValue('sourceAccount')){
          this.setErrors('paymentAmount','sourceAccNullError');
        }
        if(value.amount<0.01 || value.amount>3000)
          this.setErrors('paymentAmount','outofRangeError');
  
      }

    }
  }

    onPopup() {
      if (this._device.isMobile()) {
        let modal = new FpxModal();
        modal.setComponent(DepTooltipComponent);
        modal.setPanelClass("dep-tooltip-popup");
        modal.setDisableClose(true);
        modal.setAfterClosed(this.contextmenuModelAfterClose);
        modal.setData({
          title: "Service fee",
          message: "A service fee (if applicable) will be deducted from your account at the time the funds are deposited.",
        });
        this.openModal(modal);
      }
      else {
        let modal = new FpxModal();
        modal.setComponent(DepAlertComponent);
        modal.setPanelClass("dep-alert-popup");
        modal.setBackDropClass(['dep-popup-back-drop', 'success-popup']);
        modal.setDisableClose(true);
        modal.setAfterClosed(this.contextmenuModelAfterClose);
        modal.setData({
          title: "Service fee",
          message: "A service fee (if applicable) will be deducted from your account at the time the funds are deposited.",
          okBtnLbl: "Close"
        });
        this.openModal(modal);
      }
    }
    contextmenuModelAfterClose: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
      this._dialogRef.close(0);
    }
  
  public handlesIsPreferredOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if (value) {
      if(this.getValue('sourceAccount')!='' &&this.getValue('sourceAccount')!=undefined){
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
        if(value=='N'){
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
      else{
        this.setErrors('isPreferred','sourceAccNullError');
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
    }
  }

  public override preSubmitInterceptor(payload: Etransfer): any {
    // WRITE CODE HERE TO HANDLE 
    payload.paymentAmount = this.getValue('paymentAmount').amount;
    payload.paymentCurrency = this.getValue('paymentAmount').currencyCode;
    payload.paymentDate=moment(new Date()).format('YYYY-MM-DD')
    payload.transferMode = 'R';
    if(this.getValue('contactId')!='' &&this.getValue('contactId')!=undefined){
      payload.contactId=this.state.contact?.contactId;
    }
    if(this.getValue('contactCategory')=='C'){
      payload.contactName=this.state.contact?.firstName;
      payload.contactEmailId=this.state.contact?.emailId;
      payload.contactPhoneNumber=this.state.contact?.phoneNumber;
      // payload.notificationPreference=this.state.contact?.notificationPreference;
      payload.beneId=this.state.contact?.beneId;
    }
    if(!(this.getValue('createContact')) && this.getValue('contactCategory')=='O'){
      payload.createContact='0';
    }
    else if (this.getValue('createContact')) {
      payload.createContact = '1';
    }
    delete payload.confirmSecurityAnswer;
    delete payload.isPreferred;
    // payload.scheduleType='1';
    // payload.paymentDate=moment(new Date()).format('YYYY-MM-DD')
    delete payload.createContact;
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
      title: 'CancelETransferReqPopup.title',
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
        "transferMode": this.transactionDetails.transferMode,
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
          this.state.dateTime = this.momentService.getInstance().format("YYYY-MM-DD HH:mm:ss");
          let modal = new FpxModal();
          modal.setComponent(ETransferConfirmationReceiptFormComponent);
          modal.setPanelClass("dep-alert-popup");
          modal.setDisableClose(true);
          modal.setBackDropClass(['dep-popup-back-drop', 'success-popup', 'etransfer-cancel-confirmation']);
          modal.setAfterClosed(this.contextmenuModelAfterClose);
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

  contextmenuAfterClose: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
    this._angularRouter.navigate(['etransfers-space']);
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
        modal.setAfterClosed(this.contextmenuAfterClose);
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
    this._router.navigate(['etransfers-space','entry-shell','etransfers','retail-etransfer-request-money-form'],
      {
        queryParams: {
          paymentId: this.getRoutingParam('paymentId'),
          serviceCode: 'ETRANSFERREQUESTMONEY',
          mode:'R'
        }
      }
    );
  }

  public handleFormOnPostsubmit(response: any, routingInfo: any) {
    if (response.success) {
      let res = response.success?.body?.etransfer
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


