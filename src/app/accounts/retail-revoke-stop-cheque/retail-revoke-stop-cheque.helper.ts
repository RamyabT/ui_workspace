import { Inject, Injectable } from "@angular/core";
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
import { BehaviorSubject, Observable, map, of } from "rxjs";
import { Router } from "@angular/router";
import { StopchequerevrequestService } from '../stopchequerevrequest-service/stopchequerevrequest.service';
import { Stopchequerevrequest } from '../stopchequerevrequest-service/stopchequerevrequest.model';
import { StopchequeService } from "../stopcheque-service/stopcheque.service";
import { ActiveSpaceInfoService, DeviceDetectorService } from "@dep/core";
import { APPCONSTANTS } from "@dep/constants";
import moment from "moment";
import { AppConfigService } from "@dep/services";
import { AccountsSpaceManager } from "src/app/accounts-space/accounts-space.manager";
import { StopchequereasonService } from "src/app/foundation/stopchequereason-service/stopchequereason.service";
import { ConfirmationReceiptFormComponent } from "../confirmation-receipt-form/confirmation-receipt-form.component";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
export class RetailRevokeStopChequeState extends BaseFpxComponentState {
  showSuggestion: boolean = false;

  chequeAmount: any = {
    isCurrEditable: false,
    CurrencyList: [{ id: APPCONSTANTS.baseCurrency, text: APPCONSTANTS.baseCurrency }],
    amountInWords: false,
    initCurrency: APPCONSTANTS.baseCurrency,
    defaultFetch: true,
  }
  stopDate: any = {
    minDate: new Date(),
    maxDate: new Date(),
  }
  stopcheques: any;
  review: boolean = false;
  ischequeAmountEnabled: boolean = false;
  accountName: any;
  accountNumber: any;
  stopChequeReasons: any
}


@Injectable()
export class RetailRevokeStopChequeHelper extends BaseFpxFormHelper<RetailRevokeStopChequeState> {
  otherReason: boolean = false;
  showRevokeStopChequeDetails: boolean = false
  constructor(private retailRevokeStopChequeService: StopchequerevrequestService,
    private _httpProvider: HttpProviderService,
    private _stopchequeService: StopchequeService,
    private _activeSpaceInfoService: ActiveSpaceInfoService,
    private _appconfig: AppConfigService,
    public _device: DeviceDetectorService,
    private _StopchequereasonService: StopchequereasonService,
    private _accountsSpaceMgr: AccountsSpaceManager,
    @Inject(MAT_DIALOG_DATA) private _dialogData: any,
    private _dialogRef: MatDialogRef<any>,
    private _router: Router) {
    super(new RetailRevokeStopChequeState());
  }

  override doPreInit(): void {
    if (this._device.isDesktop()) {
      let showRevokeStopChequeDetails$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
      this._appconfig.setData('showRevokeStopChequeDetails$', {
        "observable": showRevokeStopChequeDetails$.asObservable(),
        "subject": showRevokeStopChequeDetails$
      });

      if (this._appconfig.hasData('showRevokeStopChequeDetails$')) {
        this._appconfig.getData('showRevokeStopChequeDetails$').observable.subscribe(
          (res: any) => {
            console.log("showRevokeStopChequeDetails", res);
            this.showRevokeStopChequeDetails = res?.showRevokeStopChequeDetails ? true : false;
            if (this.showRevokeStopChequeDetails) {
              this.handleFormOnLoad();
            }
          }
        );
      }
    }

    this.setServiceCode("RETAILSTOPCHEQUEREV");
    this.setHidden('inventoryNumber', true);
    this.removeShellBtn('RESET');
    this.addShellButton('Back', 'BACK', 'secondary', 'ENTRY', 'button');
    this.setShellBtnMethod('BACK', this.onBackClick.bind(this));
  }
  onBackClick() {
    this.showSpinner();
    this._router.navigate(['accounts-space', 'display-shell', 'accounts', 'retail-stopcheque-display-grid'], {
    });
  }



  public handleFormOnLoad() {
    // WRITE CODE HERE TO HANDLE
    if (this._device.isDesktop()) {
      if (this._appconfig.hasData('showStopChequeDetails$')) {
        this._appconfig.getData('showStopChequeDetails$').subject.next({
          showStopChequeDetails: true
        });
      }
    }
    this.state.review = true;
    this.removeShellBtn('BACK');
    this.removeShellBtn('RESET');
    let res = this._appconfig.getData('setStopChequeData');
    this.setValue('chargesAmount', { amount: 10, currencyCode: APPCONSTANTS.baseCurrency });
    this.setValue('accountNumber', res?.accountNumber);
    this.state.accountNumber = res?.accountNumber;
    this.setReadonly('accountNumber', true);
    if (!res?.payeeName) {
      this.setHidden('payeeName', true);
    }
    else {
      this.setValue('payeeName', res?.payeeName);
    }
    this.setReadonly('payeeName', true);
    this.setValue('reason', res?.reason);
    this.setReadonly('reason', true);
    this.setValue('chequeNumber', res?.chequeNumber);
    this.setReadonly('chequeNumber', true);
    this.setReadonly('fromChequeNumber', true);
    this.setReadonly('tochequeNumber', true);

    this.setValue('stopDate', moment(res?.stopDate).format('YYYY-MM-DD'));
    this.setReadonly('stopDate', true);
    if (!res?.chequeAmount) {
      this.setHidden('chequeAmount', true);
      this.state.ischequeAmountEnabled = false;
    }
    else {
      this.state.ischequeAmountEnabled = true;
      this.setValue('chequeAmount', { amount: res?.chequeAmount, currencyCode: APPCONSTANTS.baseCurrency });
    }
    this.setReadonly('chequeAmount', true);
    this.state.accountName = this.getAccountName();
    this.state.stopChequeReasons = this._StopchequereasonService.stopChequeReasons[this.getValue('reason') - 1]?.text;
    if (this.getValue('reason') == '6') {
      this.otherReason = true;
      this.state.stopChequeReasons = this.state.stopChequeReasons + ": " + res?.otherReason;
    }
    else {
      this.otherReason = false;
    }

  }
  override ngOnDestroy(): void {
    if (this._device.isDesktop()) {
      if (this._appconfig.hasData('showStopChequeDetails$')) {
        this._appconfig.getData('showStopChequeDetails$').subject.next({
          showStopChequeDetails: false
        });
      }
    }
  }
  getAccountName() {
    let casaAccounts = this._accountsSpaceMgr.getCasaAccountsList();
    let accountNumber: string = this._activeSpaceInfoService.getAccountNumber();
    let selectedAccount = casaAccounts.filter((item: any) => item.accountNumber === accountNumber);
    return selectedAccount?.[0]?.accountNickname || selectedAccount?.[0]?.productDesc;
  }

  public override doPostInit(): void {

    this.handleFormOnLoad();
    if (this._device.isMobile()) {
      this._appconfig.setData('navBack', ['accounts-space']);
    }
    else {
      this._appconfig.setData('navBack', ['accounts-space', 'accounts']);
    }
  }

  public handleFormOnPresubmit(payload: any) {
    // WRITE CODE HERE TO HANDLE
    if (!payload.chequeAmount) {
      delete payload.chequeAmount;
      delete payload.currency;
    }
    else {
      payload.chequeAmount = this.getValue('chequeAmount')?.amount;
      payload.currency = this.getValue('chequeAmount')?.currencyCode;
    }
    // if(!payload.payeeName){
    //   delete payload.payeeName;
    // }
    // payload.relatedReference = this.getRoutingParam('relatedReference');
    // payload.chargesAmount = Number(this.getValue('chargesAmount').amount);
    // payload.currency = this.getValue('chequeAmount')?.currencyCode;

    // payload.chequeNumber=Number(this.getValue('chequeNumber'));
    delete payload.toChequeNumber;
    delete payload.fromChequeNumber;
    delete payload.chargesAmount;

  }


  public override preSubmitInterceptor(payload: Stopchequerevrequest): any {
    this.handleFormOnPresubmit(payload);

    return payload;
  }


  public override postDataFetchInterceptor(payload: Stopchequerevrequest) {
    // WRITE CODE HERE TO HANDLE 
    return payload;
  }
  public handleFormOnPostsubmit(response: any, routingInfo: any) {
    // WRITE CODE HERE TO HANDLE
    if (response.success) {
      let res: any = response.success?.body?.stopchequerevrequest;
      routingInfo.setQueryParams({
        response: res,
      });
    }
    else if (response.error) {
      let error: any = response.error.error;
      // routingInfo.setQueryParams({
      //   response: error,
      //   serviceCode: this.serviceCode.value
      // });
      let modal = new FpxModal();
      modal.setComponent(ConfirmationReceiptFormComponent);
      modal.setPanelClass("dep-alert-popup");
      modal.setDisableClose(true);
      if (this._device.isMobile()) {
        modal.setBackDropClass(['dep-popup-back-drop', 'success-popup', 'accounts-confirmation-backdrop']);
      }
      else {
        modal.setBackDropClass(['dep-popup-back-drop', 'success-popup', 'etransfers-contacts-backdrop']);
      }
      modal.setAfterClosed(this.contextmenuModelAfterClose1);
      modal.setData({
        statusCode: 'failure'
      });
      this.openModal(modal);
    }
    return response;
  }

  contextmenuModelAfterClose1: FpxModalAfterClosed = (payload: any, addtionalData: any) => {
    this._dialogRef.close();
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


