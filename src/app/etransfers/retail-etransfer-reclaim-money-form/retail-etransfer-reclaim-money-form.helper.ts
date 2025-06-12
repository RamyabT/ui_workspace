import { ChangeDetectorRef, inject, Injectable } from "@angular/core";
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
import { EtransferService } from '../etransfer-service/etransfer.service';
import { Etransfer } from '../etransfer-service/etransfer.model';
import { AppConfigService } from "@dep/services";
import { EtransfercontactService } from "../etransfercontact-service/etransfercontact.service";
import { MomentService } from "src/app/foundation/validator-service/moment-service";
import { EtransfercustomerService } from "src/app/etransfers-space/etransfercustomer-service/etransfercustomer.service";
import { CasaaccountService } from "src/app/foundation/casaaccount-service/casaaccount.service";
import { CASAAccountsListComponent } from "src/app/accounts/casa-accounts-list/casa-accounts-list.component";
import { DeviceDetectorService } from "@dep/core";
import { Casaaccount } from "src/app/foundation/casaaccount-service/casaaccount.model";
export class RetailEtransferReclaimMoneyFormState extends BaseFpxComponentState {
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
  eTransferCustomerData: any
  sourceAccount: any;
  paymentId:any;
  prefferedAcc:any;
  selectedAccount: any;
  tempCasaAccount: any;
  casaAccountList: any[] = [];
  casaAccounts: Casaaccount[] = [];
  currency:any;
  amount:any;
}


@Injectable()
export class RetailEtransferReclaimMoneyFormHelper extends BaseFpxFormHelper<RetailEtransferReclaimMoneyFormState> {
  sourceAccount: any;


  constructor(private retailEtransferReclaimMoneyFormService: EtransferService,
    private etransfercustomerService: EtransfercustomerService,
    private momentService: MomentService,
    private _appConfig: AppConfigService,
    private _httpProvider: HttpProviderService,
    private casaAccountService:CasaaccountService,
    public _device:DeviceDetectorService,
    private changeDetectorRef:ChangeDetectorRef,
    private _currencyFormatter:FpxCurrenyFormatterPipe,
    private _router: Router, private cdr: ChangeDetectorRef) {
    super(new RetailEtransferReclaimMoneyFormState());
  }

  override doPreInit(): void {
    this._appConfig.setData('navBack', ['home']);
    this.etransfercustomerService.fetchPreferredAccount().subscribe({
      next: (res) => {
        res.forEach((item: any) => {
          if (item.serviceCode == "INTERAC" && item.isPreferred == "1") {
            this.state.prefferedAcc = item.accountNumber;
          }
        });
      }
    })
    this.removeShellBtn("RESET");
    this.setServiceCode("ETRANSFERRECLAIMMONEY");
    this.addControlEventHandler("sourceAccountDataReceived", this.onSourceAccountDataReceived);
    this.addControlEventHandler("exchangeRateReceived", this.onExchangeRateDataReceived);
    let data = this._appConfig.getData('eTransferCustomerData');
    if (data) {
      this.state.eTransferCustomerData = data;
    }
    this.handleFormOnLoad();

  }



  public override doPostInit(): void {
  }

  public handleFormOnLoad() {
    let requestURLInfo = this._appConfig.getData('requestURLInfo');
    this.state.paymentId = requestURLInfo?.requestId;
    let key: any = {
      paymentId: requestURLInfo?.requestId,
      tenantId: requestURLInfo?.tenantId,
      serviceCode: 'GETETRANSFERSEND'
    }
    this.retailEtransferReclaimMoneyFormService.findByKey(key)().subscribe(res => {
      if (res) {
        this.state.eTransferUserData = res;
        this.setValue('sourceAccount', res?.sourceAccount);
        this.setValue('paymentAmount', { amount: res?.paymentAmount, currencyCode: res?.paymentCurrency });
        this.setValue('contactName',this.state.eTransferUserData?.beneficiaryName);
        this.setValue('contactEmailId',this.state.eTransferUserData?.contactEmailId);
        this.setValue('contactPhoneNumber',this.state.eTransferUserData?.contactPhoneNumber);
        this.state.sourceAccount=res?.sourceAccount;
        this.state.currency=res?.paymentCurrency;
        this.state.amount=this._currencyFormatter.transform(res?.paymentAmount,res?.paymentCurrency)

      }

    });
    this.state.toCurrencyVariable = this._appConfig.baseCurrency
    this.setVariable('toCurrencyVariable', this.state.toCurrencyVariable);
    this.setReadonly('sourceAccount', true);
    this.setReadonly('paymentAmount', true);
    this.casaAccountService.fetchCasaAccounts(true).subscribe({
      next: (res) => {
        this.state.casaAccountList = res
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
        if (this.state.sourceAccount) {
          this.state.casaAccounts.forEach((item: any) => {
            if (this.state.sourceAccount == item.accountNumber) {
              this.state.selectedAccount = item;
              this.state.fromCurrencyVariable = item.accountCurrency;
              this.state.accountBalanceVariable = item.availableBalance;
            }
          })
        }
      },
      error: (error) => {
        console.log("Casa accounts fetch error");
      }
    });
    this.changeDetectorRef.markForCheck(); 
    this._appConfig.removeData('requestURLInfo');
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
      }
    }

  public onExchangeRateDataReceived: BaseFpxControlEventHandler = (payload: any) => {
    if (payload) {
      console.log("YESS");
    }

  }


  public onSourceAccountDataReceived: BaseFpxControlEventHandler = (payload: any) => {
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



  public override preSubmitInterceptor(payload: Etransfer): any {
    // WRITE CODE HERE TO HANDLE 
    payload.transferMode = 'R';
    payload.contactCategory = 'C';
    payload.paymentReqId = this.state.paymentId;
    payload.sourceAccount = this.state.eTransferUserData.sourceAccount;
    payload.paymentAmount = this.state.eTransferUserData.paymentAmount;
    payload.paymentCurrency = this.state.eTransferUserData.paymentCurrency;
    payload.paymentDate = this.state.eTransferUserData.paymentDate.split(" ")[0];
    return payload;
  }


  public override postDataFetchInterceptor(payload: Etransfer) {
    // WRITE CODE HERE TO HANDLE 
    return payload;
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


