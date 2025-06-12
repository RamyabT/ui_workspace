import { Inject, inject, Injectable } from "@angular/core";
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
  FpxModalAfterClosed
} from "@fpx/core";
import { Observable, map, of } from "rxjs";
import { Router } from "@angular/router";
import { EtransferautodepositlogService } from '../etransferautodepositlog-service/etransferautodepositlog.service';
import { Etransferautodepositlog } from '../etransferautodepositlog-service/etransferautodepositlog.model';
import { AppConfigService } from "@dep/services";
import { EtransfercustomerService } from "src/app/etransfers-space/etransfercustomer-service/etransfercustomer.service";
import { ActiveSpaceInfoService, DeviceDetectorService } from "@dep/core";
import { CasaaccountService } from "src/app/foundation/casaaccount-service/casaaccount.service";
import { Casaaccount } from "src/app/foundation/casaaccount-service/casaaccount.model";
import { AccountsSpaceManager } from "src/app/accounts-space/accounts-space.manager";
import { CASAAccountsTransferListComponent } from "src/app/accounts/casa-accounts-transfer-list/casa-accounts-transfer-list.component";
import { ActionsPanelComponent } from "src/app/foundation/actions-panel/actions-panel.component";
import { CasaAccountsEtransferListComponent } from "../casa-accounts-etransfer-list/casa-accounts-etransfer-list.component";
import { DepConfirmationComponent } from "src/app/dep/core/component/dep-confirmation/dep-confirmation.component";
import { CASAAccountsListComponent } from "src/app/accounts/casa-accounts-list/casa-accounts-list.component";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
export class RetailEtransferautodepositlogFormState extends BaseFpxComponentState {
  private _appConfig: AppConfigService = inject(AppConfigService);
  showSuggestion: boolean = false;
  termsFlag: any = {
    textPosition: "after",
    ckValues: { checked: "Y", unchecked: "N" }
  }
  eTransferCustomerData: any;
  mode: any;
  ntfnPref: any;
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
  sourceAccount: any
  nickname: any
  accType: any
  status: any
  casaAccounts: Casaaccount[] = [];
  email: any;
  depositAccount: any
  accName: any
  isEditEnabled: boolean = false
  readOnly: any = false;
  activeEmail: any;
  activeMobile: any;
  pendingEmail: any;
  casaAccountList: any[] = [];
  selectedAccount: any;
  prefferedAcc: any;
  tempCasaAccount:any;
}


@Injectable()
export class RetailEtransferautodepositlogFormHelper extends BaseFpxFormHelper<RetailEtransferautodepositlogFormState> {
  isPreffered: boolean = false;
  constructor(private retailEtransferautodepositlogFormService: EtransferautodepositlogService,
    private etransfercustomerService: EtransfercustomerService,
    private _appConfig: AppConfigService,
    private _activeSpaceInfoService: ActiveSpaceInfoService,
    private _accountsSpaceMgr: AccountsSpaceManager,
    private casaAccountService: CasaaccountService,
    public _device: DeviceDetectorService,
    private _httpProvider: HttpProviderService, private _router: Router,
    private _dialogRef: MatDialogRef<any>, 
    @Inject(MAT_DIALOG_DATA) private _dialogData : any,) {
    super(new RetailEtransferautodepositlogFormState());
  }

  override doPreInit(): void {
    this.setServiceCode("RETAILETRANSFERAUTODEPOSIT");
    this.removeShellBtn('RESET');
    // this.setLabel("submit", "RetailEtransfer.startDate.label");
    this.etransfercustomerService.fetchPreferredAccount().subscribe({
      next: (res) => {
        res?.forEach((item: any) => {
          if (item.serviceCode == "INTERAC" && item.isPreferred == "1") {
            this.state.prefferedAcc = item.accountNumber;
            
          }
        });
      }
    })
    let data = this._appConfig.getData('eTransferAutoDeposit');
    let queryParam = this._appConfig.getData('eTransferAutoDepositQueryParam');
    this.state.mode = queryParam.mode;
    this.state.status = queryParam.status;
    if (this.state.status == 'Pending') {
      this.state.email = data.emailID;
    }
  }

  public override doPostInit(): void {
    this.setVariable('serviceCode', "RETAILETRANSFERAUTODEPOSIT");
    this.addValueChangeHandler("ntfnType", this.handlentfnTypeOnvalueChange);
    this.addValueChangeHandler("emailID", this.emailIDValueChange);
    this.addValueChangeHandler("mobileNumber", this.mobileNumberValueChange);
    this.addControlEventHandler("depositAccountDataReceived", this.onDepositAccountDataReceived);
    this.handleFormOnLoad()
  }

  handleFormOnLoad() {
    let data = this._appConfig.getData('eTransferCustomerData');
    if (data) {
      this.state.eTransferCustomerData = data;
    }
    if (this.state.mode == 'M' || this.state.mode == 'D') {
      this.removeShellBtn('RESET');
      this.addShellButton('Delete', 'DELETE', 'secondary', 'ENTRY', 'button');
      this.setShellBtnMethod('DELETE', this.onDeleteAutoDeposit.bind(this));
      this.setReadonly('emailID', true);
      this.setReadonly('mobileNumber', true);
      this.setHidden('ntfnType', true);

      setTimeout(()=>{
        this.setShellBtnLable([{
          id: 'SUBMIT',
          label: 'RetailEtransferautodepositlogForm.update'
        }]);
      });

      let manageAutoDeposit = ['RetailEtransferautodepositlogForm.title'];
      this.setFormTitle(manageAutoDeposit[0]);
      let data = this._appConfig.getData('eTransferAutoDeposit');
      if (data) {
        this.state.eTransferCustomerData = data;
      }
      this.state.sourceAccount = this.state.eTransferCustomerData?.depositAccount
      this.state.depositAccount = this.state.eTransferCustomerData?.depositAccount;

      this.casaAccountService.fetchCasaAccounts(true).subscribe({
        next: (res) => {
          this.state.casaAccountList = res
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
          // if (!this.state.prefferedAcc) {
          //   this.state.selectedAccount = this.state.casaAccounts[0];

          // }
          if(this.state.eTransferCustomerData?.depositAccount) {
            this.state.casaAccounts.forEach((item: any) => {
              if (this.state.eTransferCustomerData?.depositAccount == item.accountNumber) {
                this.state.selectedAccount = item;
                this.state.fromCurrencyVariable = item.accountCurrency;
                this.state.accountBalanceVariable = item.availableBalance;
                if (item.accountNickname) {
                  this.state.nickname = item.accountNickname;
                }
                else {
                  this.state.nickname = item.productDesc;
                }
                this.state.accType = item.accountTypeDesc;
              }
            })
          }
        },
        error: (error) => {
          console.log("Casa accounts fetch error");
        }
      });

      
      if (this.state.status == 'Pending') {
        if(this.state.eTransferCustomerData?.ntfnType == 'E'){
          this.state.pendingEmail = this.state.eTransferCustomerData?.emailID;
        }
        else if(this.state.eTransferCustomerData?.ntfnType == 'P'){
          this.state.pendingEmail = this.state.eTransferCustomerData?.mobileNumber;
        }
        this.hideShellActions();
      }

      if (this.state.status == 'Active') {
        this.removeShellBtn('RESET');
        this.state.activeEmail = this.state.eTransferCustomerData?.emailID;
        this.state.activeMobile = this.state.eTransferCustomerData?.mobileNumber;
      
        if (this.state.eTransferCustomerData?.emailID) {
          this.state.ntfnPref = 'E';
          this.setValue('emailID', this.state.eTransferCustomerData?.emailID);
          this.setHidden('emailID', false);
          this.setHidden('mobileNumber', true);
        }
        else {
          if (this.state.eTransferCustomerData?.mobileNumber) {
            this.state.ntfnPref = 'P'
            this.setValue('mobileNumber', this.state.eTransferCustomerData?.mobileNumber);
            this.setHidden('emailID', true);
            this.setHidden('mobileNumber', false);
          }
  
        }
      }
    }
    else {
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
            if(this.state.casaAccounts[0].accountNickname){
              this.state.nickname = this.state.casaAccounts[0].accountNickname;
            }
            else{
              this.state.nickname = this.state.casaAccounts[0].productDesc;
            }
            this.state.fromCurrencyVariable = this.state.casaAccounts[0].accountCurrency;
            this.state.accountBalanceVariable = this.state.casaAccounts[0].availableBalance;
            this.state.accType = this.state.casaAccounts[0].accountTypeDesc;
            this.setValue('depositAccount', this.state.casaAccounts[0].accountNumber);
          }
          else {
            this.state.casaAccounts.forEach((item: any) => {
              if (this.state.prefferedAcc == item.accountNumber) {
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
                this.setValue('depositAccount',item.accountNumber);
              }
            })
          }
        },
        error: (error) => {
          console.log("Casa accounts fetch error");
        }
      });
     
      this.setHidden('mobileNumber', true);
      this.setValue('ntfnType', 'E');
      let data = this._appConfig.getData('casaaccount');
    }
  }


  goToAutoDeposit() {
    if(this._device.isMobile()){
      this._router.navigate(['etransfers-space', 'display-shell', 'etransfers', 'etransfer-manage-autodeposit'])
    }
    else{
      this._dialogRef.close();
    }
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
      title: 'Deposit to',
      accountsList: this.state.casaAccounts,
      selectedAccount: this.state.selectedAccount,
      serviceCode: "INTERAC",
      okBtnLbl: 'Save',
      cancelBtnLbl: 'Close'
    });
    modal.setAfterClosed(this.accountSelectedAfterClose);
    this.openModal(modal)
  }

  DelBillModelAfterClose: FpxModalAfterClosed = (payload) => {
    if (payload == 0) {
      

    }
    else {
      //this._router.navigate(['etransfers-space', 'display-shell', 'etransfers', 'etransfer-manage-autodeposit'])
      this.state.mode='D';
      //this.setHidden('hiddenField',true);
      this.setHidden('emailID',true);
      this.setHidden('depositAccount',true);
      this.setHidden('mobileNumber',true);
      this.triggerSubmit();
      
    }

  }

  accountSelectedAfterClose: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
    if (payload.action === 1) {
      if(this.state.mode == 'M' || this.state.mode == 'D'){
        if(this.state.eTransferCustomerData?.depositAccount == payload?.data?.accountNumber){
          this.reset('depositAccount');
        }
        else{
          this.setValue('depositAccount', payload?.data?.accountNumber);
        }
      }
      else{
        this.setValue('depositAccount', this.state.sourceAccount);
      }
      this.state.sourceAccount = payload?.data?.accountNumber;
      // this.state.selectedAccount.accountNumber = payload?.data?.accountNumber;
      this.state.selectedAccount = payload.data;
      if (payload?.data?.accountNickname) {
        this.state.nickname = payload?.data?.accountNickname;
      }
      else {
        this.state.nickname = payload?.data?.productDesc
      }

      this.state.fromCurrencyVariable = payload?.data?.accountCurrency;
      this.state.accountBalanceVariable = payload?.data?.availableBalance;
      this.state.accType = payload?.data?.accountTypeDesc;
    }
    else{
      if(this.state.mode == 'M' || this.state.mode == 'D'){
        if(this.state.eTransferCustomerData?.depositAccount == this.state.sourceAccount){
          this.reset('depositAccount');
        }
        else{
          this.setValue('depositAccount', this.state.sourceAccount);
        }
      }
      else{
        this.setValue('depositAccount', this.state.sourceAccount);
      }
    }
  }

  public onEmailIDDataReceived: BaseFpxControlEventHandler = (payload: any) => {
    if (payload) {
      this.state.email = payload;
      this.state.isEditEnabled = true;
    }

  }


  public onDepositAccountDataReceived: BaseFpxControlEventHandler = (payload: any) => {
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

  public handlentfnTypeOnvalueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if (this.formGroup.controls['ntfnType']?.value === "E") {
      this.state.ntfnPref = 'E';
      this.setHidden('emailID', false);
      this.reset('mobileNumber');
      this.setHidden('mobileNumber', true);
    }
    else if (this.formGroup.controls['ntfnType']?.value === "P") {
      this.state.ntfnPref = 'P';
      this.setHidden('mobileNumber', false);
      this.reset('emailID');
      this.setHidden('emailID', true);
    }

  }

  public emailIDValueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if (value) {
      this.state.isEditEnabled = true;
      if (this.state.mode != 'M') {
        let body = {
          validateetransferautodeposit: {
            emailId: value,
            ntfnType: "E"
          },
        };
        this.etransfercustomerService.checkIsAutoDeposit(body).subscribe({
          next: (res) => {
            if (Number(res.body.count) == 0) {
            }
            else {
              this.setErrors('emailID', "duplicate_err");
            }
          }
        })
      }
    }
  }

  public mobileNumberValueChange: BaseFpxChangeHandler = (
    name: string,
    status: FormControlStatus,
    value: any,
    formGroup: FormGroup
  ) => {
    if (value) {
      if(String(value).length!=10){
        this.setErrors('mobileNumber','pattern')
      }
      this.state.isEditEnabled = true;
      if (this.state.mode != 'M') {
        let body = {
          validateetransferautodeposit: {
            phoneNumber: value,
            ntfnType: "P"
          },
        };
        this.etransfercustomerService.checkIsAutoDeposit(body).subscribe({
          next: (res) => {
            if (Number(res.body.count) == 0) {
            }
            else {
              this.setErrors('mobileNumber', "duplicate_err");
            }
          }
        })
      }
    }
  }

  onDeleteAutoDeposit() {
    // this.state.mode ='D';
   let modal = new FpxModal();
    let activeTitle: any;
    let activeMessage: any;
    modal.setComponent(DepConfirmationComponent);
    modal.setPanelClass('dep-alert-popup');
    modal.setBackDropClass(["dep-popup-back-drop", "delete-bill-backdrop", "bottom-transparent-overlay"]);
    modal.setDisableClose(true);

    if (!(this.state.activeMobile)) {
      activeTitle = this.state.activeEmail;
      activeMessage = 'email';
    }
    if (!(this.state.activeEmail)) {
      activeTitle = this.state.activeMobile;
      activeMessage = 'mobile number'
    }

    // modal.setBackDropClass(["dep-popup-back-drop", "delete-bill-backdrop", "bottom-transparent-overlay"]);
    // modal.setDisableClose(true);
    modal.setData({
      title: "Delete Autodeposit for " + activeTitle + "?",
      message: "Transfers sent to this " + activeMessage + " will no longer be deposited automatically.",
      okBtnLbl: "Yes, delete",
      cancelBtnLbl: "No",
      confirmationIcon: "delete"
    });
    modal.setAfterClosed(this.DelBillModelAfterClose);
    this.openModal(modal)
  }

  public override preSubmitInterceptor(payload: Etransferautodepositlog): any {
    // WRITE CODE HERE TO HANDLE 
    if (this.state.mode == 'M') {
      payload.operationMode = 'M';
      payload.requestReferenceNumber = this.state.eTransferCustomerData.requestReferenceNumber;
      payload.depositAccount = this.state.sourceAccount;
      payload.depositAccountName=this.state.nickname;
      payload.ntfnType = this.state.ntfnPref;
      payload.termsFlag = 'Y';
    }
    else if (this.state.mode == 'D') {
      payload.operationMode = 'D';
      payload.requestReferenceNumber = this.state.eTransferCustomerData.requestReferenceNumber;
      payload.ntfnType = this.state.ntfnPref;
      payload.termsFlag = 'Y';
      payload.depositAccount = this.state.eTransferCustomerData?.depositAccount
      payload.emailID = this.state.eTransferCustomerData.emailID;
      payload.mobileNumber = this.state.eTransferCustomerData.mobileNumber;
    }
    else {
      payload.operationMode = 'A';
      payload.depositAccountName=this.state.nickname;
      payload.termsFlag = 'Y';
      if (payload.emailID) {
        this._appConfig.setData('autoDepositData', payload.emailID);
      }
      else {
        this._appConfig.setData('autoDepositData', payload.mobileNumber);
      }
    }

    return payload;
  }


  public override postDataFetchInterceptor(payload: Etransferautodepositlog) {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }


  public handleFormOnPostsubmit(response: any, routingInfo: any) {
    if (response.success) {
      let res = response.success?.body?.etransferautodepositlog
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


