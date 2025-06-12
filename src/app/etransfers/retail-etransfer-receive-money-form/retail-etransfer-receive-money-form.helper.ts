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
  FpxModalAfterClosed,
  FpxCurrenyFormatterPipe
} from "@fpx/core";
import { Observable, map, of } from "rxjs";
import { Router } from "@angular/router";
import { AppConfigService } from "@dep/services";
import { EtransferService } from '../etransfer-service/etransfer.service';
import { Etransfer } from '../etransfer-service/etransfer.model';
import { MomentService } from "src/app/foundation/validator-service/moment-service";
import { DepAlertComponent } from "src/app/dep/core/component/dep-alert/dep-alert.component";
import { DepTooltipComponent } from "src/app/dep/core/component/dep-tooltip/dep-tooltip.component";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { DeviceDetectorService } from "@dep/core";
import { CasaaccountService } from "src/app/foundation/casaaccount-service/casaaccount.service";
import { CasaAccountsEtransferListComponent } from "../casa-accounts-etransfer-list/casa-accounts-etransfer-list.component";
import { APPCONSTANTS } from "@dep/constants";
import { DepConfirmationComponent } from "src/app/dep/core/component/dep-confirmation/dep-confirmation.component";
import { EtransfercustomerService } from "src/app/etransfers-space/etransfercustomer-service/etransfercustomer.service";
import { each } from "hammerjs";
import { CASAAccountsListComponent } from "src/app/accounts/casa-accounts-list/casa-accounts-list.component";
import { Casaaccount } from "src/app/foundation/casaaccount-service/casaaccount.model";
export class RetailEtransferReceiveMoneyFormState extends BaseFpxComponentState {
  private _appConfig: AppConfigService = inject(AppConfigService);
  showSuggestion: boolean = false;
  paymentAmount: any = {
    isCurrEditable: false,
    CurrencyList: [],
    amountInWords: true,
    initCurrency: this._appConfig.baseCurrency,
    defaultFetch: true,
  }
  fromCurrencyVariable: any;
  toCurrencyVariable: any;
  accountBalanceVariable: any;
  eTransferUserData: any
  autoDepositFlag: any = {
    ckValues: { checked: "1", unchecked: "0" }
  }
  securityAnswer: any
  sourceAccount: any
  reason: any
  paymentId: any
  status: any
  crtSecAns: any

  nickname: any
  casaAccounts: Casaaccount[] = [];
  accType: any
  Amount:any
  currency: string = APPCONSTANTS.baseCurrency;
  varCount:any=0;
  serviceFee:Number=0.90;
  serviceFeeCurrency: string = APPCONSTANTS.baseCurrency;
  prefferedAcc: any;
  selectedAccount: any;
  tempCasaAccount: any;
  casaAccountList: any[] = [];

}


@Injectable()
export class RetailEtransferReceiveMoneyFormHelper extends BaseFpxFormHelper<RetailEtransferReceiveMoneyFormState> {
  autoDepositFlag!: FormGroup;
  isPreferred: boolean =true;
  isDisabled: boolean =false;
  formData : any;
 transactionDetails: any = {};
  findByKeyDataReceived: boolean = true;
  constructor(private retailEtransferReceiveMoneyFormService: EtransferService,
    private _httpProvider: HttpProviderService,
    private etransfercustomerService: EtransfercustomerService,
    private _appConfig: AppConfigService,
    private momentService: MomentService,
    private _dialogRef: MatDialogRef<any>,
    public _device: DeviceDetectorService,
    private changeDetectorRef:ChangeDetectorRef,
    private casaAccountService: CasaaccountService,
    private _currencyFormatter: FpxCurrenyFormatterPipe,
    @Inject(MAT_DIALOG_DATA) private _dialogData: any,
    private _router: Router) {
    super(new RetailEtransferReceiveMoneyFormState());
  }

  override doPreInit(): void {
    if(this.formMode == 'VIEW') {
      this.findByKeyDataReceived = false;
      setTimeout(() => {
        this.setFormTitle("");
      });
    }
    this._appConfig.setData('navBack', ['home']);
    let prefferedAccData=this._appConfig.getData('prefferedAccount');
    if(!prefferedAccData){
      this.etransfercustomerService.fetchPreferredAccount().subscribe({
        next: (res) => {
          res.forEach((item: any) => {
            if (item.serviceCode == "INTERAC" && item.isPreferred == "1") {
              this.state.prefferedAcc = item.accountNumber;
            }
            this._appConfig.setData('prefferedAccount', this.state.prefferedAcc);
          });
        }
      })
    }
    this.setServiceCode("ETRANSFERRECEIVEMONEY");
    this.removeShellBtn('RESET');
    this.setHidden('addMobileContact',true);
    this.addShellButton('Decline', 'DELETE', 'secondary', 'ENTRY', 'button');
    this.setShellBtnMethod('DELETE', this.declineMoney.bind(this));
    this.addValueChangeHandler("autoDepositFlag", this.handleautoDepositFlagOnvalueChange);
    this.addValueChangeHandler("securityAnswer", this.onsecurityAnswerValueChange);
    this.addControlEventHandler("sourceAccountDataReceived", this.onSourceAccountDataReceived);
    this.addValueChangeHandler("remarks1", this.onRemarks1ValueChange);
    this.handleFormOnLoad();
  }


  public override doPostInit(): void {
    this.autoDepositFlag = this.formGroup.get("autoDepositFlag") as FormGroup;
  }

  public handleFormOnLoad() {
    let data=this._appConfig.getData('ReceiveMoneyformData');
    this.setHidden('autoDepositFlag', true);
    this.setValue("autoDepositFlag", "1");
    this.setHidden('remarks1', true);
    this.state.toCurrencyVariable = this._appConfig.baseCurrency
    this.setVariable('toCurrencyVariable', this.state.toCurrencyVariable);
    this.setReadonly('paymentAmount', true);
    this.setReadonly('remarks', true);
    if(data){
      this.setValue('sourceAccount',data[0].sourceAccount);
      this.setValue('paymentAmount',{amount:data[0].paymentAmount, currencyCode:data[0].paymentCurrency});
      this.state.currency =data[0].paymentCurrency;
      this.state.Amount =this._currencyFormatter.transform(data[0].paymentAmount,data[0].paymentCurrency)
      this.state.eTransferUserData=data[0];
      this.state.paymentId = data[0].paymentReqId;
      this.state.eTransferUserData.beneficiaryName=data[0].contactName;
      if(!data[0].remarks){
        this.setHidden('remarks',true);
        this.isDisabled=true;
      }
      else{
        this.isDisabled=false;
        this.setHidden('remarks',false);
        this.setValue('remarks',this.state.eTransferUserData.remarks);
      }
      this.setValue('securityQuestion', this.state.eTransferUserData.securityQuestion);
      this.state.sourceAccount = this.state.eTransferUserData.sourceAccount;
      this.state.crtSecAns =this.state.eTransferUserData.securityAnswer;
      this.state.prefferedAcc=this._appConfig.getData('prefferedAccount');
      let accountListData=this._appConfig.getCasaAccountList();
      if(accountListData){
        this.state.tempCasaAccount=accountListData;
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
        if (this.state.sourceAccount) {
          this.state.casaAccounts.forEach((item: any) => {
            if (this.state.sourceAccount == item.accountNumber) {
              this.state.selectedAccount = item;
              this.state.fromCurrencyVariable = item.accountCurrency;
              this.state.accountBalanceVariable = item.availableBalance;
              this.state.nickname = item.productDesc;
              this.state.accType = item.accountTypeDesc;
            }
          })
        }
      }
      
    }
    else{
    let requestURLInfo = JSON.parse(JSON.stringify(this._appConfig.getData('requestURLInfo')));
    this._appConfig.removeData('requestURLInfo');
    this.setHidden('sourceAccount', true);
    // this.setHidden('securityQuestion', true);
    // this.setHidden('securityAnswer', true);
      this.state.paymentId = requestURLInfo?.requestId;
      let key: any = {
        paymentId: requestURLInfo?.requestId,
        tenantId: requestURLInfo?.tenantId,
        serviceCode: 'GETETRANSFERRECEIVE'
      }
      if(requestURLInfo?.requestId) {
        this.retailEtransferReceiveMoneyFormService.findByKey(key)().subscribe(res => {
          if (res) {
            this.patchDataOnViewMode(res);
          }
        });
      }
      else this.patchDataOnViewMode(requestURLInfo?.data);
    
  
    this.casaAccountService.fetchCasaAccounts(true).subscribe({
      next: (res) => {
        this.state.casaAccountList = res
        this.state.tempCasaAccount = this.state.casaAccountList.filter((item: any) => item.accountCurrency == 'CAD');
        this._appConfig.setCasaAccountList(this.state.tempCasaAccount);
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
        if (this.state.sourceAccount) {
          this.state.casaAccounts.forEach((item: any) => {
            if (this.state.sourceAccount == item.accountNumber) {
              this.state.selectedAccount = item;
              this.state.fromCurrencyVariable = item.accountCurrency;
              this.state.accountBalanceVariable = item.availableBalance;
              this.state.nickname = item.productDesc;
              this.state.accType = item.accountTypeDesc;
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

    if (this.getRoutingParam('mode') == 'V') {
      this.setHidden('securityQuestion', true);
      this.setHidden('securityAnswer', true);
        this.casaAccountService.fetchCasaAccounts(true).subscribe({
          next: (res) => {
            let index = res.findIndex(x=>x.accountNumber == this.getValue('sourceAccount'));
            this.state.casaAccounts = res;
              this.state.sourceAccount = res[index].accountNumber;
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
    }
  }

  public handleautoDepositFlagOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if (this.formGroup.controls['autoDepositFlag']?.value === "1") {
      this.setHidden('sourceAccount', false);
      this.setReadonly('sourceAccount', false);
      this.setHidden('securityQuestion', false);
      this.setHidden('securityAnswer', false);
      this.setValue('securityQuestion', this.state.eTransferUserData?.securityQuestion);
      this.setReadonly('securityQuestion', true);
      this.setHidden('remarks1', true);
    }
    else if (this.formGroup.controls['autoDepositFlag']?.value === "0") {
      this.setHidden('remarks1', false);
      this.setHidden('securityQuestion', true);
      this.setHidden('securityAnswer', true);
    }

  }

  patchDataOnViewMode(res: any) {
    this.findByKeyDataReceived = true;
    this.state.eTransferUserData = res;
    this.state.sourceAccount = res?.sourceAccount;
    this.state.crtSecAns = res?.securityAnswer;
    this.state.Amount = this._currencyFormatter.transform(res?.paymentAmount,res?.paymentCurrency)
    this.state.currency=res?.paymentCurrency
    this.setValue('sourceAccount', res?.sourceAccount);
    if(!res.remarks){
      this.setHidden('remarks',true);
      this.isDisabled=true;
    }
    else{
      this.isDisabled=false;
      this.setHidden('remarks',false);
      this.setValue('remarks', res?.remarks);
    }
    this.setValue('paymentAmount', { amount: res?.paymentAmount, currencyCode: res?.paymentCurrency });
    this.setValue('securityQuestion', res?.securityQuestion);
  }

  public onSourceAccountDataReceived: BaseFpxControlEventHandler = (payload: any) => {
    // WRITE CODE HERE TO HANDLE 
    if (payload) {
      this.state.sourceAccount = payload?.accountNumber
      if (payload?.accountCurrency) {
        this.setVariable('fromCurrencyVariable', payload.accountCurrency);
        this.state.fromCurrencyVariable = payload.accountCurrency;
      }
      else {
        this.setVariable('fromCurrencyVariable', this._appConfig.baseCurrency);
        this.state.fromCurrencyVariable = this._appConfig.baseCurrency;
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

  public onsecurityAnswerValueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if (value) {
      // this.state.varCount++;
      this.state.securityAnswer = value;
      // if (value != this.state.crtSecAns) {
      //   if (this.state.varCount <= 4) {
      //     this.IncorrectAnswer();
      //     this.setErrors('securityAnswer', "notMatchErr");
      //   }
      //   else {
      //     this.formGroup.get('securityAnswer')?.setErrors(null);
          // this.onManyAttempts();
        // }

      // }
    }
  }
  IncorrectAnswer() {
    
    if (this._device.isMobile()) {
      let modal = new FpxModal();
      modal.setComponent(DepTooltipComponent);
      modal.setPanelClass("dep-tooltip-popup");
      modal.setDisableClose(true);
      modal.setAfterClosed(this.contextmenuModelAfterClose);
      modal.setData({
        title: "RetailEtransferReceiveMoneyForm.inccorrectMsgTitle",
        message: "RetailEtransferReceiveMoneyForm.inccorrectMsg",
      });
      this.openModal(modal);
    }
    else {
      let modal = new FpxModal();
      modal.setComponent(DepAlertComponent);
      modal.setPanelClass("dep-alert-popup");
      modal.setBackDropClass(["etransfer-send-limits"]);
      modal.setDisableClose(true);
      modal.setAfterClosed(this.contextmenuModelAfterClose);
      modal.setData({
        title: "RetailEtransferReceiveMoneyForm.inccorrectMsgTitle",
        message: "RetailEtransferReceiveMoneyForm.inccorrectMsg",
        okBtnLbl: "RetailEtransferReceiveMoneyForm.okBtnLbl",
      });
      this.openModal(modal);
    }
  }

  public override postDataFetchInterceptor(payload: Etransfer) {
    // WRITE CODE HERE TO HANDLE 
    payload.contactId = payload.contactId.beneId;
    this.transactionDetails = payload;
    this.findByKeyDataReceived = true;
    return payload;
  }

  backToETransfer() {
    if(this._device.isMobile()) {
      this._router.navigate(['etransfers-space'], {
        queryParams: {
          refresh: "Y"
        }
      });
    }
    else {
      this._router.navigate(['etransfers-space', 'etransfers', 'etransfers-home']);
    }
  }



  ReceiveMoneyAfterClose: FpxModalAfterClosed = (payload: any, addtionalData: any) => {

    if (payload == 0) {
      this._router.navigate(['etransfers-space', 'entry-shell', 'etransfers', 'retail-etransfer-decline-money-form']);
    }
    else {
      this._router.navigate(['etransfers-space']);
    }
  }

  public onRemarks1ValueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if (value) {
      this.state.reason = value;
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
        title: "RetailEtransferReceiveMoneyForm.msgTitle",
        message: "RetailEtransferReceiveMoneyForm.message",

      });
      this.openModal(modal);
    }
    else {
      let modal = new FpxModal();
      modal.setComponent(DepAlertComponent);
      modal.setPanelClass("dep-alert-popup");
      modal.setBackDropClass(["etransfer-send-limits"]);
      modal.setDisableClose(true);
      modal.setAfterClosed(this.contextmenuModelAfterClose);
      modal.setData({
        title: "RetailEtransferReceiveMoneyForm.msgTitle",
        message: "RetailEtransferReceiveMoneyForm.message",
        okBtnLbl: "Close"
      });
      this.openModal(modal);
    }
  }

  contextmenuModelAfterClose: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
    this._dialogRef.close(0);
  }

  openCasaAccountsLists() {
    let modal = new FpxModal();
    modal.setComponent(CASAAccountsListComponent);
    if (this._device.isMobile()) {
      modal.setPanelClass('full-view-popup');
    } else {
      modal.setPanelClass('dep-alert-popup');
    }
    this.reset('depositAccount');
    modal.setBackDropClass(['dep-popup-back-drop', 'payment-accounts-list-popup-back-drop']);

    modal.setDisableClose(true);
    modal.setData({
      title: 'Deposit money to',
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
      this.state.selectedAccount = payload.data;
      if (payload?.data?.accountNickname) {
        this.state.nickname = payload?.data?.accountNickname
      }
      else {
        this.state.nickname = payload?.data?.productDesc
      }
      this.state.fromCurrencyVariable = payload?.data?.accountCurrency;
      this.state.accountBalanceVariable = payload?.data?.availableBalance;
      this.state.accType = payload?.data?.accountTypeDesc;
    }
  }

  declineMoney() {
    this.formData = [
      {
        sourceAccount: this.getValue('sourceAccount'),
        paymentAmount: this.getValue('paymentAmount').amount,
        paymentCurrency: this.state.currency,
        // paymentDate: this.state.eTransferUserData.paymentDate.split(" ")[0],
        depositConsent: '0',
        paymentReqId: this.state.paymentId,
        contactCategory: this.state.eTransferUserData.contactCategory,
        transferMode: this.state.eTransferUserData.transferMode,
        remarks: this.state.eTransferUserData.remarks,
        securityAnswer: this.state.eTransferUserData.securityAnswer,
        securityQuestion: this.state.eTransferUserData.securityQuestion,
        contactName: this.state.eTransferUserData?.beneficiaryName,
        contactPhoneNumber: this.state.eTransferUserData?.contactPhoneNumber,
        contactEmailId: this.state.eTransferUserData?.contactEmailId,
      }
    ]
    this._appConfig.setData('formData', this.formData);
    // this.getValue
    this._router.navigate(['etransfers-space', 'entry-shell', 'etransfers', 'retail-etransfer-decline-money-form']);
  }

  public override preSubmitInterceptor(payload: Etransfer): any {
    // WRITE CODE HERE TO HANDLE 
    payload.transferMode = this.state.eTransferUserData.transferMode;
    this._appConfig.setData('status', 'accept');
    payload.depositConsent = '1';
    payload.contactCategory = this.state.eTransferUserData.contactCategory;
    if (this.state.reason) {
      payload.remarks = this.state.reason;
      payload.depositConsent = '0';
    }
    payload.paymentReqId = this.state.paymentId;
    // let Date: any = this.momentService.getInstance();
    if (this.state.securityAnswer) {
      payload.securityAnswer = this.state.securityAnswer;
    }
    payload.contactName = this.state.eTransferUserData?.beneficiaryName;
    payload.sourceAccount = this.state.sourceAccount;
    payload.paymentAmount = this.state.eTransferUserData.paymentAmount;
    payload.paymentCurrency = this.state.currency;
    // payload.paymentDate = this.state.eTransferUserData.paymentDate.split(" ")[0];
    return payload;
  }

  decodeTransferMode(transferMode: string) {
    if (transferMode == 'S') {
      return 'Sent';
    }
    else if (transferMode == 'R') {
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
      'A': 'Accepted'
    };
    return scheduleMap[paymentStatus];
  }
  public handleFormOnPostsubmit(response: any, routingInfo: any) {
    if (response.success) {
      let res = response.success?.body?.etransfer
      routingInfo.setQueryParams({
        response: res,
        serviceCode: this.serviceCode.value
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
    let routingInfo: RoutingInfo = new RoutingInfo();
    this.handleFormOnPostsubmit(response, routingInfo);
    return routingInfo;
  }
  //$START_CUSTOMSCRIPT\n
  //$END_CUSTOMSCRIPT\n
}


